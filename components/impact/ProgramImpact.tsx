// components/impact/ProgramImpact.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Heart, Star, TrendingUp, Target } from "lucide-react";

const programImpacts = [
  {
    program: "Youth Empowerment",
    icon: Users,
    participants: "500+",
    successRate: "85%",
    duration: "6-12 months",
    outcomes: [
      "Vocational skills acquired",
      "Sustainable businesses started",
      "Employment opportunities created",
      "Community leadership roles",
    ],
    highlight: "75% of graduates start sustainable businesses",
  },
  {
    program: "Women's Empowerment",
    icon: Heart,
    participants: "200+",
    successRate: "90%",
    duration: "4-8 months",
    outcomes: [
      "Economic independence achieved",
      "Business skills developed",
      "Support networks established",
      "Market access provided",
    ],
    highlight: "60% increase in household income",
  },
  {
    program: "Talent Discovery",
    icon: Star,
    participants: "100+",
    successRate: "80%",
    duration: "Ongoing",
    outcomes: [
      "Hidden talents identified",
      "Scholarships awarded",
      "Mentorship provided",
      "Performance opportunities",
    ],
    highlight: "25 talent scholarships awarded",
  },
];

export function ProgramImpact() {
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
            Program <span className='text-primary'>Impact</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Detailed breakdown of how each program creates measurable change in
            participants&apos; lives
          </p>
        </motion.div>

        <div className='space-y-8'>
          {programImpacts.map((program, index) => (
            <motion.div
              key={program.program}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className='bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300'>
              <div className='grid lg:grid-cols-3 gap-6 lg:gap-8'>
                {/* Program Header */}
                <div className='lg:col-span-1'>
                  <div className='flex items-center gap-4 mb-4'>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className='flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70'>
                      <program.icon className='h-6 w-6 text-white' />
                    </motion.div>
                    <div>
                      <h3 className='text-xl font-black'>{program.program}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {program.duration}
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <div className='text-center p-3 rounded-lg bg-white dark:bg-slate-900'>
                      <div className='text-lg font-black text-primary'>
                        {program.participants}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Participants
                      </div>
                    </div>
                    <div className='text-center p-3 rounded-lg bg-white dark:bg-slate-900'>
                      <div className='text-lg font-black text-primary'>
                        {program.successRate}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Success Rate
                      </div>
                    </div>
                  </div>

                  {/* Highlight */}
                  <div className='bg-primary/10 rounded-lg p-3'>
                    <div className='flex items-center gap-2 mb-1'>
                      <Target className='h-4 w-4 text-primary' />
                      <span className='text-sm font-semibold text-primary'>
                        Key Achievement
                      </span>
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {program.highlight}
                    </p>
                  </div>
                </div>

                {/* Outcomes */}
                <div className='lg:col-span-2'>
                  <h4 className='font-black text-lg mb-4'>Program Outcomes</h4>
                  <div className='grid sm:grid-cols-2 gap-3'>
                    {program.outcomes.map((outcome, outcomeIndex) => (
                      <motion.div
                        key={outcome}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: outcomeIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className='flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-slate-900'>
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'>
                          <TrendingUp className='h-3 w-3' />
                        </div>
                        <span className='text-sm text-foreground'>
                          {outcome}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
