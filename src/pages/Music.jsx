import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { PortableText } from "@portabletext/react";
import {
  useMusicContent,
  useMusicalProjectsList,
} from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import Loading from "../components/Loading";
import ImageContainer from "../components/ImageContainer";
import ImageGallery from "../components/ImageGallery";
import VimeoPlayer from "../components/VimeoPlayer";
import PlayEmbedButton from "../components/PlayEmbedButton";

export default function Music() {
  const { data, isLoading, error } = useMusicContent();
  const {
    data: projectsList,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useMusicalProjectsList();
  const [filters, setFilters] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [imageGalleryData, setImageGalleryData] = useState(null);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [isDescriptionOpen, setDescriptionIsOpen] = useState(false);
  const { language } = useLanguage();

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

  const openImageGallery = ({ data }) => {
    setImageGalleryData(data);
    setIsImageGalleryOpen(true);
  };

  if (isLoading || isLoadingProjects) return <Loading />;
  if (error || errorProjects) return <div>Error: {error.message}</div>;

  const matchedProject = projectsList.find((i) =>
    selectedProject
      ? i.slug.current === selectedProject?.slug?.current
      : i._id === "1f3fb03a-2431-4977-9753-c80314f61e07",
  );

  const description =
    matchedProject?.description?.[language] || matchedProject?.description?.es;

  return (
    <div className="flex flex-col gap-8 pb-24">
      {isImageGalleryOpen && (
        <ImageGallery
          data={imageGalleryData}
          closeGallery={() => setIsImageGalleryOpen(false)}
        />
      )}
      <div className="from-background/80 fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />

      <div className="sticky top-24 z-40 flex flex-wrap justify-between gap-4">
        <Filters />

        {description && (
          <>
            <button
              className="bg-text text-background group/description border-muted-text hover:bg-background hover:text-text shadow-background-dim flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-md transition-colors duration-500 ease-in-out"
              onClick={() => setDescriptionIsOpen(!isDescriptionOpen)}
            >
              {isDescriptionOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="var(--color-background)"
                  className="group-hover/description:fill-text"
                >
                  <path d="M252-466v-28h456v28H252Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="var(--color-background)"
                  className="group-hover/description:fill-text"
                >
                  <path d="M466-466H252v-28h214v-214h28v214h214v28H494v214h-28v-214Z" />
                </svg>
              )}
            </button>
            {isDescriptionOpen && (
              <div className="bg-text text-background border-muted-text shadow-background-dim absolute top-0 right-10 flex max-h-[400px] max-w-prose flex-col gap-2 overflow-y-auto border p-4 text-sm shadow-md">
                <PortableText value={description} />
              </div>
            )}
          </>
        )}
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

            if (!element.item.isImageGallery) {
              const coverImage = element.item.coverImage?.url
                ? [
                    <NavLink
                      onMouseEnter={() => setHovered(element.item._id)}
                      onMouseLeave={() => setHovered(null)}
                      to={`/musica/${element.item.slug?.current}`}
                      key={`${element._key}-cover`}
                      className={`group relative cursor-pointer overflow-hidden ${element.item.isFavorite ? (element.item.coverImage.dimensions.height > element.item.coverImage.dimensions.width ? "row-span-2" : "col-span-2") : ""} `}
                    >
                      <div
                        className={`h-full w-full overflow-hidden border shadow-md transition-all duration-500 ${hovered === element.item._id ? "rounded-[50%]" : hovered === null ? "" : "contrast-50 grayscale-100"}`}
                      >
                        {element.item.vimeoShortVideos?.length > 0 ? (
                          <div
                            style={{
                              backgroundImage: `url("${element.item.coverImage.url}?fm=webp&h=800")`,
                            }}
                            className="relative aspect-video overflow-hidden rounded-sm bg-cover bg-center"
                          >
                            <VimeoPlayer
                              url={element.item.vimeoShortVideos[0]}
                              autoplay={1}
                              background={1}
                              loop={1}
                            />
                          </div>
                        ) : (
                          <ImageContainer
                            image={element.item.coverImage}
                            item={element.item}
                            className="group-hover:scale-105"
                          />
                        )}
                        {!element.item.isImageGallery && (
                          <div
                            className={`absolute inset-0 z-10 flex items-center justify-center p-4 text-center uppercase opacity-0 mix-blend-difference transition-opacity duration-500 ${hovered === element.item._id ? "opacity-100" : ""}`}
                          >
                            {element.item.title.es}
                          </div>
                        )}
                      </div>
                      {element.item.type && (
                        <div className="pointer-events-none absolute inset-0 z-30 flex items-start justify-end p-2">
                          <p
                            className={`border-muted-text rounded-full border px-2 font-mono text-xs lowercase transition-colors duration-500 ${hovered === element.item._id ? "text-text bg-background" : "bg-text text-background"}`}
                          >
                            {element.item.type.type.es}
                          </p>
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
                        className={`overflow-hidden border transition-all duration-500 ${hovered === element.item._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
                      >
                        <ImageContainer
                          image={img}
                          item={element.item}
                          className="hover:scale-105"
                        />
                      </div>
                    ),
                ) || [];

              return [...coverImage, ...projectImages].filter(Boolean);
            } else {
              const coverImage = element.item.coverImage?.url
                ? [
                    <div
                      onMouseEnter={() => setHovered(element.item._id)}
                      onMouseLeave={() => setHovered(null)}
                      key={`${element._key}-cover`}
                      onClick={() => openImageGallery({ data: element.item })}
                      className={`group border-background-dim relative cursor-pointer overflow-hidden border shadow-md transition-all duration-500 ${element.item.isFavorite ? (element.item.coverImage.dimensions.height > element.item.coverImage.dimensions.width ? "row-span-2" : "col-span-2") : ""} ${hovered === element.item._id ? "rounded-[50%]" : hovered === null ? "" : "contrast-50 grayscale-100"}`}
                    >
                      <div
                        className="h-full w-full overflow-hidden"
                        style={{
                          backgroundImage: `url(${element.item.coverImage.url}?h=10&blur=30&fm=webp)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          aspectRatio: `${element.item.coverImage.dimensions.aspectRatio}/1`,
                        }}
                      >
                        <img
                          src={element.item.coverImage.url + imgSize.sm}
                          alt="Cover"
                          className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>,
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
                        onClick={() => openImageGallery({ data: element.item })}
                        key={img._key}
                        className={`border-background-dim overflow-hidden border transition-all duration-500 ${hovered === element.item._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
                      >
                        <div
                          className="h-full w-full overflow-hidden"
                          style={{
                            backgroundImage: `url(${img.url}?h=10&blur=30&fm=webp)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            aspectRatio: `${img.dimensions.aspectRatio}/1`,
                          }}
                        >
                          <img
                            src={img.url + "?fm=webp&h=800"}
                            className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>
                    ),
                ) || [];

              return [...coverImage, ...projectImages].filter(Boolean);
            }
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
                className={`border-background-dim cursor-zoom-in overflow-hidden rounded-lg border transition-all duration-500 ${hovered === element._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
              >
                <ImageContainer
                  image={element.asset}
                  className="hover:scale-105"
                />
              </div>
            );
          }
          return [];
        })}
      </div>
      <Outlet />
    </div>
  );

  function Filters() {
    return (
      <div className="flex flex-col gap-1 font-mono text-xs">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedProject(null)}
            className="border-text bg-text/10 size-4 cursor-pointer rounded-full border leading-tight uppercase backdrop-blur-xl"
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
              className={`border-text hover:bg-text hover:text-background cursor-pointer border px-2 leading-tight uppercase backdrop-blur-xl transition-colors duration-500 ${selectedProject === project ? "bg-text text-background" : "bg-text/10"}`}
            >
              {project._id === "1f3fb03a-2431-4977-9753-c80314f61e07"
                ? "HG"
                : project.title.es}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setSelectedFilter(null)}
            className="border-text bg-text/10 size-4 cursor-pointer rounded-full border leading-tight uppercase backdrop-blur-xl"
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
              className={`border-text hover:bg-text hover:text-background cursor-pointer border px-2 leading-tight uppercase backdrop-blur-xl transition-colors duration-500 ${selectedFilter === type ? "bg-text text-background" : "bg-text/10"}`}
            >
              {type.type.es}
            </button>
          ))}
          <button
            className={`border-text hover:bg-text hover:text-background border px-2 leading-tight uppercase backdrop-blur-xl transition-colors duration-500 ${selectedFilter === "fav" ? "bg-text text-background" : "bg-text/10"}`}
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
    );
  }
}
