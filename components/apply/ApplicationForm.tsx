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

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const programOptions = [
  "Youth Sustainability Program",
  "Women's Skill Acquisition",
  "Talent Discovery Program",
  "All Programs",
  "Not Sure - Need Guidance",
];

const skillOptions = [
  "Digital Marketing",
  "Web Development",
  "Fashion Design",
  "Hair Dressing",
  "Makeup Artistry",
  "Photography",
  "Videography",
  "Graphic Design",
  "Agriculture",
  "Catering",
  "Baking",
  "Tailoring",
  "Shoe Making",
  "Wood Work",
  "Metal Work",
  "Electrical Work",
  "Plumbing",
  "Other",
];

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

  const handleChange = (
    field: keyof ApplicationFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
      !formData.phoneNumber
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
        console.log('Error Msg:  ', err)
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

            <h2 className='text-3xl font-black mb-4'>Application Submitted!</h2>

            <p className='text-muted-foreground mb-6 leading-relaxed max-w-md mx-auto'>
              Thank you for applying to OKARANIME HERITAGE FOUNDATION.
              We&apos;ve received your application and will review it carefully.
            </p>

            <div className='space-y-3 text-sm text-muted-foreground mb-8 max-w-md mx-auto'>
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
          <h2 className='text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl mb-6'>
            Application <span className='text-primary'>Form</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Fill out the form below to apply for our empowerment programs. All
            fields marked with * are required.
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
            {/* Personal Information Section */}
            <div className='space-y-6'>
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2'>
                Personal Information
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Title */}
                <div className='space-y-2'>
                  <Label htmlFor='title'>Title *</Label>
                  <Select
                    value={formData.title}
                    onValueChange={(value) => handleChange("title", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select title' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Mr'>Mr</SelectItem>
                      <SelectItem value='Mrs'>Mrs</SelectItem>
                      <SelectItem value='Miss'>Miss</SelectItem>
                      <SelectItem value='Dr'>Dr</SelectItem>
                      <SelectItem value='Prof'>Prof</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* First Name */}
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name *</Label>
                  <Input
                    id='firstName'
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                    placeholder='Enter your first name'
                  />
                </div>

                {/* Surname */}
                <div className='space-y-2'>
                  <Label htmlFor='surname'>Surname *</Label>
                  <Input
                    id='surname'
                    value={formData.surname}
                    onChange={(e) => handleChange("surname", e.target.value)}
                    required
                    placeholder='Enter your surname'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Gender */}
                <div className='space-y-2'>
                  <Label htmlFor='gender'>Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Male'>Male</SelectItem>
                      <SelectItem value='Female'>Female</SelectItem>
                      <SelectItem value='Other'>Other</SelectItem>
                      <SelectItem value='Prefer not to say'>
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Disability */}
                <div className='space-y-4'>
                  <Label>Do you have any disability? *</Label>
                  <RadioGroup
                    value={formData.hasDisability}
                    onValueChange={(value) =>
                      handleChange("hasDisability", value)
                    }
                    className='flex gap-4'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='disability-yes' />
                      <Label
                        htmlFor='disability-yes'
                        className='cursor-pointer'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='disability-no' />
                      <Label htmlFor='disability-no' className='cursor-pointer'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.hasDisability === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-2'>
                      <Label htmlFor='disabilitySpecification'>
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
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Home Address */}
              <div className='space-y-2'>
                <Label htmlFor='homeAddress'>Home Address *</Label>
                <Textarea
                  id='homeAddress'
                  value={formData.homeAddress}
                  onChange={(e) => handleChange("homeAddress", e.target.value)}
                  required
                  placeholder='Enter your complete home address'
                  rows={3}
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* State of Origin */}
                <div className='space-y-2'>
                  <Label htmlFor='stateOfOrigin'>State of Origin *</Label>
                  <Select
                    value={formData.stateOfOrigin}
                    onValueChange={(value) =>
                      handleChange("stateOfOrigin", value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder='Select your state' />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Email */}
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
              </div>

              {/* Phone Number */}
              <div className='space-y-2'>
                <Label htmlFor='phoneNumber'>Phone Number *</Label>
                <Input
                  id='phoneNumber'
                  type='tel'
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  required
                  placeholder='+234 (0) 123 456 7890'
                />
              </div>
            </div>

            {/* Background Information Section */}
            <div className='space-y-6'>
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2'>
                Background Information
              </h3>

              <div className='space-y-6'>
                {/* Conviction */}
                <div className='space-y-4'>
                  <Label>
                    Have you ever been convicted of any criminal offense? *
                  </Label>
                  <RadioGroup
                    value={formData.hasConviction}
                    onValueChange={(value) =>
                      handleChange("hasConviction", value)
                    }
                    className='flex gap-4'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='conviction-yes' />
                      <Label
                        htmlFor='conviction-yes'
                        className='cursor-pointer'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='conviction-no' />
                      <Label htmlFor='conviction-no' className='cursor-pointer'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Relative in Organization */}
                <div className='space-y-4'>
                  <Label>
                    Are you related to any employee of OKARANIME Heritage
                    Foundation? *
                  </Label>
                  <RadioGroup
                    value={formData.hasRelative}
                    onValueChange={(value) =>
                      handleChange("hasRelative", value)
                    }
                    className='flex gap-4'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='relative-yes' />
                      <Label htmlFor='relative-yes' className='cursor-pointer'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='relative-no' />
                      <Label htmlFor='relative-no' className='cursor-pointer'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.hasRelative === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-2'>
                      <Label htmlFor='relativeName'>Name of the employee</Label>
                      <Input
                        id='relativeName'
                        value={formData.relativeName}
                        onChange={(e) =>
                          handleChange("relativeName", e.target.value)
                        }
                        placeholder="Enter the employee's full name"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Current Enrollment */}
                <div className='space-y-4'>
                  <Label>
                    Are you currently enrolled at any educational institution? *
                  </Label>
                  <RadioGroup
                    value={formData.isEnrolled}
                    onValueChange={(value) => handleChange("isEnrolled", value)}
                    className='flex gap-4'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='enrolled-yes' />
                      <Label htmlFor='enrolled-yes' className='cursor-pointer'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='enrolled-no' />
                      <Label htmlFor='enrolled-no' className='cursor-pointer'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Skills */}
                <div className='space-y-4'>
                  <Label>Do you have any existing skills? *</Label>
                  <RadioGroup
                    value={formData.hasSkills}
                    onValueChange={(value) => handleChange("hasSkills", value)}
                    className='flex gap-4'>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='yes' id='skills-yes' />
                      <Label htmlFor='skills-yes' className='cursor-pointer'>
                        Yes
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='no' id='skills-no' />
                      <Label htmlFor='skills-no' className='cursor-pointer'>
                        No
                      </Label>
                    </div>
                  </RadioGroup>

                  {formData.hasSkills === "yes" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className='space-y-2'>
                      <Label>Select your skills (select all that apply)</Label>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
                        {skillOptions.map((skill) => (
                          <div
                            key={skill}
                            className='flex items-center space-x-2'>
                            <Checkbox
                              id={`skill-${skill}`}
                              onCheckedChange={(checked) => {
                                // Handle multiple skill selection
                                console.log("Skill selected:", skill, checked);
                              }}
                            />
                            <Label
                              htmlFor={`skill-${skill}`}
                              className='text-sm cursor-pointer'>
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
                      className='space-y-2'>
                      <Label htmlFor='desiredSkill'>
                        What skill would you like to learn? *
                      </Label>
                      <Select
                        value={formData.desiredSkill}
                        onValueChange={(value) =>
                          handleChange("desiredSkill", value)
                        }>
                        <SelectTrigger>
                          <SelectValue placeholder='Select desired skill' />
                        </SelectTrigger>
                        <SelectContent>
                          {skillOptions.map((skill) => (
                            <SelectItem key={skill} value={skill}>
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
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2'>
                Program Information
              </h3>

              {/* Program Interest */}
              <div className='space-y-2'>
                <Label htmlFor='programInterest'>
                  Which program are you interested in? *
                </Label>
                <Select
                  value={formData.programInterest}
                  onValueChange={(value) =>
                    handleChange("programInterest", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder='Select program of interest' />
                  </SelectTrigger>
                  <SelectContent>
                    {programOptions.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Motivation */}
              <div className='space-y-2'>
                <Label htmlFor='motivation'>
                  Why do you want to join this program? What motivates you? *
                </Label>
                <Textarea
                  id='motivation'
                  value={formData.motivation}
                  onChange={(e) => handleChange("motivation", e.target.value)}
                  required
                  placeholder='Explain your motivation for joining this program...'
                  rows={4}
                />
              </div>

              {/* Future Goals */}
              <div className='space-y-2'>
                <Label htmlFor='futureGoals'>
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
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='space-y-4'>
              <h3 className='text-2xl font-black border-b-2 border-primary/20 pb-2'>
                Terms & Conditions
              </h3>

              <div className='space-y-4'>
                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked: boolean) =>
                      handleChange("agreeToTerms", checked)
                    }
                  />
                  <Label
                    htmlFor='agreeToTerms'
                    className='cursor-pointer text-sm leading-relaxed'>
                    I hereby declare that the information provided in this
                    application is true and correct to the best of my knowledge.
                    I understand that any false information may lead to
                    disqualification from the program.
                  </Label>
                </div>

                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='agreeToDataProcessing'
                    checked={formData.agreeToDataProcessing}
                    onCheckedChange={(checked: boolean) =>
                      handleChange("agreeToDataProcessing", checked)
                    }
                  />
                  <Label
                    htmlFor='agreeToDataProcessing'
                    className='cursor-pointer text-sm leading-relaxed'>
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
                    Submit Application
                  </>
                )}
              </Button>
            </motion.div>

            {/* Privacy Notice */}
            <p className='text-xs text-muted-foreground text-center'>
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
