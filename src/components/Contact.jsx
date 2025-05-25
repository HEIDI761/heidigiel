import { useRef, useEffect } from "react";
import { useAbout } from "../sanity/hooks/getData";
import { motion } from "motion/react";
import useLanguage from "../hooks/useLanguage";

export default function Contact({ closeContact }) {
  const { data } = useAbout();
  const contactRef = useRef(null);
  const { language } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        closeContact();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeContact]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeContact();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeContact]);

  if (!data?.contact) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background/90 text-text fixed inset-0 z-200 flex h-screen w-full flex-col items-center justify-center"
      //   onClick={closeContact}
    >
      <div className="text-center" ref={contactRef}>
        {data.contact.email && (
          <a href={`mailto:${data.contact.email}`} className="underline">
            {data.contact.email}
          </a>
        )}
        {data.contact.phone && <p>{data.contact.phone}</p>}
        {data.contact.instagram && (
          <div>
            <a href={data.contact.instagram}>Instagram</a>
          </div>
        )}
        {data.contact.spotify && (
          <div>
            <a href={data.contact.spotify}>Spotify</a>
          </div>
        )}
        {data.contact.links && (
          <div className="">
            {data.contact.links.map((link, index) => (
              <p key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title[language] || link.title.es}
                </a>
              </p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
