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
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

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
      mousePos.current.x += (targetPos.current.x - mousePos.current.x) * 0.1;
      mousePos.current.y += (targetPos.current.y - mousePos.current.y) * 0.1;

      const { x, y } = mousePos.current;

      // Calculate center of screen
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Calculate distance from center
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate maximum possible distance (corner to center)
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

      // Normalize distance to get ratio (0 at center, 1 at edges)
      const distanceRatio = Math.min(distance / maxDistance, 1);

      // Calculate size based on distance from center (smaller at center, bigger at edges)
      const minSize = 60;
      const maxSize = 300;
      const size = minSize + (maxSize - minSize) * distanceRatio;

      // Save the current state
      ctx.save();

      // Apply blur filter
      // ctx.filter = "blur(60px)";

      // Set blend mode
      ctx.globalCompositeOperation = "screen";

      // Create gradient based on distance from center
      if (distanceRatio < 0) {
        // Near center: white blob with size based on distance
        const whiteOpacity = 1 - distanceRatio * 1.5; // Fade as it moves away from center
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(whiteOpacity, 0.2)})`;
        ctx.fill();
      } else {
        // Away from center: transition to colored gradient
        const gradient = ctx.createRadialGradient(x, y, 10, x, y, size);

        // Interpolate between white and original colors based on distance
        const colorRatio = (distanceRatio - 0.2) / 0.8; // 0 at distance-ratio 0.2, 1 at distance-ratio 1.0

        // Calculate interpolated colors
        const r1 = Math.round(255 - colorRatio * (255 - 152));
        const g1 = Math.round(255 - colorRatio * 255);
        const b1 = Math.round(255 - colorRatio * 255);

        const r2 = Math.round(255 - colorRatio * (255 - 255));
        const g2 = Math.round(255 - colorRatio * (255 - 187));
        const b2 = Math.round(255 - colorRatio * 255);

        const r3 = Math.round(255 - colorRatio * (255 - 132));
        const g3 = Math.round(255 - colorRatio * (255 - 135));
        const b3 = Math.round(255 - colorRatio * (255 - 232));

        gradient.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, 0.8)`);
        gradient.addColorStop(0.3, `rgba(${r2}, ${g2}, ${b2}, 0.7)`);
        gradient.addColorStop(1, `rgba(${r3}, ${g3}, ${b3}, 0.5)`);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

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
      className="pointer-events-none fixed inset-0 -z-10 mix-blend-difference"
      style={{ filter: "blur(60px)" }}
    />
  );
}
