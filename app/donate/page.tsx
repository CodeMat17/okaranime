// app/donate/page.tsx
import { DonateHero } from "@/components/donate/DonateHero";
import { DonationProcess } from "@/components/donate/DonationProcess";

export default function DonatePage() {
  return (
    <>
      <div className='min-h-screen'>
        <DonateHero />
        <DonationProcess />
      </div>
    </>
  );
}
