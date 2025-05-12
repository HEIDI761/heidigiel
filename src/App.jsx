import LanguageSwitcher from "./components/LanguageSwitcher";
import { useAbout } from "./sanity/hooks/getData";
import useLanguage from "./hooks/useLanguage";
import { Routes, Route, NavLink } from "react-router";
import Loading from "./components/Loading";
import About from "./pages/About";
import Audiovisual from "./pages/Audiovisual";
import Music from "./pages/Music";

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // console.log(data);

  return (
    <div className="">
      <header className="fixed top-0 z-10 flex w-full items-center justify-between p-4">
        <NavLink
          to="/"
          className={({ isActive }) => `text-3xl ${isActive ? "" : ""}`}
        >
          <h1 className="text-primary hover:text-accent font-serif font-black italic transition-colors">
            Heidi Giel
          </h1>
        </NavLink>

        <div className="flex gap-4">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-primary uppercase transition-colors ${isActive ? "underline" : ""}`
            }
          >
            About
          </NavLink>
          <LanguageSwitcher />
        </div>
      </header>
      {/* {data?.homeImage && (
        <div>
          <img
            className="absolute top-0 left-0 -z-10 h-screen w-screen object-cover"
            src={data.homeImage.url + "?fm=webp"}
            alt="background"
          />
        </div>
      )} */}

      <nav className="fixed bottom-0 left-0 grid w-full grid-cols-[1fr_2px_1fr] items-end font-serif text-6xl">
        <NavLink
          to="/musica"
          className={({ isActive }) =>
            `hover:text-primary px-8 py-4 text-end uppercase transition-colors hover:italic ${isActive ? "italic" : ""}`
          }
        >
          {language === "es" ? "Música" : "Music"}
        </NavLink>
        <NavLink
          to="/audiovisual"
          className={({ isActive }) =>
            `hover:text-primary px-8 py-4 uppercase transition-colors hover:italic ${isActive ? "italic" : ""}`
          }
        >
          {language === "es" ? "Audiovisual" : "Audiovisual"}
        </NavLink>
      </nav>

      {data?.highlight && (
        <div className="bg-primary text-background hover:bg-accent fixed right-0 bottom-0 m-8 flex w-min -rotate-8 justify-end rounded-full p-8 text-center font-serif text-xl italic transition-colors hover:rotate-3">
          {data.highlight.title[language] || data.highlight.title.es}
        </div>
      )}
      <div className="h-screen px-4 py-16">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/about" element={<About />} />
          <Route path="/audiovisual" element={<Audiovisual />} />
          <Route path="/musica" element={<Music />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
