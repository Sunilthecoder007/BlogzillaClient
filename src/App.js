import React from "react";
import "./App.css";
import Header from "./components/Header";
import AppRoutes from "./components/AppRoutes";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

function App() {
  let location = useLocation().pathname;
  return (
    <>
      {location === "/admin" ? (
        <AppRoutes />
      ) : (
        <>
          <div
            style={{ minHeight: "calc(60vh)" }}
            className="App bg-gray-50 pb-24"
          >
            <Header />
            <div className="">
              <AppRoutes />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
