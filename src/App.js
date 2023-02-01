import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";

const Shop = () => {
  return <div>I am the Shop Page</div>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        {/* This is now  a child */}
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
