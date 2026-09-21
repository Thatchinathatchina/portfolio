import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, FileCode2, FileText, ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import { SectionHeading } from "./TechStack";
import ProjectModal from "./ProjectModal";

function ProjectCard({ project, index, onOpenModal }) {
  const [isHover, setIsHover] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative mt-10"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ perspective: "1200px" }}
    >
      {/* Folder Tab (Back cover of the folder) */}
      <div
        className="absolute -top-7 left-0 h-7 w-2/5 rounded-t-2xl glass border-t-[3px] border-l-[3px] border-r-[1px] border-[var(--color-line)] border-b-0 z-0 transition-colors duration-300"
        style={{
          borderTopColor: project.color,
          borderLeftColor: project.color,
          background: 'rgba(16, 26, 48, 0.7)'
        }}
      />

      {/* Files popping out of the main folder (Middle layer) */}
      <motion.div
        className="absolute top-10 right-32 sm:right-40 z-10 pointer-events-none"
        initial={false}
        animate={{
          y: isHover ? -130 : -100,
          opacity: 1,
          scale: 1,
          rotate: -8
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      >
        <div className="bg-[#0b1120]/50 backdrop-blur-md p-2 rounded-xl border border-[var(--color-line)] shadow-2xl flex items-center justify-center overflow-hidden">
          {project.images && project.images[0] ? (
            <img src={project.images[0]} alt={`${project.name} screenshot 1`} className="w-56 sm:w-64 h-auto rounded-lg object-cover mix-blend-lighten" />
          ) : (
            <div className="p-4 bg-[#0b1120]/80 rounded-lg"><FileCode2 size={32} style={{ color: project.color }} /></div>
          )}
        </div>
      </motion.div>

      <motion.div
        className="absolute top-10 right-4 sm:right-11 z-10 pointer-events-none"
        initial={false}
        animate={{
          y: isHover ? -145 : -100,
          opacity: 1,
          scale: 1,
          rotate: 12
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.05 }}
      >
        <div className="bg-[#0b1120]/50 backdrop-blur-md p-2 rounded-xl border border-[var(--color-line)] shadow-2xl flex items-center justify-center overflow-hidden">
          {project.images && project.images[1] ? (
            <img src={project.images[1]} alt={`${project.name} screenshot 2`} className="w-32 sm:w-40 h-auto rounded-lg object-cover mix-blend-lighten" />
          ) : (
            <div className="p-4 bg-[#0b1120]/80 rounded-lg"><FileText size={32} style={{ color: project.color }} /></div>
          )}
        </div>
      </motion.div>

      {/* Main Folder Body (Front cover) */}
      <motion.button
        onClick={() => setIsFolderOpen(!isFolderOpen)}
        className="relative w-full text-left rounded-b-2xl rounded-tr-2xl p-6 sm:p-7 glass border-t-[3px] z-20 block transition-all duration-300 hover:shadow-2xl bg-[#0b1120]/30 cursor-pointer"
        style={{
          borderTopColor: project.color,
          borderTopLeftRadius: '0',
          boxShadow: isHover ? `0 20px 40px -10px ${project.color}30` : 'none',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(6px)',
          transformOrigin: 'bottom'
        }}
        animate={{
          rotateX: isFolderOpen ? 25 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Glow effect behind the card */}
        <div
          className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-[50px] opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-150 -z-30 pointer-events-none"
          style={{ background: project.color }}
        />

        {/* We can keep or remove the small folder icon inside, I'll replace it with a simple icon */}
        <div className="relative h-12 w-12 mb-4 bg-white/5 rounded-full flex items-center justify-center">
          <Folder size={24} style={{ color: project.color }} />
        </div>

        <h3 className="mt-8 font-display font-semibold text-xl text-white">
          {project.name}
        </h3>
        <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[11px] font-mono text-[var(--color-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.button>

      {/* View More Button */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] text-xs font-mono text-white hover:bg-[var(--color-line)] transition-colors shadow-lg"
          style={{ borderColor: `${project.color}50` }}
        >
          View More <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState(null);
  const active = projects.find((p) => p.id === openId);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-px max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Things I've built"
          description="Click a folder to open it, or click 'View More' to read the full case study."
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-x-8 gap-y-12">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenModal={() => setOpenId(project.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  );
}
