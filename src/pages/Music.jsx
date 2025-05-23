import { useEffect, useState } from "react";
import { useMusicContent } from "../sanity/hooks/getData";
import { NavLink } from "react-router";
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

  const imgSize = {
    sm: "?h=100&f=webp",
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
    <div>
      <div className="from-background/80 fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setSelectedProject(null)}
          className="border px-2 py-1 uppercase"
        >
          x
        </button>
        {projects?.map((project) => (
          <button
            key={project._id}
            onClick={() =>
              selectedProject === project
                ? setSelectedProject(null)
                : setSelectedProject(project)
            }
            className={`border px-2 py-1 uppercase ${selectedProject === project ? "bg-black text-white" : ""}`}
          >
            {project._id === "1f3fb03a-2431-4977-9753-c80314f61e07"
              ? "HG"
              : project.title.es}
          </button>
        ))}
      </div>

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
            onClick={() =>
              selectedFilter === type
                ? setSelectedFilter(null)
                : setSelectedFilter(type)
            }
            className={`border px-2 py-1 uppercase ${selectedFilter === type ? "bg-black text-white" : ""}`}
          >
            {type.type.es}
          </button>
        ))}
        <button
          className={`border px-2 py-1 uppercase ${selectedFilter === "fav" ? "bg-black text-white" : ""}`}
          onClick={() =>
            selectedFilter === "fav"
              ? setSelectedFilter(null)
              : setSelectedFilter("fav")
          }
        >
          fav
        </button>
      </div>

      <div className="grid grid-cols-6 gap-4">
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
                  <div
                    key={`${element._key}-cover`}
                    className={`border p-2 ${element.item.isFavorite ? "col-span-2 row-span-2 bg-blue-400" : ""}`}
                  >
                    <img
                      src={element.item.coverImage.url + imgSize.sm}
                      alt="Cover"
                    />
                    {!element.item.isImageGallery && (
                      <>
                        <div>{element.item.title.es}</div>
                        <div className="bg-red-100">
                          {element.item.musicalProject.title.es}
                        </div>
                        <div className="bg-yellow-400">
                          {element.item.type.type.es}
                        </div>
                      </>
                    )}
                  </div>,
                ]
              : [];

            const projectImages =
              element.item.images?.map((img) => (
                <div
                  key={img._key}
                  className={`border p-2 ${element.item.isFavorite ? "bg-blue-400" : ""}`}
                >
                  <img src={img.url + imgSize.sm} alt="Project image" />
                  {!element.item.isImageGallery && (
                    <div>{element.item.title.es}</div>
                  )}
                </div>
              )) || [];

            return [...coverImage, ...projectImages].filter(Boolean);
          }

          if (
            element._type === "image" &&
            element.asset?.url &&
            !selectedFilter &&
            !selectedProject
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
    </div>
  );
}
