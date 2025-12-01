// components/news/NewsGrid.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Newspaper, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import dayjs from "dayjs";

const ARTICLES_PER_PAGE = 6;

export function NewsGrid() {
  const newsData = useQuery(api.news.getAllNews);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize the news data to prevent unnecessary re-renders
  const newsArticles = useMemo(() => newsData || [], [newsData]);

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return newsArticles;
    }

    const query = searchQuery.toLowerCase().trim();
    return newsArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
    );
  }, [newsArticles, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <section className='pt-4 pb-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='max-w-md mx-auto py-8'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search articles by title or content...'
              className='pl-10 pr-4 py-6 text-base dark:border-gray-700'
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'>
                ×
              </button>
            )}
          </div>
          {searchQuery && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-sm text-muted-foreground text-center mt-2'>
              Showing {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""} for &quot;{searchQuery}
              &quot;
            </motion.p>
          )}
        </motion.div>

        {/* No Results Message */}
        {filteredArticles.length === 0 && newsArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center py-16'>
            <div className='max-w-md mx-auto'>
              <Search className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-foreground mb-2'>
                No articles found
              </h3>
              <p className='text-muted-foreground mb-6'>
                We couldn&apos;t find any articles matching &quot;{searchQuery}
                &quot;. Try searching with different keywords or browse all
                articles.
              </p>
              <Button onClick={clearSearch} variant='outline'>
                Clear Search
              </Button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {newsData === undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-16'>
            <div className='max-w-md mx-auto'>
              <Newspaper className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-foreground mb-2'>
                Loading News...
              </h3>
              <p className='text-muted-foreground'>
                Fetching the latest news articles.
              </p>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        {currentArticles.length > 0 && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
              {currentArticles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className='group'>
                  <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full py-0'>
                    <CardContent className='p-0 h-full flex flex-col'>
                      {/* Article Image */}
                      <div className='aspect-video relative overflow-hidden bg-muted'>
                        {article.imageUrl ? (
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-secondary/20'>
                            <div className='text-center p-6'>
                              <Newspaper className='h-10 w-10 text-primary mx-auto mb-2' />
                              <p className='text-xs text-muted-foreground'>
                                Article Image
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Article Content */}
                      <div className='p-6 flex-1 flex flex-col'>
                        {/* Title */}
                        <h3 className='text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-3'>
                          {article.title}
                        </h3>

                        {/* Meta Information */}
                        <div className='space-y-2 mb-4'>
                          <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-3 w-3' />
                              <span>
                                {dayjs(article._creationTime).format(
                                  "MMMM DD, YYYY"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                       

                        {/* Read More */}
                        <Button
                          variant='outline'
                          size='sm'
                          className='w-full group-hover:bg-muted group-hover:text-muted-foreground transition-all duration-300 mt-auto hover:text-blue-500 hover:bg-blue-100'
                          asChild>
                          <Link href={`/news/${article.slug}`}>
                            Read Article
                            <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination - Only show if there are multiple pages */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className='flex flex-col sm:flex-row justify-center items-center gap-4 mt-12'>
                {/* Page Info */}
                <div className='text-sm text-muted-foreground'>
                  Page {currentPage} of {totalPages} • Showing{" "}
                  {currentArticles.length} of {filteredArticles.length} articles
                </div>

                {/* Pagination Controls */}
                <div className='flex justify-center items-center gap-2'>
                  {/* Previous Button */}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}>
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className='px-3 py-2 text-sm text-muted-foreground'>
                        ...
                      </span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size='sm'
                        onClick={() => goToPage(page as number)}
                        className={
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }>
                        {page}
                      </Button>
                    )
                  )}

                  {/* Next Button */}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}>
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State - No articles at all */}
        {newsData !== undefined &&
          newsArticles.length === 0 &&
          filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='text-center py-16'>
              <div className='max-w-md mx-auto'>
                <Newspaper className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-foreground mb-2'>
                  No News Articles Yet
                </h3>
                <p className='text-muted-foreground mb-6'>
                  Check back later for the latest news and updates from our
                  foundation.
                </p>
              </div>
            </motion.div>
          )}
      </div>
    </section>
  );
}
