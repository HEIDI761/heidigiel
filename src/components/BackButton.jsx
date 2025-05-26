import useLanguage from "../hooks/useLanguage";

export default function BackButton({ onClick }) {
  const { language } = useLanguage();

  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="shadow-background-dim group bg-background border-background-dim hover:bg-text hover:text-background flex cursor-pointer items-center border border-l-0 py-2 pr-4 pl-3 text-sm uppercase shadow-md transition-colors duration-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
        fill="var(--color-text)"
        className="group-hover:fill-background mr-2 h-4 w-4 transition-colors duration-500"
      >
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
      {language === "es" ? "volver" : "back"}
    </button>
  );
}
