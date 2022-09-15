import "./index.css";
import Employees from "./pages/Employees";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import PageNotFound from "./pages/PageNotFound";
import WordNotFound from "./pages/WordNotFound"

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/" element={null} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/definition/:search" element={<Definition />} />
          <Route path="/definition/notfound" element={<WordNotFound />} />
          <Route path="*" element={<PageNotFound />} />
 
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
