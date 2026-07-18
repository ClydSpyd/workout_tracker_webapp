import { FiSearch } from 'react-icons/fi';
import {
  primaryMuscleGroups,
  type PrimaryMuscleGroup,
} from '../../config/muscles';

interface ExerciseFiltersBarProps {
  /** Current search text. */
  search: string;
  /** Called when the search text changes. */
  onSearchChange: (value: string) => void;
  /** Currently selected muscle group, or null for "All". */
  muscleGroup: PrimaryMuscleGroup | null;
  /** Called when a muscle group pill is selected (null for "All"). */
  onMuscleGroupChange: (group: PrimaryMuscleGroup | null) => void;
  /** Placeholder for the search input. */
  searchPlaceholder?: string;
}

/**
 * Encapsulated, controlled filter bar for the exercise library: a search input
 * plus muscle-group toggle pills. Holds no state of its own — parents pass the
 * current values and receive changes via callbacks.
 */
export default function ExerciseFiltersBar({
  search,
  onSearchChange,
  muscleGroup,
  onMuscleGroupChange,
  searchPlaceholder = 'Search the full exercise library...',
}: ExerciseFiltersBarProps) {
  return (
    <div className="exercise-filters-bar">
      {/* Search */}
      <div className="relative">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[var(--contrast-two)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-lg border border-[var(--contrast-one)] bg-transparent py-3.5 pl-12 pr-4 text-white placeholder:text-[var(--contrast-two)]"
        />
      </div>

      {/* Muscle group filter */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="space-mono mr-2 text-xs uppercase tracking-wide text-[var(--contrast-three)]">
          Muscle Group
        </span>

        <MuscleGroupPill
          label="All"
          active={muscleGroup === null}
          onClick={() => onMuscleGroupChange(null)}
        />
        {primaryMuscleGroups.map((group) => (
          <MuscleGroupPill
            key={group}
            label={formatLabel(group)}
            active={muscleGroup === group}
            onClick={() => onMuscleGroupChange(group)}
          />
        ))}
      </div>
    </div>
  );
}

function MuscleGroupPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`space-mono rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
        active
          ? 'border border-[var(--accent-primary)] bg-[var(--hint-primary-dark)] text-[var(--accent-primary)]'
          : 'border border-transparent text-[var(--contrast-three)]! hover:text-white/80!'
      }`}
    >
      {label}
    </button>
  );
}

// Turn a kebab-case value ("full-body") into a display label ("Full Body").
function formatLabel(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
