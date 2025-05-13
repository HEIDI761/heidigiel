import { useState } from "react";
import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";

export default function MusicalItem({ item }) {
  const { language } = useLanguage();
  const [isDescriptionOpen, setDescriptionIsOpen] = useState(false);

  return (
    <div>
      <div key={item._id} className="flex flex-col gap-2 pb-4">
        <p>{item.date}</p>
        <h2>{item.title[language] || item.title.es}</h2>
        <img src={item.coverImage.url + "?fm=webp&h=400"} alt={item.title} />
        {item.images && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {item.images.map((image) => (
              <img
                key={image._key}
                src={image.url + "?fm=webp&h=400"}
                alt={item.title.es}
              />
            ))}
          </div>
        )}
        <div className="border">
          {item.type.type[language] || item.type.type.es}
        </div>
        {item.vimeoVideos && (
          <div className="flex flex-col gap-2">
            {item.vimeoVideos.map((video, index) => (
              <div key={index}>{video}</div>
            ))}
          </div>
        )}
        {item.customFields && (
          <div className="flex flex-col">
            {item.customFields.map((field) => (
              <div key={field._key} className="flex gap-2">
                <span>{field.name[language] || field.name.es}: </span>
                <span>{field.value[language] || field.value.es}</span>
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
            className="cursor-pointer border text-2xl"
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
    </div>
  );
}
