import { useState } from "react";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import VimeoPlayer from "./VimeoPlayer";

export default function MusicalItem({ item }) {
  const { language } = useLanguage();
  const [isDescriptionOpen, setDescriptionIsOpen] = useState(false);

  return (
    <div key={item._id} className="flex flex-col gap-2 pb-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="self-start rounded-full border px-2 text-xs">
          {item.type.type[language] || item.type.type.es}
        </div>
        <p className="text-xs italic">{item.date.slice(0, 4)}</p>
      </div>
      <h2 className="font-serif text-2xl">
        {item.title[language] || item.title.es}
      </h2>
      <img
        className="rounded-sm"
        src={item.coverImage.url + "?fm=webp&h=400"}
        alt={item.title}
      />
      {item.images && (
        <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
          {item.images.map((image) => (
            <img
              key={image._key}
              src={image.url + "?fm=webp&h=400"}
              alt={item.title.es}
              className="rounded-sm"
            />
          ))}
        </div>
      )}
      {item.vimeoVideos && (
        <div className="flex flex-col gap-2">
          {item.vimeoVideos.map((video, index) => (
            <div key={index}>
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
        <div className="flex flex-col gap-2">
          {item.links.map((link) => (
            <a
              key={link._key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title[language] || link.title.es}
            </a>
          ))}
        </div>
      )}
      {item.description && (
        <button
          className="bg-tertiary hover:bg-accent text-background size-10 cursor-pointer rounded-full text-2xl"
          onClick={() => setDescriptionIsOpen(!isDescriptionOpen)}
        >
          {isDescriptionOpen ? "-" : "+"}
        </button>
      )}{" "}
      {item.description && isDescriptionOpen && (
        <PortableText
          value={item.description[language] || item.description.es}
        />
      )}
    </div>
  );
}
