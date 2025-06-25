import { ReactNode } from 'react';
import { PublicNavbar } from '../components/landing/PublicNavbar';
import { PublicFooter } from '../components/landing/PublicFooter';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};