import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/profile" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
