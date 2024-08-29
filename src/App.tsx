import React from "react";
import { Routes, Route } from "react-router-dom";
import SongList from "./components/songComponent/SongList";
import Statistics from "./components/stasticsComponent/Statistics";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SongList />} />
        <Route path="statistics" element={<Statistics />} />
      </Route>
    </Routes>
  );
};

export default App;
