import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import BackupClient from "./BackupClient";

const BackupPage = async () => {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  return <BackupClient />;
};

export default BackupPage;
