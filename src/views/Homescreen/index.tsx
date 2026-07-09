import { Link } from 'react-router-dom';
import Layout from '../../components/utility/Layout';
import { useMyWorkouts } from '../../queries/workouts';

export default function Homescreen() {
  const { data, error, isError } = useMyWorkouts();

  console.log({ data, error, isError });

  return <></>;
}
