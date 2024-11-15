import "./styles/App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageList from "./pages/PageList";
import Top from "./pages";
import Page from "./pages/Page";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/list" element={<PageList />} />
        <Route path="/page/" element={<Page />} />
        <Route path="/page/:id" element={<Page />} />
      </Routes>
    </>
  );
}

export default App;
