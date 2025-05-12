import useLanguage from "../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="">
      <button
        className="text-muted-text hover:text-primary cursor-pointer uppercase transition-colors"
        onClick={() => {
          setLanguage(language === "es" ? "en" : "es");
        }}
      >
        {language === "es" ? "en" : "es"}
      </button>
    </div>
  );
}
