// components/donate/BankDetails.tsx
"use client";

import { motion } from "framer-motion";
import { Banknote, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const bankAccounts = [
  {
    bank: "GTBank",
    accountName: "OKARANIME HERITAGE FOUNDATION",
    accountNumber: "0123456789",
    type: "Current Account",
  },
  {
    bank: "First Bank",
    accountName: "OKARANIME HERITAGE FOUNDATION",
    accountNumber: "9876543210",
    type: "Savings Account",
  },
];

export function BankDetails() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, accountNumber: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountNumber);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id='bank-details'
      className='mb-8 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-primary/20'>
      <div className='flex items-center gap-3 mb-6'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
          <Banknote className='h-5 w-5' />
        </div>
        <div>
          <h3 className='text-xl font-black'>Bank Transfer Details</h3>
          <p className='text-muted-foreground text-sm'>
            Transfer to any of our bank accounts
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {bankAccounts.map((account, index) => (
          <motion.div
            key={account.bank}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className='space-y-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800'>
            <div className='flex justify-between items-start'>
              <h4 className='font-semibold text-lg'>{account.bank}</h4>
              <span className='text-xs px-2 py-1 bg-primary/10 text-primary rounded-full'>
                {account.type}
              </span>
            </div>

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>Account Name:</span>
                <span className='font-medium'>{account.accountName}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-muted-foreground'>Account Number:</span>
                <div className='flex items-center gap-2'>
                  <span className='font-mono font-bold'>
                    {account.accountNumber}
                  </span>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() =>
                      copyToClipboard(
                        account.accountNumber,
                        account.accountNumber
                      )
                    }
                    className='h-8 w-8 p-0'>
                    {copiedAccount === account.accountNumber ? (
                      <CheckCircle2 className='h-4 w-4 text-green-600' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className='mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800'>
        <p className='text-sm text-amber-800 dark:text-amber-200 text-center'>
          💡 <strong>Important:</strong> Please use your name as the transfer
          reference and upload the payment receipt in the next step for proper
          tracking.
        </p>
      </motion.div>
    </motion.div>
  );
}
