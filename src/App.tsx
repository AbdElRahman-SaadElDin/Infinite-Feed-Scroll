import "./App.css";
import { useState, type ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Feed from "./Pages/Feed";
import Posts from "./Pages/Posts";

function App(): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <ScrollToTop />
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Feed searchQuery={searchQuery} />} />
        <Route path="/posts" element={<Posts searchQuery={searchQuery} />} />
      </Routes>
    </div>
  );
}

export default App;
