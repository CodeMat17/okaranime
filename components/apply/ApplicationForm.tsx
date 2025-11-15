// components/apply/ApplicationForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import {
  nigerianStatesWithLGA,
  programOptions,
  skillOptions,
  NigerianState,
} from "@/data/nigerianStatesData";

interface ApplicationFormData {
  // Personal Information
  title: string;
  firstName: string;
  surname: string;
  gender: string;
  hasDisability: string;
  disabilitySpecification: string;
  homeAddress: string;
  stateOfOrigin: string;
  lga: string;
  community: string;
  email: string;
  phoneNumber: string;

  // Background Information
  hasConviction: string;
  hasRelative: string;
  relativeName: string;
  isEnrolled: string;
  hasSkills: string;
  desiredSkill: string;

  // Program Selection
  programInterest: string;
  motivation: string;
  futureGoals: string;

  // Terms
  agreeToTerms: boolean;
  agreeToDataProcessing: boolean;
}

export function ApplicationForm() {
  const [formData, setFormData] = useState<ApplicationFormData>({
    title: "",
    firstName: "",
    surname: "",
    gender: "",
    hasDisability: "",
    disabilitySpecification: "",
    homeAddress: "",
    stateOfOrigin: "",
    lga: "",
    community: "",
    email: "",
    phoneNumber: "",
    hasConviction: "",
    hasRelative: "",
    relativeName: "",
    isEnrolled: "",
    hasSkills: "",
    desiredSkill: "",
    programInterest: "",
    motivation: "",
    futureGoals: "",
    agreeToTerms: false,
    agreeToDataProcessing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Get LGAs based on selected state
  const getLgasForState = (stateName: string): string[] => {
    const state = nigerianStatesWithLGA.find(
      (s: NigerianState) => s.name === stateName
    );
    return state ? state.lgas : [];
  };

  const handleChange = (
    field: keyof ApplicationFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStateChange = (state: string) => {
    setFormData((prev) => ({
      ...prev,
      stateOfOrigin: state,
      lga: "", // Reset LGA when state changes
      community: "", // Reset community when state changes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic validation
    if (!formData.agreeToTerms || !formData.agreeToDataProcessing) {
      setError("Please agree to the terms and conditions");
      setIsSubmitting(false);
      return;
    }

    if (
      !formData.firstName ||
      !formData.surname ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.stateOfOrigin ||
      !formData.lga ||
      !formData.community
    ) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Application submitted:", formData);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        id='application-form'
        className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center'>
            <div className='flex justify-center mb-6'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
                <CheckCircle2 className='h-8 w-8 text-green-600 dark:text-green-400' />
              </div>
            </div>

            <h2 className='text-3xl font-black mb-4 text-slate-900 dark:text-white'>
              Application Submitted!
            </h2>

            <p className='text-slate-600 dark:text-slate-300 mb-6 leading-relaxed max-w-md mx-auto'>
              Thank you for applying to OKARANIME HERITAGE FOUNDATION.
              We&apos;ve received your application and will review it carefully.
            </p>

            <div className='space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto'>
              <p>📧 A confirmation has been sent to {formData.email}</p>
              <p>⏰ We&apos;ll contact you within 5-7 business days</p>
              <p>📞 Ensure your phone number is active for follow-up</p>
              <p>🎯 Prepare for the next steps in our selection process</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    title: "",
                    firstName: "",
                    surname: "",
                    gender: "",
                    hasDisability: "",
                    disabilitySpecification: "",
                    homeAddress: "",
                    stateOfOrigin: "",
                    lga: "",
                    community: "",
                    email: "",
                    phoneNumber: "",
                    hasConviction: "",
                    hasRelative: "",
                    relativeName: "",
                    isEnrolled: "",
                    hasSkills: "",
                    desiredSkill: "",
                    programInterest: "",
                    motivation: "",
                    futureGoals: "",
                    agreeToTerms: false,
                    agreeToDataProcessing: false,
                  });
                }}
                className='gap-2'>
                Submit Another Application
              </Button>
              <Button variant='outline' asChild>
                <a href='/programs'>View Programs</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentStateLgas = getLgasForState(formData.stateOfOrigin);

  return (
    <section
      id='application-form'
      className='py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-12 lg:mb-16'>
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6 text-slate-900 dark:text-white'>
            Application <span className='text-primary'>Form</span>
          </h2>
          <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
            Fill out the form below to apply for our empowerment programs. All
            fields marked with * are required.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className='bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700'>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'>
              <AlertCircle className='h-5 w-5' />
              <span className='font-medium'>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Personal Information Section */}
            <div className='space-y-6'>
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
                Personal Information
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Title */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='title'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Title *
                  </Label>
                  <Select
                    value={formData.title}
                    onValueChange={(value) => handleChange("title", value)}>
                    <SelectTrigger className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500'>
                      <SelectValue
                        placeholder='Select title'
                        className='text-slate-500 dark:text-slate-400'
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600'>
                      <SelectItem
                        value='Mr'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Mr
                      </SelectItem>
                      <SelectItem
                        value='Mrs'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Mrs
                      </SelectItem>
                      <SelectItem
                        value='Miss'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Miss
                      </SelectItem>
                      <SelectItem
                        value='Dr'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Dr
                      </SelectItem>
                      <SelectItem
                        value='Prof'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Prof
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* First Name */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='firstName'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    First Name *
                  </Label>
                  <Input
                    id='firstName'
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                    placeholder='Enter your first name'
                    className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary'
                  />
                </div>

                {/* Surname */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='surname'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Surname *
                  </Label>
                  <Input
                    id='surname'
                    value={formData.surname}
                    onChange={(e) => handleChange("surname", e.target.value)}
                    required
                    placeholder='Enter your surname'
                    className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Gender */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='gender'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Gender *
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500'>
                      <SelectValue
                        placeholder='Select gender'
                        className='text-slate-500 dark:text-slate-400'
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600'>
                      <SelectItem
                        value='Male'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Male
                      </SelectItem>
                      <SelectItem
                        value='Female'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Female
                      </SelectItem>
                      <SelectItem
                        value='Other'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Other
                      </SelectItem>
                      <SelectItem
                        value='Prefer not to say'
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Disability */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Do you have any disability? *
                  </Label>
                  <RadioGroup
                    value={formData.hasDisability}
                    onValueChange={(value) =>
                      handleChange("hasDisability", value)
                    }
                    className='flex gap-6'>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='yes'
                        id='disability-yes'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='disability-yes'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='no'
                        id='disability-no'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='disability-no'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.hasDisability === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-2 pt-2'>
                      <Label
                        htmlFor='disabilitySpecification'
                        className='text-slate-700 dark:text-slate-300 font-medium'>
                        Please specify your disability
                      </Label>
                      <Input
                        id='disabilitySpecification'
                        value={formData.disabilitySpecification}
                        onChange={(e) =>
                          handleChange(
                            "disabilitySpecification",
                            e.target.value
                          )
                        }
                        placeholder='Describe your disability'
                        className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary'
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Home Address */}
              <div className='space-y-2'>
                <Label
                  htmlFor='homeAddress'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  Home Address *
                </Label>
                <Textarea
                  id='homeAddress'
                  value={formData.homeAddress}
                  onChange={(e) => handleChange("homeAddress", e.target.value)}
                  required
                  placeholder='Enter your complete home address'
                  rows={3}
                  className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary resize-none'
                />
              </div>

              {/* State, LGA, and Community */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* State of Origin */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='stateOfOrigin'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    State of Origin *
                  </Label>
                  <Select
                    value={formData.stateOfOrigin}
                    onValueChange={handleStateChange}>
                    <SelectTrigger className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500'>
                      <SelectValue
                        placeholder='Select your state'
                        className='text-slate-500 dark:text-slate-400'
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 max-h-60'>
                      {nigerianStatesWithLGA.map((state: NigerianState) => (
                        <SelectItem
                          key={state.name}
                          value={state.name}
                          className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* LGA */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='lga'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Local Government Area *
                  </Label>
                  <Select
                    value={formData.lga}
                    onValueChange={(value) => handleChange("lga", value)}
                    disabled={!formData.stateOfOrigin}>
                    <SelectTrigger className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed'>
                      <SelectValue
                        placeholder={
                          formData.stateOfOrigin
                            ? "Select LGA"
                            : "Select state first"
                        }
                        className='text-slate-500 dark:text-slate-400'
                      />
                    </SelectTrigger>
                    <SelectContent className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 max-h-60'>
                      {currentStateLgas.map((lga: string) => (
                        <SelectItem
                          key={lga}
                          value={lga}
                          className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                          {lga}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!formData.stateOfOrigin && (
                    <p className='text-xs text-amber-600 dark:text-amber-400'>
                      Please select a state first
                    </p>
                  )}
                </div>

                {/* Community */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='community'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Community/Town *
                  </Label>
                  <Input
                    id='community'
                    value={formData.community}
                    onChange={(e) => handleChange("community", e.target.value)}
                    required
                    placeholder='Enter your community or town'
                    className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary'
                  />
                </div>
              </div>

              {/* Email and Phone Number */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='email'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Email Address *
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    placeholder='your.email@example.com'
                    className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary'
                  />
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='phoneNumber'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Phone Number *
                  </Label>
                  <Input
                    id='phoneNumber'
                    type='tel'
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                    required
                    placeholder='+234 (0) 123 456 7890'
                    className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary'
                  />
                </div>
              </div>
            </div>

            {/* The rest of the form sections remain exactly the same */}
            {/* Background Information Section */}
            <div className='space-y-6'>
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
                Background Information
              </h3>

              <div className='space-y-6'>
                {/* Conviction */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Have you ever been convicted of any criminal offense? *
                  </Label>
                  <RadioGroup
                    value={formData.hasConviction}
                    onValueChange={(value) =>
                      handleChange("hasConviction", value)
                    }
                    className='flex gap-6'>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='yes'
                        id='conviction-yes'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='conviction-yes'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='no'
                        id='conviction-no'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='conviction-no'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Relative in Organization */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Are you related to any employee of OKARANIME Heritage
                    Foundation? *
                  </Label>
                  <RadioGroup
                    value={formData.hasRelative}
                    onValueChange={(value) =>
                      handleChange("hasRelative", value)
                    }
                    className='flex gap-6'>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='yes'
                        id='relative-yes'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='relative-yes'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='no'
                        id='relative-no'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='relative-no'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.hasRelative === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-2 pt-2'>
                      <Label
                        htmlFor='relativeName'
                        className='text-slate-700 dark:text-slate-300 font-medium'>
                        Name of the employee
                      </Label>
                      <Input
                        id='relativeName'
                        value={formData.relativeName}
                        onChange={(e) =>
                          handleChange("relativeName", e.target.value)
                        }
                        placeholder="Enter the employee's full name"
                        className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary'
                      />
                    </motion.div>
                  )}
                </div>

                {/* Current Enrollment */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Are you currently enrolled at any educational institution? *
                  </Label>
                  <RadioGroup
                    value={formData.isEnrolled}
                    onValueChange={(value) => handleChange("isEnrolled", value)}
                    className='flex gap-6'>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='yes'
                        id='enrolled-yes'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='enrolled-yes'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='no'
                        id='enrolled-no'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='enrolled-no'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Skills */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Do you have any existing skills? *
                  </Label>
                  <RadioGroup
                    value={formData.hasSkills}
                    onValueChange={(value) => handleChange("hasSkills", value)}
                    className='flex gap-6'>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='yes'
                        id='skills-yes'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='skills-yes'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <RadioGroupItem
                        value='no'
                        id='skills-no'
                        className='text-primary border-slate-300 dark:border-slate-600'
                      />
                      <Label
                        htmlFor='skills-no'
                        className='cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.hasSkills === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-3 pt-2'>
                      <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                        Select your skills (select all that apply)
                      </Label>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
                        {skillOptions.map((skill: string) => (
                          <div
                            key={skill}
                            className='flex items-center space-x-3'>
                            <Checkbox
                              id={`skill-${skill}`}
                              className='text-primary border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                              onCheckedChange={(checked) => {
                                // Handle multiple skill selection
                                console.log("Skill selected:", skill, checked);
                              }}
                            />
                            <Label
                              htmlFor={`skill-${skill}`}
                              className='text-sm cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {formData.hasSkills === "no" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-2 pt-2'>
                      <Label
                        htmlFor='desiredSkill'
                        className='text-slate-700 dark:text-slate-300 font-medium'>
                        What skill would you like to learn? *
                      </Label>
                      <Select
                        value={formData.desiredSkill}
                        onValueChange={(value) =>
                          handleChange("desiredSkill", value)
                        }>
                        <SelectTrigger className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500'>
                          <SelectValue
                            placeholder='Select desired skill'
                            className='text-slate-500 dark:text-slate-400'
                          />
                        </SelectTrigger>
                        <SelectContent className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 max-h-60'>
                          {skillOptions.map((skill: string) => (
                            <SelectItem
                              key={skill}
                              value={skill}
                              className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Program Information Section */}
            <div className='space-y-6'>
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
                Program Information
              </h3>

              {/* Program Interest */}
              <div className='space-y-2'>
                <Label
                  htmlFor='programInterest'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  Which program are you interested in? *
                </Label>
                <Select
                  value={formData.programInterest}
                  onValueChange={(value) =>
                    handleChange("programInterest", value)
                  }>
                  <SelectTrigger className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500'>
                    <SelectValue
                      placeholder='Select program of interest'
                      className='text-slate-500 dark:text-slate-400'
                    />
                  </SelectTrigger>
                  <SelectContent className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600'>
                    {programOptions.map((program: string) => (
                      <SelectItem
                        key={program}
                        value={program}
                        className='text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800'>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Motivation */}
              <div className='space-y-2'>
                <Label
                  htmlFor='motivation'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  Why do you want to join this program? What motivates you? *
                </Label>
                <Textarea
                  id='motivation'
                  value={formData.motivation}
                  onChange={(e) => handleChange("motivation", e.target.value)}
                  required
                  placeholder='Explain your motivation for joining this program...'
                  rows={4}
                  className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary resize-none'
                />
              </div>

              {/* Future Goals */}
              <div className='space-y-2'>
                <Label
                  htmlFor='futureGoals'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  What are your future goals and how will this program help you
                  achieve them? *
                </Label>
                <Textarea
                  id='futureGoals'
                  value={formData.futureGoals}
                  onChange={(e) => handleChange("futureGoals", e.target.value)}
                  required
                  placeholder='Describe your future goals and expectations from this program...'
                  rows={4}
                  className='bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary resize-none'
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='space-y-4'>
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
                Terms & Conditions
              </h3>

              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <Checkbox
                    id='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked: boolean) =>
                      handleChange("agreeToTerms", checked)
                    }
                    className='text-primary border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1'
                  />
                  <Label
                    htmlFor='agreeToTerms'
                    className='cursor-pointer text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal'>
                    I hereby declare that the information provided in this
                    application is true and correct to the best of my knowledge.
                    I understand that any false information may lead to
                    disqualification from the program.
                  </Label>
                </div>

                <div className='flex items-start space-x-3'>
                  <Checkbox
                    id='agreeToDataProcessing'
                    checked={formData.agreeToDataProcessing}
                    onCheckedChange={(checked: boolean) =>
                      handleChange("agreeToDataProcessing", checked)
                    }
                    className='text-primary border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1'
                  />
                  <Label
                    htmlFor='agreeToDataProcessing'
                    className='cursor-pointer text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal'>
                    I agree to the processing of my personal data for the
                    purpose of this application and future communication
                    regarding OKARANIME HERITAGE FOUNDATION programs.
                  </Label>
                </div>
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
                className='w-full gap-3 bg-primary hover:bg-primary/90 text-white'
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send className='h-5 w-5' />
                    Submit Application
                  </>
                )}
              </Button>
            </motion.div>

            {/* Privacy Notice */}
            <p className='text-xs text-slate-600 dark:text-slate-400 text-center'>
              🔒 Your information is secure and will only be used for
              application processing purposes. We are committed to protecting
              your privacy.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
