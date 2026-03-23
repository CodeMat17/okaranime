// components/about/MissionVision.tsx
"use client";

import { motion } from "framer-motion";
import { Target, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DEFAULTS = {
  purpose: {
    title: "Our Purpose",
    subtitle: "Driving meaningful change through clear vision and dedicated action",
  },
  mission: {
    text: "To empower youth (both girls and boys) through sustainable programs, uplift handicapped women via skill acquisition and business building, and discover talents among the less privileged to create lasting community impact.",
    bullets: [
      "Youth empowerment through vocational training",
      "Women's economic independence",
      "Talent discovery and development",
      "Sustainable community impact",
    ],
  },
  vision: {
    text: "A world where every less privileged individual, regardless of gender, ability, or background, has access to opportunities that foster self-sufficiency, innovation, and cultural pride.",
    bullets: [
      "Universal access to opportunities",
      "Self-sufficiency for all",
      "Innovation and creativity",
      "Cultural pride and heritage",
    ],
  },
};

function MissionVisionSkeleton() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='text-center mb-12 lg:mb-16 flex flex-col items-center gap-4'>
          <div className='h-12 w-64 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
          <div className='h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
        </div>
        <div className='grid md:grid-cols-2 gap-8 lg:gap-12'>
          {[0, 1].map((i) => (
            <div key={i} className='bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg space-y-4'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse' />
                <div className='h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              </div>
              <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='h-5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='space-y-2 pt-2'>
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MissionVision() {
  const purposeDoc = useQuery(api.siteContent.getSection, { section: "our_purpose" });
  const missionDoc = useQuery(api.siteContent.getSection, { section: "mission" });
  const visionDoc = useQuery(api.siteContent.getSection, { section: "vision" });

  if (purposeDoc === undefined || missionDoc === undefined || visionDoc === undefined) return <MissionVisionSkeleton />;

  const purposeTitle = purposeDoc?.title ?? DEFAULTS.purpose.title;
  const purposeSubtitle = purposeDoc?.subtitle ?? DEFAULTS.purpose.subtitle;

  let mission = DEFAULTS.mission;
  if (missionDoc?.body) {
    try {
      const parsed = JSON.parse(missionDoc.body);
      mission = { text: parsed.text ?? DEFAULTS.mission.text, bullets: parsed.bullets ?? DEFAULTS.mission.bullets };
    } catch { /* use defaults */ }
  }

  let vision = DEFAULTS.vision;
  if (visionDoc?.body) {
    try {
      const parsed = JSON.parse(visionDoc.body);
      vision = { text: parsed.text ?? DEFAULTS.vision.text, bullets: parsed.bullets ?? DEFAULTS.vision.bullets };
    } catch { /* use defaults */ }
  }

  return (
    <section id="mission" className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            {purposeTitle.includes(" ") ? (
              <>
                {purposeTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className='text-primary'>{purposeTitle.split(" ").at(-1)}</span>
              </>
            ) : (
              <span className='text-primary'>{purposeTitle}</span>
            )}
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>{purposeSubtitle}</p>
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
            <p className='text-lg text-muted-foreground leading-relaxed mb-6'>{mission.text}</p>
            <div className='space-y-3'>
              {mission.bullets.map((item, index) => (
                <div key={index} className='flex items-center gap-3 text-sm'>
                  <div className='h-2 w-2 rounded-full bg-primary shrink-0' />
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
            <p className='text-lg text-muted-foreground leading-relaxed mb-6'>{vision.text}</p>
            <div className='space-y-3'>
              {vision.bullets.map((item, index) => (
                <div key={index} className='flex items-center gap-3 text-sm'>
                  <div className='h-2 w-2 rounded-full bg-primary shrink-0' />
                  <span className='text-muted-foreground'>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

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
