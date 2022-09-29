import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { baseURL } from "../shared";

const container = {
  center: true,
};

export default function Customer() {
  let { search } = useParams();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [notFound, setNotFound] = useState(false);
  const url = baseURL + "api/customer/" + search + "/";
  useEffect(() => {
    fetch(url)
      .then((response) => {
        console.log(response.status);
        if (response.status === 404) {
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/login");
        } else if (response.status === 500) {
          setError(true);
        }
        if (!response.ok) {
          setError(true);
          throw new Error("Something went wrong, probably customer not found");
        }
        return response.json();
      })
      .then((data) => {
        setTempCustomer(data.customer);
        setCustomer(data.customer);
      });
  }, []);

  const updateCustomer = (e) => {
    e.preventDefault();
    console.log("updating customer");
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        console.log("updated successful");
        setError(undefined);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  const deleteCustomer = () => {
    console.log("deleting customer");
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        navigate("/customers/");
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  useEffect(() => {
    if (!customer) return;
    if (!customer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;
    if (equal) setChanged(false);
  });

  return (
    <>
      {customer && !notFound ? (
        <div className="px-10">
          <h1 className="text-center pt-10 mb-6">Customer {search}:</h1>
          <form
            className="max-w-sm m-3 w-full"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="name">Name</label>
              </div>
              <div className="">
                <input
                  id="name"
                  type="text"
                  className="bg-gray-200 appearance-None border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                    setChanged(true);
                  }}
                ></input>
              </div>
            </div>
            <div className="md:flex md:items-center mb-12">
              <div className="md:w-1/4">
                <label for="industry">Industry</label>
              </div>
              <div className="">
                <input
                  id="industry"
                  type="text"
                  className="bg-gray-200 appearance-None border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                    setChanged(true);
                  }}
                ></input>
              </div>
            </div>
          </form>
          <div className="b-0 mx-auto space-y-6 w-full">
            {changed ? (
              <div className="relative md:w-1/5">
                <button
                  className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setTempCustomer({ ...customer });
                    setChanged(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  form="customer"
                  className="absolute right-0 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
                {error ? <p>something went wrong</p> : null}
              </div>
            ) : null}

            <div className="sm:w-1/8">
              <button
                className="bg-red-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
                onClick={deleteCustomer}
              >
                Delete
              </button>
            </div>
            <div className='md:w-1/5'>
              <Link to="/customers/">
                <button className="no-underline bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  ← Go Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        navigate("/customer/notfound")
      )}
    </>
  );
}
