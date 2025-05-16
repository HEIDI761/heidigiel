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
        <nav className="flex w-full items-center justify-between pt-2 font-serif">
          <NavLink
            to="/musica"
            className={({ isActive }) =>
              `pointer-events-auto rounded-full px-6 text-6xl uppercase transition-all lg:text-8xl ${isActive ? "bg-primary text-background -rotate-2 italic" : "text-background hover:bg-secondary/50 hover:scale-105 hover:-rotate-1"}`
            }
          >
            {language === "es" ? "Musica" : "Music"}
          </NavLink>
          <div className="border-background size-8 shrink-0 rounded-full border" />

          <NavLink
            to="/audiovisual"
            className={({ isActive }) =>
              `pointer-events-auto rounded-full px-6 text-6xl uppercase transition-all lg:text-8xl ${isActive ? "bg-primary text-background rotate-1 italic" : "text-background hover:bg-secondary/50 hover:scale-105 hover:rotate-2"}`
            }
          >
            {language === "es" ? "Audiovisual" : "Audiovisual"}
          </NavLink>
        </nav>
      </div>

      <div className="border-background text-background fixed right-4 bottom-4 z-10 size-8 rounded-[50%] border px-2 pt-2.25 text-center text-xs leading-none">
        <LanguageSwitcher />
      </div>

      <NavLink
        to="/about"
        className="bg-background fixed bottom-24 left-2 z-50 size-6 rounded-full text-center mix-blend-difference hover:invert"
      >
        +
      </NavLink>

      <NavLink to="/">
        <h1 className="text-background font-display hover:text-accent fixed bottom-4 left-2 z-10 rounded-full text-6xl leading-none italic mix-blend-difference transition-colors hover:invert">
          Heidi Giel
        </h1>
      </NavLink>
    </>
  );
}
