import "./App.css";
import Homepage from "./pages/HomePage";
import Header from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import AdContext from "./components/AdContext";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Correct import
import AdScreen from "./pages/AdScreen";
import CreateAd from "./pages/CreateAd";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { CookiesProvider, useCookies } from "react-cookie";
import UserProfile from "./pages/UserProfile";

function App() {
  const [adInfo, setAdInfo] = useState();

  return (
    <CookiesProvider>
      <AdContext.Provider value={{ adInfo, setAdInfo }}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/adScreen" element={<AdScreen />} />
              <Route path="/createAd" element={<CreateAd />} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/userProfile" element={<UserProfile />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </AdContext.Provider>
    </CookiesProvider>
  );
}

export default App;
