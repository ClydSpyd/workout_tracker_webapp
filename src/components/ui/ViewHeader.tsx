import { GiWeightLiftingUp, GiHamburgerMenu } from 'react-icons/gi';

export default function ViewHeader() {
  return (
    <div className="bg-[var(--dark-one)] text-white px-4 py-3 shadow flex items-center justify-between">
      <GiWeightLiftingUp className="inline-block mr-2 text-3xl text-[var(--accent-primary)]" />
      <GiHamburgerMenu className="inline-block mr-2 text-3xl text-[var(--accent-primary)]" />
    </div>
  );
}
