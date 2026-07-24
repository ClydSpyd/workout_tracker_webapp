import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { API } from '../api';

// queries/current-workout.ts
const CURRENT_WORKOUT_KEY = ['myCurrentWorkout'] as const;

/** Return a new workout with `exerciseId`'s exercise replaced by `fn`'s result. */
function mapExercise(
  workout: WorkoutSession,
  exerciseId: string,
  fn: (exercise: WorkoutExercise) => WorkoutExercise,
): WorkoutSession {
  return {
    ...workout,
    exercises: workout.exercises.map((exercise) =>
      exercise.exerciseId === exerciseId ? fn(exercise) : exercise,
    ),
  };
}

/** Return a new workout with the set at `[exerciseId][setIndex]` replaced by `fn`'s result. */
function mapSet(
  workout: WorkoutSession,
  exerciseId: string,
  setIndex: number,
  fn: (set: WorkoutSetInput) => WorkoutSetInput,
): WorkoutSession {
  return mapExercise(workout, exerciseId, (exercise) => ({
    ...exercise,
    sets: exercise.sets.map((set, idx) => (idx === setIndex ? fn(set) : set)),
  }));
}

function useCurrentWorkoutMutation<Variables>(config: {
  request: (workoutId: string, variables: Variables) => Promise<WorkoutSession>;
  optimisticUpdate?: (
    currentWorkout: WorkoutSession,
    variables: Variables,
  ) => WorkoutSession; // opt-in, for instant feedback
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: Variables) => {
      const currentWorkout = queryClient.getQueryData<WorkoutSession | null>(
        CURRENT_WORKOUT_KEY,
      );
      if (!currentWorkout) throw new Error('No active workout');
      return config.request(currentWorkout._id, variables);
    },

    onMutate:
      config.optimisticUpdate &&
      (async (variables) => {
        await queryClient.cancelQueries({ queryKey: CURRENT_WORKOUT_KEY });

        const previousWorkout = queryClient.getQueryData<WorkoutSession | null>(
          CURRENT_WORKOUT_KEY,
        );

        if (previousWorkout) {
          queryClient.setQueryData(
            CURRENT_WORKOUT_KEY,
            config.optimisticUpdate!(previousWorkout, variables),
          );
        }
        return { previousWorkout }; // stashed for rollback
      }),

    onError: (_error, _variables, context: any) => {
      if (context?.previousWorkout !== undefined) {
        queryClient.setQueryData(CURRENT_WORKOUT_KEY, context.previousWorkout);
      }
    },

    onSuccess: (updatedWorkout) =>
      queryClient.setQueryData(CURRENT_WORKOUT_KEY, updatedWorkout),
  });
}

export const useUpdateCurrentWorkout = () =>
  useCurrentWorkoutMutation<Partial<WorkoutSession>>({
    request: (workoutId, updatedData) =>
      API.workout.updateWorkout(workoutId, updatedData),
    optimisticUpdate: (currentWorkout, updatedData) => ({
      ...currentWorkout,
      ...updatedData,
    }),
  });

export const useAddExerciseToCurrentWorkout = () =>
  useCurrentWorkoutMutation<{ exerciseId: string }>({
    request: (workoutId, { exerciseId }) =>
      API.workout.addExerciseToWorkout(exerciseId, workoutId),
    optimisticUpdate: (currentWorkout, { exerciseId }) => ({
      ...currentWorkout,
      exercises: [
        ...currentWorkout.exercises,
        {
          exerciseId,
          name: '',
          sets: [],
        } as WorkoutExercise,
      ],
    }),
  });

export const useAddSetToExercise = () =>
  useCurrentWorkoutMutation<{ exerciseId: string; setData: WorkoutSetInput }>({
    request: (workoutId, { exerciseId, setData }) =>
      API.workout.addSetToExercise(workoutId, exerciseId, setData),
    optimisticUpdate: (currentWorkout, { exerciseId, setData }) =>
      mapExercise(currentWorkout, exerciseId, (exercise) => ({
        ...exercise,
        // Append the new set — mirrors the payload sent to the server.
        sets: [...exercise.sets, setData],
      })),
  });

export const useRemoveExerciseFromWorkout = () =>
  useCurrentWorkoutMutation<{ exerciseId: string }>({
    request: (workoutId, { exerciseId }) =>
      API.workout.removeExerciseFromWorkout(exerciseId, workoutId),
    optimisticUpdate: (currentWorkout, { exerciseId }) => ({
      ...currentWorkout,
      exercises: currentWorkout.exercises.filter(
        (exercise) => exercise.exerciseId !== exerciseId,
      ),
    }),
  });

export const useReplaceExercise = () =>
  useCurrentWorkoutMutation<{
    fromExerciseId: string;
    toExerciseId: string;
    toName?: string; // optional, for an instant label swap
  }>({
    request: (workoutId, { fromExerciseId, toExerciseId }) =>
      API.workout.replaceExercise(workoutId, fromExerciseId, toExerciseId),
    optimisticUpdate: (currentWorkout, { fromExerciseId, toExerciseId, toName }) =>
      mapExercise(currentWorkout, fromExerciseId, (exercise) => ({
        ...exercise,
        exerciseId: toExerciseId,
        name: toName ?? exercise.name,
        // Muscle groups etc. come from server enrichment; drop the previous
        // exercise's details so its chips don't linger on the swapped card.
        exerciseDetails: undefined,
        // sets are intentionally preserved
      })),
  });

export const useToggleSetCompleted = () =>
  useCurrentWorkoutMutation<{
    exerciseId: string;
    setIndex: number;
    completed: boolean;
  }>({
    request: (workoutId, { exerciseId, setIndex, completed }) =>
      API.workout.updateSetInExercise(
        workoutId,
        exerciseId,
        { completed },
        setIndex,
      ),
    optimisticUpdate: (currentWorkout, { exerciseId, setIndex, completed }) =>
      mapSet(currentWorkout, exerciseId, setIndex, (set) => ({
        ...set,
        completed,
      })),
  });

export const useDeleteSetFromExercise = () =>
  useCurrentWorkoutMutation<{ exerciseId: string; setIndex: number }>({
    request: (workoutId, { exerciseId, setIndex }) =>
      API.workout.deleteSetFromExercise(workoutId, exerciseId, setIndex),
    optimisticUpdate: (currentWorkout, { exerciseId, setIndex }) =>
      mapExercise(currentWorkout, exerciseId, (exercise) => ({
        ...exercise,
        sets: exercise.sets.filter((_, idx) => idx !== setIndex),
      })),
  });

/**
 * Update a single set. The optimistic cache write is applied immediately on
 * every call (instant UI), but the server PATCH is debounced per set — a burst
 * of stepper clicks results in a single request carrying the final value.
 */
export const useUpdateSetInExercise = (debounceMs = 500) => {
  const queryClient = useQueryClient();
  // One debounce timer per set, keyed by `${exerciseId}:${setIndex}`, so edits
  // to different sets don't cancel each other's pending server flush.
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((timer) => clearTimeout(timer));
      map.clear();
    };
  }, []);

  const mutate = useCallback(
    ({
      exerciseId,
      setIndex,
      setData,
    }: {
      exerciseId: string;
      setIndex: number;
      setData: Partial<WorkoutSetInput>;
    }) => {
      // 1) Optimistic cache update — immediate, on every call.
      queryClient.setQueryData<WorkoutSession | null>(
        CURRENT_WORKOUT_KEY,
        (current) =>
          current &&
          mapSet(current, exerciseId, setIndex, (set) => ({
            ...set,
            ...setData,
          })),
      );

      // 2) Debounced server flush — reads the latest value from the cache at
      //    fire time, so intermediate clicks are coalesced into one request.
      const key = `${exerciseId}:${setIndex}`;
      const existing = timers.current.get(key);
      if (existing) clearTimeout(existing);

      timers.current.set(
        key,
        setTimeout(() => {
          timers.current.delete(key);

          const workout = queryClient.getQueryData<WorkoutSession | null>(
            CURRENT_WORKOUT_KEY,
          );
          const set = workout?.exercises.find(
            (exercise) => exercise.exerciseId === exerciseId,
          )?.sets[setIndex];
          if (!workout?._id || !set) return;

          API.workout
            .updateSetInExercise(
              workout._id,
              exerciseId,
              { reps: set.reps, weight: set.weight, completed: set.completed },
              setIndex,
            )
            .catch(() => {
              // Re-sync to server truth if the write fails.
              queryClient.invalidateQueries({ queryKey: CURRENT_WORKOUT_KEY });
            });
        }, debounceMs),
      );
    },
    [queryClient, debounceMs],
  );

  return { mutate };
};
