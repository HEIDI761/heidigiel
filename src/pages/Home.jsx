export default function Home({ image }) {
  return (
    <div className="fixed inset-0 z-0 flex h-screen w-screen items-center justify-center mix-blend-multiply">
      <img
        className="-z-10 h-1/3 w-auto rounded-full"
        src={image + "?fm=webp"}
        alt="background"
      />
    </div>
  );
}
