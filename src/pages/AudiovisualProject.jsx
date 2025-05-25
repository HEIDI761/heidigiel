import { useParams } from "react-router";
import { useAudiovisualContent } from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import Post from "./Post";

export default function AudiovisualProject() {
  const { slug } = useParams();
  const { data, isLoading, error } = useAudiovisualContent();

  if (isLoading) return <Loading />;

  const project = data.content.find(
    (p) => p.project?.slug?.current === slug,
  ).project;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Post
      section="audiovisual"
      title={project.title}
      client={project.client}
      types={project.audiovisualProjectType}
      roles={project.roles}
      date={project.date}
      videos={project.video}
      coverImage={project.coverImage}
      description={project.description}
      images={project.images}
      links={project.links}
      // customFields={musicalItem.item.customFields}
    />
  );
}
