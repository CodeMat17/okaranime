"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  cooperative: z.string().min(1, "Please select a cooperative"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ApplyForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <motion.div
      className='max-w-lg mx-auto bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 space-y-6'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}>
      <h2 className='text-2xl font-semibold text-center text-gray-900 dark:text-gray-100'>
        Apply for Membership
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input
            id='fullName'
            placeholder='Enter your full name'
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='you@example.com'
            {...register("email")}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            id='phone'
            placeholder='e.g. +2348012345678'
            {...register("phone")}
          />
          {errors.phone && (
            <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='cooperative'>Select Cooperative</Label>
          <Select onValueChange={(value) => setValue("cooperative", value)}>
            <SelectTrigger id='cooperative'>
              <SelectValue placeholder='Choose cooperative' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='nfvcb'>NFVCB Primary Cooperative</SelectItem>
              <SelectItem value='nasenicoop'>NASENI Cooperative</SelectItem>
              <SelectItem value='nipsscoop'>NIPSS Cooperative</SelectItem>
              <SelectItem value='other'>Other Cooperatives</SelectItem>
            </SelectContent>
          </Select>
          {errors.cooperative && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.cooperative.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='message'>Message (Optional)</Label>
          <Input
            id='message'
            placeholder='Add a short message'
            {...register("message")}
          />
        </div>

        <motion.div whileTap={{ scale: 0.97 }}>
          <Button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full'>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
