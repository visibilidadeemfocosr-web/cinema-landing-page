"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Send, Instagram, FilmIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/lib/i18n/context"

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function Contact() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formState.name.trim() || formState.name.trim().length < 2) {
      newErrors.name = t.contact.form.errors.name
    }

    if (!formState.email.trim()) {
      newErrors.email = t.contact.form.errors.email
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = t.contact.form.errors.emailInvalid
    }

    if (!formState.subject.trim() || formState.subject.trim().length < 3) {
      newErrors.subject = t.contact.form.errors.subject
    }

    if (!formState.message.trim() || formState.message.trim().length < 10) {
      newErrors.message = t.contact.form.errors.message
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: t.contact.form.errors.validation,
        description: t.contact.form.errors.validation,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setIsSuccess(false)
    setErrors({})

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        setFormState({ name: "", email: "", subject: "", message: "" })
        toast({
          title: t.contact.form.success.title,
          description: data.message || t.contact.form.success.description,
        })
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        const errorMessage = data.message || "Erro ao enviar mensagem"
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        })
        
        // Set field errors if provided
        if (data.errors) {
          const fieldErrors: FormErrors = {}
          data.errors.forEach((err: { path: string[]; message: string }) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as keyof FormErrors] = err.message
            }
          })
          setErrors(fieldErrors)
        }
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      toast({
        title: t.contact.form.errors.connection,
        description: t.contact.form.errors.connection,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <svg className="absolute top-10 right-1/4 w-64 h-64" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="contactTerracotta1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.58 0.15 35)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.65 0.18 30)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M20,100 C50,80 80,120 110,100 S170,80 190,100"
            fill="none"
            stroke="url(#contactTerracotta1)"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
          />
          <circle cx="100" cy="100" r="40" fill="none" stroke="oklch(0.62 0.16 38)" strokeWidth="2.5" opacity="0.7" className="drop-shadow-sm" />
          <path
            d="M50,50 L150,50 L150,150 L50,150 Z"
            fill="none"
            stroke="oklch(0.65 0.18 30)"
            strokeWidth="2.5"
            strokeDasharray="5,5"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
            style={{ animationDelay: "0.5s" }}
          />
        </svg>
        <svg className="absolute bottom-20 left-1/4 w-48 h-48" viewBox="0 0 200 200">
          <path
            d="M10,100 Q50,60 100,100 T190,100"
            fill="none"
            stroke="oklch(0.52 0.12 45)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="animate-draw drop-shadow-sm"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>
      {/* </CHANGE> */}

      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-balance">{t.contact.title}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.contact.description}
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr,380px] gap-12">
            <Card className="p-10 border-2 shadow-2xl bg-card/80 backdrop-blur-sm">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{t.contact.form.success.title}</h3>
                  <p className="text-muted-foreground">
                    {t.contact.form.success.description}
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="mt-4"
                  >
                    {t.contact.form.success.sendAnother}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold">
                        {t.contact.form.name}
                      </label>
                      <Input
                        id="name"
                        placeholder={t.contact.form.namePlaceholder}
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value })
                          if (errors.name) setErrors({ ...errors, name: undefined })
                        }}
                        disabled={isLoading}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`h-12 border-2 focus:border-accent ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold">
                        {t.contact.form.email}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value })
                          if (errors.email) setErrors({ ...errors, email: undefined })
                        }}
                        disabled={isLoading}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`h-12 border-2 focus:border-accent ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold">
                      {t.contact.form.subject}
                    </label>
                    <Input
                      id="subject"
                      placeholder={t.contact.form.subjectPlaceholder}
                      value={formState.subject}
                      onChange={(e) => {
                        setFormState({ ...formState, subject: e.target.value })
                        if (errors.subject) setErrors({ ...errors, subject: undefined })
                      }}
                      disabled={isLoading}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={`h-12 border-2 focus:border-accent ${errors.subject ? "border-destructive" : ""}`}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold">
                      {t.contact.form.message}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t.contact.form.messagePlaceholder}
                      rows={6}
                      value={formState.message}
                      onChange={(e) => {
                        setFormState({ ...formState, message: e.target.value })
                        if (errors.message) setErrors({ ...errors, message: undefined })
                      }}
                      disabled={isLoading}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`border-2 focus:border-accent resize-none ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base rounded-xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {t.contact.form.submit}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>

            <div className="space-y-6">
              <Card className="p-6 space-y-6 border-2 bg-card/80 backdrop-blur-sm">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent/5 transition-colors">
                  <div className="bg-accent/10 p-3 rounded-xl">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">{t.contact.info.email}</h3>
                    <a
                      href="mailto:alicestamato@gmail.com"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors break-all"
                    >
                      alicestamato@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-accent/5 transition-colors">
                  <div className="bg-accent/10 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-lg">{t.contact.info.location}</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {t.contact.info.locationValue}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 bg-gradient-to-br from-accent/5 to-primary/5">
                <h3 className="font-semibold mb-5 text-lg">{t.contact.info.social}</h3>
                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com/alicestamato"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/60 hover:bg-accent/10 text-sm hover:text-accent transition-all group"
                  >
                    <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">@alicestamato</span>
                  </a>
                  <a
                    href="https://www.instagram.com/lombadafilmes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/60 hover:bg-accent/10 text-sm hover:text-accent transition-all group"
                  >
                    <FilmIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">@lombadafilmes</span>
                  </a>
                  <a
                    href="https://vimeo.com/alicestamato"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/60 hover:bg-accent/10 text-sm hover:text-accent transition-all group"
                  >
                    <svg
                      className="h-5 w-5 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
                    </svg>
                    <span className="font-medium">Vimeo</span>
                  </a>
                </div>
              </Card>

              <Card className="p-6 border-2 border-accent/20 bg-accent/5">
                <p className="text-sm text-center text-muted-foreground leading-relaxed">
                  {t.contact.info.responseTime} <span className="font-semibold text-accent">{t.contact.info.hours}</span>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
