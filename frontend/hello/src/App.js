import "./index.css";
import Employees from "./pages/Employees";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import PageNotFound from "./pages/PageNotFound";
import WordNotFound from "./pages/WordNotFound";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import CustomerNotFound from "./pages/CustomerNotFound";

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
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer/:search" element={<Customer />} />
          <Route path="/customer/notfound" element={<CustomerNotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
