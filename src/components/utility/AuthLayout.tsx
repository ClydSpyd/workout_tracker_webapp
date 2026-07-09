import { Outlet } from 'react-router-dom';
import BarsLogo from '../ui/BarsLogo';

/**
 * Shared layout for the auth routes (login + signup). The left section holds
 * the elements common to both routes; the fixed-width right section renders the
 * route-specific content via <Outlet />.
 */
const AuthLayout = () => {
  return (
    <div className="app-bg flex min-h-screen w-screen">
      {/* Left: common across every auth route */}
      <section className="hidden flex-1 flex-col justify-between p-12 md:flex">
        <div className="flex items-center gap-3">
          <BarsLogo
            size={36}
            barColors={['#e8a13c', '#e8823c', '#d9662a']}
            cornerRadius={3}
          />
          <span className="text-2xl font-bold tracking-tight text-white">
            REPLO
          </span>
        </div>

        <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
          Track every rep.
          <br />
          <span className="text-[var(--accent-primary)]">Own every session.</span>
        </h1>

        <p className="text-sm text-[var(--contrast-three)]">
          © {new Date().getFullYear()} REPLO. All rights reserved.
        </p>
      </section>

      {/* Right: fixed-width, route-specific */}
      <section className="flex w-full shrink-0 flex-col justify-center border-l border-[var(--contrast-one)] bg-[var(--dark-two)] p-10 md:w-[440px]">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
