"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Search, X, Plus } from "lucide-react";
import Image from "next/image";
import dayjs from "dayjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AddNewsModal } from "@/components/admin/AddNewsModal";
import { UpdateNewsModal } from "@/components/admin/UpdateNewsModal";
import { DeleteNewsModal } from "@/components/admin/DeleteNewsModal";
import AdminPagesHeader from "./AdminPagesHeader";

const NewsContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch news from Convex
  const newsData = useQuery(api.news.getAllNews);

  // Memoize the news data to prevent unnecessary re-renders
  const news = useMemo(() => newsData || [], [newsData]);

  // Filter news based on search query
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return news;

    const query = searchQuery.toLowerCase().trim();
    return news.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.slug.toLowerCase().includes(query)
    );
  }, [news, searchQuery]);

  return (
    <div className='min-h-screen bg-background pt-24 pb-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */} <AdminPagesHeader />
        <div className='pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-black text-foreground mb-2'>
              Latest News
            </h1>
          </div>

          <AddNewsModal>
            <Button className='gap-2 bg-primary hover:bg-primary/90'>
              <Plus className='h-4 w-4' />
              Add News
            </Button>
          </AddNewsModal>
        </div>
        {/* Search Section */}
        <div className='mb-8'>
          <div className='relative max-w-md'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search news by title, content, or slug...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10 pr-10 h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/20'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'>
                <X className='h-4 w-4' />
              </button>
            )}
          </div>
        </div>
        {/* News Grid */}
        <div className='grid gap-6'>
          {newsData === undefined ? (
            // Loading State
            <div className='flex flex-col items-center justify-center px-4 py-32 text-muted-foreground'>
              <div className='flex items-center gap-2 mb-2'>
                <Minus className='w-5 h-5 animate-spin' />
                <span className='text-lg'>Loading news...</span>
              </div>
              <p className='text-sm'>Fetching the latest updates</p>
            </div>
          ) : filteredNews.length === 0 ? (
            // Empty State
            <div className='text-center px-4 py-32'>
              <div className='max-w-sm mx-auto'>
                <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center'>
                  <Search className='h-8 w-8 text-muted-foreground' />
                </div>
                <h3 className='text-xl font-semibold text-foreground mb-2'>
                  {searchQuery ? "No news found" : "No news yet"}
                </h3>
                <p className='text-muted-foreground mb-6'>
                  {searchQuery
                    ? "Try adjusting your search terms or browse all news"
                    : "Check back later for updates and announcements"}
                </p>
                {searchQuery && (
                  <Button
                    variant='outline'
                    onClick={() => setSearchQuery("")}
                    className='gap-2'>
                    <X className='h-4 w-4' />
                    Clear search
                  </Button>
                )}
              </div>
            </div>
          ) : (
            // News Grid
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredNews.map((item) => (
                <article
                  key={item._id}
                  className='group rounded-2xl overflow-hidden shadow-sm border border-border bg-card hover:shadow-lg transition-all duration-300 hover:border-primary/20'>
                  {/* Image Section */}
                  <div className='relative w-full aspect-4/2 bg-muted'>
                    {item.imageUrl ? (
                      <Image
                        alt={item.title}
                        fill
                        src={item.imageUrl}
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-linear-to-br from-muted to-muted/50'>
                        <div className='text-center p-4'>
                          <div className='w-12 h-12 mx-auto mb-2 rounded-full bg-background/50 flex items-center justify-center'>
                            <Search className='h-6 w-6 text-muted-foreground' />
                          </div>
                          <p className='text-sm text-muted-foreground'>
                            No image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className='p-6 space-y-4'>
                    {/* Date */}
                    <p className='text-sm text-muted-foreground'>
                      {dayjs(item._creationTime).format("MMMM DD, YYYY")}
                    </p>

                    {/* Title */}
                    <h3 className='text-lg font-medium text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors'>
                      {item.title}
                    </h3>

                    <div className='flex gap-2 pt-4 border-t border-border'>
                      <UpdateNewsModal news={item}>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex-1 dark:hover:text-gray-400'>
                          Edit
                        </Button>
                      </UpdateNewsModal>
                      <DeleteNewsModal news={item}>
                        <Button
                          variant='destructive'
                          size='sm'
                          className='flex-1'>
                          Delete
                        </Button>
                      </DeleteNewsModal>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
        {/* Search Results Info */}
        {searchQuery && filteredNews.length > 0 && (
          <div className='mt-8 text-center'>
            <p className='text-muted-foreground'>
              Found {filteredNews.length} news item
              {filteredNews.length !== 1 ? "s" : ""} matching &quot;
              {searchQuery}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsContent;
