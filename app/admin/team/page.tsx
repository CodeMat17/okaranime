// app/admin/team/page.tsx
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import TeamClient from "../_components/TeamClient";

export default async function TeamPage() {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  return <TeamClient />;
}
