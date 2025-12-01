"use client";

import { Creepster } from "next/font/google";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const creepster = Creepster({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-creepster",
});

const footerLinks = {
  about: [
    { name: "Our Story", href: "/about#our-story" },
    { name: "Mission & Vision", href: "/about#mission" },
    { name: "Values", href: "/about#values" },
    { name: "Team", href: "/about#team" },
    { name: "Impact", href: "/about#impact" },
  ],
  programs: [
    { name: "Our Programs", href: "/programs#programs" },
    { name: "How Our Programs Works", href: "/programs#benefits" },
  ],
  support: [
    { name: "Donate", href: "/donate" },
    // { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ],
  staff: [{ name: "Admin", href: "/admin" }],
};

export function Footer() {
  return (
    <footer className='bg-muted/50 border-t'>
      <div className=' py-12 px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6'>
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='lg:col-span-2'>
            <Link href='/' className='flex items-center space-x-2 mb-4'>
              <Image alt='logo' width={35} height={35} src='/logo.png' />
              <span
                className={`${creepster.className} text-2xl tracking-wide font-bold`}>
                OKARANIME
              </span>
            </Link>
            <p className='text-muted-foreground mb-6 max-w-md'>
              Empowering the next generation through sustainable programs,
              skill-building for handicapped women, and talent discovery among
              the less privileged.
            </p>
            <div className='flex space-x-4'>
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
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
