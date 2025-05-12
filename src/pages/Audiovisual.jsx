import {
  useAudiovisualFilters,
  useAudiovisualProjects,
} from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";

export default function Audiovisual() {
  const { data: filters, isLoading } = useAudiovisualFilters();
  const { data: projectsData, isLoading: projectsLoading } =
    useAudiovisualProjects();
  const { language } = useLanguage();

  if (isLoading || projectsLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-2 lowercase">
      {filters.roles && (
        <div className="flex flex-wrap">
          {filters.roles.map((role) => (
            <div
              className="bg-tertiary hover:bg-text hover:text-background border-accent rounded-full border px-2 transition-colors"
              key={role._id}
            >
              {role.role[language] || role.role.es}
            </div>
          ))}
        </div>
      )}
      {filters.audiovisualProjectTypes && (
        <div className="flex flex-wrap">
          {filters.audiovisualProjectTypes.map((type) => (
            <div
              className="bg-secondary hover:bg-text hover:text-background border-accent rounded-full border px-2 transition-colors"
              key={type._id}
            >
              {type.type[language] || type.type.es}
            </div>
          ))}
        </div>
      )}
      {projectsData && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {projectsData.map((project) => (
            <div key={project._id} className="flex flex-col gap-2">
              <h2 className="text-2xl">{project.title.es}</h2>
              <p>{project.client}</p>
              {project.isFavorite && (
                <p className="text-accent font-bold">Favorite</p>
              )}
              <p>{project.date}</p>
              <div className="flex flex-wrap gap-2">
                {project.audiovisualProjectType.map((type) => (
                  <p key={type._id} className="rounded border px-2">
                    {type.type.es}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.roles.map((role) => (
                  <p key={role._id} className="rounded-full border px-2">
                    {role.role.es}
                  </p>
                ))}
              </div>
              {project.previewUrl && <div>{project.previewUrl}</div>}
              <img
                src={project.coverImage.url + "?fm=webp&h=400"}
                alt={project.title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
