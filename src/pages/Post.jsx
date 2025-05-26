import { PortableText } from "@portabletext/react";
import useLanguage from "../hooks/useLanguage";
import BackButton from "../components/BackButton";
import VimeoPlayer from "../components/VimeoPlayer";
import ImageContainer from "../components/ImageContainer";
import Tag from "../components/Tag";
import PlayEmbedButton from "../components/PlayEmbedButton";
import { useNavigate } from "react-router";

export default function Post({
  section,
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
  musicEmbed,
  //   customFields,
}) {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const imgSize = {
    sm: "?h=600&f=webp",
    md: "?h=1000&f=webp",
  };

  return (
    <div
      onClick={() => navigate("..")}
      className="no-doc-scroll bg-background/90 fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 px-4 py-16 backdrop-grayscale-100 md:px-32"
    >
      <div className="w-full">
        <BackButton onClick={navigate("..")} />
      </div>

      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-background border-background-dim shadow-background-dim flex w-full flex-col gap-4 overflow-y-auto border p-4 shadow-md"
      >
        <div className="flex items-center gap-2">
          {musicEmbed && (
            <div className="px-2">
              <PlayEmbedButton embed={musicEmbed} />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h1 className="flex flex-wrap items-center gap-1 uppercase">
              {section === "music" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="var(--color-text)"
                >
                  <path d="M104-466v-28h188v28H104Zm232-138-68-68 20-20 68 68-20 20Zm130-64v-188h28v188h-28Zm158 64-20-20 68-68 20 20-68 68Zm44 138v-28h188v28H668Zm-188 54q-29 0-48.5-19.5T412-480q0-29 19.5-48.5T480-548q29 0 48.5 19.5T548-480q0 29-19.5 48.5T480-412Zm192 144-68-68 20-20 68 68-20 20Zm-384 0-20-20 68-68 20 20-68 68Zm178 164v-188h28v188h-28Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="var(--color-text)"
                >
                  <path d="M257-150q-45 0-76-31t-31-76q0-45 31-76t76-31q45 0 76 31t31 76q0 19.56-7 37.78Q350-201 337-187v-7q33 17 69 25.5t74 8.5q134 0 227-93t93-227h28q0 72-27.41 135.56-27.4 63.56-74.38 110.57-46.98 47.02-110.49 74.44Q552.21-132 480-132q-41.91 0-81.95-9.5Q358-151 320-171q-14 11-30.18 16T257-150Zm.06-28Q290-178 313-201.06t23-56Q336-290 312.94-313t-56-23Q224-336 201-312.94t-23 56Q178-224 201.06-201t56 23ZM480-373q-45 0-76-31t-31-76q0-45 31-76t76-31q45 0 76 31t31 76q0 45-31 76t-76 31ZM132-480q0-72 27.4-135.56 27.41-63.56 74.39-110.57 46.98-47.02 110.49-74.44Q407.79-828 480-828q41.91 0 81.95 9.5Q602-809 640-789q14.43-10 30.22-15 15.78-5 32.78-5 45 0 75.5 30.5T809-703q0 45-30.5 76T703-596q-45 0-76-31t-31-76q0-19.56 7-37.78Q610-759 623-773v7q-33-17-69-25.5t-74-8.5q-134 0-227 93t-93 227h-28Zm571-144q32.5 0 55.25-23.5T781-703q0-32-22.75-55T703-781q-32 0-55.5 22.85-23.5 22.86-23.5 55.5Q624-670 647.04-647T703-624ZM257-257Zm446-446Z" />
                </svg>
              )}
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
          </div>
        </div>

        <hr className="border-background-dim" />

        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <div className="border-background-dim mr-auto max-h-5/6 cursor-zoom-in border">
            <ImageContainer image={coverImage} imgSize={imgSize.md} />
          </div>

          <div className="flex w-full flex-col gap-4">
            {description && (
              <div className="flex w-full max-w-prose flex-col gap-4">
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
        </div>

        <hr className="border-background-dim" />

        {videos &&
          (Array.isArray(videos) ? (
            videos.map((video) => (
              <div key={video} className="w-full">
                <VimeoPlayer url={video} />
              </div>
            ))
          ) : (
            <div key={videos} className="w-full">
              <VimeoPlayer url={videos} />
            </div>
          ))}

        {shortVideos && (
          <div className="columns-2 gap-2">
            {shortVideos.map((video) => (
              <div
                key={video}
                className="bg-background-dim border-background-dim mb-2 overflow-hidden rounded-lg border"
              >
                <VimeoPlayer
                  url={video}
                  shortVideo={true}
                  background={1}
                  loop={1}
                  autoplay={1}
                />
              </div>
            ))}
          </div>
        )}

        {images && (
          <div className="columns-3 gap-2">
            {images.map(
              (image) =>
                image.url && (
                  <div
                    key={image._key}
                    className="border-background-dim mb-2 h-auto w-full cursor-zoom-in overflow-hidden rounded-sm border"
                  >
                    <ImageContainer image={image} imgSize={imgSize.md} />
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
