import { useEffect, useRef } from "react";

const BinaryRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const fade = fadeRef.current;
    if (!canvas || !container || !fade) return;

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
      }, 18); // smooth and slightly slowed
    };

    render();

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 150;

      const opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      fade.style.opacity = opacity.toString();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: "#1e3a5f" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
      />
      {/* Gradient mask that fades on scroll */}
      <div
        ref={fadeRef}
        className="absolute bottom-0 left-0 w-full h-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #1e3a5f, rgba(30,58,95,0.8), rgba(0,0,0,0))",
          opacity: 1,
          transition: "opacity 0.2s ease-out",
        }}
      />
    </div>
  );
};

export default BinaryRain;
