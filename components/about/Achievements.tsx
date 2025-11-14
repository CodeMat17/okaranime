// components/about/Achievements.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const achievements = [
  { number: "1,000+", label: "Beneficiaries Reached" },
  { number: "20+", label: "Partner Organizations" },
  { number: "150+", label: "Women Business Startups" },
  { number: "5", label: "Years of Impact" },
];

export function Achievements() {
  return (
    <section className='py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 w-full overflow-hidden'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center '>
        

          {/* Achievements Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className='w-full space-y-4 sm:space-y-6'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-center lg:text-left'>
              Our <span className='text-primary'>Impact</span>
            </h2>

            <p className='text-base sm:text-lg text-muted-foreground leading-relaxed text-center lg:text-left'>
              Over the past 5 years, we&apos;ve achieved significant milestones
              in our mission to empower underserved communities through targeted
              programs and sustainable initiatives.
            </p>

            {/* Achievement Stats */}
            <div className='grid grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4'>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className='text-center p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 w-full'>
                  <div className='text-xl sm:text-2xl lg:text-3xl font-black text-primary mb-1'>
                    {achievement.number}
                  </div>
                  <div className='text-xs sm:text-sm text-muted-foreground font-medium leading-tight'>
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 justify-center lg:justify-start'>
              <Button size='lg' className='gap-3 w-full sm:w-auto' asChild>
                <a href='/impact'>
                  View Full Impact
                  <ArrowRight className='h-4 w-4 sm:h-5 sm:w-5' />
                </a>
              </Button>
            </div>
          </motion.div>

       

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className='w-full relative lg:order-last'>
            <div className='bg-linear-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 aspect-video flex items-center justify-center w-full max-w-md mx-auto lg:max-w-none'>
              <div className='text-center space-y-3 sm:space-y-4 w-full'>
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}>
                  <div className='text-3xl sm:text-4xl lg:text-5xl font-black text-primary'>
                    5+
                  </div>
                </motion.div>
                <h3 className='text-lg sm:text-xl font-bold text-foreground'>
                  Years of Service
                </h3>
                <p className='text-sm sm:text-base text-muted-foreground'>
                  Creating lasting change since 2020
                </p>
              </div>
            </div>
          </motion.div>

        
        </div>
      </div>
    </section>
  );
}
