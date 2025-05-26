import { useContext } from "react";
import { EmbedPlayerContext } from "../context/EmbedPlayerContext";

export default function useEmbedPlayer() {
  const context = useContext(EmbedPlayerContext);
  if (context === undefined) {
    throw new Error("useEmbedPlayer must be used within an PlayerProvider");
  }
  return context;
}
