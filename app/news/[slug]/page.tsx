// app/news/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { newsArticles } from "@/data/newsData";
import { NewsArticleContent } from "@/components/news/NewsArticleContent";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((article) => article.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | OKARANIME HERITAGE FOUNDATION",
      description: "The requested news article could not be found.",
    };
  }

  return {
    title: article.metaTitle || article.title,
    openGraph: {
      title: article.metaTitle || article.title,
      type: "article",
      publishedTime: article.date,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      images: [article.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = newsArticles.find((article) => article.slug === slug);

  if (!article) {
    notFound();
  }

  return <NewsArticleContent article={article} />;
}
