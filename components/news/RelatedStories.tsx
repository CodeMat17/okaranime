// components/news/RelatedStories.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
  };
  date: string;
  readTime: string;
}

interface RelatedStoriesProps {
  currentArticle: Article;
  allArticles: Article[];
}

export function RelatedStories({
  currentArticle,
  allArticles,
}: RelatedStoriesProps) {
  // Filter related stories (excluding current article)
  const relatedStories = allArticles
    .filter((article) => article.id !== currentArticle.id)
    .slice(0, 3);

  if (relatedStories.length === 0) return null;

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
            Related <span className='text-primary'>Stories</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Discover more inspiring stories and updates from our work in the
            field.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {relatedStories.map((article, index) => (
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
                  <div className='aspect-video bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center'>
                    <div className='text-center p-6'>
                      <Calendar className='h-8 w-8 text-primary mx-auto mb-2' />
                      <p className='text-xs text-muted-foreground'>
                        Story Image
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
                    <p className='text-muted-foreground text-sm mb-4 leading-relaxed flex-1 line-clamp-3'>
                      {article.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className='space-y-2 mb-4'>
                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <User className='h-3 w-3' />
                          <span>{article.author.name}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-3 w-3' />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        {article.readTime}
                      </div>
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/news/${article.slug}`}
                      className='inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-auto'>
                      Read Story
                      <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
                    </Link>
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
          <Link
            href='/news'
            className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors'>
            View All News Articles
            <ArrowRight className='h-5 w-5' />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
