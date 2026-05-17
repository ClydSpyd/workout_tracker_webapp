import { useState } from 'react';
import { FaRegCheckSquare, FaCheck } from 'react-icons/fa';

export default function WorkoutExerciseBlock({
  entry: { name, sets, exerciseDetails },
  roundNumber,
}: {
  entry: WorkoutExercise;
  roundNumber: number;
}) {
  const [completedSets, setCompletedSets] = useState<number[]>([]);

  const handleCheckbox = (idx: number) => {
    if (completedSets.includes(idx)) {
      setCompletedSets(completedSets.filter((setIdx) => setIdx !== idx));
    } else {
      setCompletedSets([...completedSets, idx]);
    }
  };

  const isSetCompleted = (idx: number) => completedSets.includes(idx);
  const allSetsComplete = completedSets.length === sets.length;

  return (
    <div className="w-full h-fit module-wrapper">
      <div className="flex gap-3">
        <div
          className={`flex items-center justify-center rounded-md h-[45px] w-[45px] ${
            allSetsComplete
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
          <div className="w-[100px] flex justify-center">WEIGHT</div>
        </div>
        <div className="h-full flex justify-center items-center">
          <FaRegCheckSquare className="text-sm" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {sets.map((set, index) => (
          <div
            className={`w-full items-center gap-2 grid grid-cols-[30px_1fr_1fr_30px] border p-2 rounded-md ${
              isSetCompleted(index)
                ? 'bg-[var(--hint-primary-dark)] border-[var(--accent-primary)]'
                : 'border-transparent'
            }`}
          >
            <div className="w-full h-full flex justify-center items-center">
              <div
                className={`max-h-[25px] max-w-[25px] min-h-[25px] min-w-[25px] rounded-full flex items-center justify-center font-bold text-[10px] text-[var(--accent-secondary)] ${
                  isSetCompleted(index)
                    ? 'border border-[var(--accent-primary)] bg-[var(--hint-primary-light)]'
                    : 'border-2 border-[var(--contrast-one)]'
                }`}
              >
                <h1>{index + 1}</h1>
              </div>
            </div>
            <div className="w-full h-[40px] rounded border-2 border-[var(--contrast-one)] bg-[var(--dark-one)]"></div>
            <div className="w-full h-[40px] rounded border-2 border-[var(--contrast-one)] bg-[var(--dark-one)]"></div>
            <div className="w-full h-full flex items-center justify-center">
              <div
                className={`flex justify-center items-center max-h-[26px] max-w-[26px] min-h-[26px] min-w-[26px] rounded-lg border-3 ${
                  isSetCompleted(index)
                    ? 'bg-[var(--accent-primary)] border-transparent'
                    : 'border-[var(--contrast-one)]'
                }`}
                onClick={() => handleCheckbox(index)}
              >
                {isSetCompleted(index) && (
                  <FaCheck className="text-white text-xs" />
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="mt-2 h-[45px] w-full rounded-md border border-[var(--accent-secondary)] bg-[var(--accent-secondary)] text-white flex gap-2 items-center justify-center cursor-pointer">
          <h1 className="text-xl relative bottom-[1px]">+</h1>
          <p className="text-md">add set</p>
        </div>
      </div>
    </div>
  );
}
