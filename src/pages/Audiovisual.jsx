import {
  useAudiovisualFilters,
  useAudiovisualProjects,
} from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import { useEffect, useState } from "react";

export default function Audiovisual() {
  const { data: filters, isLoading } = useAudiovisualFilters();
  const { data: projectsData, isLoading: projectsLoading } =
    useAudiovisualProjects();
  const { language } = useLanguage();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    audiovisualProjectTypes: [],
  });
  const [display, setDisplay] = useState("grid");

  useEffect(() => {
    if (projectsData) {
      if (
        selectedFilters.roles.length === 0 &&
        selectedFilters.audiovisualProjectTypes.length === 0
      ) {
        setFilteredProjects(projectsData);
      } else {
        const filtered = projectsData.filter((project) => {
          const hasRole =
            selectedFilters.roles.length === 0
              ? true
              : selectedFilters.roles.some((role) =>
                  project.roles.some(
                    (projectRole) => projectRole._id === role._id,
                  ),
                );

          const hasType =
            selectedFilters.audiovisualProjectTypes.length === 0
              ? true
              : selectedFilters.audiovisualProjectTypes.some((type) =>
                  project.audiovisualProjectType.some(
                    (projectType) => projectType._id === type._id,
                  ),
                );

          return hasRole && hasType;
        });

        setFilteredProjects(filtered);
      }
    }
  }, [projectsData, selectedFilters]);

  const handleFilterChange = (filterType, filter) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].some((f) => f._id === filter._id)
        ? prev[filterType].filter((f) => f._id !== filter._id)
        : [...prev[filterType], filter],
    }));
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      roles: [],
      audiovisualProjectTypes: [],
    });
  };

  if (isLoading || projectsLoading) return <Loading />;

  console.log(projectsData);

  return (
    <div className="flex flex-col gap-8 pb-22">
      <div className="sticky top-26 z-10 -ml-8 flex flex-col items-start gap-1 text-xs lowercase">
        {filters.roles && (
          <div className="flex flex-wrap">
            {filters.roles.map((role) => (
              <div
                className={`hover:bg-text hover:text-background border-text cursor-pointer rounded-full border px-2 transition-colors select-none ${
                  selectedFilters.roles.some(
                    (selectedRole) => selectedRole._id === role._id,
                  )
                    ? "bg-text text-background"
                    : "bg-background/50"
                }`}
                key={role._id}
                onClick={() => handleFilterChange("roles", role)}
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
                className={`hover:bg-text hover:text-background border-text cursor-pointer rounded-full border px-2 transition-colors select-none ${
                  selectedFilters.audiovisualProjectTypes.some(
                    (selectedType) => selectedType._id === type._id,
                  )
                    ? "bg-text text-background"
                    : "bg-background/50"
                }`}
                key={type._id}
                onClick={() =>
                  handleFilterChange("audiovisualProjectTypes", type)
                }
              >
                {type.type[language] || type.type.es}
              </div>
            ))}
          </div>
        )}
        <div
          className="border-text hover:bg-text hover:text-background bg-background/50 cursor-pointer border px-2 transition-colors"
          onClick={handleResetFilters}
        >
          clear filters
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <button
            className={`border-text bg-background/50 cursor-pointer border px-2 uppercase ${display === "list" ? "" : "text-muted-text hover:bg-text hover:text-background"}`}
            onClick={() => setDisplay("list")}
          >
            list
          </button>
          <button
            className={`border-text bg-background/50 cursor-pointer border px-2 uppercase ${display === "grid" ? "" : "text-muted-text hover:bg-text hover:text-background"}`}
            onClick={() => setDisplay("grid")}
          >
            grid
          </button>
        </div>
      </div>

      {projectsData &&
        filteredProjects.length > 0 &&
        (display === "grid" ? (
          <ProjectsGrid projects={filteredProjects} />
        ) : (
          <ProjectsList projects={filteredProjects} />
        ))}
    </div>
  );
}

function ProjectsGrid({ projects }) {
  return (
    <div className="grid grid-flow-dense grid-cols-1 items-center gap-16 md:grid-cols-2 lg:grid-cols-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className={`relative flex flex-col gap-2 ${project.isFavorite ? (project.coverImage.dimensions.height > project.coverImage.dimensions.width ? "col-span-2 row-span-2" : "col-span-3") : ""}`}
        >
          {/* <h2 className="absoulte font-serif text-2xl">
            {project.title.es} -{" "}
            <span className="italic">{project.client}</span>
          </h2> */}
          <img
            src={
              project.coverImage.url +
              `?fm=webp&h=${project.isFavorite ? 800 : 500}`
            }
            alt={project.title}
            className="rounded-sm"
          />
        </div>
      ))}
    </div>
  );
}

function ProjectsList({ projects }) {
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id} className="flex items-center gap-2">
          <h2 className="font-serif text-2xl">{project.title.es} -</h2>
          <p className="font-serif text-2xl italic">{project.client}</p>

          <div className="flex flex-wrap gap-2 text-xs">
            {project.audiovisualProjectType.map((type) => (
              <p key={type._id} className="rounded border px-2">
                {type.type.es}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {project.roles.map((role) => (
              <p key={role._id} className="rounded-full border px-2">
                {role.role.es}
              </p>
            ))}
          </div>
          {project.isFavorite && (
            <div className="rotate-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="var(--color-primary)"
              >
                <path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z" />
              </svg>
            </div>
          )}
          <p className="text-xs italic">{project.date.slice(0, 4)}</p>
        </div>
      ))}
    </div>
  );
}
