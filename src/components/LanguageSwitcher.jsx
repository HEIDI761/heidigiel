import useLanguage from "../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="text-muted-text cursor-pointer text-xs uppercase"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </button>
  );
}
