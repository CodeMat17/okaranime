// components/news/NewsArticleContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import { NewsArticle, newsArticles } from "@/data/newsData";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import Link from "next/link";

interface NewsArticleContentProps {
  article: NewsArticle;
}

export function NewsArticleContent({ article }: NewsArticleContentProps) {
  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <article className='min-h-screen bg-white dark:bg-slate-900 pt-24'>
      {/* Back Navigation */}
      <nav className='border-b border-slate-200 dark:border-slate-800'>
        <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <Link href='/news'>
            <Button variant='ghost' size='sm' className='gap-2'>
              <ArrowLeft className='h-4 w-4' />
              Back to News
            </Button>
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Title */}
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight'>
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className='flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-6'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4' />
            <span>{article.date}</span>
          </div>
        </div>

        {/* Article Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden mb-8 flex items-center justify-center'>
          <div className='text-center p-8'>
            <div className='h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
              <div className='h-8 w-8 bg-primary/40 rounded-full' />
            </div>
            <p className='text-sm text-slate-600 dark:text-slate-400'>
              Article Image: {article.title}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-4 mb-8'>
          <Button
            onClick={shareArticle}
            variant='outline'
            size='sm'
            className='gap-2 dark:hover:text-blue-600'>
            <Share2 className='h-4 w-4' />
            Share Article
          </Button>
        </div>
      </motion.header>

      {/* Article Content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='w-full'>
          {/* Main Content */}
          <div
            className={`
              article-content
        w-full
        text-lg
        leading-8
        text-slate-900
        dark:text-slate-300
        [&_h1]:text-4xl
        [&_h1]:font-black
        [&_h1]:text-slate-900
        [&_h1]:dark:text-slate-100
        [&_h1]:mb-8
        [&_h1]:mt-12
        [&_h1]:leading-tight
        [&_h2]:text-3xl
        [&_h2]:font-bold
        [&_h2]:text-slate-900
        [&_h2]:dark:text-slate-100
        [&_h2]:mb-6
        [&_h2]:mt-12
        [&_h2]:pb-3
        [&_h2]:border-b
        [&_h2]:border-slate-200
        [&_h2]:dark:border-slate-700
        [&_h3]:text-2xl
        [&_h3]:font-semibold
        [&_h3]:text-slate-900
        [&_h3]:dark:text-slate-100
        [&_h3]:mb-4
        [&_h3]:mt-10
        [&_h4]:text-xl
        [&_h4]:font-semibold
        [&_h4]:text-slate-900
        [&_h4]:dark:text-slate-100
        [&_h4]:mb-3
        [&_h4]:mt-8
        [&_p]:text-slate-900
        [&_p]:dark:text-slate-300
        [&_p]:leading-8
        [&_p]:mb-6
        [&_strong]:font-semibold
        [&_strong]:text-slate-900
        [&_strong]:dark:text-slate-100
        [&_ul]:my-6
        [&_ul]:text-slate-900
        [&_ul]:dark:text-slate-300
        [&_ul]:list-disc
        [&_ul]:list-inside
        [&_ul]:space-y-2
        [&_ol]:my-6
        [&_ol]:text-slate-900
        [&_ol]:dark:text-slate-300
        [&_ol]:list-decimal
        [&_ol]:list-inside
        [&_ol]:space-y-2
        [&_li]:leading-7
        [&_li]:text-slate-900
        [&_li]:dark:text-slate-300
        [&_li]:pl-2
        [&_blockquote]:border-l-4
        [&_blockquote]:border-primary
        [&_blockquote]:bg-slate-50
        [&_blockquote]:dark:bg-slate-800/50
        [&_blockquote]:py-4
        [&_blockquote]:px-6
        [&_blockquote]:rounded-r-lg
        [&_blockquote]:text-slate-700
        [&_blockquote]:dark:text-slate-400
        [&_blockquote]:my-8
        [&_blockquote]:italic
        [&_a]:text-primary
        [&_a]:font-medium
        [&_a]:no-underline
        [&_a]:hover:underline
        [&_a]:transition-colors
        [&_a]:duration-200

            `}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </motion.section>

      {/* Related Articles Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='border-t border-slate-200 dark:border-slate-800 pt-12'>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-white mb-8'>
            Related Articles
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {newsArticles
              .filter((a) => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                  className='block p-6 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg'>
                  <h3 className='font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2'>
                    {relatedArticle.title}
                  </h3>

                  <div className='flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500'>
                    <span>{relatedArticle.date}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </motion.section>
    </article>
  );
}
