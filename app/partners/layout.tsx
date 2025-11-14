// app/partners/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerships | OKARANIME HERITAGE FOUNDATION - Join Our Mission",
  description:
    "Partner with OKARANIME HERITAGE FOUNDATION to amplify your impact. Corporate partnerships, NGO collaborations, and individual support opportunities for community empowerment.",
  keywords: [
    "NGO partnerships",
    "corporate social responsibility",
    "CSR Nigeria",
    "collaborate with NGO",
    "partnership opportunities",
    "community development partners",
    "sponsor empowerment programs",
    "NGO collaboration",
  ],
  openGraph: {
    title: "Partnerships | OKARANIME HERITAGE FOUNDATION",
    description:
      "Join us in empowering communities through strategic partnerships and collaborations in Nigeria.",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/og-partners.jpg",
        width: 1200,
        height: 630,
        alt: "OKARANIME Partnership Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partnerships | OKARANIME HERITAGE FOUNDATION",
    description:
      "Join our mission to empower communities through strategic partnerships.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://okaranime.com.ng/partners",
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
