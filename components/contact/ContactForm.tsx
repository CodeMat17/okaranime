// components/contact/ContactForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const inquiryTypes = [
  "General Inquiry",
  "Partnership Opportunity",
  "Volunteer Application",
  "Program Information",
  "Donation Question",
  "Media Inquiry",
  "Event Collaboration",
  "Other",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real application, you would send the data to your backend
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        id='contact-form'
        className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-2xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className='bg-white dark:bg-slate-900 rounded-2xl p-8 sm:p-12 shadow-lg'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex justify-center mb-6'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
                <CheckCircle className='h-8 w-8 text-green-600 dark:text-green-400' />
              </div>
            </motion.div>

            <h2 className='text-3xl font-black mb-4'>
              Message Sent Successfully!
            </h2>

            <p className='text-muted-foreground mb-6 leading-relaxed'>
              Thank you for reaching out to OKARANIME HERITAGE FOUNDATION.
              We&apos;ve received your message and will get back to you within
              24 hours.
            </p>

            <div className='space-y-3 text-sm text-muted-foreground mb-8'>
              <p>📧 A confirmation email has been sent to {formData.email}</p>
              <p>⏰ Our team typically responds within 24 hours</p>
              <p>📞 For urgent matters, call us at +234 (0) 123 456 7890</p>
            </div>

            <Button onClick={() => setIsSubmitted(false)} className='gap-2'>
              Send Another Message
              <Send className='h-4 w-4' />
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id='contact-form'
      className='py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Send Us a <span className='text-primary'>Message</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Fill out the form below and we&apos;ll get back to you as soon as
            possible. All fields are required to help us serve you better.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg'>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'>
              <AlertCircle className='h-5 w-5' />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Personal Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>First Name *</Label>
                <Input
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder='Enter your first name'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='lastName'>Last Name *</Label>
                <Input
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder='Enter your last name'
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address *</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder='your.email@example.com'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='+234 (0) 123 456 7890'
                />
              </div>
            </div>

            {/* Organization and Inquiry Type */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='organization'>Organization</Label>
                <Input
                  id='organization'
                  name='organization'
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder='Your company or organization'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='inquiryType'>Inquiry Type *</Label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={handleSelectChange}
                  required>
                  <SelectTrigger>
                    <SelectValue placeholder='Select inquiry type' />
                  </SelectTrigger>
                  <SelectContent>
                    {inquiryTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className='space-y-2'>
              <Label htmlFor='message'>Message *</Label>
              <Textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                placeholder='Tell us about your inquiry, partnership interest, or how we can help you...'
                rows={6}
                className='resize-none'
              />
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='pt-4'>
              <Button
                type='submit'
                size='lg'
                className='w-full gap-3'
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className='h-5 w-5' />
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>

            {/* Privacy Notice */}
            <p className='text-xs text-muted-foreground text-center'>
              By submitting this form, you agree to our privacy policy and
              consent to being contacted by OKARANIME HERITAGE FOUNDATION
              regarding your inquiry.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
