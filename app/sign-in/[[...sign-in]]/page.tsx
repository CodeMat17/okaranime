import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center pb-12 pt-24">
      <SignIn />
    </div>
  );
}
