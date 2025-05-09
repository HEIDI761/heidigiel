import LanguageSwitcher from "./components/LanguageSwitcher";
import { useAbout } from "./sanity/hooks/getData";
import useLanguage from "./hooks/useLanguage";
import { Routes, Route, NavLink } from "react-router";
import About from "./pages/About";
import Audiovisual from "./pages/Audiovisual";
import Music from "./pages/Music";

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();

  if (isLoading) return <div>...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <header className="fixed top-4 z-10 flex w-full items-center justify-between p-4 shadow-lg">
        <nav className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg p-2 ${isActive ? "bg-black" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-lg p-2 ${isActive ? "bg-black" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/audiovisual"
            className={({ isActive }) =>
              `rounded-lg p-2 ${isActive ? "bg-black" : ""}`
            }
          >
            Audiovisual
          </NavLink>
          <NavLink
            to="/music"
            className={({ isActive }) =>
              `rounded-lg p-2 ${isActive ? "bg-black" : ""}`
            }
          >
            Music
          </NavLink>
        </nav>
        <LanguageSwitcher />
      </header>
      {data?.homeImage && (
        <div>
          <img
            className="absolute top-0 left-0 -z-10 h-screen w-screen object-cover"
            src={data.homeImage.url + "?fm=webp"}
            alt="background"
          />
        </div>
      )}
      <h1 className="animate-pulse text-4xl">𝒲ℯ𝓁𝒸ℴ𝓂ℯ 𝓉ℴ ℋℯ𝒾𝒹𝒾'𝓈 𝓌ℯ𝒷𝓈𝒾𝓉ℯ</h1>
      {data?.highlight && (
        <div className="absolute right-0 bottom-0 left-0 m-4 rounded-lg p-4 text-center shadow-lg">
          <p className="text-xl">
            {data.highlight.title[language] || data.highlight.title.es}
          </p>
        </div>
      )}
      <Routes>
        <Route path="/" element={null} />
        <Route path="/about" element={<About />} />
        <Route path="/audiovisual" element={<Audiovisual />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </div>
  );
}

export default App;
