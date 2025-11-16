// components/programs/ProgramBenefits.tsx
"use client";

import { motion } from "framer-motion";
import { CheckCircle, Target, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Targeted Impact",
    description:
      "Programs specifically designed to address the unique challenges faced by underserved communities.",
    stats: "90% Success Rate",
  },
  {
    icon: Users,
    title: "Community Focused",
    description:
      "All initiatives are developed with direct community input and participation.",
    stats: "50+ Communities Served",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Results",
    description:
      "Focus on creating long-term, self-sustaining solutions rather than temporary relief.",
    stats: "75% Sustainability Rate",
  },
  {
    icon: CheckCircle,
    title: "Measurable Outcomes",
    description:
      "Regular monitoring and evaluation to ensure programs deliver tangible results.",
    stats: "100% Transparent Reporting",
  },
];

const impactStats = [
  { number: "1,000+", label: "Lives Transformed" },
  { number: "85%", label: "Employment Rate" },
  { number: "50+", label: "Businesses Started" },
  { number: "95%", label: "Satisfaction Rate" },
];

export function ProgramBenefits() {
  return (
    <section id='benefits' className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8 overflow-hidden'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Benefits Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl'>
                Why Our <span className='text-primary'>Programs Work</span>
              </h2>

              <p className='text-lg text-muted-foreground leading-relaxed'>
                Our evidence-based approach combines community engagement,
                sustainable practices, and measurable outcomes to create lasting
                positive change.
              </p>
            </div>

            {/* Benefits List */}
            <div className='space-y-6'>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='flex items-start gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0'>
                    <benefit.icon className='h-6 w-6' />
                  </div>
                  <div>
                    <h3 className='text-xl font-black mb-2'>{benefit.title}</h3>
                    <p className='text-muted-foreground mb-2'>
                      {benefit.description}
                    </p>
                    <div className='text-sm font-semibold text-primary'>
                      {benefit.stats}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='grid grid-cols-2 gap-4 lg:gap-6'>
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className='bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='text-2xl sm:text-3xl lg:text-4xl font-black text-primary mb-2'>
                  {stat.number}
                </div>
                <div className='text-sm font-medium text-muted-foreground'>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
