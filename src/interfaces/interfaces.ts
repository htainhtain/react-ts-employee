export interface Employee {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  Department: string;
  Salary: number;
}

export interface NewEmployee {
  FirstName: string;
  LastName: string;
  Department: string;
  Salary: number | "";
}

export interface UpdateEmployeee {
  FirstName: string;
  LastName: string;
  Department: string;
  Salary: number | "";
}
