import { motion } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";

export default function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ background: "rgba(4,7,16,0.72)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        layoutId={`folder-${project.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl my-8 rounded-2xl glass overflow-hidden"
        style={{ borderTop: `3px solid ${project.color}` }}
      >
        <button
          aria-label="Close project details"
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-white z-10"
        >
          <X size={22} />
        </button>

        <div className="p-6 sm:p-8">
          <p className="font-mono text-xs text-[var(--color-primary-light)]">// case study</p>
          <h3 className="mt-2 font-display font-bold text-2xl text-white">{project.name}</h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{project.overview}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs font-mono text-[var(--color-muted)]">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            <Block title="Business Problem" text={project.problem} />
            <Block title="Solution" text={project.solution} />
            <Block title="My Contribution" text={project.contribution} />
            <Block title="Challenges" text={project.challenges} />
          </div>

          <div className="mt-6">
            <p className="text-xs font-mono tracking-widest text-[var(--color-muted)] mb-2">FEATURES</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-[var(--color-text)]">
                  <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="text-xs font-mono tracking-widest text-[var(--color-muted)] mb-3">ARCHITECTURE</p>
            <div className="flex flex-wrap items-center gap-2">
              {project.architecture.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-xs font-mono text-[var(--color-text)]">
                    {step}
                  </span>
                  {i < project.architecture.length - 1 && (
                    <ArrowRight size={14} className="text-[var(--color-muted)]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2 text-sm text-white hover:border-[var(--color-primary-light)]"
              >
                <GithubIcon size={16} /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm text-white"
                style={{ background: "var(--color-primary)" }}
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ title, text }) {
  return (
    <div>
      <p className="text-xs font-mono tracking-widest text-[var(--color-muted)] mb-1">
        {title.toUpperCase()}
      </p>
      <p className="text-sm text-[var(--color-text)] leading-relaxed">{text}</p>
    </div>
  );
}
