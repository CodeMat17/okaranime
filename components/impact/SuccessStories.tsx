// components/impact/SuccessStories.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Play, ArrowRight, MapPin, Users } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Stella Mbah",
    age: 28,
    location: "Lagos, Nigeria",
    program: "Women's Empowerment",
    story:
      "As a handicapped woman, I struggled to find employment. Through OKARANIME's skill acquisition program, I learned tailoring and received seed funding to start my business. Today, I employ three other women and support my family independently.",
    image: "/stories/aisha.jpg",
    achievement: "Business Owner",
    duration: "6 months",
    impact: "Employs 3 other women",
  },
  {
    id: 2,
    name: "John Chukwu",
    age: 22,
    location: "Enugu, Nigeria",
    program: "Youth Empowerment",
    story:
      "After completing the sustainable agriculture program, I started an organic vegetable farm. With the business training and market access support, I now supply three local markets and train other young farmers in my community.",
    image: "/stories/john.jpg",
    achievement: "Agribusiness Owner",
    duration: "8 months",
    impact: "Trains 5 other farmers",
  },
  {
    id: 3,
    name: "Fatima Ani",
    age: 16,
    location: "Imo, Nigeria",
    program: "Talent Discovery",
    story:
      "I always loved drawing but never had the opportunity to develop my talent. The talent discovery program identified my artistic abilities and provided me with art supplies and mentorship. I recently won a regional art competition!",
    image: "/stories/fatima.jpg",
    achievement: "Award-winning Artist",
    duration: "Ongoing",
    impact: "Art competition winner",
  },
  {
    id: 4,
    name: "Maria Okon",
    age: 32,
    location: "Port Harcourt, Nigeria",
    program: "Digital Literacy",
    story:
      "As a single mother, I wanted to create additional income. The digital literacy program taught me online marketing skills. I now run a successful online store selling handmade crafts and can better support my children's education.",
    image: "/stories/maria.jpg",
    achievement: "E-commerce Entrepreneur",
    duration: "3 months",
    impact: "Tripled monthly income",
  },
];

export function SuccessStories() {
  return (
    <section
      id='stories'
      className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Success <span className='text-primary'>Stories</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Real people, real transformations. Meet some of the incredible
            individuals whose lives have been changed through our programs.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}>
              <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden'>
                <CardContent className='p-0'>
                  <div className='grid md:grid-cols-3 gap-6 p-6'>
                    {/* Story Image/Icon */}
                    <div className='md:col-span-1 flex flex-col items-center text-center'>
                      <div className='w-20 h-20 rounded-full bg-linear-to-r from-primary to-primary/70 flex items-center justify-center mb-4'>
                        <Users className='h-10 w-10 text-white' />
                      </div>
                      <h3 className='text-lg font-black mb-1'>{story.name}</h3>
                      <p className='text-primary font-semibold text-sm mb-2'>
                        {story.achievement}
                      </p>
                      <div className='flex items-center gap-1 text-xs text-muted-foreground mb-1'>
                        <MapPin className='h-3 w-3' />
                        {story.location}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Age: {story.age}
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className='md:col-span-2 space-y-4'>
                      <div className='flex items-start gap-2'>
                        <Quote className='h-5 w-5 text-primary mt-1 flex-shrink-0' />
                        <p className='text-muted-foreground leading-relaxed italic'>
                          &quot;{story.story}&quot;
                        </p>
                      </div>

                      {/* Story Details */}
                      <div className='grid grid-cols-2 gap-4 pt-2'>
                        <div className='text-center p-3 rounded-lg bg-slate-100 dark:bg-slate-800'>
                          <div className='text-sm font-semibold text-foreground'>
                            Program
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {story.program}
                          </div>
                        </div>
                        <div className='text-center p-3 rounded-lg bg-slate-100 dark:bg-slate-800'>
                          <div className='text-sm font-semibold text-foreground'>
                            Duration
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            {story.duration}
                          </div>
                        </div>
                      </div>

                      {/* Impact Highlight */}
                      <div className='bg-primary/10 rounded-lg p-3'>
                        <div className='text-sm font-semibold text-primary'>
                          Key Achievement
                        </div>
                        <div className='text-xs text-muted-foreground'>
                          {story.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

    
      </div>
    </section>
  );
}
