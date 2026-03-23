import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import NewsContent from "../_components/NewsContent";

const NewsPage = async () => {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  return <NewsContent />;
};

export default NewsPage;
