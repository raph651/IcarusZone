import "./index.css";
import Employees from "./pages/Employees";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/" element={null} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
