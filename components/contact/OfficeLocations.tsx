// components/contact/OfficeLocations.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const location = {
  id: 1,
  name: "OKARANIME HERITAGE FOUNDATION",
  type: "Head Office",
  address: "Plots C/52 and C/53 in Urata West Layout",
  city: "Owerri North L.G.A Imo State, Nigeria",
  phone: "+2349134861443",
  secondaryPhone: "+2348133758227",
  email: "info@okaranime.com.ng",
  hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
  description:
    "Our main administrative office where all program coordination, partnership discussions, and community empowerment activities take place. We welcome visitors, partners, and community members.",
  services: [
    "Administration",
    "Partnerships",
    "Program Management",
    "Volunteer Coordination",
    "Youth Empowerment",
    "Women's Empowerment",
    "Talent Hunt Programs",
    "Community Outreach",
  ],
};

export function OfficeLocations() {
  return (
    <section
      id='locations'
      className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Our <span className='text-primary'>Location</span>
          </h2>
          <p className='text-muted-foreground max-w-3xl mx-auto'>
            Visit us at our headquarters in Owerri North, Imo State. We
            coordinate all our empowerment programs and community initiatives
            from this central location.
          </p>
        </motion.div>

        <div className='flex justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className='group max-w-2xl w-full'>
            <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border-2 border-transparent group-hover:border-primary/20'>
              {/* Location Header */}
              <div className="flex justify-center mb-3">
                <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70 shrink-0 border'>
                  <MapPin className='h-8 w-8 text-white' />
                </div>
              </div>

              <div className='flex items-start gap-6 mb-6'>
                {/* <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70 shrink-0'>
                  <MapPin className='h-8 w-8 text-white' />
                </div> */}
                <div className='flex-1 text-center'>
                  <h3 className='text-2xl font-black text-center group-hover:text-primary transition-colors'>
                    {location.name}
                  </h3>
                  <div className='inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mt-2'>
                    {location.type}
                  </div>
                </div>
              </div>

              {/* Location Description */}
              <p className='text-muted-foreground mb-8 leading-relaxed text-lg text-center'>
                {location.description}
              </p>

              {/* Contact Details */}
              <div className='space-y-4 mb-8'>
                <div className='flex items-start gap-4 text-base'>
                  <MapPin className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <div>
                    <div className='font-semibold'>{location.address}</div>
                    <div className='text-muted-foreground text-lg'>
                      {location.city}
                    </div>
                  </div>
                </div>

                <div className='flex items-start gap-4 text-base'>
                  <Phone className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                  <div className='flex flex-col gap-1'>
                    <a
                      href={`tel:${location.phone.replace(/\s/g, "")}`}
                      className='hover:text-primary transition-colors font-semibold text-lg'>
                      {location.phone}
                    </a>
                    <a
                      href={`tel:${location.secondaryPhone.replace(/\s/g, "")}`}
                      className='hover:text-primary transition-colors text-muted-foreground'>
                      {location.secondaryPhone}
                    </a>
                  </div>
                </div>

                <div className='flex items-center gap-4 text-base'>
                  <Mail className='h-5 w-5 text-primary shrink-0' />
                  <a
                    href={`mailto:${location.email}`}
                    className='hover:text-primary transition-colors text-lg'>
                    {location.email}
                  </a>
                </div>

                <div className='flex items-center gap-4 text-base'>
                  <Clock className='h-5 w-5 text-primary shrink-0' />
                  <span className='text-muted-foreground text-lg'>
                    {location.hours}
                  </span>
                </div>
              </div>

              {/* Services */}
              {/* <div className='mb-8'>
                <h4 className='font-semibold text-lg text-foreground mb-4 flex items-center gap-3'>
                  <Users className='h-5 w-5' />
                  Services & Programs Offered:
                </h4>
                <div className='flex flex-wrap gap-3'>
                  {location.services.map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className='inline-block px-3 py-2 rounded-xl bg-white dark:bg-slate-700 text-sm text-muted-foreground border border-slate-200 dark:border-slate-600 hover:border-primary/30 transition-colors'>
                      {service}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className='flex gap-4 flex-wrap justify-center'>
                <Button size='lg' className='flex-1 min-w-[140px]' asChild>
                  <a href={`tel:${location.phone.replace(/\s/g, "")}`}>
                    Call Us
                  </a>
                </Button>
                <Button
                  size='lg'
                  variant='outline'
                  className='flex-1 min-w-[140px]'
                  asChild>
                  <a href={`mailto:${location.email}`}>Send Email</a>
                </Button>
                <Button
                  size='lg'
                  variant='secondary'
                  className='flex-1 min-w-[140px]'
                  asChild>
                  <a href='#contact-form'>Send Message</a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className='mt-12 text-center'>
          <div className='bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20'>
            <h3 className='text-2xl font-black mb-4'>
              Need Immediate Assistance?
            </h3>
            <p className='text-muted-foreground mb-6 max-w-2xl mx-auto text-lg'>
              Our team is ready to help you with any inquiries about our
              programs, partnerships, volunteering opportunities, or how you can
              support our mission to empower communities.
            </p>
            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
              <div className='flex items-center gap-3'>
                <Phone className='h-6 w-6 text-primary' />
                <span className='font-semibold'>Main Line:</span>
                <a
                  href='tel:+2349134861443'
                  className='hover:text-primary transition-colors font-semibold'>
                  +234 913 486 1443
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <Mail className='h-6 w-6 text-primary' />
                <span className='font-semibold text-lg'>Email:</span>
                <a
                  href='mailto:info@okaranime.com.ng'
                  className='hover:text-primary transition-colors text-lg font-semibold'>
                  info@okaranime.com.ng
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
