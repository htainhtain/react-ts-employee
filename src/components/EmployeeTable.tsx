import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Employee } from "../interfaces/interfaces";
import { useState } from "react";

interface Column {
  id: "id" | "firstName" | "lastName" | "department" | "salary";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Props {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "firstName", label: "FirstName", minWidth: 100 },
  {
    id: "lastName",
    label: "LastName",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "department",
    label: "Department",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "salary",
    label: "Salary",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  salary: number;
}

function createDataFromEmployee(employee: Employee): Data {
  const { EmployeeID, FirstName, LastName, Department, Salary } = employee;
  return {
    id: EmployeeID,
    firstName: FirstName,
    lastName: LastName,
    department: Department,
    salary: Salary,
  };
}

const EmployeeTable = ({ employees, onSelectEmployee }: Props) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const rows = employees.map(createDataFromEmployee);

  const handleRowClick = (id: number) => {
    setSelectedRow(id);
    const selectedEmployee: Employee = employees.find(
      (employee) => employee.EmployeeID === id
    )!;
    onSelectEmployee(selectedEmployee);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#4682A9",
                    color: "white",
                  }}
                  className="employee-header"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => handleRowClick(row.id)}
                  style={{
                    backgroundColor:
                      selectedRow === row.id ? "#91C8E4" : "white",
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default EmployeeTable;
