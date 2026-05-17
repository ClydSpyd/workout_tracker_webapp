import { FaRegCalendar, FaRegClock, FaPause, FaCheck } from 'react-icons/fa';

export default function WorkoutDetailsBlock({
  workout,
}: {
  workout: WorkoutSession;
}) {
  return (
    <div
      className="w-full module-wrapper"
      style={{
        borderTop: '4px solid var(--accent-primary)',
      }}
    >
      <p className="text-white text-xl font-bold mb-1">{workout.name}</p>
      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <FaRegClock className="text-white/50 text-sm" />
          <p className="text-white/50 text-sm mt-0">
            {new Date(workout.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <FaRegCalendar className="text-white/50 text-sm" />
          <p className="text-white/50 text-sm mt-0">
            {new Date(workout.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full h-[45px] my-4 gap-2">
        <div className="w-full h-full flex items-center justify-center gap-2 text-white rounded-md bg-[var(--dark-two)] border-2 border-[var(--contrast-one)]">
          <FaPause className="text-sm text-white" />
          Pause
        </div>
        <div className="w-full h-full flex items-center justify-center gap-2 text-white rounded-md bg-[var(--accent-primary)] border-2 border-[var(--accent-primary)]">
          <FaCheck className="text-sm text-white" />
          Finish
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 h-[45px]">
        <div className="w-full h-full border-2 border-[var(--dark-one)] rounded-sm p-1 px-2">
          <p className="text-[var(--contrast-two)] uppercase text-[10px] font-bold">
            Total time
          </p>
          <p className="text-white text-lg font-bold font-mono">45:03</p>
        </div>
        <div className="w-full h-full border-2 border-[var(--dark-one)] rounded-sm p-1 px-2">
          <p className="text-[var(--contrast-two)] uppercase text-[10px] font-bold">
            Sets done
          </p>
          <p className="text-white text-lg font-bold font-mono">10/12</p>
        </div>
      </div>
    </div>
  );
}
