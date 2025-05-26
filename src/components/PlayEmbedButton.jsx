import useEmbedPlayer from "../hooks/useEmbedPlayer";
import useLanguage from "../hooks/useLanguage";

export default function PlayEmbedButton({ embed }) {
  const { setCurrentEmbed, setIsExpanded } = useEmbedPlayer();
  const { language } = useLanguage();

  return (
    <button
      onClick={() => {
        setCurrentEmbed(embed);
        setIsExpanded(true);
      }}
      className="hover:bg-text hover:text-background border-text w-max border px-2 py-1 uppercase transition-colors duration-500"
    >
      {language === "es" ? "Escuchar" : "Listen"}
    </button>
  );
}
