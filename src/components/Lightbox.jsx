import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useLightbox from "../hooks/useLightbox";
import { NavLink } from "react-router";

export default function Lightbox() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { currentImage, setIsLightboxOpen, relatedProject, setRelatedProject } =
    useLightbox();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="no-doc-scroll fixed inset-0 z-100 flex h-screen w-screen cursor-zoom-out items-center justify-center backdrop-brightness-20 backdrop-grayscale-100"
      onClick={() => {
        setIsLightboxOpen(false);
        setRelatedProject(null);
      }}
    >
      {!imageLoaded && (
        <div className="fixed flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-solid border-white border-t-transparent"></div>
        </div>
      )}
      <img
        src={currentImage}
        alt=""
        className={`max-h-[95vh] max-w-full rounded-sm object-contain transition-opacity duration-300 ${!imageLoaded ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setImageLoaded(true)}
      />
      {relatedProject?.slug && (
        <NavLink
          to={`/audiovisual/${relatedProject.slug.current}`}
          className="absolute top-1/2 left-1/2 m-4 rounded-sm bg-white px-4 py-2 text-sm font-bold uppercase hover:bg-gray-200"
        >
          ver más
        </NavLink>
      )}
    </motion.div>
  );
}
