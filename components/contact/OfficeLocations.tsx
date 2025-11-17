// components/contact/OfficeLocations.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
  {
    id: 1,
    name: "Headquarters Office",
    type: "Main Office",
    address: "123 Empowerment Street,",
    city: "Lagos, Nigeria",
    phone: "+234 (0) 123 456 7890",
    email: "email@okaranime.org",
    hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
    description:
      "Our main administrative office where all program coordination and partnership discussions take place.",
    services: [
      "Administration",
      "Partnerships",
      "Program Management",
      "Volunteer Coordination",
    ],
  },
  {
    id: 2,
    name: "Community Center - Imo",
    type: "Program Center",
    address: "5 Okaranime Road",
    city: "Imo State, Nigeria",
    phone: "+234 (0) 123 456 7891",
    email: "imo@okaranime.org",
    hours: "Mon-Sat: 8AM-4PM",
    description:
      "Our dedicated center focusing on youth empowerment and agricultural programs.",
    services: [
      "Youth Training",
      "Agriculture Programs",
      "Skill Acquisition",
      "Community Outreach",
    ],
  },
  {
    id: 3,
    name: "Women's Empowerment Center - Enugu",
    type: "Specialized Center",
    address: "45 Heritage Road, Independence Layout",
    city: "Enugu, Nigeria",
    phone: "+234 (0) 123 456 7892",
    email: "enugu@okaranime.org",
    hours: "Sun-Thu: 8AM-4PM",
    description:
      "Our Eastern regional center for women's empowerment programs and handicraft training.",
    services: [
      "Women's Programs",
      "Handicraft Training",
      "Business Incubation",
      "Support Groups",
    ],
  },
];

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
            Our <span className='text-primary'>Locations</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Visit us at any of our offices and community centers across Nigeria.
            Each location serves specific community needs and programs.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border-2 border-transparent group-hover:border-primary/20'>
                {/* Location Header */}
                <div className='flex items-start gap-4 mb-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70 shrink-0'>
                    <MapPin className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-black group-hover:text-primary transition-colors'>
                      {location.name}
                    </h3>
                    <div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mt-1'>
                      {location.type}
                    </div>
                  </div>
                </div>

                {/* Location Description */}
                <p className='text-muted-foreground mb-6 leading-relaxed'>
                  {location.description}
                </p>

                {/* Contact Details */}
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center gap-3 text-sm'>
                    <MapPin className='h-4 w-4 text-primary shrink-0' />
                    <div>
                      <div className='font-medium'>{location.address}</div>
                      <div className='text-muted-foreground'>
                        {location.city}
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-3 text-sm'>
                    <Phone className='h-4 w-4 text-primary shrink-0' />
                    <a
                      href={`tel:${location.phone}`}
                      className='hover:text-primary transition-colors'>
                      {location.phone}
                    </a>
                  </div>

                  <div className='flex items-center gap-3 text-sm'>
                    <Mail className='h-4 w-4 text-primary shrink-0' />
                    <a
                      href={`mailto:${location.email}`}
                      className='hover:text-primary transition-colors'>
                      {location.email}
                    </a>
                  </div>

                  <div className='flex items-center gap-3 text-sm'>
                    <Clock className='h-4 w-4 text-primary shrink-0' />
                    <span className='text-muted-foreground'>
                      {location.hours}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className='mb-6'>
                  <h4 className='font-semibold text-sm text-foreground mb-3 flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    Services Offered:
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {location.services.map((service, serviceIndex) => (
                      <span
                        key={serviceIndex}
                        className='inline-block px-2 py-1 rounded-full bg-white dark:bg-slate-700 text-xs text-muted-foreground'>
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-2'>
                  <Button size='sm' className='1' asChild>
                    <a href={`tel:${location.phone}`}>Call Office</a>
                  </Button>
                  <Button size='sm' variant='outline' asChild>
                    <a href={`mailto:${location.email}`}>Email</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

     
      </div>
    </section>
  );
}
