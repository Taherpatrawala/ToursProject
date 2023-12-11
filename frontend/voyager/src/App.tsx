import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/Signup";
import Scraper from "./components/Scraper";
import Places from "./components/Places";
import PlaceOverview from "./components/PlaceOverview";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUserData } from "./Slices/userDataSlice";
function App() {
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = async () => {
      await axios
        .get("http://127.0.0.1:8000/api/accounts/getUserData/", {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        })
        .then((res) => dispatch(setUserData(res.data)));
    };
    userData();
  }, [ACCESS_TOKEN]);
  return (
    <div className="App overflow-y-visible">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Places />} />
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
