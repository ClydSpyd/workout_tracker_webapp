import { FaRegCalendar, FaRegClock, FaStop } from 'react-icons/fa';
import { format } from 'date-fns';
import WorkoutTitleBlock from './WorkoutTitleBlock';
import Button from '../../../components/ui/Button';
import { useWorkoutSessionData } from '../../../hooks/useWorkoutSessionData';

export default function WorkoutSummary({
  session,
}: {
  session?: WorkoutSession | null;
}) {
  const { exerciseCount, setCount } = useWorkoutSessionData(session ?? null);
  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-4 h-full min-h-0 mb-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-[10px] h-[10px] rounded-full bg-[var(--accent-primary)] animate-pulse"
            aria-label="Live indicator"
          />
          <p className="anotation">Live session</p>
        </div>
        <WorkoutTitleBlock />
        <div className="hidden lg:flex gap-2">
          <div className="flex items-center px-4 py-2 rounded-md bg-[var(--dark-one)] text-[var(--contrast-three)] border border-[var(--contrast-one)]">
            <FaRegClock className="text-sm relative bottom-[1px] mr-2" />
            <p className="text-xs! font-[700] text-[var(--contrast-three)]!">
              00:00:00
            </p>
          </div>
          <div className="flex items-center px-4 py-2 rounded-md bg-[var(--dark-one)] text-[var(--contrast-three)] border border-[var(--contrast-one)]">
            <FaRegCalendar className="text-sm relative bottom-[1px] mr-2" />
            <p className="text-xs! font-[700] text-[var(--contrast-three)]!">
              {format(new Date(), 'dd MMM yyyy').toUpperCase()}
            </p>
          </div>
          <div className="flex items-center px-4 py-2 rounded-md bg-[var(--dark-one)] text-[var(--contrast-three)] border border-[var(--contrast-one)]">
            <p className="text-xs! font-[700] text-[var(--contrast-three)]!">
              {exerciseCount} exercises
            </p>
            <p className="text-xs! font-[700] text-[var(--contrast-three)]! px-2">
              •
            </p>
            <p className="text-xs! font-[700] text-[var(--contrast-three)]!">
              {setCount} sets
            </p>
          </div>
        </div>
      </div>
      <div className="h-full justify-center hidden lg:flex flex-col items-end w-40">
        <p className="text-[var(--contrast-three)]! text-xs! font-[700] pr-1">
          ELAPSED
        </p>
        <div className="anotation text-7xl! font-bold text-white/80! mb-2">
          00:14
        </div>
        <Button icon={<FaStop />} text="End Workout" size="xl" />
      </div>
    </div>
  );
}
