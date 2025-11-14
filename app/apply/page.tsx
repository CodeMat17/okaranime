import dynamic from "next/dynamic";
const ApplyForm = dynamic(() => import("@/components/ApplyForm"), {
  ssr: false,
});

export default function ApplyPage() {
  return (
    <div className='container mx-auto px-6 py-12'>
      <h1 className='text-3xl font-bold'>Beneficiary Application</h1>
      <p className='mt-2 text-slate-600'>
        Apply to participate in OKARANIME programs.
      </p>
      <div className='mt-8'>
        <ApplyForm />
      </div>
    </div>
  );
}
