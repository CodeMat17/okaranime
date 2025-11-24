// components/donate/DonationProcess.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, CreditCard, Upload } from "lucide-react";

type DonationStep = "payment-details" | "receipt-upload" | "completed";

interface DonationData {
  amount: string;
  frequency: "one-time" | "monthly" | "quarterly";
  name: string;
  email: string;
  phone: string;
  message: string;
  anonymous: boolean;
  receiptRequired: boolean;
  paymentMethod: "bank-transfer" | "ussd" | "online";
  transactionId?: string;
  paymentDate?: string;
  receiptFile?: File;
}

export function DonationProcess() {
  const [currentStep, setCurrentStep] =
    useState<DonationStep>("payment-details");
  const [donationData, setDonationData] = useState<DonationData>({
    amount: "",
    frequency: "one-time",
    name: "",
    email: "",
    phone: "",
    message: "",
    anonymous: false,
    receiptRequired: true,
    paymentMethod: "bank-transfer",
  });

  const handlePaymentDetailsSubmit = (
    data: Omit<DonationData, "transactionId" | "paymentDate" | "receiptFile">
  ) => {
    setDonationData((prev) => ({ ...prev, ...data }));
    setCurrentStep("receipt-upload");
  };

  const handleReceiptUpload = (data: {
    transactionId: string;
    paymentDate: string;
    receiptFile: File;
  }) => {
    setDonationData((prev) => ({ ...prev, ...data }));
    setCurrentStep("completed");
  };

  const steps = [
    {
      id: "payment-details",
      name: "Payment Details",
      icon: CreditCard,
      status:
        currentStep === "payment-details"
          ? "current"
          : currentStep === "receipt-upload" || currentStep === "completed"
          ? "complete"
          : "upcoming",
    },
    {
      id: "receipt-upload",
      name: "Upload Receipt",
      icon: Upload,
      status:
        currentStep === "receipt-upload"
          ? "current"
          : currentStep === "completed"
          ? "complete"
          : "upcoming",
    },
    {
      id: "completed",
      name: "Completed",
      icon: CheckCircle2,
      status: currentStep === "completed" ? "current" : "upcoming",
    },
    ];
    
    

  return (
    <section
      id='donation-process'
      className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto'>
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6 text-center'>
            Donation <span className='text-primary'>Process</span>
          </h2>

          <div className='flex flex-col sm:flex-row items-center justify-between relative'>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className='flex items-center justify-center gap-8 flex-1 w-full sm:w-auto'>
                <div className='flex flex-col sm:flex-row items-center text-center sm:text-left mb-6'>
                  <div
                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      step.status === "complete"
                        ? "bg-primary border-primary text-white"
                        : step.status === "current"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-slate-300 dark:border-slate-600 text-slate-400"
                    }`}>
                    {step.status === "complete" ? (
                      <CheckCircle2 className='w-6 h-6' />
                    ) : (
                      <step.icon className='w-6 h-6' />
                    )}
                  </div>
                  <div className='mt-2 sm:mt-0 sm:ml-4'>
                    <div
                      className={`text-sm font-medium ${
                        step.status === "complete" || step.status === "current"
                          ? "text-primary"
                          : "text-slate-500"
                      }`}>
                      Step {index + 1}
                    </div>
                    <div className='text-sm font-semibold'>{step.name}</div>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block flex-1 h-0.5 mx-4 ${
                      steps[index + 1].status === "complete" ||
                      steps[index + 1].status === "current"
                        ? "bg-primary"
                        : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bank Details - Always Visible */}
        {/* <BankDetails /> */}

        {/* Form Steps */}
     <h1 className="text-center text-muted-foreground text-lg animate-pulse">Coming Soon!</h1>
      </div>
    </section>
  );
}
