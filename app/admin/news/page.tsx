import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import NewsContent from "../_components/NewsContent";

const NewsPage = () => {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return <NewsContent />;
};

export default NewsPage;
