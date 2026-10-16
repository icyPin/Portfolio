import { useState, useEffect, useRef } from 'react';

export default function CreepyButton({ children, href = '#projects', className = '' }) {
  const btnRef = useRef(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(3.5, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 25);

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center gap-3.5 px-6 py-3 rounded-full bg-[#0b121c] hover:bg-emerald-950/60 border border-emerald-500/35 hover:border-emerald-400 text-white text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-emerald-950/50 transition-all duration-300 ${className}`}
    >
      {/* Glowing aura on hover */}
      <span className="absolute -inset-0.5 rounded-full bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

      {/* Tracking Eyes Container */}
      <span className="relative flex items-center gap-1">
        {[0, 1].map((eye) => (
          <span
            key={eye}
            className="w-4 h-5 rounded-full bg-slate-100 border border-slate-900 flex items-center justify-center overflow-hidden shadow-inner transition-transform duration-200 group-hover:scale-110"
          >
            {/* Moving Pupil */}
            <span
              style={{
                transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
              }}
              className="w-2 h-2.5 rounded-full bg-[#05070b] relative flex items-center justify-center transition-transform duration-75"
            >
              {/* Tiny eye catchlight */}
              <span className="w-0.5 h-0.5 rounded-full bg-emerald-400 absolute top-0.5 left-0.5" />
            </span>
          </span>
        ))}
      </span>

      {/* Button Label */}
      <span className="relative z-10 text-emerald-300 group-hover:text-white transition-colors">
        {children}
      </span>

      {/* Subtle arrow indicator */}
      <span
        className={`relative z-10 text-emerald-400 transition-transform duration-300 ${
          isHovered ? 'translate-y-0.5' : ''
        }`}
      >
        ↓
      </span>
    </a>
  );
}