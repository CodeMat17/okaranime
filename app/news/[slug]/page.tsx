// app/news/[slug]/page.tsx
import { Metadata } from "next";
import { NewsArticleContent } from "@/components/news/NewsArticleContent";
import { convex } from "@/lib/convex-server";
import { api } from "@/convex/_generated/api";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch article data for metadata
    const article = await convex.query(api.news.getNewsBySlug, {
      slug,
    });

    if (!article) {
      return {
        title: "Article Not Found | OKARANIME HERITAGE FOUNDATION",
        description: "The requested news article could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    // Create description from content (first 160 characters)
    const description =
      article.content
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .substring(0, 160)
        .trim() + (article.content.length > 160 ? "..." : "");

    // Base metadata
    const metadata: Metadata = {
      title: `${article.title} | OKARANIME HERITAGE FOUNDATION`,
      description,
      openGraph: {
        title: article.title,
        description,
        type: "article",
        publishedTime: new Date(article._creationTime).toISOString(),
        authors: ["OKARANIME HERITAGE FOUNDATION"],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
      },
      robots: {
        index: true,
        follow: true,
      },
    };

    // Add images if available
    if (article.imageUrl) {
      const imageMetadata = {
        url: article.imageUrl,
        width: 1200,
        height: 630,
        alt: article.title,
      };

      metadata.openGraph!.images = [imageMetadata];
      metadata.twitter!.images = [article.imageUrl];
    }

    return metadata;
  } catch (error) {
    console.error("Error fetching article for metadata:", error);

    // Fallback metadata
    return {
      title: "News Article | OKARANIME HERITAGE FOUNDATION",
      description: "Read the latest news from OKARANIME HERITAGE FOUNDATION",
      openGraph: {
        title: "News Article | OKARANIME HERITAGE FOUNDATION",
        description: "Read the latest news from OKARANIME HERITAGE FOUNDATION",
        type: "article",
      },
      twitter: {
        card: "summary",
        title: "News Article | OKARANIME HERITAGE FOUNDATION",
        description: "Read the latest news from OKARANIME HERITAGE FOUNDATION",
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  return <NewsArticleContent slug={slug} />;
}
