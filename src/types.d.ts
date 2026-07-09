export {};

export const workoutCategories = [
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

declare global {
  type WorkoutCategory = (typeof workoutCategories)[number];

  interface WorkoutSetInput {
    reps: number;
    weight: number;
    completed?: boolean;
  }

  interface WorkoutExercise {
    name: string;
    sets: WorkoutSetInput[];
    exerciseDetails: Exercise;
  }

  interface SetPayload {
    name: string;
    setData: WorkoutSetInput;
  }

  type BaseWorkout = WorkoutExercise[];

  interface WorkoutSession {
    _id: string;
    name: string;
    userId: string;
    exercises: WorkoutExercise[];
    started: Date | null;
    ended: Date | null;
    createdAt: string;
    updatedAt: string;
    notes: string;
    location?: string;
    baseRoutine?: string;
  }

  interface Exercise {
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
  interface ApiResponse<T = unknown> {
    data?: T;
    error?: string;
  }
}
