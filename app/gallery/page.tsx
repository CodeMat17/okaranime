// app/gallery/page.tsx
import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Gallery | OKARANIME HERITAGE FOUNDATION",
  description: "Photos from our events and community programs.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
