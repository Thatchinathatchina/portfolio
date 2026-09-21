import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile } from "../data/profile";
import heroImage from "../assets/Thatchina.png";

const badges = ["Laravel", "React", "React Native", "Python", "PostgreSQL"];

const terminalLines = [
  "$ whoami",
  "thatchinamoorthi — full stack developer",
  "$ stack --list",
  "laravel · react · react-native · python · postgresql",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:pt-0 md:pb-0"
    >
      {/* navy side wave */}
      <div className="side-wave">
        <svg
          className="right-0 wave-anim opacity-60"
          viewBox="0 0 500 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2c4ea3" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0b1120" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M500,0 C 380,120 460,300 380,450 C 300,600 420,760 500,900 L500,0 Z"
            fill="url(#waveGrad)"
          />
        </svg>
        <svg
          className="left-0 wave-anim opacity-30"
          style={{ animationDelay: "-6s" }}
          viewBox="0 0 500 900"
          preserveAspectRatio="none"
        >
          <path
            d="M0,900 C 140,760 60,600 140,450 C 220,300 100,120 0,0 L0,900 Z"
            fill="#2c4ea3"
            opacity="0.25"
          />
        </svg>
      </div>

      <div className="absolute inset-0 grid-backdrop opacity-40" />

      <div className="absolute inset-x-0 top-1/4 -translate-y-1/2 flex justify-center pointer-events-none select-none">
        <span
          className="font-display font-extrabold uppercase leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(1.5rem, 7vw, 10rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(120,150,220,0.25)",
          }}
        >
          Full Stack Developer
        </span>
      </div>

      <div className="relative container-px max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-20 mt-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-2 py-1.5 text-xs tracking-wide text-[var(--color-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-5xl mx-auto">
          {/* Left column: Content */}
          <div className="order-2 md:order-1 flex flex-col gap-8 md:gap-10 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="font-display font-bold text-3xl sm:text-3xl text-white leading-tight">
                Hi, I'm <span style={{ color: "var(--color-primary-light)" }}>Thatchinamoorthi V</span>
              </h1>
              <p className="mt-3 font-mono text-sm tracking-widest text-[var(--color-muted)]">
                FULL STACK DEVELOPER
              </p>
              <p className="mt-4 max-w-sm mx-auto md:mx-0 text-[var(--color-muted)]">
                {profile.tagline}
              </p>
              <div className="mt-7 flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href="#projects"
                  className="rounded-full px-6 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--color-primary)" }}
                >
                  View My Work
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white border border-[var(--color-line)] hover:border-[var(--color-primary-light)] transition-colors"
                >
                  <Download size={16} /> Download Resume
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="glass rounded-2xl p-5 max-w-lg mx-auto md:mx-0 text-left"
            >
              <p className="font-mono text-xs text-[var(--color-primary-light)] mb-2">// about</p>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {profile.bio[0]}
              </p>
            </motion.div>
          </div>

          {/* Right column: Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-[1rem] blur-2xl opacity-50"
                style={{ background: "var(--color-primary)" }}
              />
              <div className="relative w-64 h-64 sm:w-64 sm:h-80 rounded-[2rem] glass flex items-center justify-center overflow-hidden">
                <img
                  src={heroImage}
                  alt={`${profile.name} profile`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-[var(--color-muted)] flex justify-between">

                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-[var(--color-line)] px-4 py-1.5 text-xs font-mono text-[var(--color-muted)]"
            >
              {b}
            </span>
          ))}
        </motion.div>

        {/* terminal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 max-w-lg mx-auto glass rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[var(--color-line)]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-[11px] text-[var(--color-muted)]">terminal</span>
          </div>
          <div className="p-4 font-mono text-xs sm:text-sm space-y-1.5">
            {terminalLines.map((line, i) => (
              <p key={i} className={line.startsWith("$") ? "text-white" : "text-[var(--color-primary-light)]"}>
                {line}
              </p>
            ))}
            <span className="inline-block w-2 h-4 bg-[var(--color-primary-light)] caret" />
          </div>
        </motion.div>

        <motion.a
          href="#skills"
          aria-label="Scroll to skills section"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-4 text-[var(--color-muted)]"
        >
          <ArrowDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}
