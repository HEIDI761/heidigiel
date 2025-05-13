import { useEffect, useState } from "react";

export default function CursorDecoration() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      // className="pointer-events-none fixed inset-0 -z-10 h-[600px] w-[600px] rounded-full bg-radial from-[#8c0505] from-15% via-[#a77c0c] via-20% to-[#8487e8] to-70% blur-[60px] transition-all duration-100 ease-linear"
      className="pointer-events-none fixed inset-0 -z-10 h-[600px] w-[600px] rounded-full bg-radial from-[#980000] from-15% via-[#ffbb00] via-30% to-[#8487e8] to-70% blur-[60px] transition-all duration-100 ease-linear"
    />
  );
}
