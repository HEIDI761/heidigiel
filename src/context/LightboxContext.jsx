import { createContext, useState } from "react";

const LightboxContext = createContext();

const LightboxProvider = ({ children }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [relatedProject, setRelatedProject] = useState(null);

  const openLightbox = (image, item) => {
    if (item) {
      setRelatedProject(item);
    }
    setCurrentImage(image.url + "?h=1500&fm=webp");
    setIsLightboxOpen(true);
  };
  return (
    <LightboxContext.Provider
      value={{
        isLightboxOpen,
        setIsLightboxOpen,
        currentImage,
        setCurrentImage,
        openLightbox,
        relatedProject,
        setRelatedProject,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export { LightboxProvider, LightboxContext };
