import useLanguage from "../hooks/useLanguage";

export default function BackButton() {
  const { language } = useLanguage();

  return (
    <button
      onClick={() => {
        window.history.back();
      }}
      className="font-serif-italic bg-background hover:bg-tertiary fixed top-24 left-0 flex items-center border border-l-0 px-2 text-sm uppercase transition-all hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
        fill="var(--color-text)"
      >
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
      {language === "es" ? "atras" : "back"}
    </button>
  );
}
