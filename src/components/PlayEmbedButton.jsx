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
      className="hover:bg-background-dim hover:text-background bg-text border-muted-text group/play shadow-background-dim w-max shrink-0 cursor-pointer rounded-full border uppercase shadow-md transition-colors duration-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        viewBox="0 -960 960 960"
        width="32px"
        fill="var(--color-background)"
        className="group-hover/play:fill-text"
      >
        <path d="M394.5-266.85v-426.3L607.65-480 394.5-266.85Z" />
      </svg>
    </button>
  );
}

// <div className="bg-text text-background hover:bg-background group/play shadow-background-dim absolute bottom-2 left-2 z-20 rounded-full font-mono text-xs shadow-md transition-colors duration-500">
//
// </div>
