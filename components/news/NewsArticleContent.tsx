// components/news/NewsArticleContent.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Check, Copy, Facebook, Mail, MessageCircle, Send, Share2, Twitter } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useState } from "react";

interface NewsArticleContentProps {
  slug: string;
}

export function NewsArticleContent({ slug }: NewsArticleContentProps) {
  const [copied, setCopied] = useState(false);

  const article = useQuery(api.news.getNewsBySlug, { slug });
  const allNews = useQuery(api.news.getAllNews) || [];

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

  const relatedArticles = allNews
    .filter((a) => a._id !== article._id)
    .slice(0, 2);

  const copyLink = async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const el = document.createElement("textarea");
        el.value = url;
        el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Unable to copy link.");
    }
  };

  const handleNativeShare = async () => {
    const url = window.location.href;
    try {
      await navigator.share({ title: article.title, url });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        await copyLink();
      }
    }
  };

  const shareOptions = [
    {
      label: "WhatsApp",
      icon: <MessageCircle className="h-4 w-4" />,
      color: "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950/40 dark:hover:text-green-400",
      href: () => `https://wa.me/?text=${encodeURIComponent(article.title + " " + window.location.href)}`,
    },
    {
      label: "Twitter / X",
      icon: <Twitter className="h-4 w-4" />,
      color: "hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950/40 dark:hover:text-sky-400",
      href: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      color: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400",
      href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    },
    {
      label: "Telegram",
      icon: <Send className="h-4 w-4" />,
      color: "hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-cyan-950/40 dark:hover:text-cyan-400",
      href: () => `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`,
    },
    {
      label: "Email",
      icon: <Mail className="h-4 w-4" />,
      color: "hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/40 dark:hover:text-orange-400",
      href: () => `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`,
    },
  ];

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

        {/* Article Images */}
        {article.imageItems && article.imageItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mb-8 space-y-2'>
            {/* Hero image */}
            <div>
              <div className='aspect-video rounded-2xl overflow-hidden relative'>
                <Image
                  src={article.imageItems[0].url}
                  alt={article.title}
                  fill
                  className='object-cover'
                  unoptimized
                />
              </div>
              {article.imageItems[0].caption && (
                <p className='text-sm text-slate-500 dark:text-slate-400 text-center mt-2 italic'>
                  {article.imageItems[0].caption}
                </p>
              )}
            </div>
            {/* Additional images */}
            {article.imageItems.length > 1 && (
              <div className={`grid gap-4 grid-cols-1 ${
                article.imageItems.length === 2 ? 'sm:grid-cols-2' :
                'sm:grid-cols-2 xl:grid-cols-3'
              }`}>
                {article.imageItems.slice(1).map((item, i) => (
                  <div key={i}>
                    <div className='aspect-video rounded-xl overflow-hidden relative'>
                      <Image
                        src={item.url}
                        alt={item.caption || `${article.title} image ${i + 2}`}
                        fill
                        className='object-cover'
                        unoptimized
                        sizes='(max-width: 640px) 100vw, 50vw'
                      />
                    </div>
                    {item.caption && (
                      <p className='text-xs text-slate-500 dark:text-slate-400 text-center mt-1 italic'>
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Share */}
        <div className='flex flex-wrap gap-4 mb-8'>
          {/* Mobile: native share tray */}
          <Button
            onClick={handleNativeShare}
            variant='outline'
            size='sm'
            className='gap-2 cursor-pointer sm:hidden'>
            <Share2 className='h-4 w-4' />
            Share Article
          </Button>

          {/* Desktop: popover with social options */}
          <div className='hidden sm:block'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='gap-2 cursor-pointer'>
                  <Share2 className='h-4 w-4' />
                  Share Article
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-52 p-2' align='start'>
                <p className='text-xs font-semibold text-muted-foreground px-2 py-1 mb-1'>Share via</p>
                <div className='space-y-0.5'>
                  {shareOptions.map((opt) => (
                    <a
                      key={opt.label}
                      href={opt.href()}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors text-slate-700 dark:text-slate-300 ${opt.color}`}>
                      {opt.icon}
                      {opt.label}
                    </a>
                  ))}
                  <button
                    onClick={copyLink}
                    className='w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'>
                    {copied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </motion.header>

      {/* Article Content */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <div className='w-full'>
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
                      {dayjs(relatedArticle._creationTime).format("MMMM DD, YYYY")}
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
