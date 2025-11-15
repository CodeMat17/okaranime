// components/donate/DonationOptions.tsx
"use client";

import { motion } from "framer-motion";
import { CreditCard, Smartphone, Building, Mail } from "lucide-react";

const donationMethods = [
  {
    icon: CreditCard,
    title: "Online Payment",
    description: "Secure instant payment via credit/debit card",
    methods: ["Visa", "Mastercard", "Verve"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Bank Transfer",
    description: "Direct transfer to our bank account",
    methods: ["GTBank", "First Bank", "Zenith Bank"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Building,
    title: "USSD Payment",
    description: "Quick payment using your mobile phone",
    methods: ["*737#", "*906#", "*822#"],
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Mail,
    title: "Check/Cash",
    description: "Traditional payment methods",
    methods: ["Office Drop-off", "Mobile Money"],
    color: "from-purple-500 to-violet-500",
  },
];

export function DonationOptions() {
  return (
    <section
      id='donation-options'
      className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Choose Your <span className='text-primary'>Payment</span> Method
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            We offer multiple secure payment options to make your donation
            process convenient and accessible from anywhere.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
          {donationMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className='group'>
              <div className='bg-white dark:bg-slate-900 rounded-2xl p-6 text-center h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent group-hover:border-primary/20'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r ${method.color}`}>
                  <method.icon className='h-6 w-6 text-white' />
                </motion.div>

                <h3 className='text-xl font-black mb-3 group-hover:text-primary transition-colors'>
                  {method.title}
                </h3>

                <p className='text-muted-foreground text-sm mb-4 leading-relaxed'>
                  {method.description}
                </p>

                <div className='space-y-1'>
                  {method.methods.map((m) => (
                    <div
                      key={m}
                      className='text-sm font-medium text-foreground'>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bank Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-12 bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-2xl mx-auto'>
          <h3 className='text-2xl font-black text-center mb-6'>
            Bank Transfer Details
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm'>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Bank Name:</span>
                <span className='font-semibold'>GTBank</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Account Name:</span>
                <span className='font-semibold'>
                  OKARANIME HERITAGE FOUNDATION
                </span>
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Account Number:</span>
                <span className='font-semibold'>0123456789</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Sort Code:</span>
                <span className='font-semibold'>058</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
