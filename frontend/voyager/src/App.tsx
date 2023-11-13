import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/Signup";
import Scraper from "./components/Scraper";
import Places from "./components/Places";
import PlaceOverview from "./components/PlaceOverview";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <div className="App overflow-y-visible">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/scraper" element={<Scraper />} />
          <Route path="/places" element={<Places />} />
          <Route path=":tour/:event" element={<PlaceOverview />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
