import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Providers } from "@/config/provider.jsx";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Providers>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Providers>
  );
} else {
  console.error("Root element not found");
}
