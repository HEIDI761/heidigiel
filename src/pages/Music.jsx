import { useMusicalProjects } from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";

export default function Music() {
  const { data, isLoading, error } = useMusicalProjects();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>mis proyectos musicales uwu</div>
      {data.map((project) => (
        <div key={project._id} className="flex flex-col gap-2">
          {project.title[language] || project.title.es}
        </div>
      ))}
    </div>
  );
}
