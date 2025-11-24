import { Footer } from "@/components/footer";
import { Header } from "@/components/Header";
import { OrganizationStructuredData } from "@/components/structured-data/OrganizationStructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OKARANIME HERITAGE FOUNDATION - Empowering the Next Generation",
  description:
    "Discovering Talents, Building Skills, and Creating Sustainable Futures for Youth and Handicapped Women Among the Less Privileged.",
  keywords:
    "NGO, empowerment, youth, women, talent discovery, sustainability, skill building",
  authors: [{ name: "OKARANIME HERITAGE FOUNDATION" }],
  creator: "OKARANIME HERITAGE FOUNDATION",
  publisher: "OKARANIME HERITAGE FOUNDATION",
  metadataBase: new URL("https://okaranime.com.ng"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://okaranime.com.ng",
    title: "OKARANIME HERITAGE FOUNDATION",
    description: "Empowering the Next Generation Through Sustainable Programs",
    siteName: "OKARANIME HERITAGE FOUNDATION",
  },
  twitter: {
    card: "summary_large_image",
    title: "OKARANIME HERITAGE FOUNDATION",
    description: "Empowering the Next Generation Through Sustainable Programs",
    creator: "@okaranime",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://okaranime.com.ng",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <OrganizationStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <Header />
          <main className='min-h-screen'>{children}</main>
          <Footer />
          <Toaster position='top-right' expand={true} richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
