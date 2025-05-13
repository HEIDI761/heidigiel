import useLanguage from "../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="">
      <button
        className="cursor-pointer uppercase"
        onClick={() => {
          setLanguage(language === "es" ? "en" : "es");
        }}
      >
        {language === "es" ? "en" : "es"}
      </button>
    </div>
  );
}
