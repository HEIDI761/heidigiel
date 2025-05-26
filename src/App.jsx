import { useState } from "react";
import { Routes, Route, NavLink } from "react-router";
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
import Ornaments from "./components/Ornaments";
import Lightbox from "./components/Lightbox";
import { AnimatePresence } from "motion/react";
import MusicalItem from "./components/MusicalItem";
import Contact from "./components/Contact";
import EmbedPlayer from "./components/EmbedPlayer";

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();
  const { isLightboxOpen } = useLightbox();
  const [isContactOpen, setIsContactOpen] = useState(false);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="via-primary/20 to-secondary/40 min-h-screen bg-radial/oklab from-transparent from-40% via-70% bg-fixed">
      <AnimatePresence>
        {isLightboxOpen && <Lightbox key="lightbox" />}
        {isContactOpen && data?.contact && (
          <Contact
            key="contact"
            data={data.contact}
            closeContact={() => setIsContactOpen(false)}
          />
        )}
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

      <Menu openContact={() => setIsContactOpen(true)} />

      {data.highlight.highlightRef && (
        <div className="fixed right-4 bottom-6 z-50">
          <NavLink
            to={`${data.highlight.highlightRef._type === "audiovisualProject" ? "audiovisual" : "musica"}/${data.highlight.highlightRef.slug}`}
            // onClick={() => handleHighlightClick(data.highlight)}
            className="hover:bg-text hover:text-accent border-text cursor-pointer rounded-full border px-2 text-xs uppercase transition-colors duration-500"
          >
            {data.highlight.text[language] || data.highlight.text.es}:{" "}
            {data.highlight.highlightRef.title[language] ||
              data.highlight.highlightRef.title.es}
          </NavLink>
        </div>
      )}
      <div className="px-4 pt-24">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/bio" element={<About />} />
          <Route path="/audiovisual" element={<Audiovisual />}>
            <Route path=":slug" element={<AudiovisualProject />} />
          </Route>
          <Route path="/musica" element={<Music />}>
            <Route path=":slug" element={<MusicalItem />} />
          </Route>
        </Routes>
      </div>

      <EmbedPlayer />
    </div>
  );
}

export default App;
