// app/contact/page.tsx
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeLocations } from "@/components/contact/OfficeLocations";
import { FAQSection } from "@/components/contact/FAQSection";

export default function ContactPage() {
  return (
    <div className='min-h-screen'>
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <OfficeLocations />
      <FAQSection />
    </div>
  );
}
