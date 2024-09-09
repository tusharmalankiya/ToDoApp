import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  
  return (
    <>
    <AuthContextProvider>
      <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </div>
    </AuthContextProvider>
    </>
  );
}

export default App;
