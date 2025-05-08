import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within an LanguageProvider");
  }
  return context;
}
