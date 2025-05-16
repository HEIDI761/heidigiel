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
              `pointer-events-auto rounded-full px-10 text-9xl uppercase transition-all ${isActive ? "bg-primary text-background -rotate-2 italic" : "text-background hover:bg-secondary/50 hover:scale-105 hover:-rotate-1"}`
            }
          >
            {language === "es" ? "Musica" : "Music"}
          </NavLink>
          <NavLink
            to={location.pathname === "/about" ? "/" : "/about"}
            className="group pointer-events-auto flex shrink-0 cursor-help flex-col items-center pt-0 transition-colors hover:opacity-75 hover:invert lg:pt-2"
          >
            {/* <h1 className="font-serif text-2xl italic transition-colors lg:text-4xl">
              Heidi Giel
            </h1> */}
            <div className={`text-4xl uppercase transition-colors`}>
              <img
                src="https://static.thenounproject.com/png/hand-fan-icon-7565442-512.png"
                alt=""
                className="w-16 opacity-20 invert transition-transform duration-300 group-hover:scale-105 group-hover:rotate-4"
              />
            </div>
          </NavLink>

          <NavLink
            to="/audiovisual"
            className={({ isActive }) =>
              `pointer-events-auto rounded-full px-10 text-9xl uppercase transition-all ${isActive ? "bg-primary text-background rotate-1 italic" : "text-background hover:bg-secondary/50 hover:scale-105 hover:rotate-2"}`
            }
          >
            {language === "es" ? "Audiovisual" : "Audiovisual"}
          </NavLink>
        </nav>
      </div>
      <div className="bg-tertiary hover:bg-secondary hover:text-background text-muted-text fixed top-24 right-0 z-50 w-max rounded-l-full pr-2 pl-1.5 text-sm">
        <LanguageSwitcher />
      </div>
    </>
  );
}
