import { useAudiovisualProject } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import VimeoPlayer from "../components/VimeoPlayer";
import Tag from "../components/Tag";
import Lightbox from "../components/Lightbox";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function AudiovisualProject() {
  const { slug } = useParams();
  const { data, isLoading, error } = useAudiovisualProject(slug);
  const { language } = useLanguage();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const isMobile = useIsMobile();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            key="lightbox"
            currentImage={currentImage}
            setIsLightboxOpen={setIsLightboxOpen}
          />
        )}
      </AnimatePresence>
      <div className="pt-16">
        <div>
          <h1 className="text-center font-serif text-6xl">
            {data.title[language] || data.title.es} -{" "}
            <span className="italic">{data.client}</span>
          </h1>
          {/* {data.roles && (
          <ul className="flex flex-wrap text-xs">
            {data.roles.map((role) => (
              <Tag key={role._id} tag={role.role} clickabe={false} />
            ))}
          </ul>
        )} */}
          {data.audiovisualProjectType && (
            <ul className="flex flex-wrap justify-center pt-4 text-xs lowercase">
              {data.audiovisualProjectType.map((type) => (
                <Tag
                  key={type._id}
                  tag={type.type}
                  clickabe={false}
                  roundness="sm"
                />
              ))}
            </ul>
          )}
          {data.date && (
            <p className="pt-2 text-center text-xs italic">
              {new Date(data.date).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-6 place-items-center gap-8 pt-16">
          {data.video ? (
            <div className="col-span-6 mx-auto w-full max-w-7xl pb-16">
              <VimeoPlayer url={data.video} />
            </div>
          ) : (
            <img
              src={data.coverImage.url + "?fm=webp&h=600"}
              alt=""
              className="border-background col-span-3 h-auto cursor-zoom-in rounded-sm border"
              onClick={() => {
                if (!isMobile) {
                  setCurrentImage(data.coverImage.url + "?fm=webp");
                  setIsLightboxOpen(true);
                }
              }}
            />
          )}

          {data.description && (
            <div className="col-span-3 max-w-prose">
              <PortableText
                value={data.description[language] || data.description.es}
              />
            </div>
          )}

          {
            data.images &&
              // (<div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
              data.images.map((image) => (
                <img
                  onClick={() => {
                    if (!isMobile) {
                      setCurrentImage(image.url + "?fm=webp");
                      setIsLightboxOpen(true);
                    }
                  }}
                  key={image._key}
                  src={image.url + "?fm=webp&h=600"}
                  alt=""
                  className="border-background h-auto w-full cursor-zoom-in rounded-sm border"
                />
              ))
            // </div>)
          }
          {data.links && (
            <ul className="bg-background col-span-2 col-start-5 w-full rounded-sm p-4">
              <p className="text-muted-text text-xs">LINKS EXTERNOS</p>
              {data.links.map((link) => (
                <li key={link._key} className="hover:underline">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title[language] || link.title.es}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
