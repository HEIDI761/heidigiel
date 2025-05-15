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

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleHighlightClick = (highlight) => {
    console.log(highlight);
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
    <div>
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

      <div className="px-16 pt-32 pb-36">
        <Routes>
          <Route path="/" element={null} />
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

{
  /* {data?.homeImage && (
  <div>
    <img
      className="absolute top-0 left-0 -z-10 h-screen w-screen object-cover"
      src={data.homeImage.url + "?fm=webp"}
      alt="background"
    />
  </div>
)} */
}
