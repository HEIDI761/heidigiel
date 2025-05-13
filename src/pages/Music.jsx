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
      <div>
        {mainMusicalProject.description && (
          <PortableText
            value={
              mainMusicalProject.description[language] ||
              mainMusicalProject.description.es
            }
          />
        )}
      </div>
      <div>-----</div>
      <div>otros proyectos:</div>
      {musicalProjectsList.map((project) => (
        <NavLink
          to={project.slug.current}
          key={project._id}
          className="flex flex-col gap-2 underline"
        >
          {project.title[language] || project.title.es}
        </NavLink>
      ))}
      <div>-----</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainItems.map((item) => (
          <MuscialItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
