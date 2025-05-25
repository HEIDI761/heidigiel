export default function ImageGallery({ data, closeGallery }) {
  console.log("data", data);
  return (
    <div
      onClick={() => {
        closeGallery();
      }}
      className="fixed inset-0 z-200 grid h-full w-full grid-cols-3 items-center justify-center"
    >
      {data.coverImage && (
        <img
          src={data.coverImage.url + "?fm=webp&h=800"}
          alt=""
          className="h-full w-full object-cover"
        />
      )}
      {data.images.map((image) => (
        <img
          key={image._key}
          src={image.url + "?fm=webp&h=800"}
          alt=""
          className="h-full w-full object-cover"
        />
      ))}
    </div>
  );
}
