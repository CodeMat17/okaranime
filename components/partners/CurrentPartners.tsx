// components/partners/CurrentPartners.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Users, Target } from "lucide-react";

const partners = [
  {
    name: "EcoFuture Foundation",
    type: "Corporate Foundation",
    focus: "Environmental Sustainability",
    since: "2021",
    projects: ["Youth Green Entrepreneurship", "Sustainable Agriculture"],
    impact: "150 youth trained in eco-business",
    logo: "/partners/ecofuture.jpg",
  },
  {
    name: "Women Rise International",
    type: "International NGO",
    focus: "Women's Empowerment",
    since: "2020",
    projects: ["Women's Skill Acquisition", "Business Incubation"],
    impact: "200 women economically empowered",
    logo: "/partners/women-rise.jpg",
  },
  {
    name: "TechBridge Africa",
    type: "Technology Company",
    focus: "Digital Inclusion",
    since: "2022",
    projects: ["Digital Literacy Program", "Tech Talent Discovery"],
    impact: "300+ digital skills training",
    logo: "/partners/techbridge.jpg",
  },
  {
    name: "Global Arts Council",
    type: "Cultural Organization",
    focus: "Creative Arts Development",
    since: "2021",
    projects: ["Talent Discovery Camps", "Arts Scholarships"],
    impact: "75 artists supported",
    logo: "/partners/arts-council.jpg",
  },
  {
    name: "Community First Bank",
    type: "Financial Institution",
    focus: "Economic Development",
    since: "2020",
    projects: ["Micro-finance Support", "Business Training"],
    impact: "50+ small businesses funded",
    logo: "/partners/community-bank.jpg",
  },
  {
    name: "Health & Hope Initiative",
    type: "Healthcare Organization",
    focus: "Community Health",
    since: "2023",
    projects: ["Health Education", "Wellness Programs"],
    impact: "Health access for 500+ families",
    logo: "/partners/health-hope.jpg",
  },
];

const partnerStats = [
  { number: "20+", label: "Partner Organizations" },
  { number: "4", label: "Years of Collaboration" },
  { number: "15", label: "Joint Programs" },
  { number: "₦50M+", label: "Collective Investment" },
];

export function CurrentPartners() {
  return (
    <section
      id='partners'
      className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Our <span className='text-primary'>Partners</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Collaborating with leading organizations to amplify our impact and
            create sustainable change in underserved communities.
          </p>
        </motion.div>

        {/* Partner Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 lg:mb-16'>
          {partnerStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800'>
              <div className='text-2xl sm:text-3xl font-black text-primary mb-1'>
                {stat.number}
              </div>
              <div className='text-sm font-medium text-muted-foreground'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full'>
                {/* Partner Logo/Icon */}
                <div className='flex items-center gap-4 mb-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70'>
                    <Building2 className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-lg font-black group-hover:text-primary transition-colors'>
                      {partner.name}
                    </h3>
                    <p className='text-sm text-primary font-semibold'>
                      {partner.type}
                    </p>
                  </div>
                </div>

                {/* Partner Details */}
                <div className='space-y-3 mb-4'>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Target className='h-4 w-4' />
                    <span>{partner.focus}</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <Users className='h-4 w-4' />
                    <span>Partner since {partner.since}</span>
                  </div>
                </div>

                {/* Joint Projects */}
                <div className='mb-4'>
                  <h4 className='font-semibold text-sm text-foreground mb-2'>
                    Joint Projects:
                  </h4>
                  <div className='space-y-1'>
                    {partner.projects.map((project, projectIndex) => (
                      <div
                        key={projectIndex}
                        className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                        {project}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className='bg-primary/10 rounded-lg p-3'>
                  <div className='text-sm font-semibold text-primary mb-1'>
                    Impact Created
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {partner.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <div className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 max-w-2xl mx-auto'>
            <p className='text-lg text-foreground font-medium'>
              Our partners bring diverse expertise, resources, and networks that
              help us scale our impact and create more sustainable solutions for
              the communities we serve.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
