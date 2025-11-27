// components/volunteer/VolunteerForm.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckCircle2, Send, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface VolunteerFormData {
  // Personal Details
  fullName: string;
  dateOfBirth: Date | undefined;
  idPassportNumber: string;
  gender: string;
  residentialAddress: string;
  phoneNumber: string;
  email: string;
  hasDisability: string;
  disabilitySpecification: string;

  // Volunteer Interests
  volunteerPillars: string[];
  volunteerActivities: string[];
  otherActivity: string;
  hasVolunteerExperience: string;
  volunteerExperience: string;
  skillsQualifications: string;

  // Additional Information
  dietaryRestrictions: string;
  medicalConditions: string;
  hearAboutUs: string;

  // Consent and Declaration
  consentFullName: string;
  consentSignature: string;
  consentDate: Date | undefined;

  // Indemnity Form
  indemnityFullName: string;
  indemnityIdNumber: string;
  indemnityDate: Date | undefined;
  witnessName: string;
  witnessDate: Date | undefined;
}

const volunteerPillars = [
  "Education and Development",
  "Food Security",
  "Women and Youth Empowerment",
  "Environment",
  "OHF Aid",
];

const volunteerActivities = [
  "Mentorship/Tutoring",
  "Program Assistant",
  "Community Outreach",
  "Marketing/Communications",
  "Fundraising",
  "Event Planning",
  "Administrative Support",
  "Other (please specify)",
];

const hearAboutUsOptions = [
  "Social Media",
  "Website",
  "Friend/Family",
  "Community Event",
  "School/University",
  "Other",
];

export function VolunteerForm() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: "",
    dateOfBirth: undefined,
    idPassportNumber: "",
    gender: "",
    residentialAddress: "",
    phoneNumber: "",
    email: "",
    hasDisability: "",
    disabilitySpecification: "",
    volunteerPillars: [],
    volunteerActivities: [],
    otherActivity: "",
    hasVolunteerExperience: "",
    volunteerExperience: "",
    skillsQualifications: "",
    dietaryRestrictions: "",
    medicalConditions: "",
    hearAboutUs: "",
    consentFullName: "",
    consentSignature: "",
    consentDate: undefined,
    indemnityFullName: "",
    indemnityIdNumber: "",
    indemnityDate: undefined,
    witnessName: "",
    witnessDate: undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dateOfBirthOpen, setDateOfBirthOpen] = useState(false);
  const [consentDateOpen, setConsentDateOpen] = useState(false);
  const [indemnityDateOpen, setIndemnityDateOpen] = useState(false);
  const [witnessDateOpen, setWitnessDateOpen] = useState(false);

  const handleChange = (
    field: keyof VolunteerFormData,
    value: string | string[] | Date | undefined
  ) => {
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

  const handleCheckboxChange = (
    field: keyof VolunteerFormData,
    value: string,
    checked: boolean
  ) => {
    const currentValues = Array.isArray(formData[field])
      ? (formData[field] as string[])
      : [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    setFormData((prev) => ({ ...prev, [field]: newValues }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    const requiredFields: (keyof VolunteerFormData)[] = [
      "fullName",
      "dateOfBirth",
      "idPassportNumber",
      "gender",
      "residentialAddress",
      "phoneNumber",
      "email",
      "hasDisability",
      "hasVolunteerExperience",
      "hearAboutUs",
      "consentFullName",
      "consentDate",
      "indemnityFullName",
      "indemnityIdNumber",
      "indemnityDate",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())} is required`;
      }
    });

    // Conditional validations
    if (formData.hasDisability === "yes" && !formData.disabilitySpecification) {
      newErrors.disabilitySpecification = "Please specify your disability";
    }

    if (
      formData.hasVolunteerExperience === "yes" &&
      !formData.volunteerExperience
    ) {
      newErrors.volunteerExperience =
        "Please specify your volunteer experience";
    }

    if (formData.volunteerPillars.length === 0) {
      newErrors.volunteerPillars =
        "Please select at least one volunteer pillar";
    }

    if (formData.volunteerActivities.length === 0) {
      newErrors.volunteerActivities =
        "Please select at least one volunteer activity";
    }

    if (
      formData.volunteerActivities.includes("Other (please specify)") &&
      !formData.otherActivity
    ) {
      newErrors.otherActivity = "Please specify the other activity";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation (basic)
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    // ID/Passport validation
    if (formData.idPassportNumber && formData.idPassportNumber.length < 5) {
      newErrors.idPassportNumber = "ID/Passport number seems too short";
    }

    // Age validation (must be at least 16 years old)
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      if (calculatedAge < 16) {
        newErrors.dateOfBirth =
          "You must be at least 16 years old to volunteer";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In your VolunteerForm component, replace the handleSubmit function:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const submitData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth?.toISOString(),
        consentDate: formData.consentDate?.toISOString(),
        indemnityDate: formData.indemnityDate?.toISOString(),
        witnessDate: formData.witnessDate?.toISOString(),
      };

      // Send to API
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      console.log("Volunteer application submitted successfully:", result);
      toast.success("Volunteer application submitted successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.log("Error Msg: ", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className='text-center py-16'>
        <div className='max-w-md mx-auto'>
          <div className='flex justify-center mb-6'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900'>
              <CheckCircle2 className='h-8 w-8 text-green-600 dark:text-green-400' />
            </div>
          </div>
          <h2 className='text-3xl font-black mb-4 text-slate-900 dark:text-white'>
            Application Submitted!
          </h2>
          <p className='text-slate-600 dark:text-slate-300 mb-6 leading-relaxed'>
            Thank you for your interest in volunteering with OKARANIME HERITAGE
            FOUNDATION. We&apos;ve received your application and will contact
            you within 5-7 business days.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className='gap-2'>
            Submit Another Application
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='max-w-4xl mx-auto'>
      <form onSubmit={handleSubmit} className='space-y-12'>
        {/* Personal Details Section */}
        <section className='space-y-6'>
          <h2 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
            Personal Details
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label
                htmlFor='fullName'
                className='text-slate-700 dark:text-slate-300 font-medium'>
                Full Name *
              </Label>
              <Input
                id='fullName'
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
                placeholder='Enter your full name'
                className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                  errors.fullName ? "border-red-500 dark:border-red-400" : ""
                }`}
              />
              {errors.fullName && (
                <p className='text-red-500 dark:text-red-400 text-sm'>
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                Date of Birth *
              </Label>
              <Popover open={dateOfBirthOpen} onOpenChange={setDateOfBirthOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id='date'
                    variant='outline'
                    className={`w-full justify-start text-left font-normal dark:bg-slate-800 dark:border-slate-600 dark:text-white ${
                      errors.dateOfBirth
                        ? "border-red-500 dark:border-red-400"
                        : ""
                    }`}>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {formData.dateOfBirth ? (
                      format(formData.dateOfBirth, "PPP")
                    ) : (
                      <span>Select date of birth</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={formData.dateOfBirth}
                    captionLayout='dropdown'
                    onSelect={(date) => {
                      handleChange("dateOfBirth", date);
                      setDateOfBirthOpen(false);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className='text-red-500 dark:text-red-400 text-sm'>
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='idPassportNumber'
                className='text-slate-700 dark:text-slate-300 font-medium'>
                ID/Passport Number *
              </Label>
              <Input
                id='idPassportNumber'
                value={formData.idPassportNumber}
                onChange={(e) =>
                  handleChange("idPassportNumber", e.target.value)
                }
                required
                placeholder='Enter ID or Passport number'
                className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                  errors.idPassportNumber
                    ? "border-red-500 dark:border-red-400"
                    : ""
                }`}
              />
              {errors.idPassportNumber && (
                <p className='text-red-500 dark:text-red-400 text-sm'>
                  {errors.idPassportNumber}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='gender'
                className='text-slate-700 dark:text-slate-300 font-medium'>
                Gender *
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger
                  className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white ${
                    errors.gender ? "border-red-500 dark:border-red-400" : ""
                  }`}>
                  <SelectValue placeholder='Select gender' />
                </SelectTrigger>
                <SelectContent className='dark:bg-slate-800 dark:border-slate-600'>
                  <SelectItem
                    value='Male'
                    className='dark:text-white dark:focus:bg-slate-700'>
                    Male
                  </SelectItem>
                  <SelectItem
                    value='Female'
                    className='dark:text-white dark:focus:bg-slate-700'>
                    Female
                  </SelectItem>
                  <SelectItem
                    value='Other'
                    className='dark:text-white dark:focus:bg-slate-700'>
                    Other
                  </SelectItem>
                  <SelectItem
                    value='Prefer not to say'
                    className='dark:text-white dark:focus:bg-slate-700'>
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className='text-red-500 dark:text-red-400 text-sm'>
                  {errors.gender}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='residentialAddress'
              className='text-slate-700 dark:text-slate-300 font-medium'>
              Residential Address *
            </Label>
            <Textarea
              id='residentialAddress'
              value={formData.residentialAddress}
              onChange={(e) =>
                handleChange("residentialAddress", e.target.value)
              }
              required
              placeholder='Enter your complete residential address'
              rows={3}
              className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                errors.residentialAddress
                  ? "border-red-500 dark:border-red-400"
                  : ""
              }`}
            />
            {errors.residentialAddress && (
              <p className='text-red-500 dark:text-red-400 text-sm'>
                {errors.residentialAddress}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                required
                placeholder='+234 801 234 5678'
                className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                  errors.phoneNumber ? "border-red-500 dark:border-red-400" : ""
                }`}
              />
              {errors.phoneNumber && (
                <p className='text-red-500 dark:text-red-400 text-sm'>
                  {errors.phoneNumber}
                </p>
              )}
            </div>

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
                className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                  errors.email ? "border-red-500 dark:border-red-400" : ""
                }`}
              />
              {errors.email && (
                <p className='text-red-500 dark:text-red-400 text-sm'>
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className='space-y-4'>
            <Label className='text-slate-700 dark:text-slate-300 font-medium'>
              Do you have any disability? *
            </Label>
            <RadioGroup
              value={formData.hasDisability}
              onValueChange={(value) => handleChange("hasDisability", value)}
              className='flex gap-6'>
              <div className='flex items-center space-x-3'>
                <RadioGroupItem
                  value='yes'
                  id='disability-yes'
                  className='dark:border-slate-400 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary'
                />
                <Label
                  htmlFor='disability-yes'
                  className='cursor-pointer font-normal dark:text-slate-300'>
                  Yes
                </Label>
              </div>
              <div className='flex items-center space-x-3'>
                <RadioGroupItem
                  value='no'
                  id='disability-no'
                  className='dark:border-slate-400 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary'
                />
                <Label
                  htmlFor='disability-no'
                  className='cursor-pointer font-normal dark:text-slate-300'>
                  No
                </Label>
              </div>
            </RadioGroup>
            {errors.hasDisability && (
              <p className='text-red-500 dark:text-red-400 text-sm'>
                {errors.hasDisability}
              </p>
            )}

            {formData.hasDisability === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className='space-y-2'>
                <Label
                  htmlFor='disabilitySpecification'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  Please specify your disability
                </Label>
                <Input
                  id='disabilitySpecification'
                  value={formData.disabilitySpecification}
                  onChange={(e) =>
                    handleChange("disabilitySpecification", e.target.value)
                  }
                  placeholder='Describe your disability'
                  className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                    errors.disabilitySpecification
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                />
                {errors.disabilitySpecification && (
                  <p className='text-red-500 dark:text-red-400 text-sm'>
                    {errors.disabilitySpecification}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Volunteer Interests Section */}
        <section className='space-y-6'>
          <h2 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
            Volunteer Interests
          </h2>

          <div className='space-y-4'>
            <Label className='text-slate-700 dark:text-slate-300 font-medium'>
              Which pillar(s) are you interested in volunteering for? *
            </Label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {volunteerPillars.map((pillar) => (
                <div key={pillar} className='flex items-center space-x-3'>
                  <Checkbox
                    id={`pillar-${pillar}`}
                    checked={formData.volunteerPillars.includes(pillar)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "volunteerPillars",
                        pillar,
                        checked as boolean
                      )
                    }
                    className='dark:border-slate-400 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary'
                  />
                  <Label
                    htmlFor={`pillar-${pillar}`}
                    className='cursor-pointer font-normal text-sm dark:text-slate-300'>
                    {pillar}
                  </Label>
                </div>
              ))}
            </div>
            {errors.volunteerPillars && (
              <p className='text-red-500 dark:text-red-400 text-sm'>
                {errors.volunteerPillars}
              </p>
            )}
          </div>

          <div className='space-y-4'>
            <Label className='text-slate-700 dark:text-slate-300 font-medium'>
              Volunteer Activities Preferred *
            </Label>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              {volunteerActivities.map((activity) => (
                <div key={activity} className='flex items-center space-x-3'>
                  <Checkbox
                    id={`activity-${activity}`}
                    checked={formData.volunteerActivities.includes(activity)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "volunteerActivities",
                        activity,
                        checked as boolean
                      )
                    }
                    className='dark:border-slate-400 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary'
                  />
                  <Label
                    htmlFor={`activity-${activity}`}
                    className='cursor-pointer font-normal text-sm dark:text-slate-300'>
                    {activity}
                  </Label>
                </div>
              ))}
            </div>
            {errors.volunteerActivities && (
              <p className='text-red-500 dark:text-red-400 text-sm'>
                {errors.volunteerActivities}
              </p>
            )}

            {formData.volunteerActivities.includes(
              "Other (please specify)"
            ) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className='space-y-2'>
                <Label
                  htmlFor='otherActivity'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  Please specify other activity
                </Label>
                <Input
                  id='otherActivity'
                  value={formData.otherActivity}
                  onChange={(e) =>
                    handleChange("otherActivity", e.target.value)
                  }
                  placeholder='Specify other volunteer activity'
                  className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                    errors.otherActivity
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                />
                {errors.otherActivity && (
                  <p className='text-red-500 dark:text-red-400 text-sm'>
                    {errors.otherActivity}
                  </p>
                )}
              </motion.div>
            )}
          </div>

          <div className='space-y-4'>
            <Label className='text-slate-700 dark:text-slate-300 font-medium'>
              Do you have volunteering experience? *
            </Label>
            <RadioGroup
              value={formData.hasVolunteerExperience}
              onValueChange={(value) =>
                handleChange("hasVolunteerExperience", value)
              }
              className='flex gap-6'>
              <div className='flex items-center space-x-3'>
                <RadioGroupItem
                  value='yes'
                  id='experience-yes'
                  className='dark:border-slate-400 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary'
                />
                <Label
                  htmlFor='experience-yes'
                  className='cursor-pointer font-normal dark:text-slate-300'>
                  Yes
                </Label>
              </div>
              <div className='flex items-center space-x-3'>
                <RadioGroupItem
                  value='no'
                  id='experience-no'
                  className='dark:border-slate-400 dark:data-[state=checked]:bg-primary dark:data-[state=checked]:border-primary'
                />
                <Label
                  htmlFor='experience-no'
                  className='cursor-pointer font-normal dark:text-slate-300'>
                  No
                </Label>
              </div>
            </RadioGroup>
            {errors.hasVolunteerExperience && (
              <p className='text-red-500 dark:text-red-400 text-sm'>
                {errors.hasVolunteerExperience}
              </p>
            )}

            {formData.hasVolunteerExperience === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className='space-y-2'>
                <Label
                  htmlFor='volunteerExperience'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  Please specify your volunteer experience
                </Label>
                <Textarea
                  id='volunteerExperience'
                  value={formData.volunteerExperience}
                  onChange={(e) =>
                    handleChange("volunteerExperience", e.target.value)
                  }
                  placeholder='Describe your previous volunteer experience...'
                  rows={3}
                  className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                    errors.volunteerExperience
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                />
                {errors.volunteerExperience && (
                  <p className='text-red-500 dark:text-red-400 text-sm'>
                    {errors.volunteerExperience}
                  </p>
                )}
              </motion.div>
            )}
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='skillsQualifications'
              className='text-slate-700 dark:text-slate-300 font-medium'>
              Do you have any relevant skills or qualifications?
            </Label>
            <Textarea
              id='skillsQualifications'
              value={formData.skillsQualifications}
              onChange={(e) =>
                handleChange("skillsQualifications", e.target.value)
              }
              placeholder='List any relevant skills, qualifications, or certifications...'
              rows={3}
              className='dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400'
            />
          </div>
        </section>

        {/* Additional Information Section */}
        <section className='space-y-6'>
          <h2 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
            Additional Information
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label
                htmlFor='dietaryRestrictions'
                className='text-slate-700 dark:text-slate-300 font-medium'>
                Do you have any dietary restrictions?
              </Label>
              <Input
                id='dietaryRestrictions'
                value={formData.dietaryRestrictions}
                onChange={(e) =>
                  handleChange("dietaryRestrictions", e.target.value)
                }
                placeholder='e.g., Vegetarian, Allergies, etc.'
                className='dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400'
              />
            </div>

            <div className='space-y-2'>
              <Label
                htmlFor='medicalConditions'
                className='text-slate-700 dark:text-slate-300 font-medium'>
                Do you have a medical condition we should know about?
              </Label>
              <Input
                id='medicalConditions'
                value={formData.medicalConditions}
                onChange={(e) =>
                  handleChange("medicalConditions", e.target.value)
                }
                placeholder='e.g., Asthma, Diabetes, etc.'
                className='dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label
              htmlFor='hearAboutUs'
              className='text-slate-700 dark:text-slate-300 font-medium'>
              How did you hear about OKARANIME Heritage Foundation? *
            </Label>
            <Select
              value={formData.hearAboutUs}
              onValueChange={(value) => handleChange("hearAboutUs", value)}>
              <SelectTrigger
                className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white ${
                  errors.hearAboutUs ? "border-red-500 dark:border-red-400" : ""
                }`}>
                <SelectValue placeholder='Select an option' />
              </SelectTrigger>
              <SelectContent className='dark:bg-slate-800 dark:border-slate-600'>
                {hearAboutUsOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className='dark:text-white dark:focus:bg-slate-700'>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.hearAboutUs && (
              <p className='text-red-500 dark:text-red-400 text-sm'>
                {errors.hearAboutUs}
              </p>
            )}
          </div>
        </section>

        {/* Consent and Declaration Section */}
        <section className='space-y-6'>
          <h2 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
            Consent and Declaration
          </h2>

          <div className='bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg'>
            <p className='text-slate-700 dark:text-slate-300 mb-4 leading-relaxed'>
              I,{" "}
              <Input
                value={formData.consentFullName}
                onChange={(e) =>
                  handleChange("consentFullName", e.target.value)
                }
                placeholder='Enter your full name'
                className={`inline-flex w-48 italic dark:bg-slate-800 border-0 dark:text-white ${
                  errors.consentFullName
                    ? "border-red-500 dark:border-red-400"
                    : ""
                }`}
              />
              confirm that the information provided is accurate. I understand
              that submitting this application does not guarantee placement and
              OKARANIME HERITAGE FOUNDATION reserves the right to accept or
              decline applications based on program needs, availability, and
              other relevant factors.
            </p>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* <div className='space-y-2'>
                <Label
                  htmlFor='consentSignature'
                  className='text-slate-700 dark:text-slate-300 font-medium'>
                  Signature *
                </Label>
                <Input
                  id='consentSignature'
                  value={formData.consentSignature}
                  onChange={(e) =>
                    handleChange("consentSignature", e.target.value)
                  }
                  required
                  placeholder='Your signature'
                  className={`dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400 ${
                    errors.consentSignature
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                />
                {errors.consentSignature && (
                  <p className='text-red-500 dark:text-red-400 text-sm'>
                    {errors.consentSignature}
                  </p>
                )}
              </div> */}

              <div className='space-y-2'>
                <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                  Date *
                </Label>
                <Popover
                  open={consentDateOpen}
                  onOpenChange={setConsentDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={`w-full justify-start text-left font-normal dark:bg-slate-800 dark:border-slate-600 dark:text-white ${
                        errors.consentDate
                          ? "border-red-500 dark:border-red-400"
                          : ""
                      }`}>
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {formData.consentDate ? (
                        format(formData.consentDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={formData.consentDate}
                      onSelect={(date) => {
                        handleChange("consentDate", date);
                        setConsentDateOpen(false);
                      }}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.consentDate && (
                  <p className='text-red-500 dark:text-red-400 text-sm'>
                    {errors.consentDate}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Indemnity Form Section */}
        <section className='space-y-6'>
          <h2 className='text-2xl font-black border-b-2 border-primary/20 pb-2 text-slate-900 dark:text-white'>
            Indemnity Form
          </h2>

          <div className='bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg'>
            <p className='text-slate-700 dark:text-slate-300 mb-4 leading-relaxed'>
              I,{" "}
              <Input
                value={formData.indemnityFullName}
                onChange={(e) =>
                  handleChange("indemnityFullName", e.target.value)
                }
                placeholder='Enter your full name'
                className={`inline-flex w-48 italic dark:bg-slate-800 border-0 dark:text-white ${
                  errors.indemnityFullName
                    ? "border-red-500 dark:border-red-400"
                    : ""
                }`}
              />{" "}
              with ID/Passport number{" "}
              <Input
                value={formData.indemnityIdNumber}
                onChange={(e) =>
                  handleChange("indemnityIdNumber", e.target.value)
                }
                placeholder='Enter your ID/Passport number'
                className={`inline-flex w-64 italic dark:bg-slate-800 border-0 dark:text-white ${
                  errors.indemnityIdNumber
                    ? "border-red-500 dark:border-red-400"
                    : ""
                }`}
              />{" "}
              hereby acknowledge that my participation as a volunteer is at my
              own risk and agree to release, indemnify, and hold harmless the
              OKARANIME HERITAGE FOUNDATION, its employees, representatives, and
              affiliates from any claims, liabilities, damages, or injuries that
              may result from my involvement in its activities.
            </p>

            <p className='text-slate-700 dark:text-slate-300 mb-4 leading-relaxed'>
              I understand that:
              <br />• I am responsible for my personal safety and well-being
              while volunteering.
              <br />• OKARANIME HERITAGE FOUNDATION is not liable for any
              injuries, accidents, or loss of property during my participation.
              <br />• I will abide by the foundation&apos;s policies and respect
              the confidentiality of any sensitive information.
            </p>

            <p className='text-slate-700 dark:text-slate-300 mb-6 leading-relaxed'>
              I confirm that I have read, understood, and accept the terms
              outlined above.
            </p>

            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Date *
                  </Label>
                  <Popover
                    open={indemnityDateOpen}
                    onOpenChange={setIndemnityDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className={`w-full justify-start text-left font-normal dark:bg-slate-800 dark:border-slate-600 dark:text-white ${
                          errors.indemnityDate
                            ? "border-red-500 dark:border-red-400"
                            : ""
                        }`}>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {formData.indemnityDate ? (
                          format(formData.indemnityDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={formData.indemnityDate}
                        onSelect={(date) => {
                          handleChange("indemnityDate", date);
                          setIndemnityDateOpen(false);
                        }}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.indemnityDate && (
                    <p className='text-red-500 dark:text-red-400 text-sm'>
                      {errors.indemnityDate}
                    </p>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='witnessName'
                    className='text-slate-700 dark:text-slate-300 font-medium'>
                    Witness Name
                  </Label>
                  <Input
                    id='witnessName'
                    value={formData.witnessName}
                    onChange={(e) =>
                      handleChange("witnessName", e.target.value)
                    }
                    placeholder='Witness full name'
                    className='dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400'
                  />
                </div>

                <div className='space-y-2'>
                  <Label className='text-slate-700 dark:text-slate-300 font-medium'>
                    Witness Date
                  </Label>
                  <Popover
                    open={witnessDateOpen}
                    onOpenChange={setWitnessDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-start text-left font-normal dark:bg-slate-800 dark:border-slate-600 dark:text-white'>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {formData.witnessDate ? (
                          format(formData.witnessDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={formData.witnessDate}
                        onSelect={(date) => {
                          handleChange("witnessDate", date);
                          setWitnessDateOpen(false);
                        }}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='pt-8'>
          <Button
            type='submit'
            size='lg'
            className='w-full gap-3'
            disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                Submitting Application...
              </>
            ) : (
              <>
                <Send className='h-5 w-5' />
                Submit Volunteer Application
              </>
            )}
          </Button>
        </motion.div>

        <p className='text-xs text-slate-600 dark:text-slate-400 text-center'>
          🔒 Your information is secure and will only be used for volunteer
          application processing purposes.
        </p>
      </form>
    </motion.div>
  );
}
