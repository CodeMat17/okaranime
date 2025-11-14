// components/impact/ImpactStats.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Heart, Star, Target, TrendingUp, Calendar } from "lucide-react";

const mainStats = [
  {
    icon: Users,
    number: "1,000+",
    label: "Lives Transformed",
    description: "Individuals directly impacted through our programs",
    change: "+25%",
    trend: "up",
  },
  {
    icon: Heart,
    number: "200+",
    label: "Women Empowered",
    description: "Handicapped women achieving economic independence",
    change: "+40%",
    trend: "up",
  },
  {
    icon: Star,
    number: "100+",
    label: "Talents Discovered",
    description: "Hidden talents nurtured and developed",
    change: "+30%",
    trend: "up",
  },
  {
    icon: Target,
    number: "500+",
    label: "Youth Trained",
    description: "Young people equipped with sustainable skills",
    change: "+35%",
    trend: "up",
  },
];

const secondaryStats = [
  {
    number: "85%",
    label: "Employment Rate",
    description: "Of program graduates",
  },
  {
    number: "50+",
    label: "Businesses Started",
    description: "By program participants",
  },
  {
    number: "95%",
    label: "Satisfaction Rate",
    description: "Program participant feedback",
  },
  {
    number: "20+",
    label: "Partner Organizations",
    description: "Collaborating for impact",
  },
];

export function ImpactStats() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Our Impact in <span className='text-primary'>Numbers</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Quantifying the positive change we&apos;ve created through our
            empowerment programs
          </p>
        </motion.div>

        {/* Main Impact Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16'>
          {mainStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center group hover:bg-white dark:hover:bg-slate-700 hover:shadow-xl transition-all duration-300'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70'>
                <stat.icon className='h-6 w-6 text-white' />
              </motion.div>

              <div className='text-2xl sm:text-3xl font-black text-foreground mb-2'>
                {stat.number}
              </div>

              <h3 className='text-lg font-black mb-2 group-hover:text-primary transition-colors'>
                {stat.label}
              </h3>

              <p className='text-muted-foreground text-sm mb-3'>
                {stat.description}
              </p>

              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === "up"
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                }`}>
                <TrendingUp className='h-3 w-3' />
                {stat.change} this year
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {secondaryStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className='text-center'>
                <div className='text-2xl sm:text-3xl font-black text-primary mb-1'>
                  {stat.number}
                </div>
                <div className='text-sm font-semibold text-foreground mb-1'>
                  {stat.label}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Yearly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className='text-center mt-8'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-muted-foreground'>
            <Calendar className='h-4 w-4' />
            Tracking progress since 2020
          </div>
        </motion.div>
      </div>
    </section>
  );
}
