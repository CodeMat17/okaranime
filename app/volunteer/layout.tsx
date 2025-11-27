// app/impact/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer Application | OKARANIME HERITAGE FOUNDATION",
  description:
    "Join us as a volunteer and make a difference in your community. Apply now to support our empowerment programs.",
  keywords: [
    "volunteer",
    "volunteering",
    "community service",
    "NGO volunteer",
    "OKARANIME",
  ],
  openGraph: {
    title: "Volunteer Application | OKARANIME HERITAGE FOUNDATION",
    description:
      "Join us as a volunteer and make a difference in your community.",
    type: "website",
  },
};

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
