import React, { useEffect, useRef } from 'react';

interface DigitalArtOrbProps {
  isGenerating?: boolean;
  size?: number;
}

export const DigitalArtOrb: React.FC<DigitalArtOrbProps> = ({
  isGenerating = false,
  size = 280,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += isGenerating ? 0.035 : 0.018;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = (width / 2) * 0.78;

      ctx.clearRect(0, 0, width, height);

      // Outer ethereal ambient purple glow
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.4,
        centerX,
        centerY,
        radius * 1.35
      );
      glowGradient.addColorStop(0, 'rgba(112, 38, 237, 0.45)');
      glowGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)');
      glowGradient.addColorStop(1, 'rgba(10, 5, 20, 0)');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Draw Base Sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.clip();

      // Sphere base gradient
      const sphereBg = ctx.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.35,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereBg.addColorStop(0, '#581C87'); // Rich purple highlight
      sphereBg.addColorStop(0.35, '#3B0764');
      sphereBg.addColorStop(0.7, '#1E0538');
      sphereBg.addColorStop(1, '#090114');

      ctx.fillStyle = sphereBg;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Ribbed Spiral Waves (matching the iridescent vortex in the video)
      const numLines = 64;
      const rotationAngle = time * 0.85;

      ctx.lineWidth = 1.35;

      for (let i = 0; i < numLines; i++) {
        const phi = (i / numLines) * Math.PI; // latitude
        const thetaOffset = (i / numLines) * Math.PI * 4 + rotationAngle;

        ctx.beginPath();

        // Color variation across spiral ribs (iridescent violet to lilac)
        const ribProgress = (Math.sin(i * 0.2 + time) + 1) / 2;
        const alpha = 0.25 + 0.65 * Math.sin(phi);

        // Gradient for iridescent sheen
        const r = Math.round(150 + 80 * ribProgress);
        const g = Math.round(100 + 70 * Math.sin(thetaOffset * 0.5));
        const b = Math.round(240 + 15 * ribProgress);

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        let firstPoint = true;
        const steps = 80;

        for (let j = 0; j <= steps; j++) {
          const t = (j / steps) * Math.PI * 2;
          
          // 3D coordinates on deformed twisting sphere
          const u = t + thetaOffset;
          const v = phi + Math.sin(t * 2 + time) * 0.35;

          // Sphere parametric projection
          const sinV = Math.sin(v);
          const cosV = Math.cos(v);
          const sinU = Math.sin(u);
          const cosU = Math.cos(u);

          // 3D Rotation matrix
          const tilt = 0.45; // camera tilt
          const x3d = radius * sinV * cosU;
          const y3d = radius * (cosV * Math.cos(tilt) - sinV * sinU * Math.sin(tilt));
          const z3d = radius * (cosV * Math.sin(tilt) + sinV * sinU * Math.cos(tilt));

          // Perspective projection
          const k = 400 / (400 + z3d);
          const px = centerX + x3d * k;
          const py = centerY + y3d * k;

          // Only draw points on the visible side with depth blending
          if (z3d > -radius * 0.4) {
            if (firstPoint) {
              ctx.moveTo(px, py);
              firstPoint = false;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            firstPoint = true;
          }
        }
        ctx.stroke();
      }

      // Smooth iridescent glossy overlay (metallic sheen on top-left of sphere)
      const specularGlow = ctx.createRadialGradient(
        centerX - radius * 0.38,
        centerY - radius * 0.38,
        0,
        centerX - radius * 0.38,
        centerY - radius * 0.38,
        radius * 0.85
      );
      specularGlow.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      specularGlow.addColorStop(0.2, 'rgba(216, 180, 254, 0.28)');
      specularGlow.addColorStop(0.6, 'rgba(168, 85, 247, 0.08)');
      specularGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = specularGlow;
      ctx.fillRect(0, 0, width, height);

      // Deep shadow on bottom right
      const shadowGradient = ctx.createRadialGradient(
        centerX + radius * 0.4,
        centerY + radius * 0.4,
        0,
        centerX + radius * 0.4,
        centerY + radius * 0.4,
        radius * 0.95
      );
      shadowGradient.addColorStop(0, 'rgba(5, 1, 15, 0.6)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = shadowGradient;
      ctx.fillRect(0, 0, width, height);

      // Rim light highlighting the sphere boundary
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;

      const rimGrad = ctx.createLinearGradient(
        centerX - radius,
        centerY - radius,
        centerX + radius,
        centerY + radius
      );
      rimGrad.addColorStop(0, 'rgba(216, 180, 254, 0.65)');
      rimGrad.addColorStop(0.4, 'rgba(147, 51, 234, 0.4)');
      rimGrad.addColorStop(1, 'rgba(88, 28, 135, 0.1)');

      ctx.strokeStyle = rimGrad;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isGenerating, size]);

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      <canvas
        ref={canvasRef}
        width={size * 2}
        height={size * 2}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="transition-transform duration-500 will-change-transform"
      />
    </div>
  );
};
