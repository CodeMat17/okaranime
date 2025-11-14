// components/impact/ImpactHero.tsx
"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImpactHero() {
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
          <Target className='h-full w-full' />
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
          <TrendingUp className='h-full w-full' />
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
            <TrendingUp className='h-4 w-4' />
            Measuring Our Impact
          </motion.div>

          <motion.h1
            className='text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Transforming{" "}
            <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
              Lives & Communities
            </span>
          </motion.h1>

          <motion.p
            className='text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            Discover the tangible results of our empowerment programs through
            real stories, measurable outcomes, and the lasting change we&apos;re
            creating in underserved communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='pt-6'>
            <Button size='lg' className='gap-3' asChild>
              <a href='#stories'>
                Read Success Stories
                <ArrowRight className='h-5 w-5' />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
