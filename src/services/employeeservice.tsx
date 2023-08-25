import { IApiResponse, del, get, post, put } from "./api";

export interface IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  skillLevels: string[];
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

export interface IEmployeeArray extends Array<IEmployee> {}

export type AddNewEmployeeRequestType = {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  isActive: boolean;
  skillLevels: string[] | null;
};

export interface UpdateEmployeeRequestType extends AddNewEmployeeRequestType {}

export async function getAllEmployees<T>(): Promise<IApiResponse<T>> {
  try {
    const employeesResponse: IApiResponse<T> = await get("/employees");
    return employeesResponse;
  } catch (error) {
    console.error("Error fetching employees: ", error);
    throw error;
  }
}

export async function addNewEmployee<T>(
  newEmployee: AddNewEmployeeRequestType
): Promise<IApiResponse<T>> {
  try {
    const addNewEmployeeResponse: IApiResponse<T> = await post(
      "/employees",
      newEmployee
    );

    return addNewEmployeeResponse;
  } catch (error) {
    console.error("Error adding new employee: ", error);
    throw error;
  }
}

export async function updateEmployee<T>(
  employeeToUpdate: string,
  updatedEmployee: UpdateEmployeeRequestType
): Promise<IApiResponse<T>> {
  try {
    const updateEmployeeResponse: IApiResponse<T> = await put(
      "/employees",
      employeeToUpdate,
      updatedEmployee
    );

    return updateEmployeeResponse;
  } catch (error) {
    console.error("Error updating employee: ", error);
    throw error;
  }
}

export async function deleteEmployee<T>(
  employeeToDelete: string
): Promise<IApiResponse<T>> {
  try {
    const deleteEmployeeResponse: IApiResponse<T> = await del(
      "/employees",
      employeeToDelete
    );

    return deleteEmployeeResponse;
  } catch (error) {
    console.error("Error deleting employee: ", error);
    throw error;
  }
}
