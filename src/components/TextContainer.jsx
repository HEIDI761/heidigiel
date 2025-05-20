export default function TextContainer({ children, className, variant = "1" }) {
  const variants = {
    1: "bg-white/50 border-background border border-4",
    2: "bg-tertiary border-secondary border-2",
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
