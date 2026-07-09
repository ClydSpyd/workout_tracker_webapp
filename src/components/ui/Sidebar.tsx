import { GiWeightLiftingUp } from 'react-icons/gi';
import { HiBolt } from 'react-icons/hi2';
import { IoListSharp } from 'react-icons/io5';
import { LuChartNoAxesCombined } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';

interface NavItemData {
  label: string;
  href: string;
  icon: React.ReactNode;
}
const mainNavItems: NavItemData[] = [
  {
    label: 'Dashboard',
    href: '/',
    icon: <LuChartNoAxesCombined fontSize={20} />,
  },
  {
    label: 'Current Workout',
    href: '/current-workout',
    icon: <HiBolt fontSize={20} />,
  },
  {
    label: 'Workouts',
    href: '/workouts',
    icon: <IoListSharp fontSize={20} />,
  },
];

export default function Sidebar() {
  return (
    <></>
    // <div className=" w-64 bg-[var(--dark-one)] text-white px-4 py-2">
    //   <ul className="flex flex-col gap-2">
    //     {mainNavItems.map((item, index) => (
    //       <li key={index} className="rounded-md flex items-center">
    //         <NavLink
    //           to={item.href}
    //           className={({ isActive }) =>
    //             `rounded-lg py-3 px-2 w-full flex items-center gap-3 ${isActive ? 'text-[var(--accent-primary)] bg-[var(--hint-primary-dark)]' : 'hover:text-[var(--accent-primary)]'}`
    //           }
    //         >
    //           {item.icon}
    //           {item.label}
    //         </NavLink>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
