"use client";

import SectionTitle from "../../components/SectionTitle";
import { toast, Toaster } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";

export default function Apply() {
  const { t } = useLanguage();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("app_sent"));
    (e.target as HTMLFormElement).reset();
  };

  const perks = [t("perk1"), t("perk2"), t("perk3"), t("perk4"), t("perk5")];

  return (
    <div>
      <Toaster position="top-right" />
      <section className="relative bg-hero-gradient py-20 md:py-28 text-primary-foreground text-center overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-mesh opacity-40" />
        <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-[1.05]">{t("apply_hero_title")}</h1>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto text-lg">{t("apply_hero_sub")}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 grid lg:grid-cols-5 gap-10 max-w-6xl">
        <aside className="lg:col-span-2 space-y-4">
          <SectionTitle eyebrow={t("enroll_eyebrow")} title={t("why_join")} centered={false} />
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-3 bg-card border border-border/60 rounded-2xl px-5 py-4 shadow-[var(--shadow-card)]">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <span className="font-semibold text-foreground">{p}</span>
            </div>
          ))}
        </aside>

        <form onSubmit={onSubmit} className="lg:col-span-3 bg-card border border-border/60 rounded-3xl p-8 shadow-[var(--shadow-elevated)] space-y-5 h-fit">
          <h3 className="text-2xl font-extrabold text-foreground">{t("registration_form")}</h3>
          <p className="text-muted-foreground -mt-3">{t("registration_sub")}</p>
          <div><label htmlFor="name">{t("full_name")}</label><input id="name" name="name" required placeholder={t("full_name_ph")} className="rounded-xl h-12 mt-2 w-full px-3 py-2" /></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label htmlFor="email">{t("email")}</label><input id="email" name="email" type="email" required placeholder={t("email_ph")} className="rounded-xl h-12 mt-2 w-full px-3 py-2" /></div>
            <div><label htmlFor="phone">{t("phone")}</label><input id="phone" name="phone" type="tel" required placeholder="+1 234 567 8900" className="rounded-xl h-12 mt-2 w-full px-3 py-2" /></div>
          </div>
          <div>
            <label htmlFor="course">{t("course_selection")}</label>
            <select id="course" name="course" required className="rounded-xl h-12 mt-2 w-full px-3 py-2">
              <option value="">{t("choose_course")}</option>
              <option value="general">{t("course_general_t")}</option>
              <option value="spoken">{t("course_spoken_t")}</option>
              <option value="academic">{t("course_academic_t")}</option>
              <option value="business">{t("course_business_t")}</option>
              <option value="ielts">{t("course_ielts_t")}</option>
              <option value="toefl">{t("course_toefl_t")}</option>
            </select>
          </div>
          <button type="submit" className="w-full btn btn-primary"><Send className="w-4 h-4 inline-block mr-2" /> {t("submit_application")}</button>
        </form>
      </section>
    </div>
  );
}