import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";
// Import the CSS file containing the global styles

createRoot(document.getElementById("root")).render(<App />);
