import ProgressWheel from '../../../components/ui/ProgressWheel';
import { useWorkoutStore } from '../../../stores/workout-store';

export default function WorkoutProgressBlock() {
  const { totalSets, completedSets } = useWorkoutStore();
  return (
    <div className="w-full h-[300px] module-wrapper">
      <ProgressWheel current={completedSets} total={totalSets} />
    </div>
  );
}
