import { useState } from 'react';
import AsciiRippleText from './AsciiRippleText';
import FlipFadeText from './FlipFadeText';
import CreepyButton from './CreepyButton';
import GrassHeroCanvas from './GrassHeroCanvas';

const SKILLS = [
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

const PROJECTS = [
  {
    num: '01',
    title: 'Enterprise RAG Pipeline',
    tech: 'Java • Spring Boot • Python • FastAPI • pgvector • Gemini API',
    metrics: '500+ docs processed | sub-1.5s latency | 80% faster ETL indexing',
    desc: 'Polyglot RAG microservices pipeline with automated Spring AI PDF ingestion, Resilience4j circuit breakers, and autonomous Llama 3.2 local fallback.',
    github: 'https://github.com/icyPin/Rag-java',
  },
  {
    num: '02',
    title: 'TicketMesh',
    tech: 'Java • Spring Cloud Gateway • Redis SETNX • PostgreSQL • Stripe API',
    metrics: '1,000+ RPS | 10,000+ concurrent lock tests | 40% faster checkout',
    desc: 'Distributed booking backend featuring reactive gateway throttling, Redis virtual waiting rooms, and 10-second TTL SETNX locks to prevent double-booking.',
    github: 'https://github.com/icyPin/TicketMesh',
  },
  {
    num: '03',
    title: 'NimbusDrive',
    tech: 'React • Node.js • AWS (EC2, S3) • PostgreSQL • Docker • GitHub Actions',
    metrics: '2GB multipart transfers | 85% S3 bandwidth offload | <90s CI/CD',
    desc: 'Cloud storage platform with time-limited presigned URLs, 10-round bcrypt + JWT multi-tenant isolation, and automated zero-downtime container swaps.',
    github: 'https://github.com/icyPin/NimbusDrive',
  },
];

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('anmolagarwal5159@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#05070b] text-slate-100 relative">
      {/* TOP-RIGHT ROUND ICON BUTTONS (RESUME + CONTACT) */}
      <div className="fixed top-6 right-6 md:right-10 z-50 flex items-center gap-3">
        {/* Resume Button */}
        <a
          href="https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/preview"
          target="_blank"
          rel="noopener noreferrer"
          title="View Resume"
          className="group relative w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/50 flex items-center justify-center text-slate-300 hover:text-emerald-300 backdrop-blur-md transition-all shadow-lg cursor-pointer"
        >
          <span className="text-sm">📄</span>
          {/* Tooltip */}
          <span className="absolute -bottom-8 right-0 px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Resume
          </span>
        </a>

        {/* Contact Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setContactOpen(!contactOpen)}
            title="Contact"
            className="w-10 h-10 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 hover:border-emerald-300 flex items-center justify-center text-emerald-300 backdrop-blur-md transition-all shadow-lg cursor-pointer"
          >
            <span className="text-sm">✉</span>
          </button>

          {contactOpen && (
            <div className="absolute right-0 mt-3 w-72 p-4 rounded-2xl bg-[#0a0f18]/95 border border-emerald-500/30 backdrop-blur-xl shadow-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-emerald-400">
                <span>:: CONTACT_CHANNEL</span>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left transition cursor-pointer"
              >
                <span className="truncate text-slate-200">anmolagarwal5159@gmail.com</span>
                <span className="text-emerald-400 shrink-0">{copied ? 'Copied!' : 'Copy'}</span>
              </button>

              <a
                href="https://github.com/icyPin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition"
              >
                <span>github.com/icyPin</span>
                <span className="text-emerald-400">↗</span>
              </a>

              <div className="flex items-center justify-between p-2 text-slate-400">
                <span>+91 6201477497</span>
                <span className="text-emerald-400">TEL</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HERO SECTION (100vh) */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
        <GrassHeroCanvas />

        <div className="relative z-10 p-6 md:px-16 md:pt-8 pointer-events-none flex items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/3 border border-white/10 text-[11px] text-emerald-400/90 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS.ONLINE :: BIT MESRA</span>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl w-full px-6 md:pl-16 lg:pl-24 -mt-24 pointer-events-auto">
          <AsciiRippleText
            as="h1"
            text="ANMOL AGARWAL"
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 hover:text-emerald-300"
          />

          <div className="space-y-1.5 mb-8 text-xs md:text-sm text-slate-300/90 leading-relaxed max-w-xl">
            <FlipFadeText
              text="I am an undergraduate developer at BIT Mesra who loves building systems from scratch."
              delayOffset={0.1}
              className="hover:text-emerald-300"
            />
            <FlipFadeText
              text="Focused on scalable backend engineering, full-stack architecture, and open-source software."
              delayOffset={0.25}
              className="hover:text-emerald-300"
            />
          </div>

          <div>
            <CreepyButton href="#skills">Projects</CreepyButton>
          </div>
        </div>

        <div className="h-36 pointer-events-none" />
      </section>

      {/* SKILLS STRIP */}
      <section
        id="skills"
        className="relative z-10 min-h-[32vh] max-w-6xl mx-auto px-6 md:px-16 py-12 flex flex-col justify-center border-y border-white/5"
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-400/80 mb-6">
          [ TECHNICAL ARSENAL & TOOLS ]
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/2 hover:bg-emerald-500/10 border border-white/8 hover:border-emerald-400/40 transition-all duration-300"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-xs text-slate-300 group-hover:text-white font-medium">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 py-24">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 mb-2">
            [ ARCHIVE 2025 — 2026 ]
          </p>
          <AsciiRippleText
            as="h2"
            text="SELECTED ENGINEERING WORK"
            className="text-2xl md:text-4xl font-bold text-white hover:text-emerald-300"
          />
        </div>

        <div className="space-y-8">
          {PROJECTS.map((proj) => (
            <div
              key={proj.num}
              className="group p-6 md:p-8 rounded-2xl bg-white/2 hover:bg-white/4 border border-white/10 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-emerald-400/70">[{proj.num}]</span>
                  <AsciiRippleText
                    as="h3"
                    text={proj.title}
                    className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300"
                  />
                </div>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  <span>View Source on GitHub →</span>
                </a>
              </div>

              <p className="text-xs text-emerald-400/90 mb-3">{proj.metrics}</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{proj.desc}</p>
              <p className="text-xs text-slate-500">{proj.tech}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}