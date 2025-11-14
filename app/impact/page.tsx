// app/impact/page.tsx
import { ImpactHero } from "@/components/impact/ImpactHero";
import { ImpactStats } from "@/components/impact/ImpactStats";
import { SuccessStories } from "@/components/impact/SuccessStories";
import { ProgramImpact } from "@/components/impact/ProgramImpact";
import { CommunityImpact } from "@/components/impact/CommunityImpact";
import { ImpactCTA } from "@/components/impact/ImpactCTA";

export default function ImpactPage() {
  return (
    <div className='min-h-screen'>
      <ImpactHero />
      <ImpactStats />
      <SuccessStories />
      <ProgramImpact />
      <CommunityImpact />
      <ImpactCTA />
    </div>
  );
}
