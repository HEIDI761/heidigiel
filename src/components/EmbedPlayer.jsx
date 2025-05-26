import { useEffect } from "react";
import { useAbout } from "../sanity/hooks/getData";
import EmbedRenderer from "../utils/EmbedRenderer";
import useEmbedPlayer from "../hooks/useEmbedPlayer";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

export default function Player() {
  const { data } = useAbout();
  const { currentEmbed, setCurrentEmbed, isExpanded, setIsExpanded } =
    useEmbedPlayer();

  useEffect(() => {
    setCurrentEmbed(data.initialEmbed || null);
  }, [data, setCurrentEmbed]);

  return (
    <div className="pointer-events-none fixed bottom-0 z-70 flex w-full flex-col items-center px-4">
      <div className="p-4">
        {isExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="var(--color-text)"
            className="hover:bg-text bg-text/10 hover:fill-background pointer-events-auto rounded-full border backdrop-blur-xl transition-colors duration-500"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <path d="M466-748v482L232-500l-20 20 268 268 268-268-20-20-234 234v-482h-28Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="var(--color-text)"
            className="pointer-events-auto z-100 mx-auto shrink-0 rotate-20 cursor-pointer rounded-full transition-transform duration-500 hover:rotate-30"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <path d="M451-171q106-28 172.5-114T690-480q0-109-66.5-195T451-789q63 61 95.5 141T579-480q0 88-32.5 168T451-171Zm-81 39h-14q92-55 143.5-148T551-480q0-107-51.5-200T356-828h14q72.21 0 135.72 27.39 63.51 27.39 110.49 74.35 46.98 46.96 74.38 110.43Q718-552.35 718-480.17q0 72.17-27.41 135.73-27.4 63.56-74.38 110.57-46.98 47.02-110.49 74.44Q442.21-132 370-132Zm209-348Z" />
          </svg>
        )}
      </div>
      <motion.div
        className={`border-text/80 flex h-max w-full flex-col justify-center overflow-hidden rounded-t-2xl md:w-xl ${isExpanded ? "border border-b-0" : ""} bg-background shadow-background-dim shadow-md select-none`}
      >
        <div className="max-w-content pointer-events-auto overflow-hidden">
          <motion.div
            layout
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              // width: isExpanded ? "min-content" : "5rem",
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{
              stiffness: 300,
              damping: 30,
              duration: 0.2,
            }}
            // className="w-[500px] overflow-hidden"
            style={{ minWidth: isExpanded ? "400px" : "auto" }}
          >
            <AnimatePresence>
              {currentEmbed && <EmbedRenderer value={currentEmbed} />}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
