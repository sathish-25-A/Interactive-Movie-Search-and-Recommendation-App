import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WatchlistProvider } from "./context/watchlist";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </React.StrictMode>
);
