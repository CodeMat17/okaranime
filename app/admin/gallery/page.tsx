// app/admin/gallery/page.tsx
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import GalleryAdminClient from "./GalleryAdminClient";

export default async function GalleryAdminPage() {
  if (!(await checkRole("admin"))) redirect("/");
  return <GalleryAdminClient />;
}
