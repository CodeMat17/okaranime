// app/news/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Blog | OKARANIME HERITAGE FOUNDATION - Latest Updates",
  description:
    "Stay updated with OKARANIME HERITAGE FOUNDATION's latest news, blog posts, events, and insights on youth empowerment, women's programs, and community development in Nigeria.",
  keywords: [
    "NGO news Nigeria",
    "empowerment blog",
    "community development updates",
    "youth programs news",
    "women empowerment articles",
    "NGO events Nigeria",
    "social impact news",
    "OKARANIME updates",
  ],
  openGraph: {
    title: "News & Blog | OKARANIME HERITAGE FOUNDATION",
    description:
      "Latest updates, stories, and insights from our empowerment programs and community initiatives in Nigeria.",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/og-news.jpg",
        width: 1200,
        height: 630,
        alt: "OKARANIME News & Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Blog | OKARANIME HERITAGE FOUNDATION",
    description:
      "Latest updates and stories from our community empowerment programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://okaranime.com.ng/news",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
