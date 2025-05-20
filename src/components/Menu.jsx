import useLanguage from "../hooks/useLanguage";
import { NavLink } from "react-router";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocation } from "react-router";

export default function Menu() {
  const { language } = useLanguage();
  const location = useLocation();

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-50">
        <nav className="flex w-full items-center justify-between pt-2 font-serif font-semibold">
          <NavLink
            to="/musica"
            className={({ isActive }) =>
              `pointer-events-auto rounded-full uppercase transition-all ${
                isActive
                  ? "bg-primary font-serif-italic -rotate-1 text-white"
                  : "hover:bg-secondary/50 hover:scale-105 hover:-rotate-2"
              } ${
                location.pathname.startsWith("/audiovisual")
                  ? "text-background hover:text-white"
                  : "text-white"
              } ${location.pathname.split("/").length > 2 ? "px-4 text-2xl" : "px-6 text-6xl lg:text-7xl"}`
            }
          >
            {language === "es" ? "Musica" : "Music"}
          </NavLink>
          {/* <div className="border-background size-8 shrink-0 rounded-full border" /> */}

          <NavLink
            to="/audiovisual"
            className={({ isActive }) =>
              `pointer-events-auto rounded-full uppercase transition-all ${
                isActive
                  ? "bg-primary font-serif-italic rotate-1 text-white"
                  : "hover:bg-secondary/50 hover:scale-105 hover:rotate-2"
              } ${
                location.pathname.startsWith("/musica")
                  ? "text-background hover:text-white"
                  : "text-white"
              } ${location.pathname.split("/").length > 2 ? "px-4 text-2xl" : "px-6 text-6xl lg:text-7xl"}`
            }
          >
            {language === "es" ? "Audiovisual" : "Audiovisual"}
          </NavLink>
        </nav>
      </div>

      <div className="fixed right-4 bottom-6 z-50">
        <LanguageSwitcher />
      </div>

      <NavLink
        to="/about"
        className="bg-background hover:bg-accent hover:text-background fixed bottom-18 left-2 z-50 size-6 rounded-full text-center mix-blend-difference hover:mix-blend-normal"
      >
        +
      </NavLink>

      <NavLink to="/">
        <h1 className="text-background font-display hover:text-accent fixed bottom-6 left-2 z-50 rounded-full text-4xl leading-none italic mix-blend-difference hover:mix-blend-normal">
          Heidi Giel
        </h1>
      </NavLink>
    </>
  );
}
