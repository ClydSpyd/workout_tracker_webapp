import WorkoutExerciseBlock from './WorkoutExerciseBlock';
import { useState } from 'react';
import WorkoutDetailsBlock from './WorkoutDetailsBlock';
import WorkoutNotes from './WorkoutNotes';
import { useParams } from 'react-router-dom';
import { useWorkout } from '../../queries/workouts';
import { useWorkoutStore } from '../../stores/workout-store';
import WorkoutProgressBlock from './WorkoutProgressBlock';

export default function WorkoutView() {
  const { currentWorkout, setCurrentWorkout } = useWorkoutStore();
  const [activeIdx, setActiveIndex] = useState<number>(0);

  const { id } = useParams();
  const { data, error, isLoading } = useWorkout(id || '');

  if (data && data._id !== currentWorkout._id) {
    setCurrentWorkout(data);
  }

  console.log('WorkoutView ID:', id);

  return (
    <>
      {!data || error || isLoading ? (
        <div className="w-full grow rounded-md border-2 border-dashed border-[var(--contrast-one)] flex items-center justify-center">
          {isLoading ? (
            <p className="text-white/50 text-sm">Loading...</p>
          ) : (
            <p className="text-white/50 text-sm">
              {error ? error.message : 'No active workout session'}
            </p>
          )}
        </div>
      ) : (
        <div className="h-full overflow-hidden w-full grow grid grid-cols-[minmax(0,1fr)_400px] gap-4 p-4">
          <div className="overflow-auto flex flex-col gap-4 h-full min-h-0">
            <WorkoutDetailsBlock />
            {currentWorkout.exercises.map(
              (entry: WorkoutExercise, index: number) => (
                <WorkoutExerciseBlock
                  key={index}
                  roundNumber={index + 1}
                  isActive={activeIdx === index}
                  setActive={() => setActiveIndex(index)}
                  entry={entry}
                />
              ),
            )}
            <div className="h-[40px] w-full rounded-md border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white flex gap-2 items-center justify-center cursor-pointer">
              <h1 className="text-xl relative bottom-[1px]">+</h1>
              <p>add exercise</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-full overflow-hidden">
            <WorkoutProgressBlock />
            <WorkoutNotes />
          </div>
        </div>
      )}
    </>
  );
}
