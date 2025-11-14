// components/programs/ProgramCTA.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Star } from "lucide-react";

export function ProgramCTA() {
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
            <Heart className='h-4 w-4' />
            Join Our Mission
          </motion.div>

          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl'>
            Ready to Make a <span className='text-primary'>Difference?</span>
          </h2>

          <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
            Whether you want to participate in our programs, volunteer your
            skills, or support our mission financially, there are many ways to
            get involved and create lasting change.
          </p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className='grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto'>
            {[
              { icon: Users, number: "800+", label: "Active Participants" },
              { icon: Heart, number: "12", label: "Programs Running" },
              { icon: Star, number: "50+", label: "Communities" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className='text-center p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm'>
                <stat.icon className='h-5 w-5 text-primary mx-auto mb-1' />
                <div className='text-lg font-black text-foreground'>
                  {stat.number}
                </div>
                <div className='text-xs text-muted-foreground'>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
            <Button size='lg' className='gap-3 px-8' asChild>
              <a href='/apply'>
                Apply for Program
                <ArrowRight className='h-5 w-5' />
              </a>
            </Button>
            <Button size='lg' variant='outline' className='gap-3 px-8' asChild>
              <a href='/contact'>
                Become a Partner
                <Users className='h-5 w-5' />
              </a>
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='text-sm text-muted-foreground pt-4'>
            Applications are reviewed on a rolling basis. Limited spots
            available.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
