import { HeroSection } from '../../components/landing/HeroSection';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import SplashCursor from '../../components/ui/reactbits/SplashCursor';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 relative">
      <SplashCursor />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};