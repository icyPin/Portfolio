import { useState, useRef, useEffect } from 'react';

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-~<>?/';

export default function AsciiRippleText({ text, className = '', as: Tag = 'div' }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const triggerRipple = (hoverIndex) => {
    let tick = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      tick += 0.65;

      const nextText = text
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          const dist = Math.abs(idx - hoverIndex);
          // Create a outward moving wave from the hovered character
          const waveFront = tick * 2.2;
          if (Math.abs(dist - waveFront) < 3.5 && tick < 14) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          return char;
        })
        .join('');

      setDisplayText(nextText);

      if (tick >= 14) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, 28);
  };

  useEffect(() => {
    setDisplayText(text);
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <Tag
      className={`cursor-crosshair select-none transition-colors duration-200 ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const charIndex = Math.floor((relX / rect.width) * text.length);
        triggerRipple(charIndex);
      }}
    >
      {displayText}
    </Tag>
  );
}