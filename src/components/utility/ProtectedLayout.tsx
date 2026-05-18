import React from 'react';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Workout Tracker</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg px-4 py-2 text-white bg-red-500 hover:bg-red-700 shadow"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
