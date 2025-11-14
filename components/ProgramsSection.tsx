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

const programs = [
  {
    icon: Users,
    title: "Youth Empowerment",
    description:
      "Comprehensive sustainability programs for boys and girls, fostering self-reliance through vocational training, mentorship, and eco-friendly business development.",
    stats: "500+ Youth Trained",
    features: ["Vocational Training", "Mentorship", "Sustainability Workshops"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Women's Empowerment",
    description:
      "Tailored skill acquisition and business building initiatives for handicapped women, providing economic independence and community support networks.",
    stats: "200+ Women Empowered",
    features: ["Skill Acquisition", "Business Coaching", "Support Networks"],
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Star,
    title: "Talent Discovery",
    description:
      "Active scouting and nurturing of hidden talents in underserved communities through camps, scholarships, and community outreach programs.",
    stats: "100+ Talents Discovered",
    features: ["Talent Camps", "Scholarships", "Community Outreach"],
    color: "from-amber-500 to-amber-500",
  },
];

// Fixed variants with proper TypeScript types - using string easing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Simplest solution - define transition separately
const transition = {
  duration: 0.6,
  ease: "easeOut" as const,
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};



export function ProgramsSection() {
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
            Transforming Lives Through{" "}
            <span className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
              Targeted Programs
            </span>
          </h2>

          <p className='text-xl text-muted-foreground leading-relaxed'>
            We design comprehensive empowerment initiatives that create lasting
            change in youth development, women&apos;s economic independence, and
            talent cultivation.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {programs.map((program) => (
            <motion.div
              key={program.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className='h-full'>
              <Card className='h-full border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800'>
                <CardHeader className='text-center pb-4 pt-8 relative'>
                  {/* Animated Background */}
                  <motion.div
                    className='absolute inset-0 bg-linear-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    initial={false}
                  />

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-r from-primary to-primary/70 shadow-lg group-hover:shadow-xl transition-all duration-300'>
                    <program.icon className='h-10 w-10 text-primary-foreground' />
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

                  {/* Features List */}
                  <div className='space-y-3 mb-8'>
                    {program.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: featureIndex * 0.1,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className='flex items-center gap-3 text-sm text-muted-foreground'>
                        <div className='h-2 w-2 rounded-full bg-primary' />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <Button
                      variant='outline'
                      size='lg'
                      className='w-full hover:text-white hover:bg-blue-800 group-hover:bg-primary group-hover:border-primary transition-all duration-300 font-semibold border-2'>
                      Explore Program
                      <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
              <h3 className='text-2xl lg:text-3xl font-black'>
                Ready to Make a Difference?
              </h3>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                Join us in creating sustainable change and empowering
                communities through our comprehensive programs.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='pt-4'>
                <Button
                  size='lg'
                  className='gap-3 text-lg px-12 py-6 font-black'
                  asChild>
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
