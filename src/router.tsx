import { createBrowserRouter, redirect } from 'react-router-dom';
import ProtectedLayout from './components/utility/ProtectedLayout';
import AuthLayout from './components/utility/AuthLayout';
import Login from './views/Login';
import Signup from './views/Signup';
import Homescreen from './views/Homescreen';
import WorkoutView from './views/WorkoutView';

/**
 * Route guard as a loader: runs before the protected layout renders, so an
 * unauthenticated user is redirected without ever flashing protected UI.
 */
function requireAuth() {
  const jwt = localStorage.getItem('access_token');
  if (!jwt) {
    throw redirect('/login');
  }
  return null;
}

/**
 * Central route configuration. Protected pages are nested under a pathless
 * layout route that owns the auth guard and the shared chrome (header +
 * sidebar), so individual views no longer wrap themselves in a layout.
 */
export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    loader: requireAuth,
    children: [
      { index: true, element: <Homescreen /> },
      { path: 'workout/:id', element: <WorkoutView /> },
    ],
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
]);
