import { HeroSection } from "@/components/HeroSection";
import { ProgramsSection } from "@/components/ProgramsSection";
// import { ImpactStories } from "@/components/ImpactStories";

export default function Home() {
  return (
    <div className='min-h-screen'>
    
        <HeroSection />
        <ProgramsSection />
        {/* <ImpactStories /> */}
        {/* Additional sections can be added here */}
   
    </div>
  );
}
