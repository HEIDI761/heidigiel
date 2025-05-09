import { useAudiovisualFilters } from "../sanity/hooks/getData";
import Loading from "../components/Loading";

export default function Audiovisual() {
  const { data: filters, isLoading } = useAudiovisualFilters();

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col gap-2 lowercase">
      {filters.roles && (
        <div className="flex flex-wrap">
          {filters.roles.map((role) => (
            <div
              className="bg-secondary text-background border-primary rounded-full border px-2"
              key={role._id}
            >
              {role.role.es}
            </div>
          ))}
        </div>
      )}
      {filters.audiovisualProjectTypes && (
        <div className="flex flex-wrap">
          {filters.audiovisualProjectTypes.map((type) => (
            <div
              className="bg-accent text-background border-primary rounded-full border px-2"
              key={type._id}
            >
              {type.type.es}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
