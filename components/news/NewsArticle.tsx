// components/news/NewsArticle.tsx
"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  Share2,
  ArrowLeft,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: Author;
  date: string;
  readTime: string;
  views: number;
  likes: number;
  tags: string[];
  featured: boolean;
}

interface NewsArticleProps {
  article: Article;
}

export function NewsArticle({ article }: NewsArticleProps) {
  const params = useParams();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const handleLike = () => {
    // Implement like functionality
    console.log("Liked article:", article.slug);
  };

  return (
    <article className='min-h-screen bg-white dark:bg-slate-900'>
      {/* Back Navigation */}
      <nav className='border-b border-slate-200 dark:border-slate-800'>
        <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <Button variant='ghost' size='sm' asChild className='gap-2'>
              <Link href='/news'>
                <ArrowLeft className='h-4 w-4' />
                Back to News
              </Link>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Article Header */}
      <header className='relative py-16 sm:py-20 lg:py-24'>
        <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'>
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6'>
              {article.category}
            </motion.div>

            {/* Title */}
            <motion.h1
              className='text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-tight mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}>
              {article.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              className='text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}>
              {article.excerpt}
            </motion.p>

            {/* Article Meta */}
            <motion.div
              className='flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground mb-8'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                  <User className='h-4 w-4' />
                  <span>{article.author.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4' />
                  <span>{article.date}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4' />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>

            {/* Engagement Stats */}
            <motion.div
              className='flex items-center justify-center gap-6 text-sm text-muted-foreground'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}>
              <div className='flex items-center gap-2'>
                <Eye className='h-4 w-4' />
                <span>{article.views.toLocaleString()} views</span>
              </div>
              <div className='flex items-center gap-2'>
                <Heart className='h-4 w-4' />
                <span>{article.likes.toLocaleString()} likes</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12'>
        <div className='aspect-video rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden'>
          <div className='text-center p-8'>
            <Calendar className='h-16 w-16 text-primary mx-auto mb-4' />
            <p className='text-lg text-muted-foreground'>
              Featured Image: {article.title}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Article Content */}
      <section className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='lg:col-span-3'>
            {/* Article Body */}
            <div
              className='prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-p:leading-relaxed prose-p:text-muted-foreground prose-ul:leading-relaxed prose-li:text-muted-foreground prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:italic prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-lg'
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800'>
              {article.tags.map((tag) => (
                <Badge key={tag} variant='secondary' className='text-sm'>
                  #{tag}
                </Badge>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className='flex flex-wrap gap-4 mt-8'>
              <Button onClick={handleLike} className='gap-2'>
                <Heart className='h-4 w-4' />
                Like Article
              </Button>
              <Button variant='outline' onClick={handleShare} className='gap-2'>
                <Share2 className='h-4 w-4' />
                Share
              </Button>
              <Button variant='outline' className='gap-2'>
                <Bookmark className='h-4 w-4' />
                Save
              </Button>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='lg:col-span-1 space-y-8'>
            {/* Author Card */}
            <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6'>
              <div className='text-center'>
                <div className='w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4'>
                  <User className='h-8 w-8 text-white' />
                </div>
                <h3 className='font-black text-lg mb-1'>
                  {article.author.name}
                </h3>
                <p className='text-primary text-sm font-medium mb-3'>
                  {article.author.role}
                </p>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {article.author.name} is passionate about{" "}
                  {article.category.toLowerCase()} and has been instrumental in
                  driving positive change through our programs.
                </p>
              </div>
            </div>

            {/* Article Stats */}
            <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6'>
              <h4 className='font-black text-lg mb-4'>Article Stats</h4>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-muted-foreground'>
                    Published
                  </span>
                  <span className='text-sm font-medium'>{article.date}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-muted-foreground'>
                    Reading Time
                  </span>
                  <span className='text-sm font-medium'>
                    {article.readTime}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-muted-foreground'>Views</span>
                  <span className='text-sm font-medium'>
                    {article.views.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-sm text-muted-foreground'>Likes</span>
                  <span className='text-sm font-medium'>
                    {article.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Info */}
            <div className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-6'>
              <h4 className='font-black text-lg mb-4'>
                About {article.category}
              </h4>
              <p className='text-muted-foreground text-sm leading-relaxed mb-4'>
                Our {article.category} programs focus on creating sustainable
                opportunities and empowering individuals to reach their full
                potential.
              </p>
              <Button variant='outline' size='sm' asChild className='w-full'>
                <Link
                  href={`/programs#${article.category
                    .toLowerCase()
                    .replace(" ", "-")}`}>
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.aside>
        </div>
      </section>
    </article>
  );
}
