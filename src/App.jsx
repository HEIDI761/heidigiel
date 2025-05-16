import { Routes, Route, useNavigate } from "react-router";
import { useAbout } from "./sanity/hooks/getData";
import useLanguage from "./hooks/useLanguage";
import About from "./pages/About";
import Audiovisual from "./pages/Audiovisual";
import Music from "./pages/Music";
import AudiovisualProject from "./pages/AudiovisualProject";
import MusicalProject from "./pages/MusicalProject";
import Loading from "./components/Loading";
import CursorDecoration from "./components/CursorDecoration";
import Menu from "./components/Menu";
import HighlightedMusicalItem from "./pages/HighlightedMusicalItem";
import Home from "./pages/Home";

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleHighlightClick = (highlight) => {
    if (highlight._type === "audiovisualProject") {
      navigate(`/audiovisual/${highlight.slug}`);
    } else if (highlight._type === "musicalProject") {
      navigate(`/musica/${highlight.slug}`);
    } else if (highlight._type === "musicalItem") {
      navigate(`/${highlight.slug}`);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="via-primary/20 to-secondary/40 min-h-screen bg-radial/oklab from-transparent from-40% via-70% bg-fixed">
      <div className="fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center">
        <div className="via-background to-secondary absolute h-full w-full bg-radial/oklab from-transparent from-40% via-70% bg-fixed"></div>
        <img
          className="-z-10 h-full w-full object-cover"
          src={data?.homeImage?.url + "?fm=webp"}
          alt="background"
        />
      </div>
      <CursorDecoration />

      <Menu />

      {data?.highlight && (
        <button
          onClick={() => handleHighlightClick(data.highlight)}
          className="bg-primary text-background hover:bg-accent fixed right-0 bottom-0 z-50 m-8 flex w-min -rotate-8 cursor-pointer justify-end rounded-full p-8 text-center font-serif text-xl italic transition-all duration-300 hover:scale-105 hover:rotate-3"
        >
          {data.highlight.title[language] || data.highlight.title.es}
        </button>
      )}

      <div className="px-8 pt-32 pb-36">
        <Routes>
          {/* <Route path="/" element={<Home image={data?.homeImage?.url} />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/audiovisual" element={<Audiovisual />} />
          <Route path="/audiovisual/:slug" element={<AudiovisualProject />} />
          <Route path="/musica" element={<Music />} />
          <Route path="/musica/:slug" element={<MusicalProject />} />
          <Route path="/:slug" element={<HighlightedMusicalItem />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
