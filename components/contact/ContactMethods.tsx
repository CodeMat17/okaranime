// components/contact/ContactMethods.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours",
    details: "info@okaranime.org",
    action: "Send Email",
    href: "mailto:info@okaranime.org",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team during business hours",
    details: "+234 (0) 123 456 7890",
    action: "Call Now",
    href: "tel:+23401234567890",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Schedule a visit to our headquarters or community centers",
    details: "Lagos, Nigeria",
    action: "Get Directions",
    href: "#locations",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    details: "Mon-Fri, 9AM-5PM",
    action: "Start Chat",
    href: "#chat",
    color: "from-purple-500 to-violet-500",
  },
];

const officeHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export function ContactMethods() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Multiple Ways to <span className='text-primary'>Connect</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Choose the contact method that works best for you. We&apos;re
            available through various channels to ensure we can help you
            effectively.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16'>
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-primary/20'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70'>
                  <method.icon className='h-6 w-6 text-white' />
                </motion.div>

                <h3 className='text-xl font-black mb-3 group-hover:text-primary transition-colors'>
                  {method.title}
                </h3>

                <p className='text-muted-foreground text-sm mb-4 leading-relaxed'>
                  {method.description}
                </p>

                <div className='text-lg font-semibold text-foreground mb-4'>
                  {method.details}
                </div>

                <Button size='sm' className='w-full' asChild>
                  <a href={method.href}>{method.action}</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Office Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl p-8 max-w-2xl mx-auto'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary'>
              <Clock className='h-6 w-6' />
            </div>
            <div>
              <h3 className='text-2xl font-black'>Office Hours</h3>
              <p className='text-muted-foreground'>
                Our team is available during these hours
              </p>
            </div>
          </div>

          <div className='space-y-3'>
            {officeHours.map((schedule, index) => (
              <motion.div
                key={schedule.day}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className='flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50'>
                <span className='font-medium text-foreground'>
                  {schedule.day}
                </span>
                <span className='text-muted-foreground'>{schedule.hours}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='mt-6 p-4 bg-primary/20 rounded-lg'>
            <p className='text-sm text-foreground text-center'>
              <strong>Emergency Contact:</strong> For urgent matters outside
              office hours, call{" "}
              <a
                href='tel:+2340123456789'
                className='text-primary hover:underline'>
                +234 (0) 123 456 789
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
