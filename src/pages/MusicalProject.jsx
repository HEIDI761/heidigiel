import { useMusicalItems, useMusicalProject } from "../sanity/hooks/getData";
import useLanguage from "../hooks/useLanguage";
import Loading from "../components/Loading";
import { useParams } from "react-router";
import MusicalItem from "../components/MusicalItem";
import { PortableText } from "@portabletext/react";

export default function MusicalProject() {
  const { slug } = useParams();
  const {
    data: project,
    isLoading: projectLoading,
    error: projectError,
  } = useMusicalProject(slug);
  const {
    data: items,
    isLoading: itemsLoading,
    error: itemsError,
  } = useMusicalItems(slug);
  const { language } = useLanguage();
  if (itemsLoading || projectLoading) return <Loading />;
  if (itemsError || projectError) return <div>Error: {itemsError.message}</div>;

  return (
    <div>
      <h1 className="pb-4 text-center font-serif text-4xl">
        {project.title[language] || project.title.es}
      </h1>
      {project.description && (
        <div className="mx-auto max-w-prose">
          <PortableText
            value={project.description[language] || project.description.es}
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <MusicalItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
