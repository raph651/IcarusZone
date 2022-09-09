import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Raph",
      role: "Intern",
      img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    },
    {
      id: 2,
      name: "Raph",
      role: "Intern",
      img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    },
    {
      id: 3,
      name: "Raph",
      role: "Intern",
      img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployee = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });

    setEmployees(updatedEmployee);
  }

  const showEmployee = true;
  return (
    <div className="App">
      {showEmployee ? (
        <>
          <div className="absolute top-20 left-20">
            <strong classname="bg-red-200">People</strong>
            <div className="relative right-50 flex flex-col flex-wrap">
              {employees.map((employee) => {
                return (
                  <Employee
                    key={employee.id}
                    id={employee.id}
                    name={employee.name}
                    role={employee.role}
                    img={employee.img}
                    updateEmployee={updateEmployee}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}

export default App;
