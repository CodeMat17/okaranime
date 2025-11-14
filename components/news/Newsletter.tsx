// components/news/Newsletter.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Bell, CheckCircle } from "lucide-react";

export function Newsletter() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-linear-to-br from-primary/10 via-slate-50 to-secondary/10 dark:from-primary/5 dark:via-slate-900 dark:to-secondary/5 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4'>
            <Bell className='h-4 w-4' />
            Stay Updated
          </motion.div>

          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Never Miss an <span className='text-primary'>Update</span>
          </h2>

          <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8'>
            Subscribe to our newsletter and be the first to know about new
            programs, success stories, and opportunities to get involved.
          </p>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-lg max-w-md mx-auto'>
            <div className='space-y-4'>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  type='email'
                  placeholder='Enter your email address'
                  className='pl-10 pr-4 py-6 text-base'
                />
              </div>

              <Button size='lg' className='w-full gap-3'>
                <Bell className='h-5 w-5' />
                Subscribe to Newsletter
              </Button>

              <p className='text-xs text-muted-foreground text-center'>
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto'>
            {[
              "Monthly impact updates",
              "Exclusive success stories",
              "Early event announcements",
            ].map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className='flex items-center gap-2 text-sm text-muted-foreground'>
                <CheckCircle className='h-4 w-4 text-primary shrink-0' />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='mt-8'>
            <p className='text-sm text-muted-foreground mb-4'>
              Or follow us on social media for real-time updates:
            </p>
            <div className='flex justify-center gap-4'>
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
                (platform, index) => (
                  <motion.a
                    key={platform}
                    href='#'
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-primary hover:text-white transition-all duration-300'>
                    <span className='text-xs font-medium'>{platform[0]}</span>
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
