import useLanguage from "../hooks/useLanguage";
import { NavLink, useLocation } from "react-router";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Menu({ openContact }) {
  const { language } = useLanguage();
  const location = useLocation();

  return (
    <>
      <nav className="pointer-events-none fixed inset-0 z-50 flex h-screen w-full flex-col justify-between overflow-hidden px-4 pt-3 pb-6 uppercase">
        <div className="flex items-start justify-between">
          <NavLink
            to="/musica"
            className={({ isActive }) =>
              `border-muted-text pointer-events-auto w-[120px] shrink-0 rounded-br-full border pl-1 leading-none transition-colors duration-500 ${
                isActive
                  ? "bg-text text-background"
                  : "text-text hover:bg-text hover:text-background bg-text/10 backdrop-blur-xl"
              }`
            }
          >
            {language === "es" ? "Música" : "Music"}
          </NavLink>

          <hr className="border-muted-text pointer-events-none w-full pt-2" />

          <NavLink
            to="/"
            className={`font-display pointer-events-auto -mt-2 w-full max-w-max px-2 text-center leading-none transition-all duration-500 ${location.pathname === "/" ? "text-[5vw]" : "text-xl md:text-3xl"}`}
          >
            Heidi Giel
          </NavLink>

          <hr className="border-muted-text pointer-events-none w-full pt-2" />

          <NavLink
            to="/audiovisual"
            className={({ isActive }) =>
              `border-muted-text pointer-events-auto w-[120px] shrink-0 rounded-bl-full border pr-1 text-end leading-none transition-colors duration-500 ${
                isActive
                  ? "bg-text text-background"
                  : "text-text hover:bg-text hover:text-background bg-text/10 backdrop-blur-xl"
              }`
            }
          >
            {language === "es" ? "Audiovisual" : "Audiovisual"}
          </NavLink>
        </div>

        <div className="">
          <div className="pointer-events-auto flex flex-col items-start justify-between gap-2 leading-none">
            <LanguageSwitcher />
            <div className="-ml-1 flex">
              <NavLink
                to="/bio"
                className="hover:bg-text hover:text-background px-1 transition-colors duration-500"
              >
                BIO
              </NavLink>
              <button
                onClick={openContact}
                className="hover:bg-text hover:text-background px-1 uppercase transition-colors duration-500"
              >
                {language === "es" ? "Contacto" : "Contact"}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
