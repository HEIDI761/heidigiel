import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router";
import { AnimatePresence } from "motion/react";
import { useAbout } from "./sanity/hooks/getData";
import useLanguage from "./hooks/useLanguage";
import useLightbox from "./hooks/useLightbox";
import Menu from "./components/Menu";
import About from "./pages/About";
import Contact from "./components/Contact";
import Audiovisual from "./pages/Audiovisual";
import AudiovisualProject from "./pages/AudiovisualProject";
import Music from "./pages/Music";
import MusicalItem from "./pages/MusicalItem";
import Loading from "./components/Loading";
import Lightbox from "./components/Lightbox";
import EmbedPlayer from "./components/EmbedPlayer";
import CursorDecorationV2 from "./components/CursorDecorationV2";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function App() {
  const { data, isLoading, error } = useAbout();
  const { language } = useLanguage();
  const { isLightboxOpen } = useLightbox();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 800); // time to allow fade-out
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="bg-background pointer-events-none fixed z-100 flex h-screen w-full"
          ></motion.div>
        )}
      </AnimatePresence>
      {!isLoading && (
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
            <img
              className="-z-10 h-full w-full object-cover"
              src={data?.homeImage?.url + "?fm=webp"}
              alt="background"
            />
          </div>

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
      )}
    </>
  );
}

export default App;
