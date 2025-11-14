// app/about/page.tsx
import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { OurStory } from "@/components/about/OurStory";
import { TeamSection } from "@/components/about/TeamSection";
import { ValuesSection } from "@/components/about/ValuesSection";
import { Achievements } from "@/components/about/Achievements";

export default function AboutPage() {
  return (
    <div className='min-h-screen'>
      <AboutHero />
      <OurStory />
      <MissionVision />
      <ValuesSection />
      <TeamSection />
      <Achievements />
    </div>
  );
}
