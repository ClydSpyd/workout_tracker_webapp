import Layout from '../../components/utility/Layout';
import WorkoutExerciseBlock from './WorkoutExerciseBlock';
import { useState } from 'react';
import WorkoutDetailsBlock from './WorkoutDetailsBlock';
import WorkoutNotes from './WorkoutNotes';
import ViewHeader from '../../components/ui/ViewHeader';
import { useWorkoutStore } from '../../stores/workout-store';
import { useParams } from 'react-router-dom';

export default function WorkoutView() {
  const { currentWorkout } = useWorkoutStore();
  const [activeIdx, setActiveIndex] = useState<number>(0);

  const inactive = currentWorkout._id === 'DEFAULT_WORKOUT';

  const { id } = useParams();

  console.log('WorkoutView ID:', id);

  return (
    <Layout header={<ViewHeader />}>
      {inactive ? (
        <div className="w-full h-[200px] rounded-md border-2 border-dashed border-[var(--contrast-one)] flex items-center justify-center">
          <p className="text-white/50 text-sm">No active workout session</p>
        </div>
      ) : (
        <>
          <WorkoutDetailsBlock />
          {currentWorkout.exercises.map(
            (entry: WorkoutExercise, index: number) => (
              <WorkoutExerciseBlock
                key={index}
                roundNumber={index + 1}
                isActive={activeIdx === index}
                setActive={() => setActiveIndex(index)}
                entry={entry}
              />
            ),
          )}
          <WorkoutNotes />
          <div className="h-[40px] w-full rounded-md border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white flex gap-2 items-center justify-center cursor-pointer">
            <h1 className="text-xl relative bottom-[1px]">+</h1>
            <p>add exercise</p>
          </div>
        </>
      )}
    </Layout>
  );
}
