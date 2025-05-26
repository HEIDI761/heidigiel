import { useEffect } from "react";
import { useAbout } from "../sanity/hooks/getData";
import EmbedRenderer from "../utils/EmbedRenderer";
import useEmbedPlayer from "../hooks/useEmbedPlayer";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

export default function Player() {
  const { data } = useAbout();
  const { currentEmbed, setCurrentEmbed, isExpanded } = useEmbedPlayer();

  useEffect(() => {
    setCurrentEmbed(data.initialEmbed || null);
  }, [data, setCurrentEmbed]);

  return (
    <>
      <motion.div
        className={`border-text/80 fixed bottom-20 z-70 flex h-max w-full flex-col justify-center overflow-hidden rounded-lg ${isExpanded ? "border" : ""} bg-[#00000077] select-none`}
      >
        <div className="max-w-content overflow-hidden">
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
    </>
  );
}
