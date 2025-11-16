// components/contact/FAQSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How quickly can I expect a response to my inquiry?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our emergency contact number for immediate assistance.",
  },
  {
    question: "Do I need to schedule an appointment to visit your offices?",
    answer:
      "While walk-ins are welcome, we recommend scheduling an appointment to ensure the right team members are available to assist you. You can schedule through our contact form or by calling your preferred location.",
  },
  {
    question: "What types of partnerships are you currently seeking?",
    answer:
      "We're always open to various partnership opportunities including corporate sponsorships, program collaborations, volunteer partnerships, and in-kind donations. Please specify your interest in the contact form for faster routing.",
  },
  {
    question: "How can I volunteer with OKARANIME HERITAGE FOUNDATION?",
    answer:
      "We welcome volunteers in various capacities including program facilitation, administrative support, and event coordination. Please indicate your interest in volunteering in the contact form, and our volunteer coordinator will reach out with current opportunities.",
  },
  {
    question: "Do you offer internships or youth service opportunities?",
    answer:
      "Yes! We offer internship positions for students and recent graduates, as well as youth service opportunities through various programs. These positions are typically announced on our website and social media channels.",
  },
  {
    question: "How can I make a donation to support your programs?",
    answer:
      "You can make donations through our website's donation page, via bank transfer, or by visiting any of our offices. All donations are tax-deductible and you'll receive a receipt for your records.",
  },
  {
    question: "Do you provide emergency assistance or crisis support?",
    answer:
      "While our primary focus is on sustainable empowerment programs, we do provide emergency assistance in partnership with local agencies. Please contact us directly for urgent support needs.",
  },
  {
    question: "Can I visit your program sites to see your work in action?",
    answer:
      "Absolutely! We encourage site visits for potential partners and donors. Please contact us to arrange a guided visit to any of our program locations.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4'>
            <HelpCircle className='h-4 w-4' />
            Frequently Asked Questions
          </motion.div>

          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Common <span className='text-primary'>Questions</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Find quick answers to the most commonly asked questions about our
            foundation, programs, and how to get involved.
          </p>
        </motion.div>

        <div className='space-y-4 mb-12'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700'>
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors'>
                <h3 className='font-semibold text-lg text-foreground pr-4'>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className='shrink-0'>
                  {openIndex === index ? (
                    <ChevronUp className='h-5 w-5 text-primary' />
                  ) : (
                    <ChevronDown className='h-5 w-5 text-muted-foreground' />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className='overflow-hidden'>
                    <div className='px-6 pb-4'>
                      <p className='text-muted-foreground leading-relaxed'>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className='bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl sm:rounded-3xl p-8 text-center'>
          <MessageCircle className='h-12 w-12 text-primary mx-auto mb-4' />
          <h3 className='text-2xl font-black mb-2'>Still Have Questions?</h3>
          <p className='text-muted-foreground max-w-2xl mx-auto mb-6'>
            Can&apos;t find the answer you&apos;re looking for? Our team is here
            to help with any additional questions you might have.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' asChild>
              <a href='#contact-form'>Ask Your Question</a>
            </Button>
            <Button size='lg' variant='outline' asChild>
              <a href='mailto:email@okaranime.com.ng'>Email Support</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
