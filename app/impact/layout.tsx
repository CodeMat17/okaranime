// app/impact/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Stories | OKARANIME HERITAGE FOUNDATION - Success Stories",
  description:
    "Read inspiring success stories from OKARANIME HERITAGE FOUNDATION's programs. Real stories of transformed lives through youth empowerment and women's skill acquisition.",
  keywords: [
    "success stories NGO",
    "impact stories Nigeria",
    "transformed lives",
    "youth success stories",
    "women empowerment success",
    "talent discovery stories",
    "community impact",
    "NGO achievements",
  ],
  openGraph: {
    title: "Impact Stories | OKARANIME HERITAGE FOUNDATION",
    description:
      "Inspiring stories of transformed lives through our youth and women empowerment programs in Nigeria.",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/og-impact.jpg",
        width: 1200,
        height: 630,
        alt: "OKARANIME Impact Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact Stories | OKARANIME HERITAGE FOUNDATION",
    description:
      "Real stories of lives transformed through empowerment programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://okaranime.com.ng/impact",
  },
};

export default function ImpactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
