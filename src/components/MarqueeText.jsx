export default function MarqueeText({ text, className = "" }) {
  return (
    <div
      className={`relative flex w-full gap-1 overflow-hidden select-none ${className}`}
    >
      <style>{`
      .scroll {
        animation: scroll 25s linear infinite;
        white-space: nowrap;
      }

      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `}</style>
      <div className="scroll flex min-w-full shrink-0 justify-around gap-1">
        <div className="flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center">
          {text}
        </div>

        <div
          aria-hidden="true"
          className="flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center"
        >
          {text}
        </div>
      </div>

      <div
        className="scroll flex min-w-full shrink-0 justify-around gap-1"
        aria-hidden="true"
      >
        <div className="flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center">
          {text}
        </div>

        <div className="flex shrink-0 grow-0 basis-auto items-center justify-center px-1 text-center">
          {text}
        </div>
      </div>
    </div>
  );
}
