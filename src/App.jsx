import LanguageSwitcher from "./components/LanguageSwitcher";
import { useAbout } from "./sanity/hooks/getData";
import useLanguage from "./hooks/useLanguage";

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <header className="fixed top-4 right-4 z-10">
        <LanguageSwitcher />
      </header>
      {data?.homeImage && (
        <img
          className="absolute top-0 left-0 h-screen w-screen object-cover"
          src={data.homeImage.url + "?fm=webp"}
          alt="background"
        />
      )}
      <h1 className="animate-pulse text-4xl">𝒲ℯ𝓁𝒸ℴ𝓂ℯ 𝓉ℴ ℋℯ𝒾𝒹𝒾'𝓈 𝓌ℯ𝒷𝓈𝒾𝓉ℯ</h1>
      {data?.highlight && (
        <div className="absolute right-0 bottom-0 left-0 m-4 rounded-lg p-4 text-center shadow-lg">
          <p className="text-xl">
            {data.highlight.title[language] || data.highlight.title.es}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
