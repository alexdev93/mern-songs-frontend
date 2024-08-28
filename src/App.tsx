import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SongList from "./components/SongList";
// import Statistics from "./components/Statistics";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Song List</h1>
        <SongList />
        {/* <Statistics /> */}
      </div>
    </Provider>
  );
};

export default App;
