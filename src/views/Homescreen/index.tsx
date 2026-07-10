import { Suspense } from 'react';
import TodayBlock from './components/TodayBlock';
import VolumeAnalysisBlock from './components/VolumeAnalysisBlock';
import MuscleAnalysisBlock from './components/MusclAnalysisBlock';
import RecordsBlock from './components/RecordsBlock';
import { formatDate } from '../../utility/dates';

export default function Homescreen() {
  return (
    <div className="h-full grow p-4 flex flex-col gap-3 w-full max-w-[1280px] mx-auto">
      <div className="flex flex-col gap-0 my-6">
        <p className="anotation">{formatDate(new Date())}</p>
        <h2 className="heading-two">welcome back, baloo</h2>
      </div>
      <Suspense
        fallback={
          <div className="rounded-lg border border-dashed border-white/30 p-4 text-sm text-white/70">
            Loading today's workout...
          </div>
        }
      >
        <TodayBlock />
      </Suspense>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VolumeAnalysisBlock />
        </div>
        <div className="flex flex-col gap-4">
          <MuscleAnalysisBlock />
          <RecordsBlock />
        </div>
      </div>
    </div>
  );
}
