// components/news/FeaturedStories.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Eye, Heart, Newspaper } from "lucide-react";

const featuredStories = [
  {
    id: 1,
    title: "Empowering 500+ Youth: Our Largest Vocational Training Program Yet",
    excerpt:
      "This year, we successfully trained over 500 young people in sustainable vocational skills, creating new economic opportunities in underserved communities.",
    image: "/news/youth-training.jpg",
    category: "Youth Empowerment",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    views: "1.2K",
    likes: "245",
    featured: true,
  },
  {
    id: 2,
    title:
      "Breaking Barriers: How Handicapped Women Are Building Successful Businesses",
    excerpt:
      "Meet the women who are overcoming physical challenges to become successful entrepreneurs through our empowerment programs.",
    image: "/news/women-empowerment.jpg",
    category: "Women's Empowerment",
    author: "Michael Brown",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    views: "980",
    likes: "187",
    featured: true,
  },
  {
    id: 3,
    title: "Talent Discovery Camp Uncovers Hidden Gems in Rural Communities",
    excerpt:
      "Our recent talent discovery camp identified exceptional artistic and creative talents among youth in remote villages.",
    image: "/news/talent-camp.jpg",
    category: "Talent Discovery",
    author: "Fatima Bello",
    date: "Dec 5, 2024",
    readTime: "6 min read",
    views: "1.5K",
    likes: "312",
    featured: true,
  },
];

export function FeaturedStories() {
  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Featured <span className='text-primary'>Stories</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Dive into our most impactful stories and recent achievements that
            are transforming lives in underserved communities.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full'>
                <CardContent className='p-0 h-full flex flex-col'>
                  {/* Story Image */}
                  <div className='aspect-video bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden'>
                    <div className='text-center p-6'>
                      <Newspaper className='h-12 w-12 text-primary mx-auto mb-3' />
                      <p className='text-sm text-muted-foreground'>
                        Featured Story Image
                      </p>
                    </div>
                    {/* Featured Badge */}
                    <div className='absolute top-4 left-4'>
                      <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-white text-xs font-medium'>
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className='p-6 flex-1 flex flex-col'>
                    {/* Category */}
                    <div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 self-start'>
                      {story.category}
                    </div>

                    {/* Title */}
                    <h3 className='text-xl font-black mb-3 group-hover:text-primary transition-colors line-clamp-2'>
                      {story.title}
                    </h3>

                    {/* Excerpt */}
                    <p className='text-muted-foreground mb-4 leading-relaxed flex-1'>
                      {story.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className='space-y-3 mb-4'>
                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <User className='h-3 w-3' />
                          <span>{story.author}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-3 w-3' />
                          <span>{story.date}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Eye className='h-3 w-3' />
                          <span>{story.views} views</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Heart className='h-3 w-3' />
                          <span>{story.likes} likes</span>
                        </div>
                        <span>{story.readTime}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300'
                      asChild>
                      <a href={`/news/${story.id}`}>
                        Read Full Story
                        <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <Button size='lg' className='gap-3' asChild>
            <a href='/news/all'>
              View All Stories
              <ArrowRight className='h-5 w-5' />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
