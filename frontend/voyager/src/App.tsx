import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/Signup";
import Scraper from "./components/Scraper";

function App() {
  return (
    <div className="App overflow-y-visible">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/scraper" element={<Scraper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
