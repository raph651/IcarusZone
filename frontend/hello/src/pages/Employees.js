import "../index.css";
import Employee from "../components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "../components/AddEmployee";
import EditEmployee from "../components/EditEmployee";

function Employees() {
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
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });

    setEmployees(updatedEmployee);
  }


  function addEmployee(name,role,img){
    const newEmployee={
      id: uuidv4(),
      name:name,
      role:role,
      img:img,
    }
    setEmployees([...employees,newEmployee])
  }

  const showEmployee = true;
  return (
    <div className="App bg-white Employees">
      {showEmployee ? (
        <>
        <div className="flex flex-wrap">
            {employees.map((employee) => {
            const editEmployee = 
            <EditEmployee
            id={employee.id}
            name={employee.name}
            role={employee.role}
            updateEmployee={updateEmployee}
            />

            return (
                <Employee
                key={employee.id}
                id={employee.id}
                name={employee.name}
                role={employee.role}
                img={employee.img}
                editEmployee={editEmployee}
                />
            );
            })}
        </div>
        <AddEmployee addEmployee={addEmployee}/>
        </>
      ) : (
        <p>You cannot see the employees</p>
      )}
    </div>
  );
}

export default Employees;
