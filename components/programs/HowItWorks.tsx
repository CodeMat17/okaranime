// components/programs/HowItWorks.tsx
"use client";

import { motion } from "framer-motion";
import { Search, Users, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Community Assessment",
    description:
      "We conduct thorough needs assessments to identify the specific challenges and opportunities in each community.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    icon: Users,
    title: "Program Design",
    description:
      "Based on assessment findings, we design tailored programs that address community-specific needs and leverage local strengths.",
    color: "from-green-500 to-emerald-500",
  },
  {
    step: "03",
    icon: Target,
    title: "Implementation",
    description:
      "Our expert facilitators deliver programs with hands-on training, resources, and ongoing support for participants.",
    color: "from-amber-500 to-orange-500",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Evaluation & Scaling",
    description:
      "We continuously monitor outcomes, gather feedback, and scale successful programs to reach more communities.",
    color: "from-purple-500 to-violet-500",
  },
];

export function HowItWorks() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            How Our <span className='text-primary'>Programs Work</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            A systematic approach to creating sustainable impact through
            community-driven development
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='relative group'>
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-linear-to-r from-primary/20 to-transparent -z-10'></div>
              )}

              <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-xl transition-all duration-300 h-full'>
                {/* Step Number */}
                <div className='inline-flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-r from-primary to-primary/70 text-white text-sm font-black mb-4'>
                  {step.step}
                </div>

                {/* Step Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-primary/10 to-primary/5'>
                  <step.icon className='h-8 w-8 text-primary' />
                </motion.div>

                {/* Step Content */}
                <h3 className='text-xl font-black mb-3 group-hover:text-primary transition-colors'>
                  {step.title}
                </h3>

                <p className='text-muted-foreground leading-relaxed text-sm'>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <div className='bg-primary/10 rounded-2xl p-6 max-w-2xl mx-auto'>
            <p className='text-lg text-foreground font-medium'>
              Each program is continuously refined based on participant feedback
              and outcome data to ensure maximum impact and sustainability.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
