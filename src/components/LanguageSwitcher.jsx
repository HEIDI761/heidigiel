import useLanguage from "../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="">
      <button
        className="text-muted-text cursor-pointer uppercase"
        onClick={() => {
          setLanguage(language === "es" ? "es" : "en");
        }}
      >
        {language}
      </button>
    </div>
  );
}
