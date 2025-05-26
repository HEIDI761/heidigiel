import { getVimeoId } from "../utils/getVimeoId";
import { useEffect, useRef } from "react";

export default function VimeoPlayer({
  url,
  autoplay = 0,
  background = 0,
  loop = 0,
  quality = "720p",
}) {
  const { id: vimeoId, hash: vimeoHash } = getVimeoId(url);
  const iframeRef = useRef(null);

  useEffect(() => {
    const adjustIframeSize = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const container = iframe.parentElement;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const containerRatio = containerWidth / containerHeight;
      const videoRatio = 16 / 9; // Vimeo video aspect ratio

      let iframeWidth, iframeHeight;

      if (containerRatio > videoRatio) {
        // Container is wider than video - make iframe wider to fill width
        iframeWidth = containerWidth;
        iframeHeight = containerWidth / videoRatio;
      } else {
        // Container is taller than video - make iframe taller to fill height
        iframeHeight = containerHeight;
        iframeWidth = containerHeight * videoRatio;
      }

      // Apply the calculated dimensions
      iframe.style.width = `${iframeWidth}px`;
      iframe.style.height = `${iframeHeight}px`;

      // Center the iframe
      iframe.style.left = `${(containerWidth - iframeWidth) / 2}px`;
      iframe.style.top = `${(containerHeight - iframeHeight) / 2}px`;
    };

    adjustIframeSize();
    window.addEventListener("resize", adjustIframeSize);

    return () => {
      window.removeEventListener("resize", adjustIframeSize);
    };
  }, [vimeoId]);

  return background == 1 ? (
    <div className="absolute inset-0 overflow-hidden backdrop-blur-md">
      <iframe
        ref={iframeRef}
        className={`absolute ${background == 1 ? "pointer-events-none" : ""}`}
        src={`https://player.vimeo.com/video/${vimeoId}?${
          vimeoHash ? `h=${vimeoHash}&` : ""
        }badge=0&autopause=0&player_id=0&app_id=58479&background=${background}&autoplay=${autoplay}&quality=${quality}&loop=${loop}`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </div>
  ) : (
    <div>
      <iframe
        className={`aspect-video w-full`}
        src={`https://player.vimeo.com/video/${vimeoId}?${vimeoHash ? `h=${vimeoHash}&` : ""}badge=0&autopause=0&player_id=0&app_id=58479&background=${background}&autoplay=${autoplay}&quality=${quality}&loop=${loop}`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      />
    </div>
  );
}
