import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Copy,
  Mail,
  Send,
  User,
  MessageSquare,
  AlertCircle,
  Loader2,
  PartyPopper,
} from 'lucide-react';
import {
  cn,
  motionEase,
  sectionShell,
  sectionTitleMargin,
  viewportOnce,
} from '../lib/utils';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const CONTACT_INTRO =
  "Have a question or want to work together? Fill in the form below and I'll get back to you as soon as possible.";

const PRIMARY_EMAIL = 'kulharshit21@gmail.com';
const SECONDARY_EMAIL = 'hk0534@srmist.edu.in';

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      <div className="animate-bounce-in relative z-10 w-full max-w-md rounded-2xl border-2 border-accent-2/50 bg-surface p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="confetti" />
          <div className="confetti" />
          <div className="confetti" />
          <div className="confetti" />
          <div className="confetti" />
        </div>

        <div className="relative text-center">
          <div className="animate-scale-in mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-2 to-accent-2/70 shadow-lg">
            <PartyPopper size={40} className="text-bg" />
          </div>

          <h2 className="animate-slide-up mb-3 text-4xl font-bold text-foreground">
            🎉 Hurray! 🎉
          </h2>

          <p
            className="animate-slide-up mb-2 text-xl text-muted"
            style={{ animationDelay: '0.1s' }}
          >
            Message sent successfully!
          </p>
          <p
            className="animate-slide-up mb-6 text-lg text-muted"
            style={{ animationDelay: '0.2s' }}
          >
            I'll get back to you soon. 😊
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="rounded-lg bg-accent-2 px-6 py-3 font-dm font-semibold text-bg shadow-lg"
          >
            Awesome!
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const [toast, setToast] = useState<'idle' | 'copied'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PRIMARY_EMAIL);
      setToast('copied');
      window.setTimeout(() => setToast('idle'), 2800);
    } catch {
      setToast('idle');
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const maxLengths: Record<string, number> = {
      name: 100,
      email: 100,
      subject: 150,
      message: 1000,
    };
    if (value.length <= maxLengths[name]) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      window.setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    if (formData.message.length < 10) {
      setStatus('error');
      setErrorMsg('Message must be at least 10 characters long.');
      window.setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        let errorMessage = 'Something went wrong';
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch {
          // response wasn't JSON
        }
        throw new Error(errorMessage);
      }

      const data = await res.json().catch(() => ({ ok: true }));
      if (!data.ok && data.error) throw new Error(data.error);

      setStatus('success');
      setShowSuccessModal(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      window.setTimeout(() => {
        setShowSuccessModal(false);
        setStatus('idle');
      }, 4000);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please try again.'
      );
      window.setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className={sectionShell}>
      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className={cn(
            sectionTitleMargin,
            'text-center font-display text-3xl font-normal md:text-4xl'
          )}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <span className="relative inline-block">
            Get in Touch
            <span className="absolute bottom-0 left-0 h-1 w-full origin-left bg-accent-2" />
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-6 max-w-lg text-center font-dm text-muted"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase, delay: 0.06 }}
        >
          {CONTACT_INTRO}
        </motion.p>

        <motion.div
          className="mx-auto mb-8 max-w-2xl rounded-2xl border border-border bg-surface/80 p-8 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: motionEase, delay: 0.08 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="mb-2 block font-dm text-sm font-medium text-foreground/90"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                  <User size={18} />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-border bg-bg/80 py-3 pl-10 pr-4 font-dm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-2"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="mb-2 block font-dm text-sm font-medium text-foreground/90"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-border bg-bg/80 py-3 pl-10 pr-4 font-dm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-2"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="subject"
                className="mb-2 block font-dm text-sm font-medium text-foreground/90"
              >
                Subject
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                  <MessageSquare size={18} />
                </span>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  className="w-full rounded-lg border border-border bg-bg/80 py-3 pl-10 pr-4 font-dm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-2"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="message"
                  className="block font-dm text-sm font-medium text-foreground/90"
                >
                  Message
                </label>
                <span
                  className={`font-dm text-sm ${formData.message.length > 900 ? 'text-accent' : 'text-muted'}`}
                >
                  {formData.message.length}/1000
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                minLength={10}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full resize-none rounded-lg border border-border bg-bg/80 px-4 py-3 font-dm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent-2"
                aria-describedby="message-counter"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
              whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-2 px-6 py-3 font-dm font-medium text-bg shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>

            {status === 'error' ? (
              <div className="flex items-center gap-2 rounded-lg border border-red-900/50 bg-red-950/40 p-4 font-dm text-red-300">
                <AlertCircle size={20} />
                <span>{errorMsg}</span>
              </div>
            ) : null}
          </form>
        </motion.div>

        <motion.div
          className="mx-auto max-w-xl rounded-2xl border border-border bg-surface/80 p-8 backdrop-blur-md"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: motionEase }}
        >
          <p className="mb-6 text-center font-dm text-sm text-muted">
            Or reach me directly
          </p>
          <div className="flex flex-col items-center gap-6 text-center">
            <Mail className="h-10 w-10 text-accent" strokeWidth={1.25} />

            <motion.a
              href={`mailto:${PRIMARY_EMAIL}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="break-all font-display text-xl text-foreground underline decoration-accent/50 underline-offset-8 hover:decoration-accent md:text-2xl"
            >
              {PRIMARY_EMAIL}
            </motion.a>

            <motion.button
              type="button"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg/80 px-6 py-3 font-mono text-sm text-foreground shadow-sm"
            >
              <Copy className="h-4 w-4" />
              Copy email
            </motion.button>

            <a
              href={`mailto:${SECONDARY_EMAIL}`}
              className="font-dm text-sm text-accent-2 hover:underline"
            >
              {SECONDARY_EMAIL}
            </a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast === 'copied' ? (
          <motion.div
            className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-border bg-surface px-5 py-2.5 font-mono text-sm text-foreground shadow-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: motionEase }}
          >
            Copied to clipboard
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setStatus('idle');
        }}
      />
    </section>
  );
};

export default Contact;
