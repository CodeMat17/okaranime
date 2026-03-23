"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Star, ArrowRight, Target } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const ICON_CYCLE = [Users, Heart, Star, Target];

const DEFAULTS = {
  title: "Transforming Lives Through Targeted Programs",
  subtitle:
    "We design comprehensive empowerment initiatives that create lasting change in youth development, women's economic independence, and talent cultivation.",
  programs: [
    {
      title: "Youth Empowerment",
      description:
        "Comprehensive sustainability programs for boys and girls, fostering self-reliance through vocational training, mentorship, and eco-friendly business development.",
      stats: "500+ Youth Trained",
      features: ["Vocational Training", "Mentorship", "Sustainability Workshops"],
    },
    {
      title: "Women's Empowerment",
      description:
        "Tailored skill acquisition and business building initiatives for handicapped women, providing economic independence and community support networks.",
      stats: "200+ Women Empowered",
      features: ["Skill Acquisition", "Business Coaching", "Support Networks"],
    },
    {
      title: "Talent Discovery",
      description:
        "Active scouting and nurturing of hidden talents in underserved communities through camps, scholarships, and community outreach programs.",
      stats: "100+ Talents Discovered",
      features: ["Talent Camps", "Scholarships", "Community Outreach"],
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function ProgramsSkeleton() {
  return (
    <section className='py-20 lg:py-28 bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900'>
      <div className='w-full max-w-6xl mx-auto px-4'>
        <div className='text-center mb-16 lg:mb-20 flex flex-col items-center gap-4'>
          <div className='h-8 w-44 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse' />
          <div className='h-12 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
          <div className='h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {[0, 1, 2].map((i) => (
            <div key={i} className='rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-slate-900 p-8 space-y-4'>
              <div className='h-20 w-20 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse mx-auto' />
              <div className='h-7 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto' />
              <div className='h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto' />
              <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='h-5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              <div className='space-y-2 pt-2'>
                {[0, 1, 2].map((j) => (
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

export function ProgramsSection() {
  const doc = useQuery(api.siteContent.getSection, { section: "programs_preview" });

  if (doc === undefined) return <ProgramsSkeleton />;

  const titleRaw = doc?.title ?? DEFAULTS.title;
  const subtitle = doc?.subtitle ?? DEFAULTS.subtitle;

  let programs = DEFAULTS.programs;
  if (doc?.body) {
    try {
      const parsed = JSON.parse(doc.body);
      if (Array.isArray(parsed) && parsed.length > 0) programs = parsed;
    } catch { /* use defaults */ }
  }

  // Split title: last two words get gradient highlight
  const titleWords = titleRaw.split(" ");
  const titleStart = titleWords.slice(0, -2).join(" ");
  const titleEnd = titleWords.slice(-2).join(" ");

  return (
    <section className='py-20 lg:py-28 bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900'>
      <div className='w-full max-w-6xl mx-auto px-4 '>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className='text-center mb-16 lg:mb-20 max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
            <Target className='h-4 w-4' />
            Our Impact Programs
          </motion.div>

          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            {titleStart ? (
              <>
                {titleStart}{" "}
                <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                  {titleEnd}
                </span>
              </>
            ) : (
              <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
                {titleRaw}
              </span>
            )}
          </h2>

          <p className='text-xl text-muted-foreground leading-relaxed'>{subtitle}</p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {programs.map((program, index) => {
            const Icon = ICON_CYCLE[index % ICON_CYCLE.length];
            return (
              <motion.div
                key={program.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className='h-full'>
                <Card className='h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800'>
                  <CardHeader className='text-center pb-4 pt-8 relative'>
                    <motion.div
                      className='absolute inset-0 bg-linear-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                      initial={false}
                    />
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-r from-primary to-primary/70 shadow-lg group-hover:shadow-xl transition-all duration-300'>
                      <Icon className='h-10 w-10 text-primary-foreground' />
                    </motion.div>
                    <CardTitle className='text-2xl font-black mb-3 group-hover:text-primary transition-colors duration-300'>
                      {program.title}
                    </CardTitle>
                    <CardDescription className='text-lg font-semibold text-primary'>
                      {program.stats}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className='text-center pt-0 pb-8 px-6'>
                    <p className='text-muted-foreground mb-6 leading-relaxed text-lg'>
                      {program.description}
                    </p>
                    <div className='space-y-3'>
                      {program.features.map((feature: string, featureIndex: number) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className='flex items-center gap-3 text-sm text-muted-foreground'>
                          <div className='h-2 w-2 rounded-full bg-primary' />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className='text-center mt-16 lg:mt-20'>
          <div className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto border border-primary/20'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='space-y-6'>
              <h3 className='text-2xl lg:text-3xl font-black'>Ready to Make a Difference?</h3>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Join us in creating sustainable change and empowering communities through our comprehensive programs.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='pt-4'>
                <Button size='lg' className='gap-3 text-lg px-12 py-6 font-black' asChild>
                  <a href='/programs'>
                    View All Programs
                    <ArrowRight className='h-5 w-5' />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
