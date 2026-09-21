import { motion } from "framer-motion";
import { services } from "../data/experience";
import { SectionHeading } from "./TechStack";

export default function Services() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-px max-w-6xl mx-auto">
        <SectionHeading eyebrow="Services" title="What I can help with" />

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform"
            >
              <p className="font-mono text-sm text-[var(--color-primary-light)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display font-semibold text-lg text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
