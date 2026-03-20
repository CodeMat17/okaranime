import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import BackupClient from "./BackupClient";

const BackupPage = () => {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return <BackupClient />;
};

export default BackupPage;
