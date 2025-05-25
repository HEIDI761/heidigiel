import useLanguage from "../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="text-muted-text hover:bg-text hover:text-background -ml-1.25 size-6 cursor-pointer rounded-full border-transparent text-xs uppercase transition-colors duration-500"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </button>
  );
}
