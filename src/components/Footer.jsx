import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="container-px max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-display font-bold text-white">
            THATCHINAMOORTHI V<span style={{ color: "var(--color-primary-light)" }}>.</span>
          </p>
          <p className="text-xs text-[var(--color-muted)]">Full Stack Developer</p>
        </div>

        <div className="flex items-center gap-5">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--color-muted)] hover:text-white">
            <GithubIcon size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--color-muted)] hover:text-white">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="text-[var(--color-muted)] hover:text-white">
            <Mail size={18} />
          </a>
        </div>

        <p className="text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
