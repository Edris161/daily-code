"use client";

import React, { createContext, useContext } from "react";

type LangCtx = {
  t: (key: string) => string;
};

const defaults: Record<string, string> = {
  apply_hero_title: "Apply to Kaaj",
  apply_hero_sub: "Join our next cohort and start improving your English skills.",
  enroll_eyebrow: "Enroll",
  why_join: "Why Join Kaaj?",
  perk1: "Small class sizes",
  perk2: "Certified teachers",
  perk3: "Flexible schedules",
  perk4: "Online & on-site",
  perk5: "Proven results",
  registration_form: "Registration Form",
  registration_sub: "Fill the form below to apply.",
  full_name: "Full Name",
  full_name_ph: "Your full name",
  email: "Email",
  email_ph: "you@example.com",
  phone: "Phone",
  course_selection: "Course",
  choose_course: "Choose a course",
  course_general_t: "General English",
  course_spoken_t: "Spoken English",
  course_academic_t: "Academic English",
  course_business_t: "Business English",
  course_ielts_t: "IELTS Preparation",
  course_toefl_t: "TOEFL Preparation",
  submit_application: "Submit Application",
  app_sent: "Application sent! We'll contact you soon.",
};

const LanguageContext = createContext<LangCtx>({ t: (k) => defaults[k] ?? k });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const t = (key: string) => defaults[key] ?? key;
  return <LanguageContext.Provider value={{ t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
