import { useParams } from "react-router";
import { useMusicContent } from "../sanity/hooks/getData";
import Loading from "../components/Loading";
import Post from "./Post";

export default function MusicalItem() {
  const { slug } = useParams();
  const { data, isLoading, error } = useMusicContent();

  if (isLoading) return <Loading />;

  const musicalItem = data.content.find(
    (i) => i.item?.slug?.current === slug,
  ).item;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Post
      section="music"
      title={musicalItem.title}
      client={musicalItem.client}
      types={musicalItem.type}
      date={musicalItem.date}
      videos={musicalItem.vimeoVideos}
      shortVideos={musicalItem.vimeoShortVideos}
      coverImage={musicalItem.coverImage}
      description={musicalItem.description}
      images={musicalItem.images}
      links={musicalItem.links}
      musicEmbed={musicalItem.musicEmbed}
      // customFields={musicalItem.customFields}
    />
  );
}
