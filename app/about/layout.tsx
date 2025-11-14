// app/about/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | OKARANIME HERITAGE FOUNDATION - Empowering Communities",
  description:
    "Learn about OKARANIME HERITAGE FOUNDATION's mission to empower youth, uplift handicapped women, and discover talents among less privileged communities in Nigeria.",
  keywords: [
    "NGO Nigeria",
    "youth empowerment",
    "women empowerment",
    "talent discovery",
    "sustainable development",
    "community programs",
    "OKARANIME foundation",
    "non-profit organization",
  ],
  openGraph: {
    title: "About Us | OKARANIME HERITAGE FOUNDATION",
    description:
      "Discover our mission to empower youth and handicapped women through sustainable programs and talent discovery in Nigeria.",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "OKARANIME HERITAGE FOUNDATION Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | OKARANIME HERITAGE FOUNDATION",
    description:
      "Empowering communities through youth and women empowerment programs.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://okaranime.com.ng/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
