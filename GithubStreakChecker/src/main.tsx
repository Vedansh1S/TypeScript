import { createRoot } from "react-dom/client";
import "./main.css";
import GitHubStreakWidget from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <GitHubStreakWidget username="Vedansh1S" />
);
