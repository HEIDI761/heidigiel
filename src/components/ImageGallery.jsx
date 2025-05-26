import ImageContainer from "./ImageContainer";
import BackButton from "./BackButton";

export default function ImageGallery({ data, closeGallery }) {
  const imgSize = {
    sm: "?h=600&f=webp",
    md: "?h=1000&f=webp",
  };

  return (
    <div
      onClick={closeGallery}
      className="no-doc-scroll bg-background/90 fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-4 px-4 py-16 backdrop-grayscale-100 md:px-32"
    >
      <div className="w-full">
        <BackButton />
      </div>

      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-background border-background-dim shadow-background-dim overflow-y-auto border p-4 shadow-md"
      >
        <div className="columns-3 gap-2">
          {data.coverImage && (
            <div
              key={data.coverImage._key}
              className="border-background mb-2 h-auto w-full overflow-hidden rounded-sm border"
            >
              <ImageContainer image={data.coverImage} imgSize={imgSize.md} />
            </div>
          )}

          {data.images.map((image) => (
            <div
              key={image._key}
              className="border-background-dim mb-2 h-auto w-full overflow-hidden rounded-sm border"
            >
              <ImageContainer image={image} imgSize={imgSize.md} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
