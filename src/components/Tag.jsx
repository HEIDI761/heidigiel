import useLanguage from "../hooks/useLanguage";

export default function Tag({
  tag,
  onClick,
  selected,
  roundness = "full",
  clickabe = true,
  className = "",
}) {
  const { language } = useLanguage();
  return (
    <div
      className={`border-text rounded-${roundness} border px-2 transition-colors select-none ${className} ${clickabe ? "hover:bg-text hover:text-background cursor-pointer" : "cursor-default"} ${selected ? "bg-text text-background" : "bg-background/50"}`}
      onClick={onClick}
    >
      {tag[language] || tag.es}
    </div>
  );
}
