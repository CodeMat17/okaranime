// components/impact/ImpactCTA.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowRight, BarChart3 } from "lucide-react";

export function ImpactCTA() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-linear-to-br from-primary/10 via-slate-50 to-secondary/10 dark:from-primary/5 dark:via-slate-900 dark:to-secondary/5 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='space-y-6'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium'>
            <BarChart3 className='h-4 w-4' />
            Detailed Impact Reports
          </motion.div>

          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl'>
            Dive Deeper Into Our <span className='text-primary'>Impact</span>
          </h2>

          <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
            Access comprehensive reports, case studies, and detailed analytics
            that showcase the full scope of our work and its measurable
            outcomes.
          </p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
            <Button size='lg' className='gap-3 px-8' asChild>
              <a href='/impact-report-2024.pdf' download>
                Download Full Report
                <Download className='h-5 w-5' />
              </a>
            </Button>
            <Button size='lg' variant='outline' className='gap-3 px-8' asChild>
              <a href='/contact'>
                Request Detailed Data
                <ArrowRight className='h-5 w-5' />
              </a>
            </Button>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto'>
            {[
              {
                label: "Annual Reports",
                count: "5",
                description: "Years of impact data",
              },
              {
                label: "Case Studies",
                count: "25+",
                description: "Detailed success stories",
              },
              {
                label: "Research Papers",
                count: "8",
                description: "Evidence-based findings",
              },
            ].map((resource, index) => (
              <motion.div
                key={resource.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className='text-center p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm'>
                <div className='text-lg font-black text-primary'>
                  {resource.count}
                </div>
                <div className='text-sm font-semibold text-foreground'>
                  {resource.label}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {resource.description}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Share Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='pt-8'>
            <Button variant='ghost' className='gap-2' asChild>
              <a href='#'>
                <Share2 className='h-4 w-4' />
                Share Our Impact
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
