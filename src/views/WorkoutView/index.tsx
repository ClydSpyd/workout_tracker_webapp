import WorkoutNotes from './WorkoutNotes';
import { useSearchParams } from 'react-router-dom';
import { useMyCurrentWorkout } from '../../queries/workouts';
import NewWorkoutModal from './components/NewWorkoutModal';

export default function WorkoutView() {
  const [searchParams] = useSearchParams();
  const create = searchParams.get('create');
  const { data, error, isLoading } = useMyCurrentWorkout();

  console.log({
    create: !!create,
    data,
    error,
    isLoading,
  });

  return (
    <>
      {error || isLoading ? (
        <div className="w-full grow rounded-md border-2 border-dashed border-[var(--contrast-one)] flex items-center justify-center">
          {isLoading ? (
            <p className="text-white/50 text-sm">Loading...</p>
          ) : (
            <p className="text-white/50 text-sm">
              {error ? error.message : 'No active workout session'}
            </p>
          )}
        </div>
      ) : create ? (
        <NewWorkoutModal />
      ) : (
        <div className="h-full overflow-hidden w-full grow grid grid-cols-[minmax(0,1fr)_400px] gap-4 p-4">
          <div className="overflow-auto flex flex-col gap-4 h-full min-h-0">
            <div className="h-[40px] w-full rounded-md border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white flex gap-2 items-center justify-center cursor-pointer">
              <h1 className="text-xl relative bottom-[1px]">+</h1>
              <p>add exercise</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-full">
            <WorkoutNotes />
          </div>
        </div>
      )}
    </>
  );
}
