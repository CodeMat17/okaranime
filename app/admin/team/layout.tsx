// app/admin/team/layout.tsx
import { Metadata } from "next";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Team Management | OKARANIME Admin",
  description: "Manage team members for OKARANIME HERITAGE FOUNDATION",
};

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  return children;
}
