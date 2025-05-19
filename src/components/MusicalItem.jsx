import { useState } from "react";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import VimeoPlayer from "./VimeoPlayer";
import Tag from "./Tag";
import Lightbox from "../components/Lightbox";
import { AnimatePresence } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

export default function MusicalItem({ item }) {
  const { language } = useLanguage();
  const [isDescriptionOpen, setDescriptionIsOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const isMobile = useIsMobile();

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
      <div key={item._id} className="flex flex-col gap-16 pb-4">
        <div className="relative mx-auto flex max-h-[400px] items-end gap-2">
          <div className="flex rotate-180 flex-col gap-2 [writing-mode:vertical-rl]">
            <h2 className="bg-background/50 rounded-sm border px-2 font-serif text-2xl">
              {item.title[language] || item.title.es}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Tag tag={item.type.type} key={item.type._id} clickabe={false} />
              <p className="italic">{item.date.slice(0, 4)}</p>
            </div>
          </div>
          <div className="self-center">
            <img
              onClick={() => {
                if (!isMobile) {
                  setCurrentImage(item.coverImage.url + "?fm=webp");
                  setIsLightboxOpen(true);
                }
              }}
              className="border-background cursor-zoom-in rounded-sm border"
              src={item.coverImage.url + "?fm=webp&h=800"}
              alt={item.title}
            />
          </div>
          {item.description && (
            <button
              className="bg-tertiary hover:bg-accent -mt-4 size-10 shrink-0 cursor-pointer self-start rounded-full text-2xl text-white"
              onClick={() => setDescriptionIsOpen(!isDescriptionOpen)}
            >
              {isDescriptionOpen ? "-" : "+"}
            </button>
          )}{" "}
          {item.description && isDescriptionOpen && (
            <div className="border-tertiary bg-background absolute top-0 right-0 z-10 my-8 max-h-3/4 max-w-lg overflow-y-auto rounded-lg border-2 p-4 pt-6 text-xs shadow-md">
              <PortableText
                value={item.description[language] || item.description.es}
              />
            </div>
          )}
        </div>
        {item.images && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {item.images.map((image) => (
              <img
                onClick={() => {
                  if (!isMobile) {
                    setCurrentImage(image.url + "?fm=webp");
                    setIsLightboxOpen(true);
                  }
                }}
                key={image._key}
                src={image.url + "?fm=webp&h=800"}
                alt={item.title.es}
                className="border-background max-w-[300px] cursor-zoom-in rounded-sm border"
              />
            ))}
          </div>
          // <ImageGallery imageArray={item.images} />
        )}
        {item.vimeoVideos && (
          <div className="flex flex-col items-center justify-center gap-2">
            {item.vimeoVideos.map((video, index) => (
              <div
                key={index}
                className="w-full max-w-4xl overflow-hidden rounded-sm"
              >
                <VimeoPlayer url={video} />
              </div>
            ))}
          </div>
        )}
        {item.customFields && (
          <div className="text-muted-text flex flex-col">
            {item.customFields.map((field) => (
              <div key={field._key} className="flex items-center gap-2">
                <span className="text-xs uppercase">
                  {field.name[language] || field.name.es}:{" "}
                </span>
                <span className="italic">
                  {field.value[language] || field.value.es}
                </span>
              </div>
            ))}
          </div>
        )}
        {item.links && (
          <div className="bg-secondary border-tertiary flex -rotate-5 flex-col gap-2 self-center rounded-lg border-2 p-4 text-xs text-white">
            {item.links.map((link) => (
              <a
                key={link._key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.title[language] || link.title.es}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
