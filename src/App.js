import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NewName from "./components/NewName";
import ViewNames from "./components/ViewNames";
import EditName from "./components/EditName";

function Top() {
  return (
    <div className="top">
      <h1>
        People : <span>Claude-Marcel Loba</span>
      </h1>
    </div>
  );
}

const App = () => {
  return (
    <div className="app">
      <Top />
      <div className="main-container">
        <Navbar />
        <div className="routes">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-name" element={<NewName />} />
            <Route path="/view-names" element={<ViewNames />} />
            <Route path="/edit-name/:id" element={<EditName />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
