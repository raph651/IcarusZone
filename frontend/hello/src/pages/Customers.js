import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AddCustomer from "../components/AddCustomer";
import { baseURL } from "../shared";
import {useNavigate} from 'react-router-dom';

const url = baseURL + "api/customers/";

export default function Customers(props) {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status ===401){
          console.log('401 login needed')
          navigate('/login')
        }
        else if (!response.ok) {
          throw new Error("something went wrong");
        }
        /*         console.log(response.status);
         */ 
        return response.json();
      })
      .then((data) => {
        /*         console.log(data.customers);
         */ setCustomers(data.customers);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function postCustomer(name, industry) {
    const data = { name: name, industry: industry };
    console.log("adding customer");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        setCustomers([...customers,data.customer])
        //assume the add was successful
        //hide the modal
        //make sure the list is updated appropriately
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      {customers ? (
        <div className="text-center pt-10 space-x-8 space-y-5">
          <h1>Here are customers</h1>
          {customers.map((c) => {
            return (
              <>
                <p key={c.id}>
                  <a href={"/customer/" + c.id+'/'}>{c.name}</a>
                  {" working for company " + c.industry}
                </p>
              </>
            );
          })}
        </div>
      ) : null}
      <AddCustomer
        postCustomer={postCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
