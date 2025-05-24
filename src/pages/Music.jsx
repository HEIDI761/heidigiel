import { useEffect, useState } from "react";
import { useMusicContent } from "../sanity/hooks/getData";
import { NavLink, Outlet } from "react-router";
import Loading from "../components/Loading";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import MuscialItem from "../components/MusicalItem";
import ImageContainer from "../components/ImageContainer";
import TextContainer from "../components/TextContainer";

export default function Music() {
  const { data, isLoading, error } = useMusicContent();
  const [filters, setFilters] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hovered, setHovered] = useState(null);

  const imgSize = {
    sm: "?h=400&f=webp",
    md: "?h=800&f=webp",
  };

  useEffect(() => {
    if (data) {
      const seenProjects = new Set();
      const uniqueProjects = [];

      data.content.forEach((el) => {
        if (el._type === "item" && el.item.musicalProject) {
          if (
            el.item.musicalProject._id &&
            !seenProjects.has(el.item.musicalProject._id)
          ) {
            seenProjects.add(el.item.musicalProject._id);
            uniqueProjects.push(el.item.musicalProject);
          }
        }
      });
      setProjects(uniqueProjects);

      const seenTypes = new Set();
      const uniqueTypes = [];

      data.content.forEach((el) => {
        if (
          el._type === "item" &&
          el.item.type &&
          (!selectedProject ||
            el.item.musicalProject._id === selectedProject._id)
        ) {
          if (el.item.type._id && !seenTypes.has(el.item.type._id)) {
            seenTypes.add(el.item.type._id);
            uniqueTypes.push(el.item.type);
          }
        }
      });
      setFilters(uniqueTypes);
    }
  }, [setFilters, setProjects, selectedProject, data]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-8 pb-24">
      <Outlet />
      <div className="from-background/80 fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />

      <div className="sticky top-24 z-50 flex flex-col gap-1 font-mono text-xs">
        <div className="flex gap-1">
          <button
            onClick={() => setSelectedProject(null)}
            className="border-text size-4 rounded-full border leading-tight uppercase"
          >
            x
          </button>
          {projects?.map((project) => (
            <button
              key={project._id}
              onClick={() => {
                setSelectedFilter(null);
                selectedProject === project
                  ? setSelectedProject(null)
                  : setSelectedProject(project);
              }}
              className={`border-text hover:bg-text hover:text-background border px-2 leading-tight uppercase transition-colors duration-500 ${selectedProject === project ? "bg-text text-background" : ""}`}
            >
              {project._id === "1f3fb03a-2431-4977-9753-c80314f61e07"
                ? "HG"
                : project.title.es}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
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
      </div>

      <div className="grid grid-flow-dense auto-rows-[250px] grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
        {data.content.flatMap((element) => {
          if (element._type === "item" && element.item) {
            const matchesFilter =
              !selectedFilter ||
              element.item.type?._id === selectedFilter._id ||
              (element.item.isFavorite && selectedFilter === "fav");

            const matchesProject =
              !selectedProject ||
              element.item.musicalProject._id === selectedProject._id;

            if (!matchesProject || !matchesFilter) return [];

            const coverImage = element.item.coverImage?.url
              ? [
                  <NavLink
                    onMouseEnter={() => setHovered(element.item._id)}
                    onMouseLeave={() => setHovered(null)}
                    to={`/musica/${element.item.slug?.current}`}
                    key={`${element._key}-cover`}
                    className={`group relative cursor-pointer overflow-hidden border shadow-md transition-all duration-500 ${element.item.isFavorite ? (element.item.coverImage.dimensions.height > element.item.coverImage.dimensions.width ? "row-span-2" : "col-span-2") : ""} ${element.item.isImageGallery ? "rounded-lg" : ""} ${hovered === element.item._id ? "rounded-[50%]" : hovered === null ? "" : "contrast-50 grayscale-100"}`}
                  >
                    <img
                      src={element.item.coverImage.url + imgSize.sm}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    />
                    {!element.item.isImageGallery && (
                      <div
                        className={`absolute inset-0 z-10 flex items-center justify-center p-4 text-center uppercase opacity-0 mix-blend-difference transition-opacity duration-500 ${hovered === element.item._id ? "opacity-100" : ""}`}
                      >
                        {element.item.title.es}
                      </div>
                    )}
                  </NavLink>,
                ]
              : [];

            const projectImages =
              element.item.images?.map(
                (img, index) =>
                  element.item.isFavorite &&
                  index < 4 &&
                  img.url && (
                    <div
                      onMouseEnter={() => setHovered(element.item._id)}
                      onMouseLeave={() => setHovered(null)}
                      key={img._key}
                      className={`overflow-hidden border transition-all duration-500 ${element.item.isFavorite ? "" : ""} ${element.item.isImageGallery ? "rounded-lg" : ""} ${hovered === element.item._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
                    >
                      <ImageContainer image={img} item={element.item} />
                    </div>
                  ),
              ) || [];

            return [...coverImage, ...projectImages].filter(Boolean);
          }

          if (
            element._type === "image" &&
            element.asset?.url &&
            !selectedFilter &&
            !selectedProject
          ) {
            return (
              <div
                key={element._key}
                className={`cursor-zoom-in overflow-hidden border transition-all duration-500 ${hovered === element._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
              >
                <ImageContainer image={element.asset} />
                {/* <img
                  className="h-full w-full object-cover"
                  src={element.asset.url + imgSize.sm}
                  alt="Loose image"
                /> */}
              </div>
            );
          }
          return [];
        })}
      </div>
    </div>
  );
}
