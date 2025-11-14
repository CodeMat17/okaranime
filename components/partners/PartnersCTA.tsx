// components/partners/PartnersCTA.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Download, ArrowRight } from "lucide-react";

export function PartnersCTA() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-linear-to-br from-primary/10 via-slate-50 to-secondary/10 dark:from-primary/5 dark:via-slate-900 dark:to-secondary/5 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='space-y-6'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium'>
            <Mail className='h-4 w-4' />
            Start the Conversation
          </motion.div>

          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl'>
            Ready to <span className='text-primary'>Partner</span> With Us?
          </h2>

          <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
            Let&apos;s discuss how we can work together to create sustainable
            impact in underserved communities through strategic partnership.
          </p>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 max-w-md mx-auto'>
            <div className='text-center p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm'>
              <Mail className='h-6 w-6 text-primary mx-auto mb-2' />
              <div className='text-sm font-semibold text-foreground'>
                Email Us
              </div>
              <div className='text-xs text-muted-foreground'>
                partnerships@okaranime.org
              </div>
            </div>
            <div className='text-center p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm'>
              <Phone className='h-6 w-6 text-primary mx-auto mb-2' />
              <div className='text-sm font-semibold text-foreground'>
                Call Us
              </div>
              <div className='text-xs text-muted-foreground'>+123-456-7890</div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
            <Button size='lg' className='gap-3 px-8' asChild>
              <a href='/contact'>
                Start Partnership Discussion
                <ArrowRight className='h-5 w-5' />
              </a>
            </Button>
            <Button size='lg' variant='outline' className='gap-3 px-8' asChild>
              <a href='/partnership-proposal.pdf' download>
                Download Partnership Kit
                <Download className='h-5 w-5' />
              </a>
            </Button>
          </motion.div>

          {/* Response Time */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='pt-4'>
            <p className='text-sm text-muted-foreground'>
              We typically respond to partnership inquiries within 2 business
              days.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
