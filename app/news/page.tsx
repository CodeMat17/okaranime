// app/news/page.tsx
import { NewsHero } from "@/components/news/NewsHero";
import { NewsGrid } from "@/components/news/NewsGrid";

export default function NewsPage() {
  return (
    <div className='min-h-screen'>
      <NewsHero />
      {/* <FeaturedStories /> */}

      <NewsGrid />
      {/* <NewsCategories /> */}
      {/* <Newsletter /> */}
    </div>
  );
}
