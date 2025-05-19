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
              `pointer-events-auto rounded-full px-6 text-6xl uppercase transition-all lg:text-8xl ${isActive ? "bg-primary font-serif-italic -rotate-2 text-white" : location.pathname === "/audiovisual" ? "text-background hover:bg-secondary/50 hover:scale-105 hover:-rotate-1 hover:text-white" : "hover:bg-secondary/50 text-white hover:scale-105 hover:-rotate-1"}`
            }
          >
            {language === "es" ? "Musica" : "Music"}
          </NavLink>
          {/* <div className="border-background size-8 shrink-0 rounded-full border" /> */}
          {/* <svg
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 299.54 97.61"
            fill="var(--color-background)"
            className="w-13 rotate-180"
          >
            <g>
              <path d="M298.56,50.47C292.86,21.89,261.24-1.22,232.35.05c-39.94,1.76-59.97,47.71-82.58,68.98C127.16,47.76,107.13,1.81,67.19.05,38.29-1.22,6.68,21.89.97,50.47c-11.25,56.35,78.73,62.76,80.93,16.06.89-18.99-25.26-43.07-42.58-30.28-10.15,7.5-7.31,24.32,4.25,19.81,7.05-2.75-3.09-8.28,4.95-7.1,10.9,1.6,20.79,24.87,1.79,29.94C-1.89,92.85,3.59,23.34,48.46,8.08c50.31-17.12,71.28,35.31,99.93,62.22-6.1,5.43-12.42,8.99-19.39,9.33-6.55.32-18.87-8.4-16.79-14.33,1.77-5.03,7.93,3.97,10.88-1.76,3.1-6.01-4.25-13.38-10.09-14.6-23.13-4.82-31.44,25.63-8.06,33.7,18.44,6.36,32.4.15,44.83-11.05,12.43,11.21,26.39,17.41,44.83,11.05,23.38-8.06,15.07-38.52-8.06-33.7-5.84,1.22-13.18,8.59-10.09,14.6,2.95,5.73,9.11-3.27,10.88,1.76,2.09,5.93-10.24,14.64-16.79,14.33-6.97-.34-13.29-3.9-19.39-9.33,28.65-26.91,49.61-79.33,99.93-62.22,44.86,15.26,50.35,84.77-1.86,70.83-19-5.07-9.11-28.34,1.79-29.94,8.04-1.18-2.11,4.36,4.95,7.1,11.57,4.5,14.4-12.32,4.25-19.81-17.32-12.79-43.47,11.28-42.58,30.28,2.19,46.7,92.18,40.29,80.93-16.06Z" />
            </g>
          </svg> */}

          <NavLink
            to="/audiovisual"
            className={({ isActive }) =>
              `pointer-events-auto rounded-full px-6 text-6xl uppercase transition-all lg:text-8xl ${isActive ? "bg-primary font-serif-italic rotate-1 text-white" : location.pathname === "/musica" ? "hover:bg-secondary/50 text-background hover:scale-105 hover:rotate-2 hover:text-white" : "hover:bg-secondary/50 text-white hover:scale-105 hover:rotate-2"}`
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
        className="bg-background fixed bottom-16 left-2 z-50 size-6 rounded-full text-center mix-blend-difference hover:invert"
      >
        +
      </NavLink>

      <NavLink to="/">
        <h1 className="text-background font-display hover:text-accent fixed bottom-4 left-2 z-10 rounded-full text-4xl leading-none italic mix-blend-difference transition-colors hover:invert">
          Heidi Giel
        </h1>
      </NavLink>
    </>
  );
}
