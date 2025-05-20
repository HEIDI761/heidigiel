import {
  useAudiovisualFilters,
  useAudiovisualProjectsList,
} from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import { useEffect, useState } from "react";
import VimeoPlayer from "../components/VimeoPlayer";
import { NavLink } from "react-router";
import Tag from "../components/Tag";

export default function Audiovisual() {
  const { data: filters, isLoading } = useAudiovisualFilters();
  const { data: projectsData, isLoading: projectsLoading } =
    useAudiovisualProjectsList();
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

  const noFiltersSelected =
    selectedFilters.roles.length == 0 &&
    selectedFilters.audiovisualProjectTypes.length == 0;

  if (isLoading || projectsLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-8 pb-22">
      <div className="from-background/80 fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />
      <div className="sticky top-32 z-10 -ml-8 flex flex-col items-center gap-1 text-xs lowercase">
        {filters.roles && (
          <div className="flex flex-wrap justify-center">
            {filters.roles.map((role) => (
              <Tag
                key={role._id}
                tag={role.role}
                onClick={() => handleFilterChange("roles", role)}
                selected={selectedFilters.roles.some(
                  (selectedRole) => selectedRole._id === role._id,
                )}
              />
            ))}
          </div>
        )}
        {filters.audiovisualProjectTypes && (
          <div className="flex flex-wrap justify-center">
            {filters.audiovisualProjectTypes.map((type) => (
              <Tag
                key={type._id}
                tag={type.type}
                onClick={() =>
                  handleFilterChange("audiovisualProjectTypes", type)
                }
                selected={selectedFilters.audiovisualProjectTypes.some(
                  (selectedType) => selectedType._id === type._id,
                )}
                roundness="sm"
              />
            ))}
          </div>
        )}
        <div
          className={`border-text bg-background/50 border px-2 transition-colors select-none ${noFiltersSelected ? "text-muted-text" : "hover:bg-text hover:text-background cursor-pointer"}`}
          onClick={() => {
            if (!noFiltersSelected) {
              handleResetFilters();
            }
          }}
        >
          {language === "es" ? "Limpiar filtros" : "Clear filters"}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <button
            className={`border-text group bg-background/50 cursor-pointer rounded-full border px-2 uppercase ${display === "list" ? "bg-text text-background" : "text-muted-text hover:bg-text hover:text-background"}`}
            onClick={() => setDisplay("list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
              className={`opacity-75 group-hover:invert ${display === "list" ? "invert" : ""}`}
            >
              <path d="M144-264v-72h432v72H144Zm0-180v-72h672v72H144Zm0-180v-72h672v72H144Z" />
            </svg>
          </button>
          <button
            className={`border-text group bg-background/50 cursor-pointer rounded-full border px-2 uppercase ${display === "grid" ? "bg-text text-background" : "text-muted-text hover:bg-text hover:text-background"}`}
            onClick={() => setDisplay("grid")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
              className={`opacity-75 group-hover:invert ${display === "grid" ? "invert" : ""}`}
            >
              <path d="M528-624v-192h288v192H528ZM144-432v-384h288v384H144Zm384 288v-384h288v384H528Zm-384 0v-192h288v192H144Zm72-360h144v-240H216v240Zm384 288h144v-240H600v240Zm0-479h144v-49H600v49ZM216-216h144v-48H216v48Zm144-288Zm240-191Zm0 239ZM360-264Z" />
            </svg>
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
    <div className="grid grid-flow-dense grid-cols-3 items-start gap-4 lg:grid-cols-6">
      {projects.map((project) => (
        <NavLink
          key={project._id}
          className={`group relative flex flex-col gap-2 overflow-hidden rounded-[0%] transition-all duration-300 hover:rounded-[50%] ${project.isFavorite ? (project.coverImage.dimensions.height > project.coverImage.dimensions.width ? "col-span-2 row-span-2" : "col-span-3") : ""}`}
          to={`/audiovisual/${project.slug.current}`}
        >
          <h1 className="text-background bg-text absolute z-10 flex h-full w-full items-center justify-center text-center font-serif text-2xl opacity-0 mix-blend-difference transition-opacity duration-300 group-hover:opacity-100">
            {project.title.es}
          </h1>
          {project.previewUrl ? (
            <div
              style={{
                backgroundImage: `url("${project.coverImage.url}?fm=webp&h=800")`,
              }}
              className="relative aspect-video overflow-hidden rounded-sm bg-cover bg-center"
            >
              <VimeoPlayer
                url={project.previewUrl}
                autoplay={1}
                background={1}
                loop={1}
              />
            </div>
          ) : (
            <img
              src={project.coverImage.url + "?fm=webp&h=800"}
              alt={project.title}
              className="border-background rounded-sm border"
            />
          )}
        </NavLink>
      ))}
    </div>
  );
}

function ProjectsList({ projects }) {
  return (
    <div>
      {projects.map((project) => (
        <NavLink
          to={`/audiovisual/${project.slug.current}`}
          key={project._id}
          className="group hover:bg-background/50 flex flex-col flex-wrap gap-1 border-b p-2 md:flex-row md:items-center md:gap-2"
        >
          <div className="flex items-center gap-1 group-hover:underline">
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
            <h2 className="group-hover:font-serif-italic font-serif text-2xl">
              {project.title.es} -
            </h2>
            <p className="font-serif text-2xl italic">{project.client}</p>
          </div>

          <div className="flex flex-wrap text-xs lowercase">
            {project.audiovisualProjectType.map((type) => (
              <Tag
                key={type._id}
                tag={type.type}
                roundness="sm"
                clickabe={false}
              />
            ))}
          </div>
          <div className="flex flex-wrap text-xs lowercase">
            {project.roles.map((role) => (
              <Tag
                key={role._id}
                tag={role.role}
                roundness="full"
                clickabe={false}
              />
            ))}
          </div>

          <p className="text-xs italic">{project.date.slice(0, 4)}</p>
        </NavLink>
      ))}
    </div>
  );
}
