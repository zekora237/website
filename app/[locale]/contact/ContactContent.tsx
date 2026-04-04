"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
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

const inputBase = "w-full px-4 py-3.5 rounded-xl border bg-white text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-all duration-300";

export function ContactContent() {
  const dict = useDictionary();
  const c = dict.contact;
  const f = c.form;

  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [serverError, setServerError] = useState<string>("");

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    if (!formData.name.trim()) newErrors.name = `${f.name} ${f.required}`;
    if (!formData.email.trim()) newErrors.email = `${f.email} ${f.required}`;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = f.invalidEmail;
    if (!formData.message.trim()) newErrors.message = `${f.message} ${f.required}`;
    else if (formData.message.trim().length < 10) newErrors.message = f.messageMinLength;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20" style={{ background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)" }}>
        <div className="absolute inset-0" style={{ opacity: 0.06 }}>
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#ffffff" }}>{c.header.title}</h1>
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{c.header.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {f.name} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    placeholder="John Doe"
                    className={`${inputBase} ${errors.name ? "border-red-400 focus:ring-red-100" : "border-border"}`}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {f.email} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="john@company.com"
                    className={`${inputBase} ${errors.email ? "border-red-400 focus:ring-red-100" : "border-border"}`}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  {f.company} <span className="text-muted-foreground font-normal text-xs">({f.optional})</span>
                </label>
                <input
                  type="text" id="company" name="company" value={formData.company} onChange={handleChange}
                  className={`${inputBase} border-border`}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {f.message} <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message" name="message" value={formData.message} onChange={handleChange}
                  rows={6} placeholder={f.messagePlaceholder}
                  className={`${inputBase} resize-y ${errors.message ? "border-red-400 focus:ring-red-100" : "border-border"}`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" variant="primary" disabled={status === "loading"} className="w-full sm:w-auto">
                  {status === "loading" ? (
                    <><span className="animate-spin mr-2">⟳</span>{f.sending}</>
                  ) : (
                    <>{f.submit}<Send className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </div>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 p-4 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /><p>{f.successMessage}</p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    {serverError || f.errorMessage}{" "}
                    <a href={`mailto:${BRAND.email}`} className="underline font-medium">{BRAND.email}</a>
                  </p>
                </motion.div>
              )}
            </form>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">{c.info.title}</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}>
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{c.info.emailLabel}</h3>
                      <a href={`mailto:${BRAND.email}`} className="text-sm text-secondary hover:underline">{BRAND.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: "linear-gradient(135deg, #1F3C88, #253f80)" }}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{c.info.locationLabel}</h3>
                      <p className="text-sm text-muted-foreground">{BRAND.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="relative p-6 lg:p-7 rounded-2xl border border-border overflow-hidden" style={{ backgroundColor: "#f8f9fb" }}>
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #1F3C88, #1BA6A6)" }} />
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-secondary" />
                  <h3 className="text-sm font-bold text-primary">{c.info.expectTitle}</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />{c.info.expect1}</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />{c.info.expect2}</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />{c.info.expect3}</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />{c.info.expect4}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

