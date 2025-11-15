// app/apply/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | OKARANIME HERITAGE FOUNDATION - Join Our Programs",
  description:
    "Apply for OKARANIME's empowerment programs. Join our youth sustainability initiatives, women's skill acquisition programs, or talent discovery opportunities.",
  keywords: [
    "apply for NGO programs",
    "youth empowerment application",
    "women skill acquisition",
    "talent discovery application",
    "community programs Nigeria",
    "empowerment programs application",
  ],
  openGraph: {
    title: "Apply | OKARANIME HERITAGE FOUNDATION",
    description:
      "Join our mission to empower communities through youth and women empowerment programs.",
    type: "website",
    locale: "en_NG",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
