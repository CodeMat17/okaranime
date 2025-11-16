// components/about/MissionVision.tsx
"use client";

import { motion } from "framer-motion";
import { Target, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MissionVision() {
  return (
    <section id="mission"  className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Our <span className='text-primary'>Purpose</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Driving meaningful change through clear vision and dedicated action
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                <Target className='h-6 w-6' />
              </div>
              <h3 className='text-2xl font-black'>Our Mission</h3>
            </div>

            <p className='text-lg text-muted-foreground leading-relaxed mb-6'>
              To empower youth (both girls and boys) through sustainable
              programs, uplift handicapped women via skill acquisition and
              business building, and discover talents among the less privileged
              to create lasting community impact.
            </p>

            <div className='space-y-3'>
              {[
                "Youth empowerment through vocational training",
                "Women&apos;s economic independence",
                "Talent discovery and development",
                "Sustainable community impact",
              ].map((item, index) => (
                <div key={index} className='flex items-center gap-3 text-sm'>
                  <div className='h-2 w-2 rounded-full bg-primary' />
                  <span className='text-muted-foreground'>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                <Eye className='h-6 w-6' />
              </div>
              <h3 className='text-2xl font-black'>Our Vision</h3>
            </div>

            <p className='text-lg text-muted-foreground leading-relaxed mb-6'>
              A world where every less privileged individual, regardless of
              gender, ability, or background, has access to opportunities that
              foster self-sufficiency, innovation, and cultural pride.
            </p>

            <div className='space-y-3'>
              {[
                "Universal access to opportunities",
                "Self-sufficiency for all",
                "Innovation and creativity",
                "Cultural pride and heritage",
              ].map((item, index) => (
                <div key={index} className='flex items-center gap-3 text-sm'>
                  <div className='h-2 w-2 rounded-full bg-primary' />
                  <span className='text-muted-foreground'>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <Button size='lg' className='gap-3' asChild>
            <a href='/programs'>
              Explore Our Programs
              <ArrowRight className='h-5 w-5' />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
