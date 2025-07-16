import { useEffect, useRef } from "react";

const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = ["0", "1"];

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const colorOptions = ["#3b82f6", "#69bdff", "#1e3a8a"];
        ctx.fillStyle = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let animationFrameId: number;

    const render = () => {
      draw();
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(render);
      }, 18); // Slight delay to slow animation (was ~16ms for 60fps; now ~55fps)
    };

    render();

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 return (
  <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ pointerEvents: "none" }}
    />
    {/* Bottom fade gradient overlay */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0f172a] pointer-events-none z-10" />
  </div>
);
};

export default BinaryRain;
