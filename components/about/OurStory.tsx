// components/about/OurStory.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Target } from "lucide-react";

export function OurStory() {
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

              <p className='text-lg text-muted-foreground leading-relaxed'>
                Founded in 2020, OKARANIME HERITAGE FOUNDATION emerged from a
                deep commitment to preserving cultural heritage while driving
                meaningful social change in underserved communities.
              </p>

              <p className='text-lg text-muted-foreground leading-relaxed'>
                Our name &quot;OKARANIME&quot; honors our shared heritage of
                resilience, community, and the belief that every individual,
                regardless of their circumstances, deserves the opportunity to
                thrive.
              </p>
            </div>

            {/* Key Facts */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
              {[
                { icon: Calendar, label: "Founded", value: "2020" },
                { icon: MapPin, label: "Location", value: "Nigeria" },
                { icon: Users, label: "Communities", value: "50+" },
                { icon: Target, label: "Programs", value: "12+" },
              ].map((item, index) => (
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
                    <div className='font-semibold text-foreground'>
                      {item.value}
                    </div>
                    <div className='text-sm text-muted-foreground'>
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='relative'>
            <div className='relative rounded-2xl sm:rounded-3xl overflow-hidden bg-linear-to-br from-primary/10 to-secondary/10 p-8 aspect-square flex items-center justify-center'>
              <div className='text-center space-y-4'>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className='mx-auto'>
                  <Target className='h-16 w-16 text-primary mx-auto' />
                </motion.div>
                <h3 className='text-xl font-bold text-foreground'>
                  Our Journey
                </h3>
                <p className='text-muted-foreground'>
                  From humble beginnings to impacting thousands of lives
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
