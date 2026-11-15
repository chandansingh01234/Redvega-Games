'use client';

import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../ui/SocialIcons';
import confetti from 'canvas-confetti';

const INQUIRY_OPTIONS = [
  'General Question',
  'Business Inquiry',
  'Game Development',
  'Collaboration',
  'Publishing',
  'Press & Media',
  'Bug Report',
  'Feedback',
  'Other',
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    inquiryType: 'General Question',
    message: '',
    agreePrivacy: false,
    website: '', // Honeypot field for anti-spam
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusState, setStatusState] = useState<{
    type: 'idle' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStatusState({ type: 'idle' });

    // Client-side validation
    if (!formData.name.trim()) {
      setStatusState({ type: 'error', message: 'Please enter your full name.' });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatusState({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.subject.trim()) {
      setStatusState({ type: 'error', message: 'Please enter a subject line.' });
      return;
    }

    if (formData.message.trim().length < 20) {
      setStatusState({ type: 'error', message: 'Message must be at least 20 characters long.' });
      return;
    }

    if (formData.message.trim().length > 2000) {
      setStatusState({ type: 'error', message: 'Message cannot exceed 2000 characters.' });
      return;
    }

    if (!formData.agreePrivacy) {
      setStatusState({ type: 'error', message: 'You must agree to the privacy policy to submit.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatusState({ type: 'success' });
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#E63946', '#FF2E4D', '#A855F7'],
        });

        // Automatically clear form
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          inquiryType: 'General Question',
          message: '',
          agreePrivacy: false,
          website: '',
        });
      } else {
        setStatusState({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again in a few minutes.',
        });
      }
    } catch (err) {
      console.error('Submission Error:', err);
      setStatusState({
        type: 'error',
        message: 'Something went wrong. Please try again in a few minutes.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#09090B]">
      {/* Background Purple & Red Ambient Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E63946]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#A855F7]/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(230,57,70,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2E4D] animate-pulse" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contact <span className="text-gradient-red">Redvega Games</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Have a game idea, business inquiry, collaboration proposal, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 blur-[40px] rounded-full pointer-events-none" />

              <h3 className="text-xl font-bold text-white border-l-2 border-[#E63946] pl-3">
                Studio Reach
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with Redvega Games for business partnerships, press inquiries, community feedback, or early access beta testing.
              </p>

              {/* Direct Email Card */}
              <div className="p-4 rounded-2xl bg-[#10131C] border border-white/10 flex items-center gap-4 group hover:border-[#E63946]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#E63946]/15 border border-[#E63946]/30 flex items-center justify-center text-[#E63946] group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Official Studio Email</div>
                  <a
                    href="mailto:redvegagames@gmail.com"
                    className="text-sm font-bold text-white hover:text-[#E63946] transition-colors"
                  >
                    redvegagames@gmail.com
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Social & Store Links
                </div>

                <a
                  href="https://www.instagram.com/redvegagames/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#10131C] border border-white/10 hover:border-[#E63946] text-xs font-semibold text-slate-200 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <InstagramIcon className="w-5 h-5 text-[#E63946] group-hover:scale-110 transition-transform" />
                    <span>Instagram</span>
                  </span>
                  <span className="text-[11px] text-slate-400">@redvegagames</span>
                </a>

                <a
                  href="https://www.youtube.com/@RedVegaGames"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#10131C] border border-white/10 hover:border-[#E63946] text-xs font-semibold text-slate-200 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <YoutubeIcon className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                    <span>YouTube</span>
                  </span>
                  <span className="text-[11px] text-slate-400">@RedVegaGames</span>
                </a>

                <a
                  href="https://play.google.com/store/apps/dev?id=6900533808962356909&hl=hr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#10131C] border border-white/10 hover:border-[#E63946] text-xs font-semibold text-slate-200 hover:text-white transition-all group"
                >
                  <span className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
                    <span>Google Play Dev Page</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold">Verified Dev</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
              {/* Status Alert Banner */}
              {statusState.type === 'success' && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-base text-white">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Thank you!</span>
                  </div>
                  <p>Your message has been sent successfully to <strong>redvegagames@gmail.com</strong>.</p>
                  <p className="text-xs text-slate-300">We'll get back to you as soon as possible.</p>
                </div>
              )}

              {statusState.type === 'error' && (
                <div className="mb-6 p-5 rounded-2xl bg-[#E63946]/10 border border-[#E63946]/40 text-[#E63946] text-sm space-y-1 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-base text-white">
                    <AlertCircle className="w-5 h-5 text-[#FF2E4D]" />
                    <span>Something went wrong.</span>
                  </div>
                  <p>{statusState.message || 'Please try again in a few minutes.'}</p>
                  <p className="text-xs text-slate-300">
                    Or email us directly at:{' '}
                    <a href="mailto:redvegagames@gmail.com" className="underline font-bold text-white">
                      redvegagames@gmail.com
                    </a>
                  </p>
                </div>
              )}

              {/* Main Contact Form */}
              <form method="POST" action="/api/contact" onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot hidden input field for anti-spam */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden pointer-events-none absolute -left-[9999px]"
                  autoComplete="off"
                />

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-[#10131C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@example.com"
                      className="w-full bg-[#10131C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                    />
                  </div>
                </div>

                {/* Company & Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Company <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Game Studio Inc."
                      className="w-full bg-[#10131C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#10131C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                    >
                      {INQUIRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#10131C] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Mobile Game Partnership Proposal"
                    className="w-full bg-[#10131C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Message *
                    </label>
                    <span
                      className={`text-xs ${
                        formData.message.length < 20 || formData.message.length > 2000
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {formData.message.length} / 2000 chars (min 20)
                    </span>
                  </div>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={20}
                    maxLength={2000}
                    placeholder="Write your message here... (minimum 20 characters)"
                    className="w-full bg-[#10131C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all resize-none"
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="agreePrivacy"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 rounded bg-[#10131C] border-white/20 text-[#E63946] focus:ring-[#E63946] cursor-pointer"
                  />
                  <label htmlFor="agreePrivacy" className="text-xs text-slate-300 cursor-pointer leading-relaxed">
                    I agree to the privacy policy and consent to Redvega Games storing my submission details to respond to this inquiry.
                  </label>
                </div>

                {/* Submit Action Button */}
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  fullWidth
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )
                  }
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
