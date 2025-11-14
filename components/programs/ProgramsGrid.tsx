// components/programs/ProgramsGrid.tsx
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
import {
  Users,
  Heart,
  Star,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

const programs = [
  {
    icon: Users,
    title: "Youth Empowerment Program",
    description:
      "Comprehensive sustainability programs for boys and girls aged 15-25, fostering self-reliance through vocational training, mentorship, and eco-friendly business development.",
    duration: "6-12 Months",
    location: "Multiple Communities",
    beneficiaries: "Youth (15-25 years)",
    stats: "500+ Youth Trained",
    features: [
      "Vocational Skills Training",
      "Mentorship Program",
      "Sustainability Workshops",
      "Business Development",
      "Job Placement Support",
    ],
    color: "from-blue-500 to-cyan-500",
    status: "Active",
  },
  {
    icon: Heart,
    title: "Women's Empowerment Initiative",
    description:
      "Tailored skill acquisition and business building programs for handicapped women, providing economic independence and community support networks.",
    duration: "4-8 Months",
    location: "Urban & Rural Centers",
    beneficiaries: "Handicapped Women",
    stats: "200+ Women Empowered",
    features: [
      "Skill Acquisition Workshops",
      "Business Coaching",
      "Seed Funding Support",
      "Support Networks",
      "Market Access",
    ],
    color: "from-pink-500 to-rose-500",
    status: "Active",
  },
  {
    icon: Star,
    title: "Talent Discovery Program",
    description:
      "Active scouting and nurturing of hidden talents in underserved communities through camps, scholarships, and community outreach programs.",
    duration: "Ongoing",
    location: "Nationwide",
    beneficiaries: "All Ages",
    stats: "100+ Talents Discovered",
    features: [
      "Talent Discovery Camps",
      "Scholarship Programs",
      "Mentorship & Training",
      "Community Outreach",
      "Performance Opportunities",
    ],
    color: "from-amber-500 to-orange-500",
    status: "Active",
  },
  {
    icon: Users,
    title: "Sustainable Agriculture Program",
    description:
      "Training youth in modern, eco-friendly agricultural practices to create sustainable food systems and agribusiness opportunities.",
    duration: "3-6 Months",
    location: "Rural Communities",
    beneficiaries: "Youth & Young Adults",
    stats: "150+ Farmers Trained",
    features: [
      "Modern Farming Techniques",
      "Agribusiness Training",
      "Eco-friendly Practices",
      "Market Linkages",
      "Startup Support",
    ],
    color: "from-green-500 to-emerald-500",
    status: "Active",
  },
  {
    icon: Heart,
    title: "Digital Literacy Program",
    description:
      "Equipping underserved communities with essential digital skills to bridge the technology gap and create online economic opportunities.",
    duration: "2-4 Months",
    location: "Community Centers",
    beneficiaries: "All Community Members",
    stats: "300+ Trained",
    features: [
      "Basic Computer Skills",
      "Internet Literacy",
      "Digital Marketing",
      "Online Safety",
      "E-commerce Training",
    ],
    color: "from-purple-500 to-violet-500",
    status: "Active",
  },
  {
    icon: Star,
    title: "Creative Arts Program",
    description:
      "Nurturing artistic talents in visual arts, performing arts, and crafts to preserve cultural heritage and create economic opportunities.",
    duration: "Ongoing",
    location: "Arts Centers",
    beneficiaries: "Youth & Adults",
    stats: "75+ Artists Supported",
    features: [
      "Visual Arts Training",
      "Performing Arts",
      "Craft Development",
      "Exhibition Opportunities",
      "Cultural Preservation",
    ],
    color: "from-red-500 to-pink-500",
    status: "Active",
  },
];

export function ProgramsGrid() {
  return (
    <section
      id='programs'
      className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Our <span className='text-primary'>Programs</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Comprehensive empowerment initiatives designed to create sustainable
            change and transform lives in underserved communities.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='h-full'>
              <Card className='h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden'>
                <CardHeader className='pb-4 pt-6 relative'>
                  {/* Program Header */}
                  <div className='flex items-start justify-between mb-4'>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className='flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70'>
                      <program.icon className='h-6 w-6 text-white' />
                    </motion.div>
                    <div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium'>
                      <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                      {program.status}
                    </div>
                  </div>

                  <CardTitle className='text-xl font-black mb-2 group-hover:text-primary transition-colors'>
                    {program.title}
                  </CardTitle>

                  <CardDescription className='text-lg font-semibold text-primary'>
                    {program.stats}
                  </CardDescription>
                </CardHeader>

                <CardContent className='pt-0 pb-6'>
                  {/* Program Description */}
                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    {program.description}
                  </p>

                  {/* Program Details */}
                  <div className='space-y-3 mb-6'>
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <Clock className='h-4 w-4 text-primary' />
                      <span>{program.duration}</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <MapPin className='h-4 w-4 text-primary' />
                      <span>{program.location}</span>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <Users className='h-4 w-4 text-primary' />
                      <span>{program.beneficiaries}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className='space-y-2 mb-6'>
                    <h4 className='font-semibold text-sm text-foreground'>
                      Program Features:
                    </h4>
                    <div className='space-y-1'>
                      {program.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className='flex items-center gap-2 text-xs text-muted-foreground'>
                          <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-semibold'>
                      Learn More
                      <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
