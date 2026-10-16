import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-~<>?/';

export default function FlipFadeText({ text, className = '', delayOffset = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const triggerRipple = (hoverIndex) => {
    let tick = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      tick += 0.7;

      const nextText = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          const dist = Math.abs(idx - hoverIndex);
          const waveFront = tick * 2.3;
          if (Math.abs(dist - waveFront) < 3.5 && tick < 15) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          return char;
        })
        .join('');

      setDisplayText(nextText);

      if (tick >= 15) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 26);
  };

  useEffect(() => {
    setDisplayText(text);
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <motion.p
      initial={{ opacity: 0, rotateX: -75, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.75,
        delay: delayOffset,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const charIndex = Math.floor((relX / rect.width) * text.length);
        triggerRipple(charIndex);
      }}
      className={`cursor-crosshair select-none transition-colors duration-200 ${className}`}
    >
      {displayText}
    </motion.p>
  );
}