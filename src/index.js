import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Haircuts from "./pages/haircuts";
import Restaurants from "./pages/restaurants";
import reportWebVitals from "./reportWebVitals";
import About from "./pages/about";
import Navbar2 from "./components/navbar";
import Submission from "./pages/submission";
import Groups from "./pages/groups";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar2 />
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/haircuts" element={<Haircuts />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/submissions" element={<Submission />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
