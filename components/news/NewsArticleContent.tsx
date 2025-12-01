// components/news/NewsArticleContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import dayjs from "dayjs";

interface NewsArticleContentProps {
  slug: string;
}

export function NewsArticleContent({ slug }: NewsArticleContentProps) {
  // Fetch the article data using the slug
  const article = useQuery(api.news.getNewsBySlug, { slug });

  // Fetch all news for related articles
  const allNews = useQuery(api.news.getAllNews) || [];

  // Loading state
  if (article === undefined) {
    return (
      <div className='min-h-screen bg-white dark:bg-slate-900 pt-24 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white mb-4'>
            Loading Article...
          </h1>
          <p className='text-slate-600 dark:text-slate-400'>
            Please wait while we fetch the article.
          </p>
        </div>
      </div>
    );
  }

  // Article not found
  if (article === null) {
    return (
      <div className='min-h-screen bg-white dark:bg-slate-900 pt-24 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white mb-4'>
            Article Not Found
          </h1>
          <p className='text-slate-600 dark:text-slate-400 mb-6'>
            The requested article could not be found.
          </p>
          <Link href='/news'>
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

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

  // Get related articles (excluding current article)
  const relatedArticles = allNews
    .filter((a) => a._id !== article._id)
    .slice(0, 2);

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
            <span>{dayjs(article._creationTime).format("MMMM DD, YYYY")}</span>
          </div>
        </div>

        {/* Article Image */}
        {article.imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='aspect-video rounded-2xl overflow-hidden mb-8 relative'>
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className='object-cover'
            />
          </motion.div>
        )}

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
    prose
    prose-lg
    max-w-none
    w-full
    text-slate-900
    dark:text-slate-300
    dark:prose-invert
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
    [&_ul]:my-4
    [&_ul]:text-slate-900
    [&_ul]:dark:text-slate-300
    [&_ul]:list-disc
    [&_ul]:list-outside
    [&_ul]:pl-6
    [&_ul]:space-y-2
    [&_ol]:my-4
    [&_ol]:text-slate-900
    [&_ol]:dark:text-slate-300
    [&_ol]:list-decimal
    [&_ol]:list-outside
    [&_ol]:pl-6
    [&_ol]:space-y-2
    [&_li]:leading-7
    [&_li]:text-slate-900
    [&_li]:dark:text-slate-300
    [&_li]:mb-1
    [&_li]:pl-1
    [&_li>p]:mb-2
    [&_li>ul]:mt-2
    [&_li>ol]:mt-2
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
    [&_img]:rounded-lg
    [&_img]:my-6
    [&_img]:mx-auto
    [&_hr]:my-8
    [&_hr]:border-slate-200
    [&_hr]:dark:border-slate-700
  `}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </motion.section>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
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
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle._id}
                  href={`/news/${relatedArticle.slug}`}
                  className='block p-6 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg'>
                  <h3 className='font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2'>
                    {relatedArticle.title}
                  </h3>
                  <div className='flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500'>
                    <span>
                      {dayjs(relatedArticle._creationTime).format(
                        "MMMM DD, YYYY"
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </article>
  );
}
