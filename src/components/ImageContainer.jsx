import useLightbox from "../hooks/useLightbox.js";
import useIsMobile from "../hooks/useIsMobile.jsx";

export default function ImageContainer({ image, item }) {
  const isMobile = useIsMobile();

  const { openLightbox } = useLightbox();
  if (!image.url) return null;

  return (
    <div
      className="border-background drop-shadow-background overflow-hidden rounded-sm border drop-shadow-xl"
      onClick={() => {
        if (!isMobile) openLightbox(image);
      }}
      style={{
        backgroundImage: `url(${image.url}?h=10&blur=30&fm=webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: `${image.dimensions.aspectRatio}/1`,
      }}
    >
      <img
        src={image.url + "?fm=webp&h=800"}
        alt={item ? item.title.es : ""}
        className="h-auto w-full cursor-zoom-in"
      />
    </div>
  );
}
