export default function TextContainer({ children, className, variant = "1" }) {
  const variants = {
    1: "bg-white/50 border-background border border-4 shadow-xl shadow-background",
    2: "bg-background border shadow-md shadow-background",
    3: "bg-none border-none",
  };
  return (
    <div
      className={`flex max-w-prose flex-col gap-2 p-3 pt-2 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
