import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import BarsLogo from './BarsLogo';

export default function ViewHeader() {
  return (
    <div className="bg-transparent text-white px-4 py-3 shadow flex items-center justify-between">
      <Link
        to="/"
        className="flex gap-0 items-center text-3xl font-extrabold text-[var(--accent-primary)] tracking-tighter"
      >
        <BarsLogo
          size={43}
          barColors={['#E8A33D', '#E8821E', '#D2570D']}
          cornerRadius={5}
        />
        REPLO
        {/* <BarsLogo size={96} barColors={['#4a90e2', '#e0607e', '#e08b3e']} /> */}
      </Link>
      <GiHamburgerMenu className="inline-block mr-2 text-3xl text-[var(--accent-primary)]" />
    </div>
  );
}
