import { useRef, useState } from 'react';
import { FaRegCheckSquare, FaCheck } from 'react-icons/fa';
import RestTimer, {
  type RestTimerHandle,
} from '../../../components/ui/RestTimer';
import { useWorkoutStore } from '../../../stores/workout-store';

export default function WorkoutExerciseBlock({
  entry: { name, sets, exerciseDetails },
  roundNumber,
  isActive,
  setActive,
}: {
  entry: WorkoutExercise;
  roundNumber: number;
  isActive: boolean;
  setActive: () => void;
}) {
  const [localSets, setLocalSets] = useState<WorkoutSetInput[]>(sets);
  const restTimerRef = useRef<RestTimerHandle | null>(null);
  const { toggleSetCompletion, currentWorkout } = useWorkoutStore();

  const handleCheckbox = (idx: number) => {
    toggleSetCompletion(roundNumber - 1, idx);

    const isCompleted =
      currentWorkout.exercises[roundNumber - 1].sets[idx].completed;
    if (isCompleted) {
      restTimerRef.current?.startTimer();
    }
  };

  // const isSetCompleted = (idx: number) => completedSets.includes(idx);
  // const allSetsComplete = completedSets.length === sets.length;

  return (
    <div>
      <div className="w-full h-fit module-wrapper">
        <div className="flex gap-3">
          <div
            onClick={setActive}
            className={`flex items-center justify-center rounded-md h-[45px] w-[45px] ${
              isActive
                ? 'border border-[var(--accent-primary)] bg-[var(--hint-primary-dark)]'
                : 'border-2 border-[var(--contrast-one)]'
            }`}
          >
            <h1 className="text-sm font-bold text-[var(--accent-secondary)]">
              {roundNumber}
            </h1>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[var(--accent-primary)]">
              {name}
            </h2>
            {exerciseDetails && exerciseDetails.muscleGroups && (
              <p className="text-xs text-white">
                {exerciseDetails.muscleGroups.join(', ')}
              </p>
            )}
          </div>
        </div>
        <div className="w-full h-[20px] grid grid-cols-[30px_1fr_1fr_30px] items-center justify-center text-xs mb-0 text-white/70 px-2">
          <div className="h-full flex justify-center items-center">#</div>
          <div className="h-full">
            <div className="w-[100px] flex justify-center">REPS</div>
          </div>
          <div className="h-full">
            <div className="w-[100px] flex justify-center">WEIGHT (kg)</div>
          </div>
          <div className="h-full flex justify-center items-center">
            <FaRegCheckSquare className="text-sm" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {localSets.map((set, index) => (
            <div
              className={`w-full items-center gap-2 grid grid-cols-[30px_1fr_1fr_30px] border p-2 rounded-md ${
                set.completed
                  ? 'bg-[var(--hint-primary-dark)] border-[var(--accent-primary)]'
                  : 'border-transparent'
              }`}
            >
              <div className="w-full h-full flex justify-center items-center">
                <div
                  className={`max-h-[25px] max-w-[25px] min-h-[25px] min-w-[25px] rounded-full flex items-center justify-center font-bold text-[10px] text-[var(--accent-secondary)] ${
                    set.completed
                      ? 'border border-[var(--accent-primary)] bg-[var(--hint-primary-light)]'
                      : 'border-2 border-[var(--contrast-one)]'
                  }`}
                >
                  <h1>{index + 1}</h1>
                </div>
              </div>
              <div className="w-full flex justify-center items-center text-white h-[40px] rounded border-2 border-[var(--contrast-one)] bg-[var(--dark-one)]">
                {set.reps}
              </div>
              <div className="w-full flex justify-center items-center text-white h-[40px] rounded border-2 border-[var(--contrast-one)] bg-[var(--dark-one)]">
                {set.weight}
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className={`flex justify-center items-center max-h-[26px] max-w-[26px] min-h-[26px] min-w-[26px] rounded-lg border-3 ${
                    set.completed
                      ? 'bg-[var(--accent-primary)] border-transparent'
                      : 'border-[var(--contrast-one)]'
                  }`}
                  onClick={() => handleCheckbox(index)}
                >
                  {set.completed && <FaCheck className="text-white text-xs" />}
                </div>
              </div>
            </div>
          ))}
          <div
            className="mt-2 h-[45px] w-full rounded-md border border-[var(--accent-secondary)] bg-[var(--accent-secondary)] text-white flex gap-2 items-center justify-center cursor-pointer"
            onClick={() =>
              setLocalSets([
                ...localSets,
                { ...localSets[localSets.length - 1] },
              ])
            }
          >
            <h1 className="text-xl relative bottom-[1px]">+</h1>
            <p className="text-md">add set</p>
          </div>
        </div>
      </div>
      <div
        className="w-full transition-all ease-in-out duration-500"
        style={{
          maxHeight: isActive ? '500px' : '0px',
          opacity: isActive ? 1 : 0,
          overflow: 'hidden',
        }}
      >
        {isActive && <RestTimer ref={restTimerRef} display={isActive} />}
      </div>
    </div>
  );
}
