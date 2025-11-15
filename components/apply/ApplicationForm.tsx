// components/apply/ApplicationForm.tsx (Fixed TypeScript types)
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
import { AlertCircle, CheckCircle2, Send, XCircle } from "lucide-react";
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
  skills: string[];

  // Program Selection
  programInterest: string;
  motivation: string;
  futureGoals: string;

  // Terms
  agreeToTerms: boolean;
  agreeToDataProcessing: boolean;
}

interface FormErrors {
  [key: string]: string;
}

type FormField = keyof ApplicationFormData;
type FormValue = string | boolean | string[];

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
    skills: [],
    programInterest: "",
    motivation: "",
    futureGoals: "",
    agreeToTerms: false,
    agreeToDataProcessing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Get LGAs based on selected state
  const getLgasForState = (stateName: string): string[] => {
    const state = nigerianStatesWithLGA.find(
      (s: NigerianState) => s.name === stateName
    );
    return state ? state.lgas : [];
  };

  const handleChange = (field: FormField, value: FormValue) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => new Set(prev).add(field));
    validateField(field, formData[field as FormField]);
  };

  const handleStateChange = (state: string) => {
    setFormData((prev) => ({
      ...prev,
      stateOfOrigin: state,
      lga: "", // Reset LGA when state changes
      community: "", // Reset community when state changes
    }));

    // Clear LGA and community errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.lga;
      delete newErrors.community;
      return newErrors;
    });
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => {
      const currentSkills = prev.skills || [];
      const newSkills = currentSkills.includes(skill)
        ? currentSkills.filter((s) => s !== skill)
        : [...currentSkills, skill];

      return { ...prev, skills: newSkills };
    });

    // Clear skills error
    if (errors.skills) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  // Field validation with proper TypeScript types
  const validateField = (field: string, value: FormValue): string => {
    // Convert value to string for validation where needed
    const stringValue = typeof value === "string" ? value : "";
    const arrayValue = Array.isArray(value) ? value : [];
    const booleanValue = typeof value === "boolean" ? value : false;

    switch (field) {
      case "title":
        return !stringValue ? "Title is required" : "";

      case "firstName":
        if (!stringValue) return "First name is required";
        if (stringValue.length < 2)
          return "First name must be at least 2 characters";
        if (!/^[a-zA-Z\s-]+$/.test(stringValue))
          return "First name can only contain letters, spaces, and hyphens";
        return "";

      case "surname":
        if (!stringValue) return "Surname is required";
        if (stringValue.length < 2)
          return "Surname must be at least 2 characters";
        if (!/^[a-zA-Z\s-]+$/.test(stringValue))
          return "Surname can only contain letters, spaces, and hyphens";
        return "";

      case "gender":
        return !stringValue ? "Gender is required" : "";

      case "hasDisability":
        return !stringValue ? "Please specify if you have any disability" : "";

      case "disabilitySpecification":
        if (formData.hasDisability === "yes" && !stringValue) {
          return "Please specify your disability";
        }
        return "";

      case "homeAddress":
        if (!stringValue) return "Home address is required";
        if (stringValue.length < 10)
          return "Please provide a complete address (at least 10 characters)";
        return "";

      case "stateOfOrigin":
        return !stringValue ? "State of origin is required" : "";

      case "lga":
        return !stringValue ? "Local Government Area is required" : "";

      case "community":
        if (!stringValue) return "Community/Town is required";
        if (stringValue.length < 2)
          return "Please enter a valid community/town name";
        return "";

      case "email":
        if (!stringValue) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue))
          return "Please enter a valid email address";
        return "";

      case "phoneNumber":
        if (!stringValue) return "Phone number is required";
        const cleanPhone = stringValue.replace(/\s/g, "");
        if (!/^(\+234|0)[789][01]\d{8}$/.test(cleanPhone)) {
          return "Please enter a valid Nigerian phone number (e.g., +2348012345678 or 08012345678)";
        }
        return "";

      case "hasConviction":
        return !stringValue ? "Please answer this question" : "";

      case "hasRelative":
        return !stringValue ? "Please answer this question" : "";

      case "relativeName":
        if (formData.hasRelative === "yes" && !stringValue) {
          return "Please specify the employee name";
        }
        return "";

      case "isEnrolled":
        return !stringValue ? "Please answer this question" : "";

      case "hasSkills":
        return !stringValue ? "Please answer this question" : "";

      case "skills":
        if (formData.hasSkills === "yes" && arrayValue.length === 0) {
          return "Please select at least one skill";
        }
        return "";

      case "desiredSkill":
        if (formData.hasSkills === "no" && !stringValue) {
          return "Please select a skill you would like to learn";
        }
        return "";

      case "programInterest":
        return !stringValue ? "Please select a program of interest" : "";

      case "motivation":
        if (!stringValue) return "Motivation is required";
        if (stringValue.length < 50)
          return "Please provide a more detailed motivation (at least 50 characters)";
        if (stringValue.length > 1000)
          return "Motivation is too long (maximum 1000 characters)";
        return "";

      case "futureGoals":
        if (!stringValue) return "Future goals are required";
        if (stringValue.length < 50)
          return "Please provide more detailed goals (at least 50 characters)";
        if (stringValue.length > 1000)
          return "Future goals are too long (maximum 1000 characters)";
        return "";

      case "agreeToTerms":
        return !booleanValue
          ? "You must agree to the terms and conditions"
          : "";

      case "agreeToDataProcessing":
        return !booleanValue ? "You must agree to data processing" : "";

      default:
        return "";
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate all required fields
    const fieldsToValidate: FormField[] = [
      "title",
      "firstName",
      "surname",
      "gender",
      "hasDisability",
      "homeAddress",
      "stateOfOrigin",
      "lga",
      "community",
      "email",
      "phoneNumber",
      "hasConviction",
      "hasRelative",
      "isEnrolled",
      "hasSkills",
      "programInterest",
      "motivation",
      "futureGoals",
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Conditional validations
    if (formData.hasDisability === "yes") {
      const error = validateField(
        "disabilitySpecification",
        formData.disabilitySpecification
      );
      if (error) newErrors.disabilitySpecification = error;
    }

    if (formData.hasRelative === "yes") {
      const error = validateField("relativeName", formData.relativeName);
      if (error) newErrors.relativeName = error;
    }

    if (formData.hasSkills === "yes") {
      const error = validateField("skills", formData.skills);
      if (error) newErrors.skills = error;
    }

    if (formData.hasSkills === "no") {
      const error = validateField("desiredSkill", formData.desiredSkill);
      if (error) newErrors.desiredSkill = error;
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    if (!formData.agreeToDataProcessing) {
      newErrors.agreeToDataProcessing = "You must agree to data processing";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = [
      "title",
      "firstName",
      "surname",
      "gender",
      "hasDisability",
      "homeAddress",
      "stateOfOrigin",
      "lga",
      "community",
      "email",
      "phoneNumber",
      "hasConviction",
      "hasRelative",
      "isEnrolled",
      "hasSkills",
      "programInterest",
      "motivation",
      "futureGoals",
    ];
    setTouched(new Set(allFields));

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Application submitted:", formData);
      setIsSubmitted(true);
    } catch (err) {
      console.log('Error Msg: ', err);
      setErrors({ submit: "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to check if field has error
  const hasError = (field: string): boolean => {
    return touched.has(field) && !!errors[field];
  };

  // Helper function to get field error
  const getFieldError = (field: string): string => {
    return touched.has(field) ? errors[field] || "" : "";
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
                    skills: [],
                    programInterest: "",
                    motivation: "",
                    futureGoals: "",
                    agreeToTerms: false,
                    agreeToDataProcessing: false,
                  });
                  setErrors({});
                  setTouched(new Set());
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
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex items-center gap-3 p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'>
              <AlertCircle className='h-5 w-5' />
              <span className='font-medium'>{errors.submit}</span>
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
                    onValueChange={(value: string) =>
                      handleChange("title", value)
                    }>
                    <SelectTrigger
                      id='title'
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 ${
                        hasError("title")
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}>
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
                  {hasError("title") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("title")}</span>
                    </div>
                  )}
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
                    onBlur={() => handleBlur("firstName")}
                    required
                    placeholder='Enter your first name'
                    className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary ${
                      hasError("firstName")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  {hasError("firstName") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("firstName")}</span>
                    </div>
                  )}
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
                    onBlur={() => handleBlur("surname")}
                    required
                    placeholder='Enter your surname'
                    className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary ${
                      hasError("surname")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  {hasError("surname") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("surname")}</span>
                    </div>
                  )}
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
                    onValueChange={(value: string) =>
                      handleChange("gender", value)
                    }>
                    <SelectTrigger
                      id='gender'
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 ${
                        hasError("gender")
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}>
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
                  {hasError("gender") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("gender")}</span>
                    </div>
                  )}
                </div>

                {/* Disability */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Do you have any disability? *
                  </Label>
                  <RadioGroup
                    value={formData.hasDisability}
                    onValueChange={(value: string) =>
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
                  {hasError("hasDisability") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("hasDisability")}</span>
                    </div>
                  )}

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
                        onBlur={() => handleBlur("disabilitySpecification")}
                        placeholder='Describe your disability'
                        className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary ${
                          hasError("disabilitySpecification")
                            ? "border-red-500 dark:border-red-400"
                            : ""
                        }`}
                      />
                      {hasError("disabilitySpecification") && (
                        <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                          <XCircle className='h-3 w-3' />
                          <span>
                            {getFieldError("disabilitySpecification")}
                          </span>
                        </div>
                      )}
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
                  onBlur={() => handleBlur("homeAddress")}
                  required
                  placeholder='Enter your complete home address'
                  rows={3}
                  className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary resize-none ${
                    hasError("homeAddress")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                />
                {hasError("homeAddress") && (
                  <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                    <XCircle className='h-3 w-3' />
                    <span>{getFieldError("homeAddress")}</span>
                  </div>
                )}
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
                    <SelectTrigger
                      id='stateOfOrigin'
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 ${
                        hasError("stateOfOrigin")
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}>
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
                  {hasError("stateOfOrigin") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("stateOfOrigin")}</span>
                    </div>
                  )}
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
                    onValueChange={(value: string) =>
                      handleChange("lga", value)
                    }
                    disabled={!formData.stateOfOrigin}>
                    <SelectTrigger
                      id='lga'
                      className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                        hasError("lga")
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}>
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
                  {hasError("lga") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("lga")}</span>
                    </div>
                  )}
                  {!formData.stateOfOrigin && !hasError("lga") && (
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
                    onBlur={() => handleBlur("community")}
                    required
                    placeholder='Enter your community or town'
                    className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary ${
                      hasError("community")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  {hasError("community") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("community")}</span>
                    </div>
                  )}
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
                    onBlur={() => handleBlur("email")}
                    required
                    placeholder='your.email@example.com'
                    className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary ${
                      hasError("email")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  {hasError("email") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("email")}</span>
                    </div>
                  )}
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
                    onBlur={() => handleBlur("phoneNumber")}
                    required
                    placeholder='+234 (0) 801 234 5678'
                    className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary ${
                      hasError("phoneNumber")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  {hasError("phoneNumber") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("phoneNumber")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                    onValueChange={(value: string) =>
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
                  {hasError("hasConviction") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("hasConviction")}</span>
                    </div>
                  )}
                </div>

                {/* Relative in Organization */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Are you related to any employee of OKARANIME Heritage
                    Foundation? *
                  </Label>
                  <RadioGroup
                    value={formData.hasRelative}
                    onValueChange={(value: string) =>
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
                  {hasError("hasRelative") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("hasRelative")}</span>
                    </div>
                  )}

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
                        onBlur={() => handleBlur("relativeName")}
                        placeholder="Enter the employee's full name"
                        className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary ${
                          hasError("relativeName")
                            ? "border-red-500 dark:border-red-400"
                            : ""
                        }`}
                      />
                      {hasError("relativeName") && (
                        <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                          <XCircle className='h-3 w-3' />
                          <span>{getFieldError("relativeName")}</span>
                        </div>
                      )}
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
                    onValueChange={(value: string) =>
                      handleChange("isEnrolled", value)
                    }
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
                  {hasError("isEnrolled") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("isEnrolled")}</span>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className='space-y-4'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Do you have any existing skills? *
                  </Label>
                  <RadioGroup
                    value={formData.hasSkills}
                    onValueChange={(value: string) =>
                      handleChange("hasSkills", value)
                    }
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
                  {hasError("hasSkills") && (
                    <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                      <XCircle className='h-3 w-3' />
                      <span>{getFieldError("hasSkills")}</span>
                    </div>
                  )}

                  {formData.hasSkills === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-3 pt-2'>
                      <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                        Select your skills (select all that apply) *
                      </Label>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
                        {skillOptions.map((skill: string) => (
                          <div
                            key={skill}
                            className='flex items-center space-x-3'>
                            <Checkbox
                              id={`skill-${skill}`}
                              checked={formData.skills?.includes(skill)}
                              onCheckedChange={() => handleSkillToggle(skill)}
                              className='text-primary border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
                            />
                            <Label
                              htmlFor={`skill-${skill}`}
                              className='text-sm cursor-pointer text-slate-700 dark:text-slate-300 font-normal'>
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {hasError("skills") && (
                        <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                          <XCircle className='h-3 w-3' />
                          <span>{getFieldError("skills")}</span>
                        </div>
                      )}
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
                        onValueChange={(value: string) =>
                          handleChange("desiredSkill", value)
                        }>
                        <SelectTrigger
                          id='desiredSkill'
                          className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 ${
                            hasError("desiredSkill")
                              ? "border-red-500 dark:border-red-400"
                              : ""
                          }`}>
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
                      {hasError("desiredSkill") && (
                        <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                          <XCircle className='h-3 w-3' />
                          <span>{getFieldError("desiredSkill")}</span>
                        </div>
                      )}
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
                  onValueChange={(value: string) =>
                    handleChange("programInterest", value)
                  }>
                  <SelectTrigger
                    id='programInterest'
                    className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500 ${
                      hasError("programInterest")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}>
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
                {hasError("programInterest") && (
                  <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                    <XCircle className='h-3 w-3' />
                    <span>{getFieldError("programInterest")}</span>
                  </div>
                )}
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
                  onBlur={() => handleBlur("motivation")}
                  required
                  placeholder='Explain your motivation for joining this program...'
                  rows={4}
                  className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary resize-none ${
                    hasError("motivation")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                />
                {hasError("motivation") && (
                  <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                    <XCircle className='h-3 w-3' />
                    <span>{getFieldError("motivation")}</span>
                  </div>
                )}
                <p className='text-xs text-slate-500 dark:text-slate-400'>
                  {formData.motivation.length}/1000 characters (minimum 50
                  required)
                </p>
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
                  onBlur={() => handleBlur("futureGoals")}
                  required
                  placeholder='Describe your future goals and expectations from this program...'
                  rows={4}
                  className={`bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-primary focus:ring-primary resize-none ${
                    hasError("futureGoals")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                />
                {hasError("futureGoals") && (
                  <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                    <XCircle className='h-3 w-3' />
                    <span>{getFieldError("futureGoals")}</span>
                  </div>
                )}
                <p className='text-xs text-slate-500 dark:text-slate-400'>
                  {formData.futureGoals.length}/1000 characters (minimum 50
                  required)
                </p>
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
                    className={`text-primary border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1 ${
                      hasError("agreeToTerms")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  <div className='space-y-1'>
                    <Label
                      htmlFor='agreeToTerms'
                      className='cursor-pointer text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal'>
                      I hereby declare that the information provided in this
                      application is true and correct to the best of my
                      knowledge. I understand that any false information may
                      lead to disqualification from the program.
                    </Label>
                    {hasError("agreeToTerms") && (
                      <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                        <XCircle className='h-3 w-3' />
                        <span>{getFieldError("agreeToTerms")}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <Checkbox
                    id='agreeToDataProcessing'
                    checked={formData.agreeToDataProcessing}
                    onCheckedChange={(checked: boolean) =>
                      handleChange("agreeToDataProcessing", checked)
                    }
                    className={`text-primary border-slate-300 dark:border-slate-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1 ${
                      hasError("agreeToDataProcessing")
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}
                  />
                  <div className='space-y-1'>
                    <Label
                      htmlFor='agreeToDataProcessing'
                      className='cursor-pointer text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-normal'>
                      I agree to the processing of my personal data for the
                      purpose of this application and future communication
                      regarding OKARANIME HERITAGE FOUNDATION programs.
                    </Label>
                    {hasError("agreeToDataProcessing") && (
                      <div className='flex items-center gap-1 text-red-600 dark:text-red-400 text-sm'>
                        <XCircle className='h-3 w-3' />
                        <span>{getFieldError("agreeToDataProcessing")}</span>
                      </div>
                    )}
                  </div>
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
