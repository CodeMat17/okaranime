// components/partners/PartnershipBenefits.tsx
"use client";

import { motion } from "framer-motion";
import {
  Target,
  Users,
  TrendingUp,
  Award,
  Heart,
  BarChart3,
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Strategic Impact",
    description:
      "Align your CSR goals with proven community development programs that deliver measurable results.",
    features: [
      "Proven track record",
      "Measurable outcomes",
      "Sustainable impact",
    ],
  },
  {
    icon: Users,
    title: "Community Engagement",
    description:
      "Build meaningful connections with underserved communities and understand their real needs.",
    features: [
      "Direct community access",
      "Cultural understanding",
      "Local partnerships",
    ],
  },
  {
    icon: TrendingUp,
    title: "Brand Enhancement",
    description:
      "Strengthen your brand reputation through association with impactful social initiatives.",
    features: [
      "Positive PR opportunities",
      "Brand storytelling",
      "Consumer trust",
    ],
  },
  {
    icon: Award,
    title: "Employee Engagement",
    description:
      "Offer meaningful volunteer opportunities that boost employee morale and retention.",
    features: [
      "Team volunteering",
      "Skill-based volunteering",
      "Leadership development",
    ],
  },
  {
    icon: Heart,
    title: "Social Responsibility",
    description:
      "Fulfill your corporate social responsibility objectives with transparent, impactful programs.",
    features: ["CSR reporting", "SDG alignment", "Stakeholder satisfaction"],
  },
  {
    icon: BarChart3,
    title: "Business Insights",
    description:
      "Gain valuable insights into emerging markets and community needs through our programs.",
    features: [
      "Market intelligence",
      "Community feedback",
      "Innovation opportunities",
    ],
  },
];

export function PartnershipBenefits() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Partnership <span className='text-primary'>Benefits</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Discover the mutual benefits of partnering with OKARANIME HERITAGE
            FOUNDATION and how collaboration creates value for all stakeholders.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <div className='bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70'>
                  <benefit.icon className='h-6 w-6 text-white' />
                </motion.div>

                <h3 className='text-xl font-black mb-3 group-hover:text-primary transition-colors'>
                  {benefit.title}
                </h3>

                <p className='text-muted-foreground mb-4 leading-relaxed'>
                  {benefit.description}
                </p>

                <div className='space-y-2'>
                  {benefit.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className='flex items-center gap-2 text-sm'>
                      <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                      <span className='text-muted-foreground'>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mutual Benefit Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <div className='bg-linear-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 max-w-3xl mx-auto'>
            <h3 className='text-2xl font-black mb-4'>Creating Shared Value</h3>
            <p className='text-lg text-muted-foreground'>
              Our partnerships are built on the principle of mutual benefit -
              where corporate objectives align with community needs to create
              sustainable, long-term impact that benefits everyone involved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
