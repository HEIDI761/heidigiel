import { useAudiovisualProject } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import { PortableText } from "@portabletext/react";
import VimeoPlayer from "../components/VimeoPlayer";

export default function AudiovisualProject() {
  const { slug } = useParams();
  const { data, isLoading, error } = useAudiovisualProject(slug);
  const { language } = useLanguage();
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.title[language] || data.title.es}</h1>
      {data.description && (
        <div className="mx-auto max-w-prose">
          <PortableText
            value={data.description[language] || data.description.es}
          />
        </div>
      )}
      {data.video ? (
        <div className="mx-auto max-w-prose">
          <VimeoPlayer url={data.video} />
        </div>
      ) : (
        <img
          src={data.coverImage.url + "?fm=webp&h=600"}
          alt=""
          className="h-auto w-full"
        />
      )}
      {data.images && (
        <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
          {data.images.map((image) => (
            <img
              key={image._key}
              src={image.url + "?fm=webp&h=600"}
              alt=""
              className="h-auto w-full"
            />
          ))}
        </div>
      )}
      {data.links && (
        <div className="mx-auto max-w-prose">
          <h2>Links:</h2>
          <ul>
            {data.links.map((link) => (
              <li key={link._key}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title[language] || link.title.es}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.roles && (
        <div className="mx-auto max-w-prose">
          <h2>Roles:</h2>
          <ul>
            {data.roles.map((role) => (
              <li key={role._id}>{role.role[language] || role.role.es}</li>
            ))}
          </ul>
        </div>
      )}
      {data.audiovisualProjectType && (
        <div className="mx-auto max-w-prose">
          <h2>Tipos de proyecto:</h2>
          <ul>
            {data.audiovisualProjectType.map((type) => (
              <li key={type._id}>{type.type[language] || type.type.es}</li>
            ))}
          </ul>
        </div>
      )}
      {data.client && (
        <div className="mx-auto max-w-prose">
          <h2>Cliente:</h2>
          <p>{data.client}</p>
        </div>
      )}
      {data.date && (
        <div className="mx-auto max-w-prose">
          <h2>Fecha:</h2>
          <p>{new Date(data.date).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
