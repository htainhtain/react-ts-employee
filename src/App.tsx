import axios from "axios";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable";
import { Employee, UpdateEmployeee } from "./interfaces/interfaces";
import { useEffect, useState } from "react";
import AddEmployeeModal from "./components/AddEmployeeModal";
import UpdateEmployeeModal from "./components/UpdateEmployeeModal";

const getAllEmployees = async (): Promise<Employee[]> => {
  const url = "http://localhost:8000/employee";
  const response = await axios.get<Employee[]>(url);
  return response.data;
};

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
    EmployeeID: 0,
    FirstName: "",
    LastName: "",
    Department: "",
    Salary: 0,
  });

  useEffect(() => {
    (async () => {
      const employees = await getAllEmployees();
      setEmployees(employees);
    })();
  }, []);

  const addEmployee = async (newEmployee: Employee) => {
    try {
      await axios.post("http://localhost:8000/employee", newEmployee);
      console.log("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee", error);
    }
    const employees = await getAllEmployees();
    setEmployees(employees);
  };

  const updateEmployee = async (
    id: number,
    updateEmployee: UpdateEmployeee
  ) => {
    try {
      await axios.put(`http://localhost:8000/employee/${id}`, updateEmployee);
      console.log("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee", error);
    }
    const employees = await getAllEmployees();
    setEmployees(employees);
  };

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <>
      <h1 className="app-title">Employee Management</h1>
      <div className="container">
        <div className="control">
          <AddEmployeeModal onAddEmployee={addEmployee} />
          <UpdateEmployeeModal
            onUpdateEmployee={updateEmployee}
            selectedEmployee={selectedEmployee}
          />
        </div>

        <EmployeeTable
          employees={employees}
          onSelectEmployee={handleEmployeeSelect}
        />
      </div>
    </>
  );
}

export default App;
