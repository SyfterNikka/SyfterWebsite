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

    // Create gradient mask once
    const gradientCanvas = document.createElement("canvas");
    gradientCanvas.width = width;
    gradientCanvas.height = height;
    const gtx = gradientCanvas.getContext("2d")!;
    const fadeHeight = 100;
    const fadeGradient = gtx.createLinearGradient(0, height - fadeHeight, 0, height);
    fadeGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    fadeGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    gtx.fillStyle = "black";
    gtx.fillRect(0, 0, width, height);
    gtx.fillStyle = fadeGradient;
    gtx.fillRect(0, height - fadeHeight, width, fadeHeight);

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

      // 🪄 Apply fade only to bottom using composite mask
      ctx.save();
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(gradientCanvas, 0, 0);
      ctx.restore();
    };

    let animationFrameId: number;

    const render = () => {
      draw();
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(render);
      }, 18);
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
    {/* Seamless scroll fade */}
    <div
      className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10"
      style={{
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), #1e3a5f 100%)",
      }}
    />
  </div>
);
};

export default BinaryRain;
