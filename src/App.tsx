import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Feed searchQuery={searchQuery} />
    </div>
  );
}

export default App;
