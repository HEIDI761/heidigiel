import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { LightboxProvider } from "./context/LightboxContext.jsx";
import { EmbedPlayerProvider } from "./context/EmbedPlayerContext.jsx";

import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 35,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <LightboxProvider>
          <EmbedPlayerProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </EmbedPlayerProvider>
        </LightboxProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>,
);
