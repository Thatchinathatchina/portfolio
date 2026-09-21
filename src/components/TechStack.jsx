import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { skillGroups } from "../data/skills";

export default function TechStack() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="container-px max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I build with"
          description="The stack I reach for on most projects — end to end, from database to interface."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                show: { 
                  opacity: 1, 
                  transition: { 
                    duration: 0.5, 
                    staggerChildren: 0.1,
                    delayChildren: gi * 0.1 + 0.2
                  } 
                }
              }}
              className="glass rounded-2xl p-6"
            >
              <p className="font-mono text-xs tracking-widest text-[var(--color-primary-light)] mb-4">
                {group.label.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, idx) => {
                  const Icon = Icons[skill.icon] || Icons.Code2;
                  
                  // Map index to a direction (top, bottom, left, right, diagonals)
                  const directions = [
                    { x: -150, y: -100 },
                    { x: 150, y: -100 },
                    { x: -150, y: 150 },
                    { x: 150, y: 150 },
                    { x: 0, y: -150 },
                    { x: 0, y: 150 },
                  ];
                  const dir = directions[idx % directions.length];

                  return (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, x: dir.x, y: dir.y, scale: 0.5 },
                        show: { 
                          opacity: 1, 
                          x: 0, 
                          y: 0, 
                          scale: 1, 
                          transition: { type: "spring", stiffness: 80, damping: 12 } 
                        }
                      }}
                      whileHover={{ y: -4, scale: 1.05, borderColor: "var(--color-primary-light)" }}
                      className="flex items-center gap-2 rounded-xl border border-[var(--color-line)] px-3 py-2 transition-colors bg-[#0b1120]/50"
                    >
                      <Icon size={16} className="text-[var(--color-primary-light)]" />
                      <span className="text-sm text-[var(--color-text)]">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <p className="font-mono text-xs tracking-widest text-[var(--color-primary-light)] mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">{title}</h2>
      {description && (
        <p className="mt-3 text-[var(--color-muted)] leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
