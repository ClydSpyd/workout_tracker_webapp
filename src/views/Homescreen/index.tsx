import { Link } from 'react-router-dom';
import Layout from '../../components/utility/Layout';
import { useMyWorkouts } from '../../queries/workouts';

export default function Homescreen() {
  const { data, error, isError } = useMyWorkouts();

  console.log({ data, error, isError });

  return (
    <>
      {isError ? (
        <div className="w-full grow rounded-md border-2 border-dashed border-[var(--contrast-one)] flex items-center justify-center">
          <p className="text-white/50 text-sm">
            {error ? error?.message : 'Error loading workouts'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-6 text-[var(--accent-primary)]">
          <h1 className="text-2xl font-bold">Welcome to Workout Tracker</h1>

          {data?.map((i: WorkoutSession) => (
            <Link
              to={`/workout/${i._id}`}
              key={i._id}
              className="p-4 rounded-md border border-[var(--accent-primary)] bg-[var(--dark-one)] hover:bg-[var(--hint-primary-dark)] transition-colors"
            >
              <h2 className="text-lg font-semibold">{i.name}</h2>
              <p className="text-sm text-white/70">
                {i.exercises.length} exercise{i.exercises.length !== 1 && 's'} -{' '}
                {i.createdAt
                  ? new Date(i.createdAt).toLocaleDateString()
                  : 'Unknown date'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
