// components/structured-data/OrganizationStructuredData.tsx
export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": "https://okaranime.org/#organization",
        name: "OKARANIME HERITAGE FOUNDATION",
        url: "https://okaranime.org",
        logo: "https://okaranime.org/logo.png",
        description:
          "Empowering youth and handicapped women through sustainable programs and talent discovery",
        foundingDate: "2020",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lagos",
          addressCountry: "NG",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+234-123-456-7890",
          email: "info@okaranime.org",
          contactType: "customer service",
        },
        sameAs: [
          "https://facebook.com/okaranime",
          "https://twitter.com/okaranime",
          "https://instagram.com/okaranime",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://okaranime.org/#website",
        url: "https://okaranime.org",
        name: "OKARANIME HERITAGE FOUNDATION",
        publisher: {
          "@id": "https://okaranime.org/#organization",
        },
      },
    ],
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
