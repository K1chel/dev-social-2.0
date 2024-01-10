import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import { ToastProvider } from "@/providers/toast-provider.tsx";
import { ModalProvider } from "@/providers/modal-provider.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="dev-social-theme">
          <App />
          <ToastProvider />
          <ModalProvider />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
