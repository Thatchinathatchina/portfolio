import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Folder, FileCode2, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import ProjectModal from "./ProjectModal";
import FolderScene3D from "./FolderScene3D";

const NUM_PROJECTS = projects.length; // 4
const NUM_TRANSITIONS = NUM_PROJECTS - 1; // 3

/* ─── Active folder: full project content (HTML overlay) ────────── */
function ActiveFolderContent({ project, onOpenModal }) {
  return (
    <div className="folder-content-active">
      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <Folder size={22} style={{ color: project.color }} />
        </div>

        <h3
          className="font-display"
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#fff",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {project.name}
        </h3>

        <p
          style={{
            marginTop: 10,
            fontSize: "0.875rem",
            color: "var(--color-muted)",
            lineHeight: 1.6,
            maxWidth: 400,
          }}
        >
          {project.summary}
        </p>

        {/* Tech badges */}
        <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                borderRadius: 9999,
                border: "1px solid var(--color-line)",
                padding: "4px 12px",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* View More */}
        <button
          onClick={onOpenModal}
          style={{
            marginTop: 20,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 9999,
            background: "var(--color-surface)",
            border: `1px solid ${project.color}50`,
            color: "#fff",
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = project.color + "30";
            e.currentTarget.style.borderColor = project.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-surface)";
            e.currentTarget.style.borderColor = project.color + "50";
          }}
        >
          View More <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function FloatingImages({ project }) {
  if (!project.images || project.images.length === 0) {
    return (
      <div
        style={{
          position: "absolute",
          top: -60,
          right: 80,
          width: 80,
          height: 80,
          borderRadius: 16,
          background: "rgba(11,17,32,0.8)",
          border: "1px solid rgba(120,145,200,0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <FileCode2 size={36} style={{ color: project.color }} />
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10 }}>
      <motion.div
        className="folder-float-img"
        style={{
          position: "absolute",
          top: -110,
          right: 100,
          width: "clamp(200px, 30vw, 280px)",
          pointerEvents: "auto",
          zIndex: 1,
          background: "rgba(11, 17, 32, 0.5)",
          backdropFilter: "blur(12px)",
          padding: 8,
        }}
        initial={{ y: 0, rotate: -6 }}
        animate={{ y: -10, rotate: -8 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <img
          src={project.images[0]}
          alt={`${project.name} screenshot`}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 8,
            mixBlendMode: "lighten",
          }}
        />
      </motion.div>
      {project.images[1] && (
        <motion.div
          className="folder-float-img"
          style={{
            position: "absolute",
            top: -20,
            right: 20,
            width: "clamp(120px, 18vw, 150px)",
            pointerEvents: "auto",
            zIndex: 2,
            background: "rgba(11, 17, 32, 0.5)",
            backdropFilter: "blur(12px)",
            padding: 8,
          }}
          initial={{ y: 0, rotate: 8 }}
          animate={{ y: -14, rotate: 10 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.3 }}
        >
          <img
            src={project.images[1]}
            alt={`${project.name} screenshot 2`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: 8,
              mixBlendMode: "lighten",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Progress Dots ─────────────────────────────────────────────── */
function ProgressDots({ activeIndex, onDotClick }) {
  return (
    <div className="folder-progress">
      {projects.map((p, i) => (
        <div
          key={p.id}
          onClick={() => onDotClick(i)}
          className={`folder-progress-dot ${i === activeIndex ? "active" : ""}`}
          style={
            i === activeIndex
              ? {
                borderColor: p.color,
                background: p.color,
                boxShadow: `0 0 12px ${p.color}60`,
                cursor: "pointer",
              }
              : { cursor: "pointer" }
          }
          aria-label={`Go to project ${i + 1}`}
          role="button"
          tabIndex={0}
        />
      ))}
    </div>
  );
}

/* ─── Main Carousel Component ───────────────────────────────────── */
export default function ProjectFolderCarousel() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(0);
  const [openId, setOpenId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentOpacity, setContentOpacity] = useState(1);
  const activeIdxRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const shiftMv = useMotionValue(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const targetIdxRef = useRef(0);

  // Read raw scroll and map it to a target integer index
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const usable = Math.min(v / 0.9, 1);
    const rawShift = usable * NUM_TRANSITIONS; // 0 to 3
    const targetIdx = Math.min(Math.round(rawShift), NUM_PROJECTS - 1);

    if (targetIdx !== targetIdxRef.current) {
      targetIdxRef.current = targetIdx;
      setTargetIndex(targetIdx);
    }
  });

  // Sequentially animate the visual shift to match the target index
  useEffect(() => {
    let isCancelled = false;

    const playSequence = async () => {
      const currentShift = Math.round(shiftMv.get());
      const end = targetIndex;

      if (currentShift === end) return;

      const step = currentShift < end ? 1 : -1;

      for (let i = currentShift + step; step > 0 ? i <= end : i >= end; i += step) {
        if (isCancelled) break;

        // Animate to the next integer
        await animate(shiftMv, i, {
          type: "spring",
          stiffness: 70,
          damping: 20,
        });

        // Briefly lock at the center so the user clearly sees each card
        if (i !== end && !isCancelled) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
    };

    playSequence();

    return () => {
      isCancelled = true;
    };
  }, [targetIndex, shiftMv]);

  // Update 3D scene and opacity based on the animated visual shift
  useMotionValueEvent(shiftMv, "change", (v) => {
    // Convert back to 0 - 0.9 format expected by FolderScene3D
    scrollRef.current = (v / NUM_TRANSITIONS) * 0.9;

    // Sync HTML to the 3D scene perfectly (swap happens halfway through rotation)
    const visualIndex = Math.round(v);
    if (visualIndex !== activeIndex) {
      setActiveIndex(visualIndex);
    }

    // Content opacity: fades out during transitions, fully visible when settled exactly on integer
    // Handle floating point imprecision securely
    const frac = Math.abs(v % 1);
    const dist = Math.min(frac, 1 - frac); // 0 when settled, 0.5 at midpoint
    const op = Math.pow(Math.max(0, 1 - dist * 2.8), 1.5);
    setContentOpacity(op);
  });

  const handleDotClick = (index) => {
    if (!sectionRef.current) return;
    const sectionTop = sectionRef.current.offsetTop;
    const scrollableHeight = sectionRef.current.offsetHeight - window.innerHeight;

    // v = index / NUM_TRANSITIONS
    const targetV = (index / NUM_TRANSITIONS) * 0.9;
    const targetScrollY = sectionTop + targetV * scrollableHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
  };

  const active = projects.find((p) => p.id === openId);
  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="folder-carousel-section"
      style={{ height: `${(NUM_TRANSITIONS + 2) * 100}vh` }}
    >
      <div className="folder-viewport" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {/* ── Three.js 3D Folder Scene ─────────────────── */}
        <FolderScene3D scrollRef={scrollRef} projects={projects} />

        {/* ── Section Heading ──────────────────────────── */}
        <div className="folder-heading">
          <p
            className="font-mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.15em",
              color: "var(--color-primary-light)",
              marginBottom: 8,
            }}
          >
            FEATURED PROJECTS
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}
          >
            Things I've built
          </h2>
        </div>

        {/* ── Project Counter ──────────────────────────── */}
        <div className="folder-counter">
          <span className="current">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span style={{ margin: "0 4px" }}>/</span>
          <span>{String(NUM_PROJECTS).padStart(2, "0")}</span>
        </div>

        {/* ── Active Project HTML Content Overlay ──────── */}
        <div
          className="folder-active-overlay"
          style={{ opacity: contentOpacity }}
        >
          <div style={{ position: "relative" }}>
            {/* Layer 1: Folder Tab (Back) */}
            <div
              className="folder-tab"
              style={{
                zIndex: 1,
                background: `linear-gradient(135deg, ${activeProject.color}40, ${activeProject.color}15)`,
                borderTop: `2px solid ${activeProject.color}60`,
                borderLeft: `1px solid ${activeProject.color}30`,
                borderRight: `1px solid ${activeProject.color}20`,
              }}
            />

            {/* Layer 2: Floating Images (Middle, pops out of the folder) */}
            <div style={{ position: "absolute", zIndex: 2, inset: 0 }}>
              <FloatingImages project={activeProject} />
            </div>

            {/* Layer 3: Folder Body (Front, Frosted Glass) */}
            <div
              className="folder-body"
              style={{
                zIndex: 3,
                position: "relative",
                borderTopColor: activeProject.color,
                boxShadow: `0 12px 48px rgba(0,0,0,0.4), inset 0 1px 0 ${activeProject.color}20`,
                background: "rgba(11, 17, 32, 0.3)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <div
                className="folder-glow"
                style={{ background: activeProject.color, opacity: 0.15 }}
              />
              <ActiveFolderContent
                project={activeProject}
                onOpenModal={() => setOpenId(activeProject.id)}
              />
            </div>
          </div>
        </div>

        {/* ── Progress Dots ────────────────────────────── */}
        <ProgressDots activeIndex={activeIndex} onDotClick={handleDotClick} />

        {/* ── Scroll Hint ──────────────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            x: "-50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            zIndex: 50,
          }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 0.3, 0.7], y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            style={{
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: "var(--color-muted)",
              letterSpacing: "0.1em",
            }}
          >
            SCROLL
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            style={{ opacity: 0.5 }}
          >
            <path
              d="M8 4v12m0 0l-4-4m4 4l4-4"
              stroke="var(--color-muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* ── Project Modal ──────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
