import { useAudiovisualContent } from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import { useEffect, useState } from "react";
import VimeoPlayer from "../components/VimeoPlayer";
import { NavLink, Outlet } from "react-router";
import Tag from "../components/Tag";
import ImageContainer from "../components/ImageContainer";

export default function Audiovisual() {
  const { data, isLoading, error } = useAudiovisualContent();
  const [filters, setFilters] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  // const [display, setDisplay] = useState("grid");
  const [hovered, setHovered] = useState(null);

  const imgSize = {
    sm: "?h=400&f=webp",
    md: "?h=800&f=webp",
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
    <div className="flex flex-col gap-8 pb-24">
      <Outlet />
      <div className="from-background/80 fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />

      <div className="sticky top-24 z-50 flex gap-1 font-mono text-xs">
        <button
          onClick={() => setSelectedFilter(null)}
          className="border-text size-4 rounded-full border leading-tight uppercase"
        >
          x
        </button>
        {filters?.map((type) => (
          <button
            key={type._id}
            onClick={() =>
              selectedFilter === type
                ? setSelectedFilter(null)
                : setSelectedFilter(type)
            }
            className={`border-text hover:bg-text hover:text-background border px-2 leading-tight uppercase transition-colors duration-500 ${selectedFilter === type ? "bg-text text-background" : ""}`}
          >
            {type.type.es}
          </button>
        ))}
        <button
          className={`border-text hover:bg-text hover:text-background border px-2 leading-tight uppercase transition-colors duration-500 ${selectedFilter === "fav" ? "bg-text text-background" : ""}`}
          onClick={() =>
            selectedFilter === "fav"
              ? setSelectedFilter(null)
              : setSelectedFilter("fav")
          }
        >
          fav
        </button>
      </div>

      <div className="grid grid-flow-dense auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
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
                  <NavLink
                    onMouseEnter={() => setHovered(element.project._id)}
                    onMouseLeave={() => setHovered(null)}
                    to={`/audiovisual/${element.project.slug?.current}`}
                    key={`${element._key}-cover`}
                    className={`group relative cursor-pointer overflow-hidden border shadow-md transition-all duration-500 ${element.project.isFavorite ? (element.project.coverImage.dimensions.height > element.project.coverImage.dimensions.width ? "row-span-2" : "col-span-2") : ""} ${element.project.isImageGallery ? "rounded-lg" : ""} ${hovered === element.project._id ? "rounded-[50%]" : hovered === null ? "" : "contrast-50 grayscale-100"}`}
                  >
                    {element.project.previewUrl ? (
                      <div
                        style={{
                          backgroundImage: `url("${element.project.coverImage.url}?fm=webp&h=800")`,
                        }}
                        className="relative aspect-video overflow-hidden rounded-sm bg-cover bg-center"
                      >
                        <VimeoPlayer
                          url={element.project.previewUrl}
                          autoplay={1}
                          background={1}
                          loop={1}
                        />
                      </div>
                    ) : (
                      <ImageContainer
                        image={element.project.coverImage}
                        item={element.project}
                      />
                    )}
                    {!element.project.isImageGallery && (
                      <div
                        className={`absolute inset-0 z-10 flex items-center justify-center p-4 text-center uppercase opacity-0 mix-blend-difference transition-opacity duration-500 ${hovered === element.project._id ? "opacity-100" : ""}`}
                      >
                        {element.project.title.es}
                      </div>
                    )}
                  </NavLink>,
                ]
              : [];

            const projectImages =
              element.project.images?.map(
                (img, index) =>
                  element.project.isFavorite &&
                  index < 4 && (
                    <div
                      onMouseEnter={() => setHovered(element.project._id)}
                      onMouseLeave={() => setHovered(null)}
                      key={img._key}
                      className={`overflow-hidden border transition-all duration-500 ${element.project.isFavorite ? "" : ""} ${element.project.isImageGallery ? "rounded-lg" : ""} ${hovered === element.project._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
                    >
                      <ImageContainer image={img} item={element.project} />
                    </div>
                  ),
              ) || [];

            return [...coverImage, ...projectImages].filter(Boolean);
          }

          if (
            element._type === "image" &&
            element.asset?.url &&
            !selectedFilter
          ) {
            return (
              <div
                key={element._key}
                className={`cursor-zoom-in overflow-hidden border transition-all duration-500 ${hovered === element._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
              >
                <ImageContainer image={element?.asset} />
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
