import { useAudiovisualFilters } from "../sanity/hooks/getData";
import Loading from "../components/Loading";

export default function Audiovisual() {
  const { data: filters, isLoading } = useAudiovisualFilters();

  if (isLoading) return <Loading />;

  return (
    <div>
      {filters.roles && (
        <div className="flex gap-4">
          {filters.roles.map((role) => (
            <div key={role._id}>{role.role.es}</div>
          ))}
        </div>
      )}
      {filters.audiovisualProjectTypes && (
        <div className="flex gap-4">
          {filters.audiovisualProjectTypes.map((type) => (
            <div key={type._id}>{type.type.es}</div>
          ))}
        </div>
      )}
    </div>
  );
}
