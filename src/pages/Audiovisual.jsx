import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useAudiovisualContent } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import Loading from "../components/Loading";
import VimeoPlayer from "../components/VimeoPlayer";
import ImageContainer from "../components/ImageContainer";
import ImageGallery from "../components/ImageGallery";
import Tag from "../components/Tag";
import useIsMobile from "../hooks/useIsMobile";

export default function Audiovisual() {
  const { data, isLoading, error } = useAudiovisualContent();
  const [filters, setFilters] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  // const [display, setDisplay] = useState("grid");
  const [hovered, setHovered] = useState(null);
  const [imageGalleryData, setImageGalleryData] = useState(null);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const imgSize = {
    sm: "?h=600&f=webp",
    md: "?h=1000&f=webp",
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

  const openImageGallery = ({ data }) => {
    setImageGalleryData(data);
    setIsImageGalleryOpen(true);
  };

  function checkMatchesFilter(element) {
    return (
      !selectedFilter ||
      element.project.audiovisualProjectType?.some(
        (t) => t.type === selectedFilter.type,
      ) ||
      (element.project.isFavorite && selectedFilter === "fav")
    );
  }

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 pb-24 md:gap-8">
      {isImageGalleryOpen && (
        <ImageGallery
          data={imageGalleryData}
          closeGallery={() => setIsImageGalleryOpen(false)}
        />
      )}
      <div className="from-background/80 fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />

      <Filters />

      <div className="grid grid-flow-dense auto-rows-[100px] grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 md:auto-rows-[250px] md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {data.content.flatMap((element) => {
          if (element._type === "audiovisualProject" && element.project) {
            const matchesFilter = checkMatchesFilter(element);
            if (!matchesFilter) return [];

            if (!element.project.isImageGallery) {
              const coverImage = element.project.coverImage?.url
                ? [
                    <div
                      onMouseEnter={() => {
                        !isMobile && setHovered(element.project._id);
                      }}
                      onMouseLeave={() => {
                        !isMobile && setHovered(null);
                      }}
                      key={`${element._key}-cover`}
                      className={`group relative cursor-pointer overflow-hidden ${element.project.isFavorite ? (element.project.coverImage.dimensions.height > element.project.coverImage.dimensions.width ? "row-span-2" : "col-span-2") : ""}`}
                    >
                      <NavLink
                        to={`/audiovisual/${element.project.slug?.current}`}
                        className={`border-background-dim absolute h-full w-full overflow-hidden border shadow-md transition-all duration-500 ${element.project.isImageGallery ? "rounded-lg" : ""} ${hovered === element.project._id ? "rounded-[50%]" : hovered === null ? "" : "contrast-50 grayscale-100"}`}
                      >
                        {element.project.previewUrl ? (
                          <div
                            style={{
                              backgroundImage: `url("${element.project.coverImage.url}?fm=webp&h=800")`,
                            }}
                            className="relative h-full w-full rounded-sm bg-cover bg-center"
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
                            className="group-hover:scale-105"
                            imgSize={
                              element.project.isFavorite
                                ? imgSize.md
                                : imgSize.sm
                            }
                          />
                        )}
                        {!element.project.isImageGallery && (
                          <div
                            className={`absolute inset-0 z-10 flex items-center justify-center p-4 text-center uppercase opacity-0 mix-blend-difference transition-opacity duration-500 ${hovered === element.project._id ? "opacity-100" : ""}`}
                          >
                            {element.project.title.es}
                          </div>
                        )}
                      </NavLink>
                    </div>,
                  ]
                : [];

              const projectImages =
                element.project.images?.map(
                  (img, index) =>
                    element.project.isFavorite &&
                    index < 4 && (
                      <div
                        onMouseEnter={() => {
                          !isMobile && setHovered(element.project._id);
                        }}
                        onMouseLeave={() => {
                          !isMobile && setHovered(null);
                        }}
                        key={img._key}
                        className={`border-background-dim overflow-hidden border transition-all duration-500 ${hovered === element.project._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
                      >
                        <ImageContainer
                          image={img}
                          item={element.project}
                          className="hover:scale-105"
                          imgSize={imgSize.sm}
                        />
                      </div>
                    ),
                ) || [];

              return [...coverImage, ...projectImages].filter(Boolean);
            } else {
              const coverImage = element.project.coverImage?.url
                ? [
                    <div
                      onMouseEnter={() => {
                        !isMobile && setHovered(element.project._id);
                      }}
                      onMouseLeave={() => {
                        !isMobile && setHovered(null);
                      }}
                      key={`${element._key}-cover`}
                      onClick={() =>
                        openImageGallery({ data: element.project })
                      }
                      className={`group border-background-dim relative cursor-pointer overflow-hidden border shadow-md transition-all duration-500 ${element.project.isFavorite ? (element.project.coverImage.dimensions.height > element.project.coverImage.dimensions.width ? "row-span-2" : "col-span-2") : ""} ${hovered === element.project._id ? "rounded-[50%]" : hovered === null ? "" : "contrast-50 grayscale-100"}`}
                    >
                      <div
                        className="h-full w-full overflow-hidden"
                        style={{
                          backgroundImage: `url(${element.project.coverImage.url}?h=10&blur=30&fm=webp)`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          aspectRatio: `${element.project.coverImage.dimensions.aspectRatio}/1`,
                        }}
                      >
                        <img
                          src={
                            element.project.coverImage.url +
                            (element.project.isFavorite
                              ? imgSize.md
                              : imgSize.sm)
                          }
                          className="h-full w-full cursor-zoom-in object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>,
                  ]
                : [];

              const projectImages =
                element.project.images?.map(
                  (img, index) =>
                    element.project.isFavorite &&
                    index < 4 && (
                      <div
                        onMouseEnter={() => {
                          !isMobile && setHovered(element.project._id);
                        }}
                        onMouseLeave={() => {
                          !isMobile && setHovered(null);
                        }}
                        onClick={() =>
                          openImageGallery({ data: element.project })
                        }
                        key={img._key}
                        className={`border-background-dim group overflow-hidden border transition-all duration-500 ${hovered === element.project._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
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
                            src={img.url + imgSize.sm}
                            className="goup-hover:scale-105 h-full w-full cursor-zoom-in object-cover transition-transform duration-500"
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
            !selectedFilter
          ) {
            return (
              <div
                key={element._key}
                className={`border-background-dim cursor-zoom-in overflow-hidden border transition-all duration-500 ${hovered === element._id || hovered === null ? "" : "contrast-50 grayscale-100"}`}
              >
                <ImageContainer
                  image={element?.asset}
                  className="hover:scale-105"
                  imgSize={imgSize.sm}
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
      <div className="sticky top-16 z-30 flex flex-wrap items-center justify-end gap-1 self-end font-mono text-base sm:text-xs md:top-24">
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
            {type.type[language] || type.type.es}
          </button>
        ))}
        <button
          className={`border-text hover:bg-text hover:text-background cursor-pointer border px-2 leading-tight uppercase backdrop-blur-xl transition-colors duration-500 ${selectedFilter === "fav" ? "bg-text text-background" : "bg-text/10"}`}
          onClick={() =>
            selectedFilter === "fav"
              ? setSelectedFilter(null)
              : setSelectedFilter("fav")
          }
        >
          fav
        </button>
        <button
          onClick={() => setSelectedFilter(null)}
          className="border-text bg-text/10 size-8 cursor-pointer rounded-full border leading-tight uppercase backdrop-blur-xl sm:size-4"
        >
          x
        </button>
      </div>
    );
  }
}
