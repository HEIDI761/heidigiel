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
import ImageContainer from "../components/ImageContainer";
import TextContainer from "../components/TextContainer";

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

  if (isLoading || mainItemsLoading || musicalProjectsListLoading)
    return <Loading />;
  if (error || mainItemsError || musicalProjectsListError)
    return <div>Error {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 place-items-center gap-16 pt-16 lg:grid-cols-2">
        {mainMusicalProject.description && (
          <TextContainer className="self-start">
            <PortableText
              value={
                mainMusicalProject.description[language] ||
                mainMusicalProject.description.es
              }
            />
          </TextContainer>
        )}
        <div className="bg-secondary-dim border-tertiary max-w-3xs rotate-1 border px-4 py-2 text-center">
          <div className="text-xs uppercase italic">Otros proyectos</div>
          {musicalProjectsList.map((project) => (
            <NavLink
              to={project.slug.current}
              key={project._id}
              className="flex cursor-pointer flex-col gap-2 font-serif text-2xl text-white hover:underline"
            >
              {project.title[language] || project.title.es}
            </NavLink>
          ))}
        </div>

        {mainMusicalProject.images && (
          <div className="mx-auto flex flex-wrap items-center gap-8 lg:col-span-2">
            {mainMusicalProject.images.map((image, index) => (
              <div
                key={image._key}
                className={`mx-auto h-auto cursor-zoom-in rounded-sm ${index === 1 ? "max-w-[1200px] rotate-1" : "max-w-[200px]"}`}
              >
                <ImageContainer image={image} item={mainMusicalProject} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-32 pt-24">
        {mainItems.map((item) => (
          <MuscialItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
