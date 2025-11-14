// components/impact/CommunityImpact.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Home, Heart } from "lucide-react";

const communityData = [
  {
    region: "Lagos State",
    communities: 15,
    participants: 400,
    programs: ["Youth Empowerment", "Women's Empowerment", "Digital Literacy"],
    impact: "50+ local businesses started",
  },
  {
    region: "Enugu State",
    communities: 8,
    participants: 200,
    programs: ["Sustainable Agriculture", "Youth Empowerment"],
    impact: "25 farming cooperatives formed",
  },
  {
    region: "Kano State",
    communities: 12,
    participants: 300,
    programs: ["Talent Discovery", "Women's Empowerment", "Creative Arts"],
    impact: "100+ talents discovered",
  },
  {
    region: "Rivers State",
    communities: 10,
    participants: 250,
    programs: ["Digital Literacy", "Youth Empowerment"],
    impact: "75% digital skills adoption",
  },
];

export function CommunityImpact() {
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
            Community <span className='text-primary'>Impact</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Our reach extends across multiple regions, creating positive change
            in communities throughout Nigeria
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
          {communityData.map((community, index) => (
            <motion.div
              key={community.region}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <MapPin className='h-5 w-5' />
                  </div>
                  <h3 className='text-xl font-black'>{community.region}</h3>
                </div>
              </div>

              {/* Community Stats */}
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800'>
                  <Users className='h-6 w-6 text-primary mx-auto mb-1' />
                  <div className='text-lg font-black'>
                    {community.participants}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    Participants
                  </div>
                </div>
                <div className='text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800'>
                  <Home className='h-6 w-6 text-primary mx-auto mb-1' />
                  <div className='text-lg font-black'>
                    {community.communities}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    Communities
                  </div>
                </div>
              </div>

              {/* Programs */}
              <div className='mb-4'>
                <h4 className='font-semibold text-sm text-foreground mb-2'>
                  Active Programs:
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {community.programs.map((program, programIndex) => (
                    <span
                      key={program}
                      className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium'>
                      <Heart className='h-3 w-3' />
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Impact */}
              <div className='bg-primary/5 rounded-lg p-3'>
                <div className='text-sm font-semibold text-primary mb-1'>
                  Notable Achievement
                </div>
                <div className='text-xs text-muted-foreground'>
                  {community.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Visualization Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-12'>
          <div className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl p-8 text-center'>
            <MapPin className='h-12 w-12 text-primary mx-auto mb-4' />
            <h3 className='text-2xl font-black mb-2'>Nationwide Reach</h3>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Our programs currently operate in 4 states across Nigeria, with
              plans to expand to 3 additional states in the coming year to reach
              even more underserved communities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
