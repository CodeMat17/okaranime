// app/news/page.tsx
import { NewsHero } from "@/components/news/NewsHero";
import { FeaturedStories } from "@/components/news/FeaturedStories";
import { NewsGrid } from "@/components/news/NewsGrid";
import { NewsCategories } from "@/components/news/NewsCategories";
import { Newsletter } from "@/components/news/Newsletter";

export default function NewsPage() {
  return (
    <div className='min-h-screen'>
      <NewsHero />
      <FeaturedStories />
      <NewsCategories />
      <NewsGrid />
      <Newsletter />
    </div>
  );
}
