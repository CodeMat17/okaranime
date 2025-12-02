// components/about/TeamSection.tsx
"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Linkedin, Mail, UserPlus, Users } from "lucide-react";



export function TeamSection() {

  const teamMembers = useQuery(api.team.getAllTeam)

  return (
    <section
      id='team'
      className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Meet Our <span className='text-primary'>Team</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            The passionate individuals driving our mission forward
          </p>
        </motion.div>
        {teamMembers === undefined ? (
          <section
            id='team'
            className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-6xl mx-auto'>
              {/* Loading skeleton */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className='bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg'>
                    <div className='aspect-square bg-slate-200 dark:bg-slate-700 animate-pulse'></div>
                    <div className='p-6 space-y-3'>
                      <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'></div>
                      <div className='h-3 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto'></div>
                      <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'></div>
                      <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse'></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : teamMembers.length === 0 ? (
          <section
            id='team'
            className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-6xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center mb-12 lg:mb-16'>
                <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
                  Meet Our <span className='text-primary'>Team</span>
                </h2>
                <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
                  The passionate individuals driving our mission forward
                </p>
              </motion.div>

              {/* Empty state message */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className='text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl'>
                <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4'>
                  <UserPlus className='h-8 w-8 text-primary' />
                </div>
                <h3 className='text-xl font-bold text-slate-900 dark:text-white mb-2'>
                  Team Coming Soon
                </h3>
                <p className='text-muted-foreground max-w-md mx-auto mb-6'>
                  Our amazing team profiles will be displayed here soon. Stay
                  tuned to meet the passionate individuals behind our mission.
                </p>
                <div className='text-xs text-muted-foreground'>
                  <Users className='h-4 w-4 inline mr-1' />
                  Team members will appear here once added
                </div>
              </motion.div>
            </div>
          </section>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className='group'>
                <div className='bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300'>
                  {/* Team Member Image */}
                  <div className='aspect-square bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                    <div className='text-center p-6'>
                      <Users className='h-12 w-12 text-primary mx-auto mb-3' />
                      <p className='text-sm text-muted-foreground'>
                        Team Photo
                      </p>
                    </div>
                  </div>

                  {/* Team Member Info */}
                  <div className='p-6 text-center'>
                    <h3 className='text-lg font-bold mb-1 leading-6'>
                      {member.name}
                    </h3>
                    <p className='text-primary font-semibold text-sm mb-3'>
                      {member.position}
                    </p>
                    <p className='text-muted-foreground text-sm leading-5 mb-4'>
                      {member.description}
                    </p>

                    <div className='flex justify-center gap-3'>
                      {/* <button className='p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-colors'>
                      <Linkedin className='h-4 w-4' />
                    </button> */}
                      {member.email &&
                        <button className='p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-colors'>
                          <a href={`mailto:${member.email}`}>
                            <Mail className='h-4 w-4' />
                          </a>
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
