"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const footerLinks = {
  about: [
    { name: "Our Story", href: "/about" },
    { name: "Mission & Vision", href: "/about#mission" },
    { name: "Team", href: "/about#team" },
    { name: "Annual Reports", href: "/about#reports" },
  ],
  programs: [
    { name: "Youth Empowerment", href: "/programs#youth" },
    { name: "Women's Empowerment", href: "/programs#women" },
    { name: "Talent Discovery", href: "/programs#talent" },
    { name: "How It Works", href: "/how-it-works" },
  ],
  support: [
    { name: "Donate", href: "/donate" },
    { name: "Partner", href: "/partners" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className='bg-muted/50 border-t'>
      <div className='container py-12 px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5'>
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='lg:col-span-2'>
            <Link href='/' className='flex items-center space-x-2 mb-4'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary'>
                <Heart className='h-6 w-6 text-primary-foreground' />
              </div>
              <span className='text-2xl font-bold'>OKARANIME</span>
            </Link>
            <p className='text-muted-foreground mb-6 max-w-md'>
              Empowering the next generation through sustainable programs,
              skill-building for handicapped women, and talent discovery among
              the less privileged.
            </p>
            <div className='flex space-x-4'>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href='#'
                  whileHover={{ scale: 1.1, y: -2 }}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-background border shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors'>
                  <Icon className='h-5 w-5' />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}>
                <h3 className='font-semibold mb-4 capitalize'>{category}</h3>
                <ul className='space-y-2'>
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: categoryIndex * 0.1 + linkIndex * 0.05,
                      }}
                      viewport={{ once: true }}>
                      <Link
                        href={link.href}
                        className='text-muted-foreground hover:text-foreground transition-colors'>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>

    

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className='mt-8 border-t pt-8 text-center'>
          <p className='text-muted-foreground'>
            © 2025 OKARANIME HERITAGE FOUNDATION. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
