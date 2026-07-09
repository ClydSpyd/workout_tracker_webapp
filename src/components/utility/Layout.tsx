import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, header, className }) => {
  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center ${className ?? ''}`}
    >
      <main className="flex flex-1 flex-col container mx-auto overflow-y-auto border bg-[var(--dark-two)]">
        {header && <header>{header}</header>}
        <div className="h-full grow p-4 flex flex-col gap-3 app-bg w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
