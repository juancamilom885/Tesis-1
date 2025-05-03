import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="w-lvw h-lvh bg-gray-100 flex flex-col items-center justify-start ">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
