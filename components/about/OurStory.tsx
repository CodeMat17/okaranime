// components/about/OurStory.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Target } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

const DEFAULTS = {
  para1:
    "Founded in 2020, OKARANIME HERITAGE FOUNDATION emerged from a deep commitment to preserving cultural heritage while driving meaningful social change in underserved communities.",
  para2:
    'Our name "OKARANIME" honors our shared heritage of resilience, community, and the belief that every individual, regardless of their circumstances, deserves the opportunity to thrive.',
  founded: "2020",
  location: "Nigeria",
  communities: "50+",
  programs: "12+",
};

const JOURNEY_DEFAULTS = {
  title: "Our Journey",
  subtitle: "From humble beginnings to impacting thousands of lives",
};

function OurStorySkeleton() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          <div className='space-y-6'>
            <div className='space-y-4'>
              <div className='h-12 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
              <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='h-5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='h-5 w-4/5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className='h-16 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
              ))}
            </div>
          </div>
          <div className='aspect-square w-full bg-slate-200 dark:bg-slate-700 rounded-3xl animate-pulse' />
        </div>
      </div>
    </section>
  );
}

export function OurStory() {
  const storyDoc = useQuery(api.siteContent.getSection, { section: "our_story" });
  const journeyDoc = useQuery(api.siteContent.getSection, { section: "our_journey" });

  if (storyDoc === undefined || journeyDoc === undefined) return <OurStorySkeleton />;

  let story = DEFAULTS;
  if (storyDoc?.body) {
    try {
      story = { ...DEFAULTS, ...JSON.parse(storyDoc.body) };
    } catch { /* use defaults */ }
  }

  const journeyTitle = journeyDoc?.title ?? JOURNEY_DEFAULTS.title;
  const journeySubtitle = journeyDoc?.subtitle ?? JOURNEY_DEFAULTS.subtitle;
  const journeyImageUrl = journeyDoc?.imageUrl;

  const facts = [
    { icon: Calendar, label: "Founded", value: story.founded },
    { icon: MapPin, label: "Location", value: story.location },
    { icon: Users, label: "Communities", value: story.communities },
    { icon: Target, label: "Programs", value: story.programs },
  ];

  return (
    <section id="our-story" className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='space-y-6'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl'>
                Our <span className='text-primary'>Story</span>
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>{story.para1}</p>
              <p className='text-lg text-muted-foreground leading-relaxed'>{story.para2}</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
              {facts.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <item.icon className='h-5 w-5' />
                  </div>
                  <div>
                    <div className='font-semibold text-foreground'>{item.value}</div>
                    <div className='text-sm text-muted-foreground'>{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey visual / image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative'>
            <div className='relative rounded-2xl sm:rounded-3xl overflow-hidden bg-linear-to-br from-primary/10 to-secondary/10 aspect-square flex items-center justify-center'>
              {journeyImageUrl ? (
                <Image
                  src={journeyImageUrl}
                  alt={journeyTitle}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              ) : (
                <div className='text-center space-y-4 p-8'>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                    className='mx-auto'>
                    <Target className='h-16 w-16 text-primary mx-auto' />
                  </motion.div>
                  <h3 className='text-xl font-bold text-foreground'>{journeyTitle}</h3>
                  <p className='text-muted-foreground'>{journeySubtitle}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
