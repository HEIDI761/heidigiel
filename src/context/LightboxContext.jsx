import { createContext, useState } from "react";

const LightboxContext = createContext();

const LightboxProvider = ({ children }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [project, setProject] = useState(null);

  const openLightbox = (image) => {
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
        project,
        setProject,
      }}
    >
      {children}
    </LightboxContext.Provider>
  );
};

export { LightboxProvider, LightboxContext };
