import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Portfolio from "./components/Portfolio";
import CaseStudy from "./pages/CaseStudy";
import { useRouteTransition } from "./lib/useRouteTransition";

/**
 * Vite injects the Pages base path ("/Portfolio/") here. React Router wants it
 * without the trailing slash, and an empty string when the site is served from
 * a domain root.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Lives inside BrowserRouter because the hook reads router context.
 */
const RoutedApp: React.FC = () => {
  useRouteTransition();

  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/work/:projectId" element={<CaseStudy />} />
      {/*
        Anything else, including an unknown project id that CaseStudy itself
        redirects, lands back on the home page rather than a blank screen.
      */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <BrowserRouter basename={basename}>
    <RoutedApp />
  </BrowserRouter>
);

export default App;
