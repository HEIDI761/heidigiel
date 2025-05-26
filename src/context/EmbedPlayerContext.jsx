import { createContext, useState } from "react";

const EmbedPlayerContext = createContext();

const EmbedPlayerProvider = ({ children }) => {
  const [currentEmbed, setCurrentEmbed] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <EmbedPlayerContext.Provider
      value={{ currentEmbed, setCurrentEmbed, isExpanded, setIsExpanded }}
    >
      {children}
    </EmbedPlayerContext.Provider>
  );
};

export { EmbedPlayerProvider, EmbedPlayerContext };
