import { useState } from "react";
import {
  useMainMusicalProject,
  useMainMusicalItems,
  useMusicalProjectsList,
} from "../sanity/hooks/getData";
import { NavLink } from "react-router";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import MuscialItem from "../components/MusicalItem";
import Lightbox from "../components/Lightbox";
import { AnimatePresence } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function Music() {
  const {
    data: mainMusicalProject,
    isLoading,
    error,
  } = useMainMusicalProject();
  const {
    data: mainItems,
    isLoading: mainItemsLoading,
    error: mainItemsError,
  } = useMainMusicalItems();
  const {
    data: musicalProjectsList,
    isLoading: musicalProjectsListLoading,
    error: musicalProjectsListError,
  } = useMusicalProjectsList();
  const { language } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const isMobile = useIsMobile();

  if (isLoading || mainItemsLoading || musicalProjectsListLoading)
    return <Loading />;
  if (error || mainItemsError || musicalProjectsListError)
    return <div>Error {error}</div>;

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
      <div>
        <div className="grid grid-cols-1 place-items-center gap-16 pt-16 lg:grid-cols-2">
          <div className="max-w-prose -rotate-1 text-xl">
            {mainMusicalProject.description && (
              <PortableText
                value={
                  mainMusicalProject.description[language] ||
                  mainMusicalProject.description.es
                }
              />
            )}
          </div>

          {mainMusicalProject.images && (
            <div className="mx-auto flex flex-wrap items-center gap-8 lg:col-span-2">
              {mainMusicalProject.images.map((image, index) => (
                <img
                  onClick={() => {
                    if (!isMobile) {
                      setCurrentImage(image.url + "?fm=webp");
                      setIsLightboxOpen(true);
                    }
                  }}
                  key={image._key}
                  src={image.url + "?fm=webp&h=400"}
                  className={`mx-auto h-auto cursor-zoom-in rounded-sm ${index === 1 ? "max-w-[1200px] rotate-1" : "max-w-[200px]"}`}
                />
              ))}
            </div>
          )}

          <div className="bg-secondary-dim border-tertiary max-w-3xs rotate-1 rounded-sm border-2 px-4 py-2 text-center">
            <div className="text-xs uppercase italic">Otros proyectos</div>
            {musicalProjectsList.map((project) => (
              <NavLink
                to={project.slug.current}
                key={project._id}
                className="text-background flex cursor-pointer flex-col gap-2 font-serif text-2xl hover:underline"
              >
                {project.title[language] || project.title.es}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-32 pt-24">
          {mainItems.map((item) => (
            <MuscialItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
