import { HeroSection } from '../../components/landing/HeroSection';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import SplashCursor from '../../components/ui/reactbits/SplashCursor';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <SplashCursor />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};