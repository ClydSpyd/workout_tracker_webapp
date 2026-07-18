const workoutCategories = [
  'upper-body',
  'lower-body',
  'full-body',
  'push',
  'pull',
  'legs',
  'strength',
  'hypertrophy',
  'cardio',
  'conditioning',
  'mobility',
  'core',
  'calisthenics',
  'machines',
  'free-weights',
  'bodyweight',
  'sport',
  'recovery',
] as const;

type WorkoutCategory = (typeof workoutCategories)[number];

declare interface WorkoutSetInput {
  reps: number;
  weight: number;
  completed?: boolean;
}

declare interface WorkoutExercise {
  exerciseId?: string; // slug FK into the exercise catalog; always set by the API
  name: string;
  sets: WorkoutSetInput[];
  exerciseDetails?: Exercise; // muscle groups etc.; absent if the id can't be resolved
}

declare interface SetPayload {
  name: string;
  setData: WorkoutSetInput;
}

declare type BaseWorkout = WorkoutExercise[];

declare interface WorkoutSession {
  _id: string;
  name: string;
  userId: string;
  exercises: WorkoutExercise[];
  started: Date | null;
  ended: Date | null;
  createdAt: string;
  updatedAt: string;
  notes: string;
  tags: string[];
  location?: string;
  baseRoutine?: string;
}

declare interface Exercise {
  id: string;
  name: string;
  category: string;
  exerciseType: string;
  equipment: string[];
  primaryMuscleGroups: string[];
  secondaryMuscleGroups: string[];
  muscleGroups: string[];
  movementPattern: string;
  bodyRegion: string;
  mechanics: string;
  unilateral: boolean;
  bilateral: boolean;
  requiresSpotter: boolean;
  trackableMetrics: string[];
  defaultRepRange: {
    strength?: string;
    hypertrophy?: string;
    endurance?: string;
    [key: string]: string | undefined;
  };
  estimatedCaloriesMET: number;
  aliases: string[];
  tags: string[];
}

declare interface ExerciseMinimal {
  id: string;
  name: string;
  equipment: string[];
  muscleGroups: string[];
  bodyRegion: string;
}

declare interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
}
