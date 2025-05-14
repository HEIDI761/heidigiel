import { useHighlightedMusicalItem } from "../sanity/hooks/getData";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import MusicalItem from "../components/MusicalItem";

export default function HighlightedMusicalItem() {
  const { slug } = useParams();
  const { data, isLoading, error } = useHighlightedMusicalItem(slug);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <MusicalItem item={data} />
    </>
  );
}
