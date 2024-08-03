/* src/Layout.js*/
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

function Layout({ children }) {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content-container">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
