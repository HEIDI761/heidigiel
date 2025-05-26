import useLanguage from "../hooks/useLanguage";
import { NavLink } from "react-router";
import LanguageSwitcher from "./LanguageSwitcher";
import useEmbedPlayer from "../hooks/useEmbedPlayer";

export default function Menu({ openContact }) {
  const { language } = useLanguage();
  const { isExpanded, setIsExpanded } = useEmbedPlayer();

  return (
    <>
      <nav className="pointer-events-none fixed inset-0 z-50 flex h-screen w-full flex-col justify-between overflow-hidden px-4 pt-3 pb-6 uppercase">
        <div className="flex items-start justify-between">
          <NavLink
            to="/musica"
            className={({ isActive }) =>
              `border-text pointer-events-auto w-[120px] shrink-0 rounded-br-full border pl-1 leading-none transition-colors duration-500 ${
                isActive
                  ? "bg-text text-background"
                  : "text-text hover:bg-text hover:text-background"
              }`
            }
          >
            {language === "es" ? "Musica" : "Music"}
          </NavLink>

          <hr className="pointer-events-none w-full pt-2" />

          <NavLink
            to="/"
            className={`pointer-events-auto px-2 transition-all duration-500 ${location.pathname === "/" ? "w-1/2" : "w-[400px]"}`}
          >
            {/* <h1 className="font-display -mt-0.5 text-center text-xl leading-none md:text-2xl">
              Heidi Giel
            </h1> */}
            <svg
              fill="var(--color-text)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 762.91 123.88"
              className=""
            >
              <g id="Layer_2-2" data-name="Layer 2">
                <g>
                  <path d="M44.29,2.44c.2,1.33.03,1.64-.78,2.59-2.24,2.62-8.58,5.46-11.21,8.28v39.38h32.97V13.32c-3.14-3.76-10.59-5.73-11.24-10.88h44.21c.2,1.33.03,1.64-.78,2.59-2.24,2.62-8.58,5.46-11.21,8.28v39.38h55.45l-7.76-3.11c-18.61-8.57-28.04-26.97-27.46-47.14h64.44l2.99,30.75-3.36-.75-20.24-27.74h-23.6c1.6,16.81.27,40.37,20.18,46.49,2.68-3.38,7.06-12.79,9.75-15.24.83-.76,1.27-.52,2.29-.49v36l-2.3-.47-9.69-16.78h-19.11c-1.89,0-.37,4.41-.34,5.59.47,17.98,1.23,42.43,16.82,54.41,1.93,1.48,9.69,5.95,11.61,4.92l18.4-25.14,2.59-.78-2.35,29.52-1.12,1.12c-40.05,1.22-68.42-30.27-66.96-69.64h-20.23v55.88c3.31,4.07,10.02,5.98,11.99,10.88h-44.21c-.2-1.33-.03-1.64.78-2.59,1.79-2.09,7.85-5.52,10.46-7.16v-57h-32.97v55.88c3.31,4.07,10.02,5.98,11.99,10.88H.08c-.2-1.33-.03-1.64.78-2.59,1.48-1.73,9.71-6.3,10.29-7.31l.15-96.95C10.56,10.3-.21,7.36.08,2.44h44.21Z" />
                  <path d="M243.6,120.94c-.05-1.04-.22-1.43.51-2.28,2.07-2.4,10.88-6.34,11.47-9.36l-.15-96.2c-.69-1.2-9.65-6.05-11.12-7.99-.7-.92-.86-1.52-.7-2.67h43.09c53.25,0,60.6,89.15,23.08,111.6-4.2,2.51-14.66,6.9-19.33,6.9h-46.83ZM275.82,4.69v113.62c.96,1.44,2.59,1.16,4.13,1.18,36.77.55,35.39-67.92,27.55-91.4-4.94-14.78-14.72-25.75-31.69-23.41Z" />
                  <path d="M542.58,43.69h-22.48c-12.63-22.79-40.91-48.53-68.13-32.56-22.67,13.3-19.78,39.8-9.44,60.33,13.8,27.41,48.81,63.68,79.68,36.22l.05-18.9-27.92-12.78-.47-2.31h49.45v49.12l-1.76,1.04-18.13-13.45c-4.61,2.17-8.41,5.45-13.32,7.67-50.03,22.65-102.48-25.17-84.44-77.02,11.06-31.79,46.42-48.45,78.34-37.89,17.81,5.89,34.54,21.89,38.56,40.53Z" />
                  <path d="M727.66,2.44c2.27,2.17-10.29,9.25-11.24,10.88v106.12h22.85c6.94-8.17,12.6-18.97,19.55-26.94.66-.75,1.81-2.55,2.92-2.31l1.17,2.59-3.03,28.16h-76.43c.84-4.47,11.24-7.75,11.97-11.64l.07-94.53c-.45-3.69-8.86-6.94-11.25-9.74-.81-.95-.98-1.26-.78-2.59h44.21Z" />
                  <path d="M668.46,2.44l2.99,30.75-3.35-.76-20.25-27.73h-23.6c1.17,12.9.55,32.48,11.23,41.63,1.94,1.66,6.48,5.03,9,3.77,1.76-.88,7.73-11.91,9.7-14.16l2.29-.49v36c-1.02.03-1.46.26-2.29-.5-1.25-1.13-7.23-11.74-8.84-14.27-.48-.76-.82-1.57-.86-2.48h-19.11c-1.05.66-1.06,1.51-1.18,2.61-.26,2.44.55,11.97.81,15.01.89,10.32,3.29,25.04,8.97,33.78,3.9,6.01,12.19,13.41,19.49,13.51l17.99-24.79,3-1.11-3.1,30.64c-40.98,1.45-69.55-31-67.33-71.14h35.22l-7.76-3.11c-18.41-8.48-28.38-27.06-27.46-47.14h64.44Z" />
                  <path d="M230.87,120.94h-44.21c-.2-1.33-.03-1.64.78-2.59,1.48-1.73,9.71-6.3,10.29-7.31l.15-96.95c-.38-3.01-10.38-7.55-11.06-8.79-.44-.8-.07-1.94-.16-2.85h43.09c.73.73,1.58,1.01.77,2.26-1.44,2.23-11.12,6.66-11.64,9.35l.7,96.81c3.31,3.47,9.55,5.51,11.29,10.07Z" />
                  <path d="M378.48,2.44c2.53,2.45-11.16,9.01-11.23,11.64l.15,96.95c.58,1.01,8.82,5.59,10.29,7.31.81.95.98,1.26.78,2.59h-44.21c.84-4.47,11.24-7.75,11.97-11.64l.07-94.53c-.45-3.69-8.86-6.94-11.25-9.74-.81-.95-.98-1.26-.78-2.59h44.21Z" />
                  <path d="M595.78,120.94h-44.21c-.2-1.33-.03-1.64.78-2.59,1.48-1.73,9.71-6.3,10.29-7.31l.15-96.95c-.38-3.01-10.38-7.55-11.06-8.79-.44-.8-.07-1.94-.16-2.85h43.09c.73.73,1.58,1.01.77,2.26-1.44,2.23-11.12,6.66-11.64,9.35l.7,96.81c3.31,3.47,9.55,5.51,11.29,10.07Z" />
                </g>
              </g>
            </svg>
          </NavLink>

          <hr className="pointer-events-none w-full pt-2" />

          <NavLink
            to="/audiovisual"
            className={({ isActive }) =>
              `border-text pointer-events-auto w-[120px] shrink-0 rounded-bl-full border pr-1 text-end leading-none transition-colors duration-500 ${
                isActive
                  ? "bg-text text-background"
                  : "text-text hover:bg-text hover:text-background"
              }`
            }
          >
            {language === "es" ? "Audiovisual" : "Audiovisual"}
          </NavLink>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr]">
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

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="var(--color-text)"
            className={`pointer-events-auto z-100 mx-auto shrink-0 rotate-20 cursor-pointer rounded-full ${isExpanded ? "border" : ""} transition-transform duration-500 hover:rotate-30`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <path d="M451-171q106-28 172.5-114T690-480q0-109-66.5-195T451-789q63 61 95.5 141T579-480q0 88-32.5 168T451-171Zm-81 39h-14q92-55 143.5-148T551-480q0-107-51.5-200T356-828h14q72.21 0 135.72 27.39 63.51 27.39 110.49 74.35 46.98 46.96 74.38 110.43Q718-552.35 718-480.17q0 72.17-27.41 135.73-27.4 63.56-74.38 110.57-46.98 47.02-110.49 74.44Q442.21-132 370-132Zm209-348Z" />
          </svg>
        </div>
      </nav>
    </>
  );
}
