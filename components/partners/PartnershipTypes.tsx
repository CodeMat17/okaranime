// components/partners/PartnershipTypes.tsx
"use client";

import { motion } from "framer-motion";
import { Building2, Users, Heart, Target, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const partnershipTypes = [
  {
    type: "Corporate Partnership",
    icon: Building2,
    description:
      "Strategic collaborations with businesses for program funding, employee volunteering, and shared value creation.",
    investment: "₦5M - ₦50M annually",
    duration: "1-3 years",
    benefits: [
      "Brand association and visibility",
      "Employee engagement programs",
      "CSR goal alignment",
      "Impact reporting",
    ],
    bestFor: "Large corporations and SMEs",
  },
  {
    type: "Foundation Grants",
    icon: Heart,
    description:
      "Funding partnerships with philanthropic foundations to support specific programs or organizational capacity.",
    investment: "Grant-based funding",
    duration: "1-5 years",
    benefits: [
      "Program-specific funding",
      "Research collaboration",
      "Capacity building support",
      "Long-term impact focus",
    ],
    bestFor: "Private and corporate foundations",
  },
  {
    type: "NGO Collaboration",
    icon: Users,
    description:
      "Joint program implementation with other non-profits to leverage complementary expertise and resources.",
    investment: "In-kind and resource sharing",
    duration: "Project-based or ongoing",
    benefits: [
      "Shared expertise and resources",
      "Expanded program reach",
      "Joint fundraising opportunities",
      "Knowledge exchange",
    ],
    bestFor: "Local and international NGOs",
  },
  {
    type: "Government Partnership",
    icon: Target,
    description:
      "Collaboration with government agencies for policy alignment, program scaling, and public service delivery.",
    investment: "Varied based on project",
    duration: "2-5 years",
    benefits: [
      "Policy influence",
      "Program scaling opportunities",
      "Public sector resources",
      "Sustainable funding streams",
    ],
    bestFor: "Government ministries and agencies",
  },
  {
    type: "Academic Partnership",
    icon: Award,
    description:
      "Research collaborations with universities and academic institutions for program evaluation and innovation.",
    investment: "Research grants and in-kind",
    duration: "1-3 years",
    benefits: [
      "Evidence-based programming",
      "Research and evaluation support",
      "Student internship programs",
      "Academic publications",
    ],
    bestFor: "Universities and research institutions",
  },
  {
    type: "Community Partnership",
    icon: Zap,
    description:
      "Grassroots collaborations with community organizations for local program implementation and ownership.",
    investment: "Community resource mobilization",
    duration: "Ongoing",
    benefits: [
      "Local ownership and sustainability",
      "Cultural relevance",
      "Community mobilization",
      "Trust building",
    ],
    bestFor: "Community-based organizations",
  },
];

export function PartnershipTypes() {
  return (
    <section
      id='partnership'
      className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Partnership <span className='text-primary'>Opportunities</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Multiple ways to collaborate based on your organization&apos;s
            goals, resources, and desired level of engagement.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
          {partnershipTypes.map((partnership, index) => (
            <motion.div
              key={partnership.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border-2 border-transparent group-hover:border-primary/20'>
                {/* Partnership Header */}
                <div className='flex items-start gap-4 mb-4'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70 flex-shrink-0'>
                    <partnership.icon className='h-6 w-6 text-white' />
                  </motion.div>
                  <div>
                    <h3 className='text-lg font-black group-hover:text-primary transition-colors'>
                      {partnership.type}
                    </h3>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {partnership.bestFor}
                    </p>
                  </div>
                </div>

                {/* Partnership Description */}
                <p className='text-muted-foreground mb-4 leading-relaxed'>
                  {partnership.description}
                </p>

                {/* Investment & Duration */}
                <div className='grid grid-cols-2 gap-3 mb-4'>
                  <div className='text-center p-2 rounded-lg bg-white dark:bg-slate-900'>
                    <div className='text-xs font-semibold text-foreground'>
                      Investment
                    </div>
                    <div className='text-sm text-primary font-medium'>
                      {partnership.investment}
                    </div>
                  </div>
                  <div className='text-center p-2 rounded-lg bg-white dark:bg-slate-900'>
                    <div className='text-xs font-semibold text-foreground'>
                      Duration
                    </div>
                    <div className='text-sm text-primary font-medium'>
                      {partnership.duration}
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className='mb-4'>
                  <h4 className='font-semibold text-sm text-foreground mb-2'>
                    Key Benefits:
                  </h4>
                  <div className='space-y-1'>
                    {partnership.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className='flex items-center gap-2 text-xs text-muted-foreground'>
                        <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button size='sm' className='w-full' asChild>
                  <a href='/contact'>Explore Partnership</a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Partnership Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <div className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-black mb-4'>
              Custom Partnership Solutions
            </h3>
            <p className='text-muted-foreground mb-6'>
              Don&apos;t see a perfect fit? We can create customized partnership
              arrangements that align with your specific goals, resources, and
              desired impact.
            </p>
            <Button size='lg' asChild>
              <a href='/contact'>Discuss Custom Partnership</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
