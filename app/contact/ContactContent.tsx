"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { SectionWrapper } from "@/components/sections/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/config";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactContent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      {/* Page Header */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-20"
        style={{ background: "linear-gradient(135deg, #1F3C88 0%, #162d6b 50%, #1F3C88 100%)" }}
      >
        <div className="absolute inset-0" style={{ opacity: 0.03 }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#ffffff" }}>
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Have a project in mind? We&apos;d love to hear about it. Fill
              out the form and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                    errors.name ? "border-red-400" : "border-border"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                    errors.email ? "border-red-400" : "border-border"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Company (optional) */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Company{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about your project, your goals, and any specific requirements..."
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y ${
                    errors.message ? "border-red-400" : "border-border"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <div>
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-lg bg-green-50 text-green-700 text-sm"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p>
                    Your message has been sent successfully. We&apos;ll get
                    back to you soon.
                  </p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-700 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>
                    Something went wrong. Please try again or email us
                    directly.
                  </p>
                </motion.div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#e8ecf5" }}>
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-sm text-secondary hover:underline"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#e8ecf5" }}>
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Location
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {BRAND.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-10 p-6 rounded-xl bg-muted border border-border">
                <h3 className="text-sm font-semibold text-primary mb-3">
                  What to Expect
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">1.</span>
                    We review your message within 24 hours
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">2.</span>
                    We schedule a discovery call if needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">3.</span>
                    We provide a clear proposal with scope and timeline
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-0.5">4.</span>
                    No commitment required — just a conversation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}

