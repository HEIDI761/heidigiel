import { useAbout } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import TextContainer from "../components/TextContainer";

export default function About() {
  const { data } = useAbout();
  const { language } = useLanguage();

  return (
    <>
      <div className="from-background fixed inset-0 -z-10 h-screen w-full bg-radial from-40% to-transparent to-80% bg-fixed" />

      <div className="bg-background border-tertiary fixed bottom-1/4 left-0 flex flex-col rounded-r-sm border px-4 py-2 font-serif uppercase">
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

      {data?.bio && (
        <TextContainer variant="3">
          <PortableText value={data.bio[language] || data.bio.es} />
        </TextContainer>
      )}
    </>
  );
}
