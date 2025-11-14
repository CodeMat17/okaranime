// components/contact/ContactHero.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactHero() {
  return (
    <section className='relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          className='absolute top-10 left-4 h-16 w-16 text-primary/20'
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}>
          <Mail className='h-full w-full' />
        </motion.div>

        <motion.div
          className='absolute bottom-20 right-4 h-12 w-12 text-primary/15'
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}>
          <MessageCircle className='h-full w-full' />
        </motion.div>
      </div>

      <div className='w-full max-w-6xl mx-auto relative z-10 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='space-y-6'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
            <MessageCircle className='h-4 w-4' />
            Get In Touch
          </motion.div>

          <motion.h1
            className='text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Let&apos;s Start a{" "}
            <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
              Conversation
            </span>
          </motion.h1>

          <motion.p
            className='text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            We&apos;re here to help and answer any questions you might have.
            Whether you want to partner with us, volunteer, or learn more about
            our programs, we&apos;d love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
            <Button size='lg' className='gap-3' asChild>
              <a href='#contact-form'>
                Send a Message
                <ArrowRight className='h-5 w-5' />
              </a>
            </Button>
            <Button size='lg' variant='outline' className='gap-3' asChild>
              <a href='mailto:info@okaranime.org'>
                <Mail className='h-5 w-5' />
                Email Us
              </a>
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className='grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto'>
            {[
              { number: "24h", label: "Response Time" },
              { number: "95%", label: "Satisfaction" },
              { number: "100+", label: "Monthly Inquiries" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className='text-center p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm'>
                <div className='text-lg font-black text-primary'>
                  {stat.number}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
