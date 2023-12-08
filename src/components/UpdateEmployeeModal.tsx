import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  Employee,
  NewEmployee,
  UpdateEmployeee,
} from "../interfaces/interfaces";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Props {
  onUpdateEmployee(id: number, employee: UpdateEmployeee): void;
  selectedEmployee: Employee;
}

const UpdateEmployeeModal = ({ onUpdateEmployee, selectedEmployee }: Props) => {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState<NewEmployee>({
    FirstName: "",
    LastName: "",
    Department: "",
    Salary: 0,
  });

  useEffect(() => {
    console.log("selectedEmployee: ", selectedEmployee);
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "Salary" ? parseInt(value) : value;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: parsedValue }));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEmployee(selectedEmployee.EmployeeID, employee);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        disabled={selectedEmployee.EmployeeID == 0}
        variant="outlined"
      >
        Update Employee
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 className="modal-title">Update Employee</h2>
          <label>
            FirstName:
            <input
              type="text"
              name="FirstName"
              value={employee.FirstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            LastName:
            <input
              type="text"
              name="LastName"
              value={employee.LastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Department:
            <input
              type="text"
              name="Department"
              value={employee.Department}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Salary:
            <input
              type="text"
              name="Salary"
              value={employee.Salary}
              onChange={handleChange}
            />
          </label>
          <br />
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ marginTop: 1 }}
          >
            Update Employee
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateEmployeeModal;
