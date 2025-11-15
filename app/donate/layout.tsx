// app/donate/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | OKARANIME HERITAGE FOUNDATION - Support Our Mission",
  description:
    "Support OKARANIME's empowerment programs. Your donation fuels youth sustainability initiatives, women's skill acquisition, and talent discovery for less privileged communities.",
  keywords: [
    "donate to NGO",
    "support youth empowerment",
    "women empowerment donation",
    "charity Nigeria",
    "non-profit donation",
    "community development support",
    "empowerment programs funding",
  ],
  openGraph: {
    title: "Donate | OKARANIME HERITAGE FOUNDATION",
    description:
      "Support our mission to empower youth and handicapped women through sustainable programs.",
    type: "website",
    locale: "en_NG",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
