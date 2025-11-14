// app/programs/page.tsx
import { ProgramsHero } from "@/components/programs/ProgramsHero";
import { ProgramsGrid } from "@/components/programs/ProgramsGrid";
import { ProgramBenefits } from "@/components/programs/ProgramBenefits";
import { HowItWorks } from "@/components/programs/HowItWorks";
import { ProgramCTA } from "@/components/programs/ProgramCTA";

export default function ProgramsPage() {
  return (
    <div className='min-h-screen'>
      <ProgramsHero />
      <ProgramsGrid />
      <ProgramBenefits />
      <HowItWorks />
      <ProgramCTA />
    </div>
  );
}
