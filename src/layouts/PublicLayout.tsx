import { ReactNode } from 'react';
import { PublicNavbar } from '../components/landing/PublicNavbar';
import { PublicFooter } from '../components/landing/PublicFooter';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col dark bg-slate-950 text-white selection:bg-blue-500/30">
      <PublicNavbar />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};