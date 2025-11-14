// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/", "/tmp/", "/test/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/"],
        crawlDelay: 1,
      },
    ],
    sitemap: "https://okaranime.com.ng/sitemap.xml",
    host: "okaranime.com.ng",
  };
}
