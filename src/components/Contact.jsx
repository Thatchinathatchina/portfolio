import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/profile";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.target);

    try {
      await fetch("https://formsubmit.co/ajax/730789dbf6abd81ca34d68f1f674354c", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData,
      });
      setStatus("sent");
      e.target.reset();

      // Reset the button after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-px max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-widest text-[var(--color-primary-light)]"
        >
          HAVE A PROJECT IN MIND?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 font-display font-bold text-3xl sm:text-5xl text-white"
        >
          Let's build something together.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <ContactLink icon={Mail} label="Email" href={`mailto:${profile.email}`} />
          <ContactLink icon={GithubIcon} label="GitHub" href={profile.github} />
          <ContactLink icon={LinkedinIcon} label="LinkedIn" href={profile.linkedin} />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 glass rounded-2xl p-6 sm:p-8 text-left max-w-xl mx-auto"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_subject" value="New Portfolio Message!" />
          <input type="hidden" name="_template" value="box" />

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-mono text-[var(--color-muted)] mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] px-4 py-3 text-sm text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary-light)]"
              placeholder="Tell me a bit about the project..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            style={{ background: "var(--color-primary)" }}
          >
            <Send size={16} />
            {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent!" : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="mt-3 text-sm text-green-400">
              Message sent successfully! I will get back to you soon.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function ContactLink({ icon: Icon, label, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm text-white hover:border-[var(--color-primary-light)] transition-colors"
    >
      <Icon size={16} />
      {label}
    </a>
  );
}

function Field({ label, name, type }) {
  return (
    <div>
      <label className="block text-xs font-mono text-[var(--color-muted)] mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="w-full rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary-light)]"
      />
    </div>
  );
}
