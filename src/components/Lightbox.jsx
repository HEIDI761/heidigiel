import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import useLightbox from "../hooks/useLightbox";
import { NavLink } from "react-router";
import useLanguage from "../hooks/useLanguage";

export default function Lightbox() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { currentImage, setIsLightboxOpen, relatedProject, setRelatedProject } =
    useLightbox();
  const { language } = useLanguage();

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
          to={`/${relatedProject.audiovisualProjectType ? "audiovisual" : "musica"}/${relatedProject.slug.current}`}
          className="shadow-background-dim group bg-background border-background-dim hover:bg-text hover:text-background fixed top-0 flex cursor-pointer items-center border border-l-0 py-2 pr-4 pl-3 text-sm uppercase shadow-md transition-colors duration-500"
        >
          {language === "es" ? "ver mas: " : "see more: "}
          {relatedProject.title[language] || relatedProject.title.es}
        </NavLink>
      )}
    </motion.div>
  );
}
