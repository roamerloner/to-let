import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/offers" element={<Offers/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/profile" element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>} />
      </Route>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
