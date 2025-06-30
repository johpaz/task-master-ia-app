import { HeroSection } from '../../components/landing/HeroSection';
import { FeaturesSection } from '../../components/landing/FeaturesSection';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};