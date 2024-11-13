import "./styles/App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import PageList from "./pages/PageList";
import Top from "./pages";
import Page from "./pages/Page";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/list" element={<PageList />} />
        <Route path="/page/:id" element={<Page />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
