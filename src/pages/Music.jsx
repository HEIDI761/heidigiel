import {
  useMusicalProjects,
  useMainMusicalItems,
} from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import MuscialItem from "../components/MusicalItem";

const SOLISTA_ID = "1f3fb03a-2431-4977-9753-c80314f61e07";

export default function Music() {
  const { data, isLoading, error } = useMusicalProjects();
  const {
    data: mainItems,
    isLoading: mainItemsLoading,
    error: mainItemsError,
  } = useMainMusicalItems();
  const { language } = useLanguage();

  if (isLoading || mainItemsLoading) return <Loading />;
  if (error || mainItemsError) return <div>Error {error}</div>;

  return (
    <div>
      {data.map(
        (project) =>
          project._id === SOLISTA_ID && (
            <div key={project._id}>
              {project.description && (
                <PortableText
                  value={
                    project.description[language] || project.description.es
                  }
                />
              )}
            </div>
          ),
      )}
      <div>-----</div>
      <div>otros proyectos:</div>
      {data.map(
        (project) =>
          project._id != SOLISTA_ID && (
            <div
              onClick={() => {
                console.log(project.slug.current);
              }}
              key={project._id}
              className="flex flex-col gap-2 underline"
            >
              {project.title[language] || project.title.es}
            </div>
          ),
      )}
      <div>-----</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainItems.map((item) => (
          <MuscialItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
