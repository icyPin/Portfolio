import { useEffect, useRef } from 'react';

export default function GrassHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -9999, y: -9999 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const bladeCount = 1400;
    const blades = Array.from({ length: bladeCount }, () => {
      const layer = Math.random();
      return {
        xRatio: Math.random(),
        h: 75 + layer * 135 + Math.random() * 45,
        w: 1.8 + layer * 2.5,
        lean: (Math.random() - 0.5) * 25,
        speed: 1.2 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        bendOffset: 0,
        layer,
      };
    }).sort((a, b) => a.layer - b.layer);

    const fireflies = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: height * 0.45 + Math.random() * (height * 0.5),
      r: 1 + Math.random() * 2,
      speedY: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        f.y -= f.speedY;
        f.x += Math.sin(time + f.phase) * 0.4;
        if (f.y < height * 0.35) f.y = height;

        const alpha = 0.3 + 0.5 * Math.sin(time * 2 + f.phase);
        ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < blades.length; i++) {
        const b = blades[i];
        const baseX = b.xRatio * width;
        const baseY = height + 10;

        const wind = Math.sin(time * b.speed + b.phase + b.xRatio * 6) * 18;

        const tipXApprox = baseX + b.lean + wind;
        const tipYApprox = baseY - b.h;
        const dx = tipXApprox - mouse.x;
        const dy = tipYApprox - mouse.y;
        const dist = Math.hypot(dx, dy);
        const radius = 170;

        let targetBend = 0;
        if (dist < radius) {
          const force = (1 - dist / radius) * 95;
          targetBend = (dx >= 0 ? 1 : -1) * force;
        }

        b.bendOffset += (targetBend - b.bendOffset) * 0.12;

        const tipX = baseX + b.lean + wind + b.bendOffset;
        const tipY = baseY - b.h + Math.abs(b.bendOffset) * 0.22;
        const ctrlX = baseX + (b.lean + wind + b.bendOffset) * 0.35;
        const ctrlY = baseY - b.h * 0.55;

        const grad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
        grad.addColorStop(0, '#030609');
        grad.addColorStop(0.55, `rgba(6, 55, 40, ${0.45 + b.layer * 0.5})`);
        grad.addColorStop(1, `rgba(52, 211, 153, ${0.35 + b.layer * 0.65})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(baseX - b.w, baseY);
        ctx.quadraticCurveTo(ctrlX - b.w * 0.4, ctrlY, tipX, tipY);
        ctx.quadraticCurveTo(ctrlX + b.w * 0.4, ctrlY, baseX + b.w, baseY);
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#05070b] to-transparent" />
    </div>
  );
}