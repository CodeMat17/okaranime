// components/partners/PartnershipProcess.tsx
"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Handshake,
  Users,
  Target,
  CheckCircle,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    icon: MessageCircle,
    title: "Initial Discussion",
    description:
      "We begin with a conversation to understand your partnership goals, interests, and expectations.",
    duration: "1-2 weeks",
    outcomes: [
      "Alignment check",
      "Opportunity identification",
      "Initial proposal",
    ],
  },
  {
    step: "02",
    icon: Target,
    title: "Needs Assessment",
    description:
      "We conduct a detailed assessment to identify the best partnership model for mutual benefit.",
    duration: "2-3 weeks",
    outcomes: ["Partnership model", "Resource mapping", "Impact goals"],
  },
  {
    step: "03",
    icon: Handshake,
    title: "Agreement Finalization",
    description:
      "We develop and sign a partnership agreement outlining roles, responsibilities, and expectations.",
    duration: "2-4 weeks",
    outcomes: ["MOU signing", "Implementation plan", "Communication protocol"],
  },
  {
    step: "04",
    icon: Users,
    title: "Implementation & Monitoring",
    description:
      "We launch the partnership with regular monitoring, evaluation, and progress reporting.",
    duration: "Ongoing",
    outcomes: ["Program launch", "Regular reporting", "Impact measurement"],
  },
];

export function PartnershipProcess() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Partnership <span className='text-primary'>Process</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            A transparent, collaborative process designed to build strong,
            effective partnerships that deliver meaningful impact.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='relative group'>
              {/* Connecting Line */}
              {index < processSteps.length - 1 && (
                <div className='hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-linear-to-r from-primary/20 to-transparent -z-10'></div>
              )}

              <div className='bg-white dark:bg-slate-900 rounded-2xl p-6 text-center group-hover:shadow-xl transition-all duration-300 h-full'>
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

                <p className='text-muted-foreground leading-relaxed text-sm mb-4'>
                  {step.description}
                </p>

                {/* Duration */}
                <div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-muted-foreground mb-4'>
                  <CheckCircle className='h-3 w-3' />
                  {step.duration}
                </div>

                {/* Outcomes */}
                <div className='space-y-1'>
                  {step.outcomes.map((outcome, outcomeIndex) => (
                    <div
                      key={outcomeIndex}
                      className='flex items-center gap-2 text-xs text-muted-foreground'>
                      <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                      {outcome}
                    </div>
                  ))}
                </div>
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
          <div className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 max-w-2xl mx-auto'>
            <p className='text-lg text-foreground font-medium'>
              We believe in building partnerships that are flexible, responsive,
              and focused on creating shared value for both organizations and
              the communities we serve.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
