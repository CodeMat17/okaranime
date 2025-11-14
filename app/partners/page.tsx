// app/partners/page.tsx
import { PartnersHero } from "@/components/partners/PartnersHero";
import { CurrentPartners } from "@/components/partners/CurrentPartners";
import { PartnershipBenefits } from "@/components/partners/PartnershipBenefits";
import { PartnershipTypes } from "@/components/partners/PartnershipTypes";
import { PartnershipProcess } from "@/components/partners/PartnershipProcess";
import { PartnersCTA } from "@/components/partners/PartnersCTA";

export default function PartnersPage() {
  return (
    <div className='min-h-screen'>
      <PartnersHero />
      <CurrentPartners />
      <PartnershipBenefits />
      <PartnershipTypes />
      <PartnershipProcess />
      <PartnersCTA />
    </div>
  );
}
