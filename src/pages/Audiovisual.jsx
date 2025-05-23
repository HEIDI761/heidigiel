import { useAudiovisualContent } from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import { useEffect, useState } from "react";
import VimeoPlayer from "../components/VimeoPlayer";
import { NavLink } from "react-router";
import Tag from "../components/Tag";
import ImageContainer from "../components/ImageContainer";

export default function Audiovisual() {
  const { data, isLoading, error } = useAudiovisualContent();
  const [filters, setFilters] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  // const [display, setDisplay] = useState("grid");

  const imgSize = {
    sm: "?h=100&f=webp",
  };

  useEffect(() => {
    if (data) {
      const seen = new Set();
      const uniqueTypes = [];

      data.content.forEach((el) => {
        if (el._type === "audiovisualProject") {
          el.project?.audiovisualProjectType?.forEach((t) => {
            if (!seen.has(t._id)) {
              seen.add(t._id);
              uniqueTypes.push(t);
            }
          });
        }
      });
      setFilters(uniqueTypes);
    }
  }, [setFilters, data]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-8 pb-22">
      <div className="from-background/80 fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSelectedFilter(null)}
          className="border px-2 py-1 uppercase"
        >
          x
        </button>
        {filters?.map((type) => (
          <button
            key={type._id}
            onClick={() => setSelectedFilter(type)}
            className={`border px-2 py-1 uppercase ${selectedFilter === type ? "bg-black text-white" : ""}`}
          >
            {type.type.es}
          </button>
        ))}
        <button
          className={`border px-2 py-1 uppercase ${selectedFilter === "fav" ? "bg-black text-white" : ""}`}
          onClick={() => setSelectedFilter("fav")}
        >
          fav
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {data.content.flatMap((element) => {
          if (element._type === "audiovisualProject" && element.project) {
            const matchesFilter =
              !selectedFilter ||
              element.project.audiovisualProjectType?.some(
                (t) => t.type === selectedFilter.type,
              ) ||
              (element.project.isFavorite && selectedFilter === "fav");
            if (!matchesFilter) return [];

            const coverImage = element.project.coverImage?.url
              ? [
                  <div
                    key={`${element._key}-cover`}
                    className={`border p-2 ${element.project.isFavorite ? "col-span-2 row-span-2 bg-blue-400" : ""}`}
                  >
                    <img
                      src={element.project.coverImage.url + imgSize.sm}
                      alt="Cover"
                    />
                    {!element.project.isImageGallery && (
                      <div>{element.project.title.es}</div>
                    )}
                  </div>,
                ]
              : [];

            const projectImages =
              element.project.images?.map((img) => (
                <div
                  key={img._key}
                  className={`border p-2 ${element.project.isFavorite ? "bg-blue-400" : ""}`}
                >
                  <img src={img.url + imgSize.sm} alt="Project image" />
                  {!element.project.isImageGallery && (
                    <div>{element.project.title.es}</div>
                  )}
                </div>
              )) || [];

            return [...coverImage, ...projectImages].filter(Boolean);
          }

          if (
            element._type === "image" &&
            element.asset?.url &&
            !selectedFilter
          ) {
            return (
              <div key={element._key} className="border bg-amber-500 p-2">
                <img src={element.asset.url + imgSize.sm} alt="Loose image" />
              </div>
            );
          }

          return [];
        })}
      </div>

      {/* {projectsData && */}
      {/*   filteredProjects.length > 0 && */}
      {/*   (display === "grid" ? ( */}
      {/*     <ProjectsGrid projects={filteredProjects} /> */}
      {/*   ) : ( */}
      {/*     <ProjectsList projects={filteredProjects} /> */}
      {/*   ))} */}
    </div>
  );
}

function ProjectsGrid({ projects }) {
  const { language } = useLanguage();

  return (
    <div className="grid grid-flow-dense grid-cols-3 items-start gap-4 lg:grid-cols-6">
      {projects.map((project) =>
        !project.isSingleImage ? (
          <NavLink
            key={project._id}
            className={`group relative flex flex-col gap-2 overflow-hidden rounded-[0%] transition-all duration-300 hover:rounded-[50%] ${project.isFavorite ? (project.coverImage.dimensions.height > project.coverImage.dimensions.width ? "col-span-2 row-span-2" : "col-span-3") : ""}`}
            to={`/audiovisual/${project.slug.current}`}
          >
            <h1 className="text-background bg-text absolute z-10 flex h-full w-full items-center justify-center text-center font-serif text-2xl opacity-0 mix-blend-difference transition-opacity duration-300 group-hover:opacity-100">
              {project.title[language] || project.title.es}
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
              <ImageContainer image={project.coverImage} item={project} />
            )}
          </NavLink>
        ) : (
          project.images &&
          project.images.map((image) => (
            <ImageContainer key={image._key} image={image} />
          ))
        ),
      )}
    </div>
  );
}

function ProjectsList({ projects }) {
  return (
    <div>
      {projects.map((project) =>
        !project.isSingleImage ? (
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
              <h2 className="font-serif text-2xl italic group-hover:font-serif">
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
        ) : null,
      )}
    </div>
  );
}
