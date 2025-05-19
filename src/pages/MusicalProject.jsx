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
      <div className="flex flex-col gap-8">
        <h1 className="text-center font-serif text-6xl">
          {project.title[language] || project.title.es}
        </h1>
        <div className="flex flex-wrap justify-center gap-16">
          {project.description && (
            <div className="border-background max-w-prose place-self-start rounded-sm border bg-white/30 p-3 pt-2">
              <PortableText
                value={project.description[language] || project.description.es}
              />
            </div>
          )}
          {project.images && (
            <div className="flex rotate-2 flex-wrap gap-8">
              {project.images.map((image) => (
                <div className="mx-auto">
                  <img
                    onClick={() => {
                      if (!isMobile) {
                        setCurrentImage(image.url + "?fm=webp");
                        setIsLightboxOpen(true);
                      }
                    }}
                    key={image._key}
                    src={image.url + "?fm=webp&h=800"}
                    alt={project.title.es}
                    className="border-background max-w-[600px] cursor-zoom-in rounded-sm border"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-32 pt-24">
          {items.map((item) => (
            <MusicalItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
