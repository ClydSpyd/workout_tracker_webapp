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
      className={`min-h-screen flex flex-col irems-center justify-center ${className ?? ''}`}
    >
      <main className="flex-1 flex-col container mx-auto w-[350px] max-h-[750px] overflow-y-auto border bg-[var(--dark-two)]">
        {header && <header>{header}</header>}
        <div className="flex-grow p-4 flex flex-col gap-3 app-bg w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
