// components/donate/DonationForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const presetAmounts = [5000, 10000, 25000, 50000, 100000];

export function DonationForm() {
  const [formData, setFormData] = useState({
    amount: "",
    customAmount: "",
    frequency: "one-time",
    name: "",
    email: "",
    phone: "",
    message: "",
    anonymous: false,
    receipt: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmountSelect = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate amount
    const amount = formData.customAmount || formData.amount;
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please select or enter a valid donation amount");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Donation submitted:", { ...formData, amount });
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to process donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-2xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className='bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 sm:p-12 shadow-lg'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex justify-center mb-6'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
                <CheckCircle className='h-8 w-8 text-green-600 dark:text-green-400' />
              </div>
            </motion.div>

            <h2 className='text-3xl font-black mb-4'>Donation Successful!</h2>

            <p className='text-muted-foreground mb-6 leading-relaxed'>
              Thank you for your generous donation to OKARANIME HERITAGE
              FOUNDATION. Your support will directly impact lives in our
              communities.
            </p>

            <div className='space-y-3 text-sm text-muted-foreground mb-8'>
              <p>📧 A receipt has been sent to {formData.email}</p>
              <p>
                📋 Your donation reference: OKA-
                {Date.now().toString().slice(-6)}
              </p>
              <p>💝 Thank you for being part of our mission</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button onClick={() => setIsSubmitted(false)} className='gap-2'>
                Make Another Donation
              </Button>
              <Button variant='outline' asChild>
                <a href='/impact'>See Our Impact</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Make Your <span className='text-primary'>Donation</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Fill out the form below to make your secure donation. All
            information is encrypted and protected.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg'>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'>
              <AlertCircle className='h-5 w-5' />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Donation Amount */}
            <div className='space-y-4'>
              <Label className='text-lg font-semibold'>
                Donation Amount (₦)
              </Label>

              {/* Preset Amounts */}
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
                {presetAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    type='button'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${
                      formData.amount === amount.toString()
                        ? "border-primary bg-primary/10 text-primary font-black"
                        : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                    }`}>
                    ₦{amount.toLocaleString()}
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div id='custom-amount' className='pt-4'>
                <Label
                  htmlFor='customAmount'
                  className='text-sm text-muted-foreground'>
                  Or enter custom amount:
                </Label>
                <Input
                  id='customAmount'
                  type='number'
                  placeholder='Enter amount in Naira'
                  value={formData.customAmount}
                  onChange={(e) => handleChange("customAmount", e.target.value)}
                  className='mt-2'
                  min='1'
                />
              </div>
            </div>

            {/* Donation Frequency */}
            <div className='space-y-4'>
              <Label className='text-lg font-semibold'>
                Donation Frequency
              </Label>
              <RadioGroup
                value={formData.frequency}
                onValueChange={(value) => handleChange("frequency", value)}
                className='flex flex-col sm:flex-row gap-4'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='one-time' id='one-time' />
                  <Label htmlFor='one-time' className='cursor-pointer'>
                    One-time Donation
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='monthly' id='monthly' />
                  <Label htmlFor='monthly' className='cursor-pointer'>
                    Monthly Recurring
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='quarterly' id='quarterly' />
                  <Label htmlFor='quarterly' className='cursor-pointer'>
                    Quarterly
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Personal Information */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Full Name *</Label>
                <Input
                  id='name'
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  placeholder='Enter your full name'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address *</Label>
                <Input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  placeholder='your.email@example.com'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  id='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder='+234 (0) 123 456 7890'
                />
              </div>
            </div>

            {/* Message */}
            <div className='space-y-2'>
              <Label htmlFor='message'>Message (Optional)</Label>
              <Textarea
                id='message'
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Add a personal message or specify how you'd like your donation to be used..."
                rows={3}
              />
            </div>

            {/* Options */}
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='anonymous'
                  checked={formData.anonymous}
                  onCheckedChange={(checked) =>
                    handleChange("anonymous", checked as boolean)
                  }
                />
                <Label htmlFor='anonymous' className='cursor-pointer text-sm'>
                  Make this donation anonymous
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='receipt'
                  checked={formData.receipt}
                  onCheckedChange={(checked) =>
                    handleChange("receipt", checked as boolean)
                  }
                />
                <Label htmlFor='receipt' className='cursor-pointer text-sm'>
                  Send me a receipt for tax purposes
                </Label>
              </div>
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
                    Processing Donation...
                  </>
                ) : (
                  <>
                    <CreditCard className='h-5 w-5' />
                    Donate Now
                  </>
                )}
              </Button>
            </motion.div>

            {/* Security Notice */}
            <p className='text-xs text-muted-foreground text-center'>
              🔒 Your donation is secure and encrypted. OKARANIME HERITAGE
              FOUNDATION will never share your personal information with third
              parties.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
