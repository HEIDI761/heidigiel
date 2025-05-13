import useLanguage from "../hooks/useLanguage";
import { NavLink } from "react-router";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Menu() {
  const { language } = useLanguage();
  return (
    <div className="fixed inset-0 z-50 h-min">
      <nav className="mt-3 grid w-full grid-cols-[1fr_auto_1fr] px-6 font-serif text-3xl lg:text-6xl">
        <NavLink
          to="/audiovisual"
          className={({ isActive }) =>
            `hover:text-primary text-start uppercase transition-colors hover:italic ${isActive ? "italic" : ""}`
          }
        >
          {language === "es" ? "Audiovisual" : "Audiovisual"}
        </NavLink>
        <div className="flex flex-col items-center justify-center pt-0 lg:pt-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-2xl lg:text-4xl ${isActive ? "" : ""}`
            }
          >
            <h1 className="hover:text-accent font-serif italic transition-colors hover:not-italic">
              Heidi Giel
            </h1>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-primary cursor-help justify-self-center uppercase transition-colors ${isActive ? "underline" : ""}`
            }
          >
            {/* 🪭 */}
            <img
              src="https://static.thenounproject.com/png/hand-fan-icon-7565442-512.png"
              alt=""
              className="w-12 transition-transform duration-300 hover:scale-105 hover:rotate-4"
            />
          </NavLink>
        </div>

        <NavLink
          to="/musica"
          className={({ isActive }) =>
            `hover:text-primary text-end uppercase transition-colors hover:italic ${isActive ? "italic" : ""}`
          }
        >
          {language === "es" ? "Música" : "Music"}
        </NavLink>
      </nav>
      <div className="bg-tertiary hover:bg-secondary hover:text-background text-muted-text absolute right-0 -mt-6 rounded-l-full pr-2 pl-1.5 text-sm">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
