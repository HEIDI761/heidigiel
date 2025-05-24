import { Routes, Route, useNavigate } from "react-router";
import { useAbout } from "./sanity/hooks/getData";
import useLanguage from "./hooks/useLanguage";
import useLightbox from "./hooks/useLightbox";
import About from "./pages/About";
import Audiovisual from "./pages/Audiovisual";
import Music from "./pages/Music";
import AudiovisualProject from "./pages/AudiovisualProject";
// import MusicalProject from "./pages/MusicalProject";
import Loading from "./components/Loading";
import CursorDecorationV2 from "./components/CursorDecorationV2";
import Menu from "./components/Menu";
// import HighlightedMusicalItem from "./pages/HighlightedMusicalItem";
import Ornaments from "./components/Ornaments";
import Lightbox from "./components/Lightbox";
import { AnimatePresence } from "motion/react";

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();
  const { isLightboxOpen } = useLightbox();
  const navigate = useNavigate();

  const handleHighlightClick = (highlight) => {
    if (highlight.highlightRef._type === "audiovisualProject") {
      navigate(`/audiovisual/${highlight.highlightRef.slug}`);
    } else if (highlight._type === "musicalProject") {
      navigate(`/musica/${highlight.highlightRef.slug}`);
    } else if (highlight._type === "musicalItem") {
      navigate(`/${highlight.highlightRef.slug}`);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="via-primary/20 to-secondary/40 min-h-screen bg-radial/oklab from-transparent from-40% via-70% bg-fixed">
      <AnimatePresence>
        {isLightboxOpen && <Lightbox key="lightbox" />}
      </AnimatePresence>
      <div className="fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center overflow-hidden">
        {/* <div className="via-background to-secondary absolute h-full w-full bg-radial/oklab from-transparent from-40% via-70% bg-fixed"></div> */}
        <img
          className="-z-10 h-full w-full object-cover"
          src={data?.homeImage?.url + "?fm=webp"}
          alt="background"
        />
      </div>
      {/* <Ornaments /> */}
      <CursorDecorationV2 />

      <Menu />

      {/* {data?.highlight && (
        <div className="bg-accent fixed right-0 bottom-2 z-50 m-8 flex items-end justify-end gap-2 font-mono text-xs">
          <button
            onClick={() => handleHighlightClick(data.highlight)}
            className="bg-primary hover:bg-accent border-tertiary max-w-2xs -rotate-8 cursor-pointer justify-end rounded-full border px-6 py-4 text-center uppercase shadow-md transition-all duration-300 hover:scale-105 hover:rotate-3"
          >
            {data.highlight.title[language] || data.highlight.title.es}
          </button>
          <p className="rotate-180 text-end italic [writing-mode:vertical-rl]">
            {language === "en" ? "highlighted" : "destacado"}
          </p>
        </div> */}

      <div className="fixed right-4 bottom-6 z-50">
        <button
          onClick={() => handleHighlightClick(data.highlight)}
          className="hover:bg-text hover:text-accent border-text cursor-pointer rounded-full border px-2 text-xs uppercase transition-colors duration-500"
        >
          {data.highlight.text[language] || data.highlight.text.es}:{" "}
          {data.highlight.highlightRef.title[language] ||
            data.highlight.highlightRef.title.es}
        </button>
      </div>

      <div className="px-4 pt-24">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/about" element={<About />} />
          <Route path="/audiovisual" element={<Audiovisual />}>
            <Route path=":slug" element={<AudiovisualProject />} />
          </Route>
          {/* <Route path="/audiovisual/:slug" element={<AudiovisualProject />} /> */}
          <Route path="/musica" element={<Music />} />
          {/* <Route path="/musica/:slug" element={<MusicalProject />} /> */}
          {/* <Route path="/:slug" element={<HighlightedMusicalItem />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
