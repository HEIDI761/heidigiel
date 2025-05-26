export default function Loading() {
  return (
    <div className="bg-background/30 fixed inset-0 z-100 flex h-screen w-screen items-center justify-center">
      <div className="border-text h-12 w-12 animate-spin rounded-full border-2 border-solid border-t-transparent"></div>
    </div>
  );
}
