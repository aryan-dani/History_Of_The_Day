import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/index";
import ExplorePage from "./pages/explore";
import MapPage from "./pages/map";
import Navbar from "./components/common/Navbar";
import Chatbot from "./components/Chatbot";

// Layout placeholder if needed, or just standard routes
function App() {
  return (
    <BrowserRouter>
      <div className="vintage-frame-container overflow-hidden flex flex-col">
        {/* Global distressed noise overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-noise z-50"></div>

        {/* Floating Navbar */}
        <Navbar />
        <Chatbot />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
