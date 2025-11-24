// components/about/TeamSection.tsx
"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Users } from "lucide-react";

const teamMembers = [
  {
    name: "Leonard Umekwe Okaranime Dikeakonamba",
    role: "Chief Executive Officer",
    bio: "Passionate social entrepreneur with 10+ years in community development.",
    image: "/team/ceo.jpg",
  },
  {
    name: "Chidozi Clemenson Umekwe",
    role: "Program Director",
    bio: "A managerial stalwart and expert in youth empowerment and sustainable development programs.",
    image: "/team/program-director.jpg",
  },
  {
    name: "Pastor Chioma Jehoshaphat Emilia (Dr)",
    role: "Women's Empowerment Lead",
    bio: "An altruistic and Magnanimous evangelist. Dedicated to creating economic opportunities for handicapped women.",
    image: "/team/women-lead.jpg",
  },
  {
    name: "Catherine Mayeye Obado Okaranime",
    role: "Talent Discovery and Development Manager",
    bio: "Specializes in identifying and nurturing hidden talents in communities.",
    image: "/team/talent-coordinator.jpg",
  },
];

export function TeamSection() {
  return (
    <section id="team" className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
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

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
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
                    <p className='text-sm text-muted-foreground'>Team Photo</p>
                  </div>
                </div>

                {/* Team Member Info */}
                <div className='p-6 text-center'>
                  <h3 className='text-lg font-bold mb-1 leading-6'>{member.name}</h3>
                  <p className='text-primary font-semibold text-sm mb-3'>
                    {member.role}
                  </p>
                  <p className='text-muted-foreground text-sm leading-5 mb-4'>
                    {member.bio}
                  </p>

                  <div className='flex justify-center gap-3'>
                    {/* <button className='p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-colors'>
                      <Linkedin className='h-4 w-4' />
                    </button> */}
                    <button className='p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-colors'>
                      <Mail className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
