import { useState } from "react";
import { motion } from "framer-motion";

// Keep this in sync with the email in SocialLinks.jsx.
const CONTACT_EMAIL = "youremail@example.com";

const inputClasses =
  "w-full bg-transparent border border-line rounded-md px-4 py-2.5 text-sm " +
  "font-body text-paper placeholder:text-slate outline-none " +
  "focus:border-amber transition-colors";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`New quest from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\nFrom: ${form.name}\nEmail: ${form.email}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      data-unlock-name="Contact"
      className="bg-ink border-t border-line px-6 py-24 flex flex-col items-center"
    >
      <p className="font-mono text-sm text-slate mb-3">
        <span className="text-amber">$</span> cat contact.json
      </p>
      <h2 className="font-display text-3xl sm:text-4xl text-paper mb-2">
        Start a New Quest
      </h2>
      <p className="font-pixel text-[8px] text-slate mb-12 tracking-wider">
        SEND A MESSAGE
      </p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <div>
          <label htmlFor="name" className="font-mono text-[10px] text-slate mb-1.5 block">
            YOUR NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Player One"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className="font-mono text-[10px] text-slate mb-1.5 block">
            YOUR EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="message" className="font-mono text-[10px] text-slate mb-1.5 block">
            YOUR MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Describe your quest (job offer, collab, question...)"
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="mt-2 font-mono text-sm px-5 py-3 rounded-md border border-amber
                     text-amber hover:bg-amber/10 transition-colors
                     shadow-[0_0_15px_rgba(217,164,65,0.15)]"
        >
          ⚔ Send Message
        </button>

        <p className="font-mono text-[10px] text-slate text-center mt-1">
          Opens your email app with this pre-filled — nothing sends automatically.
        </p>
      </motion.form>
    </section>
  );
};

export default ContactSection;