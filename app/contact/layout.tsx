// app/contact/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | OKARANIME HERITAGE FOUNDATION",
  description:
    "Get in touch with OKARANIME HERITAGE FOUNDATION. Contact us for partnerships, volunteering, donations, or general inquiries. We're here to help empower communities.",
  keywords: [
    "contact NGO",
    "partnership opportunities",
    "volunteer Nigeria",
    "donation inquiry",
    "youth empowerment contact",
    "women empowerment Nigeria",
    "OKARANIME contact",
  ],
  openGraph: {
    title: "Contact Us | OKARANIME HERITAGE FOUNDATION",
    description:
      "Get in touch with OKARANIME HERITAGE FOUNDATION for partnerships, volunteering, and empowerment programs.",
    type: "website",
    locale: "en_NG",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
