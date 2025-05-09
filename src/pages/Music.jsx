import { useMusicalProjects } from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";

const SOLISTA_ID = "1f3fb03a-2431-4977-9753-c80314f61e07";

export default function Music() {
  const { data, isLoading, error } = useMusicalProjects();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map(
        (project) =>
          project._id === SOLISTA_ID && (
            <div key={project._id}>
              {project.title[language] || project.title.es}
            </div>
          ),
      )}
      <div>-----</div>
      <div>otros proyectos:</div>
      {data.map(
        (project) =>
          project._id != SOLISTA_ID && (
            <div key={project._id} className="flex flex-col gap-2">
              {project.title[language] || project.title.es}
            </div>
          ),
      )}
    </div>
  );
}
