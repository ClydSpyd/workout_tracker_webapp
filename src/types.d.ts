declare interface WorkoutSetInput {
  reps: number;
  weight: number;
  completed?: boolean; // optional, defaults to false
}

declare interface WorkoutExercise {
  name: string;
  sets: WorkoutSetInput[];
  exerciseDetails: Exercise;
}

declare interface SetPayload {
  name: string;
  setData: WorkoutSetInput;
}

type BaseWorkout = WorkoutExercise[];

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
  location?: string;
  baseRoutine?: string;
}

declare interface WorkoutSetInput {
  reps: number;
  weight: number;
  completed?: boolean; // optional, defaults to false
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
