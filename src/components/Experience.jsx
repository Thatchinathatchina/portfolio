import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { timeline } from "../data/experience";
import { SectionHeading } from "./TechStack";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="container-px max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Timeline"
          description="What I've been doing, and where it started."
        />
        <div className="relative mt-16 max-w-4xl mx-auto pl-8 sm:pl-10">
          {/* Dashed Vertical Line (Steps) */}
          <div className="absolute left-[31px] sm:left-[39px] top-8 bottom-0 w-[2px] border-l-[3px] border-dotted border-[var(--color-line)] z-0" />

          {/* Walking Character Animation */}
          {/* NOTE: To make this a realtime walk, you need to replace character.jpg with a walking .gif file */}
          <motion.img
            src="/character.png"
            alt="Walking Character"
            className="absolute left-[15px] sm:left-[18px] z-10 w-15 h-15 rounded-full object-cover shadow-lg border-2 border-[var(--color-primary)]"
            initial={{ top: "100%" }}
            animate={{ top: "0%" }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative mb-12 last:mb-0"
                >
                  <span
                    className="absolute -left-8 sm:-left-10 top-0 flex items-center justify-center h-4 w-4 rounded-full ring-4"
                    style={{ background: "var(--color-primary)", ringColor: "var(--color-ink)" }}
                  />
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center gap-2 text-[var(--color-primary-light)]">
                      <Icon size={16} />
                      <span className="font-mono text-xs tracking-widest">{item.period}</span>
                    </div>
                    <h3 className="mt-2 font-display font-semibold text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">{item.org}</p>
                    {item.points && item.points.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {item.points.map((p, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-[var(--color-text)]">
                            <span className="text-[var(--color-primary-light)] mt-1">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
