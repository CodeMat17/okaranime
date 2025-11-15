// components/donate/PaymentDetailsForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, AlertCircle } from "lucide-react";

interface PaymentDetailsFormProps {
  onSubmit: (data: {
    amount: string;
    frequency: "one-time" | "monthly" | "quarterly";
    name: string;
    email: string;
    phone: string;
    message: string;
    anonymous: boolean;
    receiptRequired: boolean;
    paymentMethod: "bank-transfer" | "ussd" | "online";
  }) => void;
  initialData: {
    amount: string;
    frequency: "one-time" | "monthly" | "quarterly";
    name: string;
    email: string;
    phone: string;
    message: string;
    anonymous: boolean;
    receiptRequired: boolean;
    paymentMethod: "bank-transfer" | "ussd" | "online";
  };
}

const presetAmounts = [5000, 10000, 25000, 50000, 100000];

export function PaymentDetailsForm({
  onSubmit,
  initialData,
}: PaymentDetailsFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState("");

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmountSelect = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please select or enter a valid donation amount");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address");
      return;
    }

    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}>
      <h3 className='text-2xl font-black mb-6'>Payment Details</h3>

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
        {/* Donation Amount */}
        <div className='space-y-4'>
          <Label className='text-lg font-semibold'>Donation Amount (₦)</Label>

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
          <div className='pt-4'>
            <Label
              htmlFor='customAmount'
              className='text-sm text-muted-foreground'>
              Or enter custom amount:
            </Label>
            <Input
              id='customAmount'
              type='number'
              placeholder='Enter amount in Naira'
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              className='mt-2'
              min='1'
            />
          </div>
        </div>

        {/* Donation Frequency */}
        <div className='space-y-4'>
          <Label className='text-lg font-semibold'>Donation Frequency</Label>
          <RadioGroup
            value={formData.frequency}
            onValueChange={(value: "one-time" | "monthly" | "quarterly") =>
              handleChange("frequency", value)
            }
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

        {/* Payment Method */}
        <div className='space-y-4'>
          <Label className='text-lg font-semibold'>Payment Method</Label>
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value: "bank-transfer" | "ussd" | "online") =>
              handleChange("paymentMethod", value)
            }
            className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='flex items-center space-x-2 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700'>
              <RadioGroupItem value='bank-transfer' id='bank-transfer' />
              <Label
                htmlFor='bank-transfer'
                className='cursor-pointer font-medium'>
                Bank Transfer
              </Label>
            </div>
            <div className='flex items-center space-x-2 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700'>
              <RadioGroupItem value='ussd' id='ussd' />
              <Label htmlFor='ussd' className='cursor-pointer font-medium'>
                USSD Payment
              </Label>
            </div>
            <div className='flex items-center space-x-2 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700'>
              <RadioGroupItem value='online' id='online' />
              <Label htmlFor='online' className='cursor-pointer font-medium'>
                Online Payment
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
              onCheckedChange={(checked: boolean) =>
                handleChange("anonymous", checked)
              }
            />
            <Label htmlFor='anonymous' className='cursor-pointer text-sm'>
              Make this donation anonymous
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='receiptRequired'
              checked={formData.receiptRequired}
              onCheckedChange={(checked: boolean) =>
                handleChange("receiptRequired", checked)
              }
            />
            <Label htmlFor='receiptRequired' className='cursor-pointer text-sm'>
              Send me a receipt for tax purposes
            </Label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='pt-4'>
          <Button type='submit' size='lg' className='w-full gap-3'>
            <CreditCard className='h-5 w-5' />
            Proceed to Upload Receipt
          </Button>
        </motion.div>

        {/* Security Notice */}
        <p className='text-xs text-muted-foreground text-center'>
          🔒 Your information is secure and encrypted. OKARANIME HERITAGE
          FOUNDATION will never share your personal information with third
          parties.
        </p>
      </form>
    </motion.div>
  );
}
