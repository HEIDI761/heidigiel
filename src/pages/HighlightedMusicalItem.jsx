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
    <div className="from-background fixed inset-0 flex h-screen w-full items-center justify-center bg-radial/oklab from-0% to-transparent to-70% bg-fixed">
      <div className="bg-background max-h-3/4 max-w-2xl overflow-y-auto border p-4 pt-6">
        <MusicalItem item={data} />
      </div>
    </div>
  );
}
