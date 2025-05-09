import { useAbout } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";

export default function About() {
  const { data } = useAbout();
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      {data?.bio && (
        <div className="flex max-w-prose flex-col gap-2">
          <PortableText value={data.bio[language] || data.bio.es} />
        </div>
      )}
      <div className="flex flex-col text-center font-serif uppercase">
        {data?.contact?.email && (
          <a href={`mailto:${data?.contact.email}`}>{data.contact.email}</a>
        )}
        {data?.contact?.phone && <div>{data.contact.phone}</div>}
        {data?.contact?.instagram && (
          <a href={data.contact.instagram}>instagram</a>
        )}
        {data?.contact?.spotify && <a href={data.contact.spotify}>spotify</a>}
        {data?.contact?.links &&
          data.contact.links.map((link) => (
            <div key={link._key}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title[language] || link.title.es}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
