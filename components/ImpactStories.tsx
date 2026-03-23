"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const DEFAULTS = {
  title: "Impact Stories",
  subtitle: "Real Lives Changed Through Our Programs",
  stories: [
    {
      name: "Aisha",
      role: "Entrepreneur",
      story:
        "Through the women's empowerment program, I gained skills to start my own business and now support my family independently.",
    },
    {
      name: "John",
      role: "Green Entrepreneur",
      story:
        "The youth sustainability program helped me launch an eco-friendly business that creates jobs in my community.",
    },
    {
      name: "Maria",
      role: "Artist",
      story:
        "Discovered through our talent hunt, Maria now shares her artistic talents with the world and mentors other young artists.",
    },
  ],
};

function ImpactStoriesSkeleton() {
  return (
    <section className='py-20 px-4'>
      <div className='w-full max-w-4xl mx-auto'>
        <div className='text-center mb-16 flex flex-col items-center gap-4'>
          <div className='h-10 w-56 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse' />
          <div className='h-6 w-72 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
        </div>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {[0, 1, 2].map((i) => (
            <div key={i} className='rounded-xl shadow-lg overflow-hidden'>
              <div className='h-48 bg-slate-200 dark:bg-slate-700 animate-pulse' />
              <div className='p-6 space-y-3'>
                <div className='h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                <div className='h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
                <div className='h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ImpactStories() {
  const doc = useQuery(api.siteContent.getSection, { section: "impact_stories" });

  if (doc === undefined) return <ImpactStoriesSkeleton />;

  const title = doc?.title ?? DEFAULTS.title;
  const subtitle = doc?.subtitle ?? DEFAULTS.subtitle;

  let stories = DEFAULTS.stories;
  if (doc?.body) {
    try {
      const parsed = JSON.parse(doc.body);
      if (Array.isArray(parsed) && parsed.length > 0) stories = parsed;
    } catch { /* use defaults */ }
  }

  return (
    <section className='py-20 px-4'>
      <div className='w-full max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'>
          <h2 className='text-3xl font-bold sm:text-4xl'>{title}</h2>
          <p className='mt-4 text-xl text-muted-foreground max-w-2xl mx-auto'>{subtitle}</p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}>
              <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden'>
                <div className='relative h-48 bg-linear-to-br from-primary/20 to-secondary/20'>
                  <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors' />
                  <div className='absolute bottom-4 left-4'>
                    <Quote className='h-8 w-8 text-primary' />
                  </div>
                </div>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-semibold mb-2'>{story.name}</h3>
                  <p className='text-muted-foreground mb-2'>{story.role}</p>
                  <p className='text-foreground/80 italic'>&quot;{story.story}&quot;</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className='text-center mt-12'>
          <Button size='lg' variant='outline' asChild>
            <a href='/impact'>
              View All Stories
              <ArrowRight className='ml-2 h-5 w-5' />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
