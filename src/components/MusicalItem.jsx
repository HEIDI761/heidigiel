import { useState } from "react";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import VimeoPlayer from "./VimeoPlayer";
import Tag from "./Tag";
import ImageContainer from "./ImageContainer";
import TextContainer from "./TextContainer";

export default function MusicalItem({ item }) {
  const { language } = useLanguage();
  const [isDescriptionOpen, setDescriptionIsOpen] = useState(false);

  return (
    <div key={item._id} className="flex flex-col gap-16 pb-4">
      <div className="relative mx-auto flex max-w-3xl items-end gap-2">
        <div className="flex rotate-180 flex-col gap-2 [writing-mode:vertical-rl]">
          <h2 className="bg-background max-h-[600px] border px-2 font-serif text-2xl">
            {item.title[language] || item.title.es}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Tag tag={item.type.type} key={item.type._id} clickabe={false} />
            <p className="italic">{item.date.slice(0, 4)}</p>
          </div>
        </div>
        <div className="self-center">
          <ImageContainer image={item.coverImage} item={item} />
        </div>
        {item.description && (
          <button
            className="bg-background -mt-4 size-8 shrink-0 cursor-pointer self-start rounded-full border text-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-12"
            onClick={() => setDescriptionIsOpen(!isDescriptionOpen)}
          >
            {isDescriptionOpen ? "-" : "+"}
          </button>
        )}{" "}
        {item.description && isDescriptionOpen && (
          <TextContainer
            className="absolute top-0 right-0 z-10 my-8 max-h-3/4 max-w-lg overflow-y-auto text-xs"
            variant="2"
          >
            <PortableText
              value={item.description[language] || item.description.es}
            />
          </TextContainer>
        )}
      </div>
      {item.images && (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {item.images.map((image) => (
            <div key={image._key} className="max-w-sm">
              <ImageContainer image={image} item={item} />
            </div>
          ))}
        </div>
      )}
      {item.vimeoVideos && (
        <div className="flex flex-col items-center justify-center gap-2">
          {item.vimeoVideos.map((video, index) => (
            <div key={index} className="w-full max-w-4xl">
              <VimeoPlayer url={video} />
            </div>
          ))}
        </div>
      )}
      {(item.customFields || item.links) && (
        <div className="bg-background flex -rotate-2 flex-col gap-8 self-center rounded-md p-4">
          {item.customFields && (
            <div className="text-muted-text flex flex-col">
              {item.customFields.map((field) => (
                <div key={field._key} className="flex items-center gap-2">
                  <span className="text-muted-text text-xs uppercase">
                    {field.name[language] || field.name.es}:{" "}
                  </span>
                  <span className="italic">
                    {field.value[language] || field.value.es}
                  </span>
                </div>
              ))}
            </div>
          )}
          {item.customFields && item.links && <hr />}
          {item.links && (
            <div className="flex flex-col">
              <p className="text-muted-text text-xs italic">LINKS</p>
              {item.links.map((link) => (
                <a
                  key={link._key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:underline"
                >
                  {link.title[language] || link.title.es}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
