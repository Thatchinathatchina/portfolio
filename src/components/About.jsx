import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, GraduationCap, GitCommitHorizontal } from "lucide-react";
import { profile } from "../data/profile";
import { timeline, education, approach } from "../data/experience";
import { SectionHeading } from "./TechStack";

const tabs = [
  { id: "overview", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "approach", label: "Development", icon: GitCommitHorizontal },
];

export default function About() {
  const [active, setActive] = useState("overview");
  const workItems = timeline.filter((t) => t.type === "work");

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-px max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="About Me"
          title="A developer who ships working software"
          description="A closer look at how I got here, what I've worked on, and how I approach a build."
        />

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-2 h-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-left transition-colors border ${
                    isActive
                      ? "text-white border-[var(--color-primary-light)]"
                      : "text-[var(--color-muted)] border-[var(--color-line)] hover:border-[var(--color-primary-dim)]"
                  }`}
                  style={isActive ? { background: "var(--color-primary-dim)" } : {}}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="md:col-span-2 glass rounded-2xl p-6 sm:p-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              {active === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="space-y-4 text-[var(--color-muted)] leading-relaxed">
                    {profile.bio.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {profile.stats.map((s) => (
                      <div key={s.label} className="rounded-xl border border-[var(--color-line)] p-4 text-center">
                        <p className="font-display font-bold text-2xl text-white">{s.value}</p>
                        <p className="mt-1 text-xs text-[var(--color-muted)]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {active === "experience" && workItems.length > 0 && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8 h-full pr-2"
                >
                  {workItems.map((work) => (
                    <div key={work.id}>
                      <p className="font-display font-semibold text-lg text-white">{work.title}</p>
                      <p className="text-sm text-[var(--color-primary-light)]">{work.org} · {work.period}</p>
                      <ul className="mt-4 space-y-2">
                        {work.points.map((p, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[var(--color-muted)]">
                            <span className="mt-2 h-1 w-1 rounded-full bg-[var(--color-primary-light)] flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}

              {active === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-display font-semibold text-lg text-white">{edu.title}</p>
                      <p className="text-sm text-[var(--color-primary-light)]">{edu.org} · {edu.period}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {active === "approach" && (
                <motion.div
                  key="approach"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <ol className="space-y-4">
                    {approach.map((step, i) => (
                      <li key={step.stage} className="flex gap-3">
                        <span className="font-mono text-xs text-[var(--color-primary-light)] mt-0.5 w-5">{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium text-white">{step.stage}</p>
                          <p className="text-sm text-[var(--color-muted)]">{step.note}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
