// app/programs/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Our Programs | OKARANIME HERITAGE FOUNDATION - Empowerment Initiatives",
  description:
    "Explore OKARANIME's empowerment programs: Youth sustainability initiatives, women's skill acquisition, and talent discovery for less privileged communities in Nigeria.",
  keywords: [
    "youth programs Nigeria",
    "women empowerment programs",
    "skill acquisition",
    "talent hunt",
    "vocational training",
    "sustainability programs",
    "community development",
    "NGO initiatives",
  ],
  openGraph: {
    title: "Our Programs | OKARANIME HERITAGE FOUNDATION",
    description:
      "Discover our youth empowerment, women's skill acquisition, and talent discovery programs transforming communities in Nigeria.",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/og-programs.jpg",
        width: 1200,
        height: 630,
        alt: "OKARANIME Empowerment Programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Programs | OKARANIME HERITAGE FOUNDATION",
    description:
      "Transforming lives through targeted empowerment programs in Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://okaranime.com.ng/programs",
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
