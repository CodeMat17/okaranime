// app/admin/team/page.tsx
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import TeamClient from "../_components/TeamClient";

export default function TeamPage() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return <TeamClient />;
}
