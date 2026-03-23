// app/admin/about/page.tsx
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import AboutAdminClient from "./AboutAdminClient";

export default async function AdminAboutPage() {
  if (!(await checkRole("admin"))) redirect("/");
  return <AboutAdminClient />;
}
