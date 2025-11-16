// components/about/ValuesSection.tsx
"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Users, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "Welcoming all, especially the marginalized, regardless of background, ability, or circumstance.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Transparency",
    description:
      "Accountable to donors, partners, and beneficiaries with clear reporting and open communication.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Creative approaches to talent discovery and empowerment, adapting to community needs.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Sustainability",
    description:
      "Programs designed for long-term impact, creating self-reliant individuals and communities.",
    color: "from-pink-500 to-rose-500",
  },
];

export function ValuesSection() {
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
          {values.map((value, index) => (
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
                  <value.icon className='h-8 w-8 text-white' />
                </motion.div>

                <h3 className='text-xl font-black mb-3 group-hover:text-primary transition-colors'>
                  {value.title}
                </h3>

                <p className='text-muted-foreground leading-relaxed text-sm'>
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
