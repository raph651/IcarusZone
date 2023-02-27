import "./index.css";
import { createContext, useState, useEffect } from "react";
import Employees from "./pages/Employees";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import PageNotFound from "./pages/PageNotFound";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import CustomerNotFound from "./pages/CustomerNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Files from "./pages/Files";
import { baseURL } from "./shared";

export const loginContext = createContext();

function App() {
  useEffect(() => {
    function refreshToken() {
      if (localStorage.refresh) {
        const url = baseURL + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //console.log(data);
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setloggedIn(true);
          });
      }
    }
    const minute = 1000 * 60;
    refreshToken();
    setInterval(refreshToken, minute * 3);
  }, []);
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
            <Route path="*" element={<PageNotFound />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customer/:search" element={<Customer />} />
            <Route path="/customer/notfound" element={<CustomerNotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/files" element={<Files />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </loginContext.Provider>
  );
}

export default App;
