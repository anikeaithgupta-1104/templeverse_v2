import React from "react";
import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { GuideProvider } from "./context/GuideContext";
import { ErrorBoundary } from "./components/ErrorState";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AryaFloatingButton from "./components/AryaFloatingButton";
import Home from "./pages/Home";
import Temples from "./pages/Temples";
import Connections from "./pages/Connections";
import TempleDetail from "./pages/TempleDetail";
import TempleMapPage from "./pages/TempleMapPage";
import LocationDetail from "./pages/LocationDetail";
import GuidedTourPage from "./pages/GuidedTourPage";
import Guide from "./pages/Guide";
import Offline from "./pages/Offline";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

/**
 * HashRouter keeps every route working when the built app is served
 * as a single static file with no server-side rewrites.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <GuideProvider>
          <HashRouter>
            <ScrollToTop />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/temples" element={<Temples />} />
                  <Route path="/connections" element={<Connections />} />
                  <Route path="/guide" element={<Guide />} />
                  <Route path="/temple/:slug" element={<TempleDetail />} />
                  <Route path="/temple/:slug/map" element={<TempleMapPage />} />
                  <Route path="/temple/:slug/location/:locationId" element={<LocationDetail />} />
                  <Route path="/temple/:slug/guided" element={<GuidedTourPage />} />
                  <Route path="/offline" element={<Offline />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
              <AryaFloatingButton />
            </div>
          </HashRouter>
        </GuideProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
