import useLanguage from "../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        className="cursor-pointer"
        onClick={() => {
          setLanguage(language === "es" ? "en" : "es");
        }}
      >
        {language}
      </button>
    </div>
  );
}
