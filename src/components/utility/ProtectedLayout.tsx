import React from 'react';
import { useNavigate } from 'react-router-dom';
import ViewHeader from '../ui/ViewHeader';
import Sidebar from '../ui/Sidebar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('refresh_token');
  //   navigate('/login', { replace: true });
  // };

  return (
    <div className="app-bg w-screen min-h-screen flex flex-col">
      <ViewHeader />
      <main className="container grow min-w-screen flex h-full overflow-hidden">
        <Sidebar />
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
