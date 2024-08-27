import React from "react";
import SongList from "./components/SongList"; // Using the alias
import { Provider } from "react-redux";
import { store } from "./store/store"; // Using the alias

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Song List</h1>
        <SongList />
      </div>
    </Provider>
  );
};

export default App;
