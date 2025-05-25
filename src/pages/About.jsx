import { useAbout } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import { PortableText } from "@portabletext/react";
import TextContainer from "../components/TextContainer";

export default function About() {
  const { data } = useAbout();
  const { language } = useLanguage();

  return (
    <div className="pb-24">
      <div className="from-background via-secondary/70 fixed inset-0 -z-10 h-screen w-full bg-radial to-transparent bg-fixed mix-blend-overlay" />

      {data?.bio && (
        <div className="mx-auto max-w-prose">
          <PortableText value={data.bio[language] || data.bio.es} />
        </div>
      )}
    </div>
  );
}
