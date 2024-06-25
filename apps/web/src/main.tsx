import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext";
import { TrackPositionProvider } from "./context/TrackPositionContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TrackPositionProvider>
          <App />
          <Toaster />
        </TrackPositionProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
