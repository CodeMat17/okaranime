// components/about/AboutHero.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Target, Heart } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DEFAULTS = {
  title: "Building a Better Future",
  subtitle:
    "For over 5 years, OKARANIME HERITAGE FOUNDATION has been at the forefront of empowering underserved communities through sustainable programs, skill development, and talent discovery.",
};

function AboutHeroSkeleton() {
  return (
    <section className='relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950 px-4 sm:px-6 lg:px-8 py-24 lg:py-24'>
      <div className='w-full max-w-6xl mx-auto relative z-10 text-center'>
        <div className='space-y-6 flex flex-col items-center'>
          <div className='h-8 w-44 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse' />
          <div className='h-14 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
          <div className='space-y-2 w-full max-w-3xl'>
            <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
            <div className='h-6 w-5/6 mx-auto bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutHero() {
  const doc = useQuery(api.siteContent.getSection, { section: "about_hero" });

  if (doc === undefined) return <AboutHeroSkeleton />;

  const title = doc?.title ?? DEFAULTS.title;
  const subtitle = doc?.subtitle ?? DEFAULTS.subtitle;

  return (
    <section className='relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950 px-4 sm:px-6 lg:px-8 py-24 lg:py-24'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          className='absolute top-10 left-4 h-16 w-16 text-primary/20'
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
          <Target className='h-full w-full' />
        </motion.div>

        <motion.div
          className='absolute bottom-20 right-4 h-12 w-12 text-primary/15'
          animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <Heart className='h-full w-full' />
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
            <Users className='h-4 w-4' />
            About Our Foundation
          </motion.div>

          <motion.h1
            className='text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            {title.includes(" ") ? (
              <>
                {title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                  {title.split(" ").slice(-2).join(" ")}
                </span>
              </>
            ) : (
              <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                {title}
              </span>
            )}
          </motion.h1>

          <motion.p
            className='text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
