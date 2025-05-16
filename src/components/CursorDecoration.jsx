import { useEffect, useRef } from "react";

export default function CursorDecoration() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize positions
    mousePos.current = {
      x: window.innerWidth / 2,
      y: (window.innerHeight / 3) * 2,
    };
    targetPos.current = {
      x: window.innerWidth / 2,
      y: (window.innerHeight / 3) * 2,
    };

    // Track mouse position
    const handleMouseMove = (e) => {
      targetPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation function
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth follow
      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.3;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.3;

      const { x, y } = mousePos.current;

      // Save the current state
      ctx.save();

      // Apply blur filter
      ctx.filter = "blur(60px)";

      // Create radial gradient
      const gradient = ctx.createRadialGradient(x, y, 10, x, y, 150);
      gradient.addColorStop(0.2, "rgb(152, 0, 0)");
      gradient.addColorStop(0.4, "rgb(255, 187, 0)");
      gradient.addColorStop(0.9, "rgb(132, 135, 232)");

      // Draw blob
      ctx.globalCompositeOperation = "screen";
      ctx.beginPath();
      ctx.arc(x, y, 150, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Restore the state
      ctx.restore();

      // Continue animation loop
      animationRef.current = requestAnimationFrame(render);
    };

    // Start animation
    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 mix-blend-color-burn"
    />
  );
}
