// app/volunteer/page.tsx
'use client'

import { VolunteerForm } from "@/components/volunteer/VolunteerForm";
import { motion } from "framer-motion";
import { Clock, Users, Heart, Shield } from "lucide-react";



export default function VolunteerPage() {
  return (
    <div className='min-h-screen bg-white dark:bg-slate-900 pt-16'>
      <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12 lg:mb-16'>
          <h1 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6 text-slate-900 dark:text-white'>
            Join Our <span className='text-primary'>Volunteer</span> Team
          </h1>
          <p className='text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
            Make a meaningful impact in your community by volunteering with
            OKARANIME HERITAGE FOUNDATION. Fill out the form below to start your
            journey with us.
          </p>
        </motion.div>

        {/* Volunteer Form */}
        <div className='bg-slate-50 dark:bg-slate-800/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700'>
          <VolunteerForm />
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mt-16'>
          <h2 className='text-2xl font-black mb-8 text-slate-900 dark:text-white'>
            Why Volunteer With Us?
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700'>
              <div className='flex justify-center mb-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900'>
                  <Heart className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                </div>
              </div>
              <h3 className='font-bold text-lg mb-2 text-slate-900 dark:text-white'>
                Make a Difference
              </h3>
              <p className='text-slate-600 dark:text-slate-300 text-sm'>
                Directly impact lives and contribute to sustainable community
                development
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700'>
              <div className='flex justify-center mb-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
                  <Users className='h-6 w-6 text-green-600 dark:text-green-400' />
                </div>
              </div>
              <h3 className='font-bold text-lg mb-2 text-slate-900 dark:text-white'>
                Build Community
              </h3>
              <p className='text-slate-600 dark:text-slate-300 text-sm'>
                Connect with like-minded individuals and build lasting
                relationships
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700'>
              <div className='flex justify-center mb-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900'>
                  <Clock className='h-6 w-6 text-purple-600 dark:text-purple-400' />
                </div>
              </div>
              <h3 className='font-bold text-lg mb-2 text-slate-900 dark:text-white'>
                Flexible Commitment
              </h3>
              <p className='text-slate-600 dark:text-slate-300 text-sm'>
                Choose from various time commitments that fit your schedule
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className='bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700'>
              <div className='flex justify-center mb-4'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900'>
                  <Shield className='h-6 w-6 text-orange-600 dark:text-orange-400' />
                </div>
              </div>
              <h3 className='font-bold text-lg mb-2 text-slate-900 dark:text-white'>
                Gain Experience
              </h3>
              <p className='text-slate-600 dark:text-slate-300 text-sm'>
                Develop new skills and enhance your professional development
              </p>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className='bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 max-w-2xl mx-auto'>
            <h3 className='text-xl font-bold mb-4 text-slate-900 dark:text-white'>
              Need Help With Your Application?
            </h3>
            <p className='text-slate-600 dark:text-slate-300 mb-4'>
              Our volunteer coordination team is here to assist you with any
              questions about the application process.
            </p>
            <div className='space-y-2 text-sm text-slate-600 dark:text-slate-300'>
              <p>📧 Email: volunteers@okaranime.org</p>
              <p>📞 Phone: +234 (0) 913 486 1443</p>
              <p>🕒 Response Time: Within 2 business days</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
