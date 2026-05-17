import Layout from '../../components/utility/Layout';
import ViewHeader from '../../components/ui/ViewHeader';
import TimerModule from '../../components/ui/TimerModule';
import WorkoutExerciseBlock from './WorkoutExerciseBlock';
import { useState } from 'react';
import { dummyWorkoutData } from '../../assets/dummy_data/workout';
import WorkoutDetailsBlock from './WorkoutDetailsBlock';

export default function WorkoutView() {
  const [entries, setEntries] = useState<WorkoutExercise[]>(
    dummyWorkoutData.exercises,
  );
  return (
    <Layout>
      <WorkoutDetailsBlock workout={dummyWorkoutData} />
      {/* <TimerModule /> */}
      {entries.map((entry: WorkoutExercise, index: number) => (
        <WorkoutExerciseBlock
          key={index}
          roundNumber={index + 1}
          entry={entry}
        />
      ))}
      <div className="h-[40px] w-full rounded-md border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-white flex gap-2 items-center justify-center cursor-pointer">
        <h1 className="text-xl relative bottom-[1px]">+</h1>
        <p>add exercise</p>
      </div>
    </Layout>
  );
}
