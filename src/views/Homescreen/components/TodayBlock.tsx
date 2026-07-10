import { use } from 'react';
import { API } from '../../../api';
import Button from '../../../components/ui/Button';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { useWorkoutSessionData } from '../../../hooks/useWorkoutSessionData';

let activeWorkoutPromise: Promise<WorkoutSession | null> | null = null;

const getActiveWorkoutPromise = () => {
  if (!activeWorkoutPromise) {
    activeWorkoutPromise = API.workout.getMyActiveWorkout();
  }

  return activeWorkoutPromise;
};

export default function TodayBlock() {
  const activeWorkout = use(getActiveWorkoutPromise());
  const { setCount, exerciseCount, estimatedDurationSec } =
    useWorkoutSessionData(activeWorkout);

  return (
    <section
      className={`flex flex-col md:flex-row gap-4  items-center justify-between text-white  module-wrapper ${activeWorkout ? 'border-[var(--accent-primary)]! bg-grad' : ''}`}
    >
      <div className="flex flex-col gap-2 opacity-80">
        <div className="text-xs flex gap-2 items-center">
          <p className="text-[var(--accent-primary)] space-mono">UP NEXT</p>
          <p className="text-[var(--accent-primary)]">•</p>
          <p className="text-[var(--accent-primary)] space-mono">TODAY</p>
        </div>
        <h3 className="heading-three text-white uppercase my-2">
          {activeWorkout ? activeWorkout.name : 'REST DAY - NOTHING SCHEDULED'}
        </h3>
        {activeWorkout ? (
          <div className="flex gap-2">
            <p className="body-text text-xs! border border-[var(--contrast-one)] text-[var(--contrast-two)] bg-[var(--dark-two)] rounded-md px-2 py-2">
              {exerciseCount} exercises
            </p>
            <p className="body-text text-xs! border border-[var(--contrast-one)] text-[var(--contrast-two)] bg-[var(--dark-two)] rounded-md px-2 py-2">
              {setCount} sets
            </p>
            <p className="body-text text-xs! border border-[var(--contrast-one)] text-[var(--contrast-two)] bg-[var(--dark-two)] rounded-md px-2 py-2">
              {estimatedDurationSec
                ? `~${Math.ceil(estimatedDurationSec / 60)} min`
                : '-'}
            </p>
          </div>
        ) : (
          <p className="body-text text-sm!">
            No session on the schedule. Feeling good? Kick one off now and log
            it on the fly
          </p>
        )}
      </div>
      <Button
        icon={activeWorkout ? <FaPlay /> : <FaPlus />}
        text={activeWorkout ? 'Start Workout' : 'Start a Session'}
        onClick={() => console.log('Start a session clicked')}
        size="xl"
        additionalClasses={'w-full md:w-auto mt-4 md:mt-0'}
      />
    </section>
  );
}
