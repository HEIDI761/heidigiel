import useLanguage from "../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="border-background text-background hover:bg-background/80 hover:text-primary flex size-8 cursor-pointer justify-center rounded-[50%] border px-1 pt-2.25 text-center text-xs leading-none uppercase"
      onClick={() => {
        setLanguage(language === "es" ? "en" : "es");
      }}
    >
      {language === "es" ? "en" : "es"}
    </button>
  );
}
