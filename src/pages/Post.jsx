import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import BackButton from "../components/BackButton";
import VimeoPlayer from "../components/VimeoPlayer";
import ImageContainer from "../components/ImageContainer";
import Tag from "../components/Tag";

export default function Post({
  title,
  client,
  types,
  roles,
  date,
  videos,
  shortVideos,
  coverImage,
  description,
  images,
  links,
  //   customFields,
}) {
  const { language } = useLanguage();

  return (
    <div className="bg-background/90 fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 px-4 py-16 backdrop-grayscale-100 md:px-32">
      <div className="w-full">
        <BackButton />
      </div>

      <div className="bg-background border-background-dim shadow-background-dim flex w-full flex-col gap-4 overflow-y-auto border p-4 shadow-md">
        <h1 className="flex flex-wrap items-center gap-1 uppercase">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="var(--color-text)"
          >
            <path d="M104-466v-28h188v28H104Zm232-138-68-68 20-20 68 68-20 20Zm130-64v-188h28v188h-28Zm158 64-20-20 68-68 20 20-68 68Zm44 138v-28h188v28H668Zm-188 54q-29 0-48.5-19.5T412-480q0-29 19.5-48.5T480-548q29 0 48.5 19.5T548-480q0 29-19.5 48.5T480-412Zm192 144-68-68 20-20 68 68-20 20Zm-384 0-20-20 68-68 20 20-68 68Zm178 164v-188h28v188h-28Z" />
          </svg>

          {title[language] || title.es}
          {client && <span className="italic">- {client}</span>}
        </h1>

        <div className="flex flex-wrap items-center gap-1 font-mono text-xs lowercase">
          {types && !types.length ? (
            <Tag
              key={types._id}
              tag={types.type}
              clickabe={false}
              roundness="none"
            />
          ) : (
            types.map((type) => (
              <Tag
                key={type._id}
                tag={type.type}
                clickabe={false}
                roundness="none"
              />
            ))
          )}

          {roles &&
            roles.map((role) => (
              <Tag key={role._id} tag={role.role} clickabe={false} />
            ))}
          <span>{date.slice(0, 4)}</span>
        </div>

        <hr className="border-background-dim" />

        <div className="grid grid-cols-[2fr_1fr] items-start gap-4">
          {description && (
            <div className="flex max-w-prose flex-col gap-4">
              <PortableText value={description[language] || description.es} />
            </div>
          )}

          {links && (
            <ul className="uppercase">
              <p className="text-muted-text text-xs">
                {language === "en" ? "External links" : "Links externos"}
              </p>
              {links.map((link) => (
                <li key={link._key} className="italic hover:underline">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="var(--color-muted-text)"
                    >
                      <path d="M688-316q-65 0-110-41t-54-109H266q-5 27-25.5 46.5T188-400q-33 0-56.5-23.5T108-480q0-33 23.5-56.5T188-560q32 0 52.5 19.5T266-494h258q9-68 54-109t110-41q68 0 116 49t48 117q0 66-48 114t-116 48Zm0-28q56 0 96-40t40-96q0-56-40-96t-96-40q-56 0-96 40t-40 96q0 56 40 96t96 40Z" />
                    </svg>
                    {link.title[language] || link.title.es}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {videos ? (
          videos.lenght ? (
            videos.map((video) => (
              <div key={video} className="w-full">
                <VimeoPlayer url={video} />
              </div>
            ))
          ) : (
            <div key={videos} className="w-full">
              <VimeoPlayer url={videos} />
            </div>
          )
        ) : (
          <div className="border-background mr-auto max-h-5/6 cursor-zoom-in rounded-sm border">
            <ImageContainer image={coverImage} />
          </div>
        )}

        {/* esto hay que hacerlo bien para que esten en background y los puedas desmutear con el sdk? */}
        {shortVideos &&
          shortVideos.map((video) => (
            <div key={video} className="w-full">
              <VimeoPlayer url={video} />
            </div>
          ))}

        {images && (
          <div className="columns-3 gap-2">
            {images.map((image) => (
              <div
                key={image._key}
                className="border-background h-auto w-full cursor-zoom-in rounded-sm border pb-2"
              >
                <ImageContainer image={image} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
