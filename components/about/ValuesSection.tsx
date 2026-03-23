// components/about/ValuesSection.tsx
"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Users, Lightbulb } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const ICON_CYCLE = [Users, Shield, Lightbulb, Heart];

const DEFAULTS = [
  {
    title: "Inclusivity",
    description:
      "Welcoming all, especially the marginalized, regardless of background, ability, or circumstance.",
  },
  {
    title: "Transparency",
    description:
      "Accountable to donors, partners, and beneficiaries with clear reporting and open communication.",
  },
  {
    title: "Innovation",
    description:
      "Creative approaches to talent discovery and empowerment, adapting to community needs.",
  },
  {
    title: "Sustainability",
    description:
      "Programs designed for long-term impact, creating self-reliant individuals and communities.",
  },
];

function ValuesSkeleton() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='text-center mb-12 lg:mb-16 flex flex-col items-center gap-4'>
          <div className='h-12 w-48 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
          <div className='h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 space-y-3'>
              <div className='h-16 w-16 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse mx-auto' />
              <div className='h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto' />
              <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValuesSection() {
  const doc = useQuery(api.siteContent.getSection, { section: "values" });

  if (doc === undefined) return <ValuesSkeleton />;

  let values = DEFAULTS;
  if (doc?.body) {
    try {
      const parsed = JSON.parse(doc.body);
      if (Array.isArray(parsed) && parsed.length > 0) values = parsed;
    } catch { /* use defaults */ }
  }

  return (
    <section id='values' className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Our <span className='text-primary'>Values</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            The principles that guide every decision and action we take
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {values.map((value, index) => {
            const Icon = ICON_CYCLE[index % ICON_CYCLE.length];
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className='text-center group'>
                <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group-hover:border-primary/20'>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-primary to-primary/70'>
                    <Icon className='h-8 w-8 text-white' />
                  </motion.div>
                  <h3 className='text-xl font-black mb-3 group-hover:text-primary transition-colors'>
                    {value.title}
                  </h3>
                  <p className='text-muted-foreground leading-relaxed text-sm'>
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
