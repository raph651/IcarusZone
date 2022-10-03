import "./index.css";
import { createContext, useState } from "react";
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
import Login from "./pages/Login";

export const loginContext = createContext();

function App() {
  //long term goal --> use Refresh token and if it works, stay loggin,
  //otherwise, send to login page
  const [loggedIn, setloggedIn] = useState(localStorage.access ? true : false);
  function changedLoggedIn(value) {
    setloggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <loginContext.Provider value={[loggedIn, changedLoggedIn]}>
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
            <Route path="/login" element={<Login />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
