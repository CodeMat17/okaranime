// components/news/NewsGrid.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Eye, Heart, Tag, Newspaper } from "lucide-react";

const newsArticles = [
  {
    id: 4,
    title: "New Sustainable Agriculture Program Launches in Enugu State",
    excerpt:
      "Our latest initiative focuses on training youth in modern farming techniques to combat food insecurity.",
    image: "/news/agriculture.jpg",
    category: "Program Updates",
    author: "John Chukwu",
    date: "Nov 28, 2024",
    readTime: "3 min read",
    views: "756",
    likes: "134",
    tags: ["Agriculture", "Youth", "Sustainability"],
  },
  {
    id: 5,
    title: "Digital Literacy Program Reaches 300+ Participants",
    excerpt:
      "We've successfully trained over 300 community members in essential digital skills for the modern economy.",
    image: "/news/digital-literacy.jpg",
    category: "Program Updates",
    author: "Maria Okon",
    date: "Nov 22, 2024",
    readTime: "4 min read",
    views: "892",
    likes: "167",
    tags: ["Digital Skills", "Technology", "Empowerment"],
  },
  {
    id: 6,
    title: "Partnership with TechBridge Africa Expands Opportunities",
    excerpt:
      "Our new collaboration brings advanced tech training to underserved youth across multiple states.",
    image: "/news/partnership.jpg",
    category: "Program Updates",
    author: "Sarah Johnson",
    date: "Nov 18, 2024",
    readTime: "5 min read",
    views: "1.1K",
    likes: "198",
    tags: ["Partnership", "Technology", "Youth"],
  },
  {
    id: 7,
    title: "Creative Arts Exhibition Showcases Local Talent",
    excerpt:
      "Young artists from our talent discovery program displayed their work at a community exhibition.",
    image: "/news/arts-exhibition.jpg",
    category: "Talent Discovery",
    author: "Fatima Bello",
    date: "Nov 12, 2024",
    readTime: "3 min read",
    views: "643",
    likes: "156",
    tags: ["Arts", "Talent", "Community"],
  },
  {
    id: 8,
    title: "Women's Business Incubator Graduates First Cohort",
    excerpt:
      "25 handicapped women complete business training and receive seed funding for their ventures.",
    image: "/news/business-incubator.jpg",
    category: "Women's Empowerment",
    author: "Michael Brown",
    date: "Nov 8, 2024",
    readTime: "4 min read",
    views: "934",
    likes: "223",
    tags: ["Business", "Women", "Entrepreneurship"],
  },
  {
    id: 9,
    title: "Annual Impact Report Shows 85% Success Rate",
    excerpt:
      "Our latest impact report demonstrates the effectiveness of our empowerment programs across all metrics.",
    image: "/news/impact-report.jpg",
    category: "Impact Stories",
    author: "Sarah Johnson",
    date: "Nov 3, 2024",
    readTime: "6 min read",
    views: "1.3K",
    likes: "278",
    tags: ["Impact", "Report", "Success"],
  },
];

export function NewsGrid() {
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
            Latest <span className='text-primary'>Updates</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Stay informed with the most recent news, program updates, and
            stories from our work in the field.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {newsArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full'>
                <CardContent className='p-0 h-full flex flex-col'>
                  {/* Article Image */}
                  <div className='aspect-video bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden'>
                    <div className='text-center p-6'>
                      <Newspaper className='h-10 w-10 text-primary mx-auto mb-2' />
                      <p className='text-xs text-muted-foreground'>
                        Article Image
                      </p>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className='p-6 flex-1 flex flex-col'>
                    {/* Category */}
                    <div className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 self-start'>
                      {article.category}
                    </div>

                    {/* Title */}
                    <h3 className='text-lg font-black mb-3 group-hover:text-primary transition-colors line-clamp-2'>
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className='text-muted-foreground text-sm mb-4 leading-relaxed flex-1'>
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-1 mb-4'>
                      {article.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className='inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-muted-foreground'>
                          <Tag className='h-3 w-3' />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Information */}
                    <div className='space-y-2 mb-4'>
                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <User className='h-3 w-3' />
                          <span>{article.author}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-3 w-3' />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Eye className='h-3 w-3' />
                          <span>{article.views}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Heart className='h-3 w-3' />
                          <span>{article.likes}</span>
                        </div>
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Read More */}
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300'
                      asChild>
                      <a href={`/news/${article.id}`}>
                        Read Article
                        <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='flex justify-center items-center gap-2 mt-12'>
          <Button variant='outline' size='sm' disabled>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='bg-primary text-primary-foreground'>
            1
          </Button>
          <Button variant='outline' size='sm'>
            2
          </Button>
          <Button variant='outline' size='sm'>
            3
          </Button>
          <Button variant='outline' size='sm'>
            Next
          </Button>
        </motion.div>

        {/* Archive Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className='text-center mt-8'>
          <Button variant='ghost' asChild>
            <a href='/news/archive'>Browse News Archive</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
