import { useContext } from "react";
import { LightboxContext } from "../context/LightboxContext";

export default function useLightbox() {
  const context = useContext(LightboxContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within an LightboxProvider");
  }
  return context;
}
