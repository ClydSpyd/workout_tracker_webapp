import { FaRegCalendar, FaRegClock } from 'react-icons/fa';
import { useElapsedTime } from '../../../hooks/useElapsedTime';
import { HiRocketLaunch } from 'react-icons/hi2';
import { useState } from 'react';
import { useWorkoutStore } from '../../../stores/workout-store';

export default function WorkoutDetailsBlock() {
  const { currentWorkout, updateCurrentWorkout } = useWorkoutStore();

  const elapsed = useElapsedTime({
    from: currentWorkout.started,
    until: currentWorkout.ended,
    formatted: true,
  });

  const totalSets = currentWorkout.exercises.reduce(
    (acc, exercise) => acc + exercise.sets.length,
    0,
  );
  const completedSets = currentWorkout.exercises.reduce(
    (acc, exercise) =>
      acc + exercise.sets.filter((set) => set.completed).length,
    0,
  );

  return (
    <div
      className="w-full module-wrapper"
      style={{
        borderTop: '4px solid var(--accent-primary)',
      }}
    >
      <p className="text-white text-xl font-bold mb-1">{currentWorkout.name}</p>
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <FaRegClock className="text-white/50 text-sm" />
          <p className="text-white/50 text-sm mt-0">
            {new Date(
              currentWorkout.started ?? new Date(currentWorkout.createdAt),
            ).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <FaRegCalendar className="text-white/50 text-sm" />
          <p className="text-white/50 text-sm mt-0">
            {new Date(
              currentWorkout.started ?? new Date(currentWorkout.createdAt),
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* <div className="grid grid-cols-2 w-full h-[45px] my-4 gap-2">
        <div className="w-full h-full flex items-center justify-center gap-2 text-white rounded-md bg-[var(--dark-two)] border-2 border-[var(--contrast-one)]">
          <FaPause className="text-sm text-white" />
          Pause
        </div>
        <div className="w-full h-full flex items-center justify-center gap-2 text-white rounded-md bg-[var(--accent-primary)] border-2 border-[var(--accent-primary)]">
          <FaCheck className="text-sm text-white" />
          Finish
        </div>
      </div> */}
      <div className="grid grid-cols-2 gap-2 my-3 mt-4">
        <div className="w-full h-full border-2 border-[var(--contrast-one)] rounded-sm p-1 px-2 flex flex-col items-center justify-center">
          <p className="text-[var(--contrast-two)] uppercase text-[10px] font-bold">
            Total time
          </p>
          <p className="text-white text-lg font-bold font-mono">
            {currentWorkout.started ? elapsed : '--:--:--'}
          </p>
        </div>
        <div className="w-full h-full border-2 border-[var(--contrast-one)] rounded-sm p-1 px-2 flex flex-col items-center justify-center">
          <p className="text-[var(--contrast-two)] uppercase text-[10px] font-bold">
            Sets done
          </p>
          <p className="text-white text-lg font-bold font-mono">
            {completedSets}/{totalSets}
          </p>
        </div>
      </div>
      {currentWorkout.started && !currentWorkout.ended ? (
        <div
          onClick={() => {
            updateCurrentWorkout({ ended: new Date() });
          }}
          className="w-full h-[45px] font-bold flex items-center justify-center gap-2 rounded-md text-[var(--accent-primary)] border-2 border-[var(--accent-primary)]"
        >
          {/* <FaCheck className="text-sm text-[var(--accent-primary)]" /> */}
          Finish Workout
        </div>
      ) : (
        <div
          onClick={() => updateCurrentWorkout({ started: new Date() })}
          className="w-full h-[45px] font-bold flex items-center justify-center gap-2 rounded-md text-white bg-[var(--accent-primary)] border-2 border-[var(--accent-primary)]"
        >
          <HiRocketLaunch className="text-xl text-white" />
          Start Workout
        </div>
      )}
    </div>
  );
}
