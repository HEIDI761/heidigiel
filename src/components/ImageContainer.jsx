import useLightbox from "../hooks/useLightbox.js";
import useIsMobile from "../hooks/useIsMobile.jsx";

export default function ImageContainer({ image, item, imgSize, className }) {
  const isMobile = useIsMobile();

  const { openLightbox } = useLightbox();
  if (!image.url) return null;

  return (
    <div
      className="h-full w-full overflow-hidden"
      onClick={() => {
        if (!isMobile) openLightbox(image, item);
      }}
      style={{
        backgroundImage: `url(${image.url}?h=10&blur=30&fm=webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: `${image.dimensions.aspectRatio}/1`,
      }}
    >
      <img
        src={image.url + (imgSize || "?fm=webp&h=800")}
        alt={item ? item.title.es : ""}
        className={`h-full w-full cursor-zoom-in object-cover transition-transform duration-500 ${className}`}
        loading="lazy"
      />
    </div>
  );
}
