"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { PageHeader } from "@/components/sections/PageHeader";
import { PulseDot } from "@/components/mockups/Mockups";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/config";
import { useDictionary } from "@/lib/dictionary-context";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const inputBase =
  "w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground " +
  "placeholder:text-steel/70 transition-colors duration-200 " +
  "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15";

export function ContactContent() {
  const dict = useDictionary();
  const c = dict.contact;
  const f = c.form;

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [serverError, setServerError] = useState<string>("");

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = `${f.name} ${f.required}`;
    if (!formData.email.trim()) newErrors.email = `${f.email} ${f.required}`;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = f.invalidEmail;
    if (!formData.message.trim())
      newErrors.message = `${f.message} ${f.required}`;
    else if (formData.message.trim().length < 10)
      newErrors.message = f.messageMinLength;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
        setServerError(data.errors?.[0] || f.errorMessage);
      }
    } catch {
      setStatus("error");
      setServerError(f.errorMessage);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const labelClass = "mb-2 block text-sm font-medium text-foreground";

  return (
    <>
      <PageHeader title={c.header.title} subtitle={c.header.subtitle} />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* ── Form ── */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    {f.name} <span className="text-secondary-hover">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={`${inputBase} ${
                      errors.name ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    {f.email} <span className="text-secondary-hover">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className={`${inputBase} ${
                      errors.email ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="company" className={labelClass}>
                  {f.company}{" "}
                  <span className="text-xs font-normal text-steel">
                    ({f.optional})
                  </span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`${inputBase} border-border`}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  {f.message} <span className="text-secondary-hover">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder={f.messagePlaceholder}
                  className={`${inputBase} resize-y ${
                    errors.message ? "border-red-400" : "border-border"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {f.sending}
                    </>
                  ) : (
                    <>
                      {f.submit}
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-secondary/30 bg-secondary-light p-4 text-sm text-secondary-hover"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{f.successMessage}</p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    {serverError || f.errorMessage}{" "}
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="font-medium underline"
                    >
                      {BRAND.email}
                    </a>
                  </p>
                </motion.div>
              )}
            </form>
          </div>

          {/* ── Info sidebar ── */}
          <div className="lg:col-span-2">
            <div className="space-y-8 lg:sticky lg:top-28">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                  <PulseDot />
                  <span className="text-[13px] font-medium text-foreground">
                    {c.available}
                  </span>
                </div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {c.info.title}
                </h2>
                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-brand">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {c.info.emailLabel}
                      </h3>
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="text-sm text-secondary-hover hover:underline"
                      >
                        {BRAND.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-brand">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {c.info.locationLabel}
                      </h3>
                      <p className="text-sm text-slate">{BRAND.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-paper p-6 lg:p-7">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-secondary" />
                  <h3 className="font-display text-sm font-semibold text-ink">
                    {c.info.expectTitle}
                  </h3>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate">
                  {[
                    c.info.expect1,
                    c.info.expect2,
                    c.info.expect3,
                    c.info.expect4,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-light text-secondary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
