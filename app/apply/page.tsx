// app/apply/page.tsx
import { ApplyHero } from "@/components/apply/ApplyHero";
import { ApplicationForm } from "@/components/apply/ApplicationForm";

export default function ApplyPage() {
  return (
    <>
      <div className='min-h-screen'>
        <ApplyHero />
        <ApplicationForm />
      </div>
    </>
  );
}
