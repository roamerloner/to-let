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
import Category from "./pages/Category";
import CreatePost from "./pages/CreatePost";
import Postings from "./pages/Postings";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/offers" element={<Offers/>} />
        <Route path="/category/:categoryName" element={<Category/>} />
        <Route path="/editlisting/:listingId" element={<EditListing/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/profile" element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/contact/:landlordId" element={<Contact/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/category/:categoryName/:postingId" element={<Postings/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
