// components/news/NewsCategories.tsx
"use client";

import { motion } from "framer-motion";
import { Users, Heart, Star, Target, TrendingUp, Calendar } from "lucide-react";
import { Button } from "../ui/button";

const categories = [
  {
    name: "Youth Empowerment",
    icon: Users,
    count: 15,
    description:
      "Stories about our youth development programs and success stories",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Women's Empowerment",
    icon: Heart,
    count: 12,
    description:
      "Updates on our initiatives for handicapped women and economic empowerment",
    color: "from-pink-500 to-rose-500",
  },
  {
    name: "Talent Discovery",
    icon: Star,
    count: 8,
    description:
      "Discoveries and developments from our talent scouting programs",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Program Updates",
    icon: Target,
    count: 10,
    description: "Latest developments and expansions in our various programs",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Impact Stories",
    icon: TrendingUp,
    count: 20,
    description:
      "Real stories of transformation and positive change in communities",
    color: "from-purple-500 to-violet-500",
  },
  {
    name: "Events & Announcements",
    icon: Calendar,
    count: 6,
    description:
      "Upcoming events, workshops, and important foundation announcements",
    color: "from-red-500 to-pink-500",
  },
];

export function NewsCategories() {
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
            News <span className='text-primary'>Categories</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Explore our content by category to find stories and updates that
            interest you most.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <div className='bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full border-2 border-transparent group-hover:border-primary/20'>
                <div className='flex items-start gap-4 mb-4'>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary/70'>
                    <category.icon className='h-6 w-6 text-white' />
                  </motion.div>
                  <div className='flex-1'>
                    <h3 className='text-lg font-black group-hover:text-primary transition-colors'>
                      {category.name}
                    </h3>
                    <div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-muted-foreground mt-1'>
                      {category.count} articles
                    </div>
                  </div>
                </div>

                <p className='text-muted-foreground text-sm leading-relaxed mb-4'>
                  {category.description}
                </p>

                <button className='w-full text-left text-sm font-medium text-primary hover:underline'>
                  Browse Category →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Categories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <div className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-black mb-4'>
              Can&apos;t Find What You&apos;re Looking For?
            </h3>
            <p className='text-muted-foreground mb-6'>
              Use our search feature or browse all categories to find specific
              stories, updates, or information about our programs.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button asChild>
                <a href='/news/all'>Browse All Articles</a>
              </Button>
              <Button variant='outline' asChild>
                <a href='/news/categories'>View All Categories</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
