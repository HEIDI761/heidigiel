import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Hook to close a component when clicking outside or pressing Escape.
 *
 * Usage options:
 * - `ref`: the element to monitor for outside clicks.
 * - `options.closeCallback`: function to call on close.
 * - `options.navigateUp`: if true, navigates up one route instead.
 * - `options.replace`: optional, replaces history if navigating (default false).
 */
export function useCloseOnOutsideOrEscape(ref, options = {}) {
  const navigate = useNavigate();
  const { closeCallback, navigateUp = false, replace = false } = options;

  useEffect(() => {
    function handleClose() {
      if (navigateUp) {
        navigate("..", { replace });
      } else if (typeof closeCallback === "function") {
        closeCallback();
      }
    }

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, navigate, closeCallback, navigateUp, replace]);
}
