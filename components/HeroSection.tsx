"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Users, Heart } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-teal-950 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16 pt-24 lg:pt-28'>
      {/* Animated Background Elements - Mobile Optimized */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          className='absolute top-10 left-4 h-12 w-12 sm:top-20 sm:left-10 sm:h-20 sm:w-20 text-primary/20'
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}>
          <Star className='h-full w-full' />
        </motion.div>

        <motion.div
          className='absolute top-20 right-4 h-10 w-10 sm:top-40 sm:right-20 sm:h-16 sm:w-16 text-primary/15'
          animate={{
            y: [0, 20, 0],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}>
          <Heart className='h-full w-full' />
        </motion.div>

        <motion.div
          className='absolute bottom-20 left-4 h-8 w-8 sm:bottom-40 sm:left-20 sm:h-12 sm:w-12 text-primary/10'
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}>
          <Users className='h-full w-full' />
        </motion.div>
      </div>

      <div className='w-full max-w-6xl mx-auto relative z-10'>
        <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start'>
          {/* Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 lg:order-1'>
            {/* Main Heading */}
            <div className='space-y-3 sm:space-y-4 lg:space-y-6'>
              <motion.h1
                className='text-3xl font-black tracking-tight xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight sm:leading-tight lg:leading-tight'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
                Empowering{" "}
                <motion.span
                  className='bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent block mt-1 sm:mt-2'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}>
                  The Future
                </motion.span>
              </motion.h1>

              <motion.p
                className='text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed sm:leading-relaxed font-medium px-2 sm:px-0'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}>
                Transforming lives through sustainable programs, skill
                development, and talent discovery for youth and handicapped
                women in underserved communities.
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex-1 sm:flex-none'>
                <Button
                  size='lg'
                  className='gap-2 sm:gap-3 text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 font-semibold'
                  asChild>
                  <a href='/donate'>
                    Donate Now
                    <ArrowRight className='h-4 w-4 sm:h-5 sm:w-5' />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex-1 sm:flex-none'>
                <Button
                  size='lg'
                  variant='outline'
                  className='gap-2 sm:gap-3 text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 font-semibold border-2 hover:text-white dark:hover:text-gray-400'
                  asChild>
                  <a href='/about#mission'>
                    Our Mission
                    <Play className='h-4 w-4 sm:h-5 sm:w-5' />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className='grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 pt-4 sm:pt-6 lg:pt-8'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}>
              {[
                { number: "500+", label: "Youth Empowered" },
                { number: "200+", label: "Women Trained" },
                { number: "100+", label: "Talents Found" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className='text-center p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.2 + index * 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}>
                  <div className='text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-primary'>
                    {stat.number}
                  </div>
                  <div className='text-xs text-muted-foreground font-medium mt-1 leading-tight'>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className='relative order-1 lg:order-2 mb-6 sm:mb-8 lg:mb-0'>
            <div className='relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl '>
              {/* Main Image Container */}
              <motion.div
                className='w-full max-w-[900px] max-h-[450px] aspect-square relative bg-linear-to-br from-primary/20 to-secondary/20'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}>
                <Image
                  priority
                  alt='OKARANIME Heritage Foundation - Empowering Youth and Women'
                  src='/hero-img.webp'
                  width={800}
                  height={800}
                  className='object-cover w-full h-full'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                />

                {/* Floating Elements - Hidden on mobile for better performance */}
                <motion.div
                  className='hidden sm:block absolute top-3 sm:top-4 right-3 sm:right-4 h-6 w-6 sm:h-8 sm:w-8 bg-yellow-400 rounded-full shadow-lg'
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className='hidden sm:block absolute bottom-4 sm:bottom-6 left-4 sm:left-6 h-5 w-5 sm:h-6 sm:w-6 bg-green-400 rounded-full shadow-lg'
                  animate={{
                    y: [0, 6, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>
            </div>

            {/* Decorative Elements - Hidden on mobile */}
            <motion.div
              className='hidden sm:block absolute -top-3 -left-3 sm:-top-4 sm:-left-4 h-16 w-16 sm:h-24 sm:w-24 bg-primary/10 rounded-2xl sm:rounded-3xl -z-10'
              animate={{
                rotate: [0, 45, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className='hidden sm:block absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 h-20 w-20 sm:h-32 sm:w-32 bg-secondary/10 rounded-2xl sm:rounded-3xl -z-10'
              animate={{
                rotate: [45, 0, 45],
                scale: [1.05, 1, 1.05],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </motion.div>
        </div>
      </div>

   
    </section>
  );
}
