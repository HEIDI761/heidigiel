import { useState } from "react";
import { motion } from "motion/react";

export default function Lightbox({ currentImage, setIsLightboxOpen }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="no-doc-scroll fixed inset-0 z-100 flex h-screen w-screen cursor-zoom-out items-center justify-center backdrop-brightness-20 backdrop-grayscale-100"
      onClick={() => setIsLightboxOpen(false)}
    >
      {!imageLoaded && (
        <div className="fixed flex items-center justify-center">
          <img
            src="https://static.thenounproject.com/png/hand-fan-icon-7565442-512.png"
            alt=""
            className="w-12 animate-spin invert transition-transform duration-300 hover:scale-105 hover:rotate-4"
          />
        </div>
      )}
      <img
        src={currentImage}
        alt=""
        className={`max-h-[95vh] max-w-full rounded-sm object-contain transition-opacity duration-300 ${!imageLoaded ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setImageLoaded(true)}
      />
    </motion.div>
  );
}
