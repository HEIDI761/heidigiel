import { getVimeoId } from "../utils/getVimeoId";

export default function VimeoPlayer({
  url,
  autoplay = 0,
  background = 0,
  loop = 0,
  quality = "720p",
}) {
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(url);

  return (
    <div className={`${background == 1 ? "overflow-hidden rounded-sm" : ""}`}>
      <iframe
        className={`${background == 1 ? "pointer-events-none scale-110" : ""} aspect-video w-full`}
        src={`https://player.vimeo.com/video/${vimeoId}?${vimeoHash ? `h=${vimeoHash}&` : ""}badge=0&autopause=0&player_id=0&app_id=58479&background=${background}&autoplay=${autoplay}&quality=${quality}&loop=${loop}`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </div>
  );
}
