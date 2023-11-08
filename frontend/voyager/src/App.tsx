import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/Signup";
import Scraper from "./components/Scraper";
import Places from "./components/Places";
import PlaceOverview from "./components/PlaceOverview";
function App() {
  return (
    <div className="App overflow-y-visible">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Places />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/scraper" element={<Scraper />} />
          <Route path="/places" element={<Places />} />
          <Route path=":tour/:event" element={<PlaceOverview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;