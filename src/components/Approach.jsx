import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { approach } from "../data/experience";
import { SectionHeading } from "./TechStack";

export default function Approach() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-px max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Development Approach"
          title="How I take a build from idea to production"
        />

        <div className="mt-14 flex flex-col md:flex-row md:flex-wrap md:items-stretch gap-4">
          {approach.map((step, i) => (
            <motion.div
              key={step.stage}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center md:flex-col md:items-start gap-4 md:gap-0 flex-1 md:min-w-[150px]"
            >
              <div className="glass rounded-xl p-5 flex-1 w-full">
                <p className="font-mono text-xs text-[var(--color-primary-light)]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-display font-semibold text-white">{step.stage}</p>
                <p className="mt-1 text-xs text-[var(--color-muted)] leading-relaxed">{step.note}</p>
              </div>
              {i < approach.length - 1 && (
                <span className="text-[var(--color-muted)] flex-shrink-0">
                  <ArrowRight size={18} className="hidden md:block md:hidden" />
                  <ArrowDown size={18} className="md:hidden" />
                  <ArrowRight size={18} className="hidden md:inline" />
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
