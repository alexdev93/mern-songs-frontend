import React from "react";
import SongList from "./components/SongList";
import Statistics from "./components/Statistics";

const App: React.FC = () => {


  return (
    <div>
      <h1>Song List</h1>
      <SongList />
      <Statistics />
    </div>
  );
};

export default App;
