import { useState } from "react";
import { useMusicalItems, useMusicalProject } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import Loading from "../components/Loading";
import { useParams } from "react-router";
import MusicalItem from "../components/MusicalItem";
import { PortableText } from "@portabletext/react";
import Lightbox from "../components/Lightbox";
import { AnimatePresence } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function MusicalProject() {
  const { slug } = useParams();
  const {
    data: project,
    isLoading: projectLoading,
    error: projectError,
  } = useMusicalProject(slug);
  const {
    data: items,
    isLoading: itemsLoading,
    error: itemsError,
  } = useMusicalItems(slug);
  const { language } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const isMobile = useIsMobile();

  if (itemsLoading || projectLoading) return <Loading />;
  if (itemsError || projectError) return <div>Error: {itemsError.message}</div>;

  return (
    <>
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            key="lightbox"
            currentImage={currentImage}
            setIsLightboxOpen={setIsLightboxOpen}
          />
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-16">
        <h1 className="text-center font-serif text-6xl">
          {project.title[language] || project.title.es}
        </h1>
        {project.description && (
          <div className="mx-auto max-w-prose">
            <PortableText
              value={project.description[language] || project.description.es}
            />
          </div>
        )}

        {project.images && (
          <div className="mx-auto flex flex-wrap gap-8">
            {project.images.map((image) => (
              <img
                onClick={() => {
                  if (!isMobile) {
                    setCurrentImage(image.url + "?fm=webp");
                    setIsLightboxOpen(true);
                  }
                }}
                key={image._key}
                src={image.url + "?fm=webp&h=400"}
                alt={project.title.es}
                className="mx-auto max-w-[200px] cursor-zoom-in rounded-sm"
              />
            ))}
          </div>
        )}
        <div className="flex flex-col gap-32 pt-24">
          {items.map((item) => (
            <MusicalItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
