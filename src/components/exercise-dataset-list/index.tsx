import type { Equipment, PrimaryMuscleGroup } from '../../config/muscles';
import { useCallback, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useExerciseDataset } from '../../queries/exercises';

interface Props {
  onSelect(exercise: ExerciseMinimal): void;
  filterInput?: {
    name?: string;
    primaryMuscleGroup?: PrimaryMuscleGroup;
    equipment?: Equipment;
  };
}

export default function ExerciseDatasetList(props: Props) {
  const {
    data: exercises = [],
    isLoading,
    isError,
    error,
  } = useExerciseDataset();

  const [filteredExercises, setFilteredExercises] =
    useState<ExerciseMinimal[]>(exercises);

  const applyFilters = useCallback(
    (filterInput?: Props['filterInput']) => {
      const normalizedName = filterInput?.name?.trim().toLowerCase();
      const normalizedMuscle = filterInput?.primaryMuscleGroup
        ?.trim()
        .toLowerCase();
      const normalizedEquipment = filterInput?.equipment?.trim().toLowerCase();

      const hasActiveFilters =
        Boolean(normalizedName) ||
        Boolean(normalizedMuscle) ||
        Boolean(normalizedEquipment);

      if (!hasActiveFilters) {
        setFilteredExercises(exercises);
        return;
      }

      const nextFilteredExercises = exercises.filter((exercise) => {
        console.log(exercise.bodyRegion);
        const nameMatches =
          !normalizedName ||
          exercise.name.toLowerCase().includes(normalizedName);
        const muscleMatches =
          !normalizedMuscle ||
          (exercise.muscleGroups ?? []).some(
            (muscle) => muscle.toLowerCase() === normalizedMuscle,
          ) ||
          String(exercise.bodyRegion ?? '').toLowerCase() === normalizedMuscle;
        const equipmentMatches =
          !normalizedEquipment ||
          (exercise.equipment ?? []).some(
            (equipment) => equipment.toLowerCase() === normalizedEquipment,
          );

        return nameMatches && muscleMatches && equipmentMatches;
      });

      setFilteredExercises(nextFilteredExercises);
    },
    [exercises],
  );

  const debouncedApplyFilters = useDebounce(applyFilters, 250);

  useEffect(() => {
    debouncedApplyFilters(props.filterInput);
  }, [debouncedApplyFilters, props.filterInput]);

  console.log('Filtered exercises:', filteredExercises);

  return (
    <div className="exercise-dataset-list flex flex-col gap-3">
      {isLoading && (
        <p className="anotation text-[var(--contrast-two)]! text-xs! uppercase tracking-wide py-6 text-center">
          Loading exercises...
        </p>
      )}

      {isError && (
        <p className="anotation text-[var(--accent-primary)]! text-xs! uppercase tracking-wide py-6 text-center">
          Error loading exercises: {error?.message}
        </p>
      )}

      {!isLoading && !isError && filteredExercises.length === 0 && (
        <p className="anotation text-[var(--contrast-two)]! text-xs! uppercase tracking-wide py-6 text-center">
          No exercises match your filters
        </p>
      )}

      {!isLoading &&
        !isError &&
        filteredExercises.length > 0 &&
        filteredExercises?.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-[var(--contrast-one)] bg-[var(--dark-one)] px-6 py-5"
          >
            <div className="min-w-0">
              <h3 className="heading-four truncate text-white">
                {exercise.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {(exercise.equipment ?? []).map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full border border-[var(--contrast-one)] px-3 py-1 text-xs text-[var(--contrast-three)]"
                  >
                    {formatLabel(muscle)}
                  </span>
                ))}
                {(exercise.muscleGroups ?? []).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--accent-primary)] bg-[var(--hint-primary-dark)] px-3 py-1 text-xs text-[var(--accent-primary)]"
                  >
                    {formatLabel(item)}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => props.onSelect(exercise)}
              className="anton shrink-0 rounded-lg border border-[var(--contrast-one)] bg-[var(--dark-two)] px-6 py-3 text-lg font-extrabold uppercase tracking-wide text-white transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
            >
              Add
            </button>
          </div>
        ))}
    </div>
  );
}

// Turn a kebab-case dataset value ("cable-machine") into a display label
// ("Cable Machine").
function formatLabel(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
