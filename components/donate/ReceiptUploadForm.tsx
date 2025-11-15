// components/donate/ReceiptUploadForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Upload, FileText, ArrowLeft } from "lucide-react";

interface ReceiptUploadFormProps {
  onSubmit: (data: {
    transactionId: string;
    paymentDate: string;
    receiptFile: File;
  }) => void;
  donationData: {
    amount: string;
    frequency: "one-time" | "monthly" | "quarterly";
    name: string;
    email: string;
    phone: string;
    paymentMethod: "bank-transfer" | "ussd" | "online";
  };
  onBack: () => void;
}

export function ReceiptUploadForm({
  onSubmit,
  donationData,
  onBack,
}: ReceiptUploadFormProps) {
  const [formData, setFormData] = useState({
    transactionId: "",
    paymentDate: "",
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a JPEG, PNG, or PDF file");
        return;
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setReceiptFile(file);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.transactionId.trim()) {
      setError("Please enter your transaction ID");
      return;
    }

    if (!formData.paymentDate) {
      setError("Please select the payment date");
      return;
    }

    if (!receiptFile) {
      setError("Please upload your payment receipt");
      return;
    }

    onSubmit({
      transactionId: formData.transactionId,
      paymentDate: formData.paymentDate,
      receiptFile: receiptFile,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}>
      <div className='flex items-center gap-4 mb-6'>
        <Button variant='outline' size='icon' onClick={onBack}>
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <div>
          <h3 className='text-2xl font-black'>Upload Payment Receipt</h3>
          <p className='text-muted-foreground'>
            Complete your donation by uploading proof of payment
          </p>
        </div>
      </div>

      {/* Donation Summary */}
      <div className='bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-6'>
        <h4 className='font-semibold mb-2'>Donation Summary</h4>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          <div>Amount:</div>
          <div className='font-semibold'>
            ₦{parseInt(donationData.amount).toLocaleString()}
          </div>
          <div>Frequency:</div>
          <div className='font-semibold capitalize'>
            {donationData.frequency}
          </div>
          <div>Payment Method:</div>
          <div className='font-semibold capitalize'>
            {donationData.paymentMethod.replace("-", " ")}
          </div>
        </div>
      </div>

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
        {/* Transaction Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label htmlFor='transactionId'>Transaction ID/Reference *</Label>
            <Input
              id='transactionId'
              value={formData.transactionId}
              onChange={(e) => handleChange("transactionId", e.target.value)}
              required
              placeholder='Enter transaction reference number'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='paymentDate'>Payment Date *</Label>
            <Input
              id='paymentDate'
              type='date'
              value={formData.paymentDate}
              onChange={(e) => handleChange("paymentDate", e.target.value)}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* File Upload */}
        <div className='space-y-4'>
          <Label htmlFor='receiptFile'>Payment Receipt *</Label>
          <input
            ref={fileInputRef}
            type='file'
            id='receiptFile'
            accept='.jpg,.jpeg,.png,.pdf'
            onChange={handleFileSelect}
            className='hidden'
          />

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className='border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors'>
            {receiptFile ? (
              <div className='space-y-2'>
                <FileText className='h-12 w-12 text-primary mx-auto' />
                <div className='font-semibold'>{receiptFile.name}</div>
                <div className='text-sm text-muted-foreground'>
                  {(receiptFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation();
                    setReceiptFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}>
                  Change File
                </Button>
              </div>
            ) : (
              <div className='space-y-2'>
                <Upload className='h-12 w-12 text-slate-400 mx-auto' />
                <div className='font-semibold'>Click to upload receipt</div>
                <div className='text-sm text-muted-foreground'>
                  JPEG, PNG, or PDF (Max 5MB)
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Instructions */}
        <div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800'>
          <h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
            📝 Upload Instructions
          </h4>
          <ul className='text-sm text-blue-800 dark:text-blue-200 space-y-1'>
            <li>• Ensure the receipt shows the transaction details clearly</li>
            <li>• File must be in JPEG, PNG, or PDF format</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Make sure the amount matches your donation</li>
          </ul>
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
            disabled={!receiptFile}>
            <Upload className='h-5 w-5' />
            Submit Donation
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
