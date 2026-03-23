// components/about/Achievements.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DEFAULTS = {
  title: "Our Impact",
  subtitle:
    "Over the past 5 years, we've achieved significant milestones in our mission to empower underserved communities through targeted programs and sustainable initiatives.",
  achievements: [
    { number: "1,000+", label: "Beneficiaries Reached" },
    { number: "20+", label: "Partner Organizations" },
    { number: "150+", label: "Women Business Startups" },
    { number: "5", label: "Years of Impact" },
  ],
  visual: { number: "5+", heading: "Years of Service", sub: "Creating lasting change since 2020" },
};

function AchievementsSkeleton() {
  return (
    <section className='py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 w-full overflow-hidden'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center'>
          <div className='w-full space-y-4 sm:space-y-6'>
            <div className='h-12 w-48 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
            <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
            <div className='h-5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
            <div className='grid grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4'>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className='h-20 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
              ))}
            </div>
            <div className='h-12 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse' />
          </div>
          <div className='w-full aspect-video bg-slate-200 dark:bg-slate-700 rounded-3xl animate-pulse' />
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  const doc = useQuery(api.siteContent.getSection, { section: "achievements" });

  if (doc === undefined) return <AchievementsSkeleton />;

  const title = doc?.title ?? DEFAULTS.title;
  const subtitle = doc?.subtitle ?? DEFAULTS.subtitle;

  let achievements = DEFAULTS.achievements;
  let visual = DEFAULTS.visual;
  if (doc?.body) {
    try {
      const parsed = JSON.parse(doc.body);
      if (parsed.achievements && Array.isArray(parsed.achievements)) achievements = parsed.achievements;
      if (parsed.visual) visual = { ...DEFAULTS.visual, ...parsed.visual };
    } catch { /* use defaults */ }
  }

  return (
    <section id="impact" className='py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 w-full overflow-hidden'>
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
              {title.includes(" ") ? (
                <>
                  {title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className='text-primary'>{title.split(" ").at(-1)}</span>
                </>
              ) : (
                <span className='text-primary'>{title}</span>
              )}
            </h2>

            <p className='text-base sm:text-lg text-muted-foreground leading-relaxed text-center lg:text-left'>
              {subtitle}
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
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}>
                  <div className='text-3xl sm:text-4xl lg:text-5xl font-black text-primary'>
                    {visual.number}
                  </div>
                </motion.div>
                <h3 className='text-lg sm:text-xl font-bold text-foreground'>{visual.heading}</h3>
                <p className='text-sm sm:text-base text-muted-foreground'>{visual.sub}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
