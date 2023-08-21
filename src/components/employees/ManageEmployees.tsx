import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "antd";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeTable } from "./EmployeeTable";
import {
  IEmployeeArray,
  getAllEmployees,
} from "../../services/employeeservice";

type GetEmployeesResponseType = {
  data: IEmployeeArray;
  status: number;
};

export const ManageEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployeeArray | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // TODO - ERROR STATE
  const [
    requestRefetchEmployeesFromMutation,
    setRequestRefetchEmployesFromMutation,
  ] = useState<boolean>(false);

  const handleMutationResolvedStatus = (data: boolean) => {
    setRequestRefetchEmployesFromMutation(data);
  };

  // call to api

  const fetchEmployees = async () => {
    try {
      const employeesResponse: GetEmployeesResponseType =
        await getAllEmployees();
      setEmployees(employeesResponse.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (requestRefetchEmployeesFromMutation) {
      fetchEmployees();
      setRequestRefetchEmployesFromMutation(false);
    }
  }, [requestRefetchEmployeesFromMutation]);
  return (
    <>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Card title={"Add an employee"} loading={loading}>
            <EmployeeForm onMutationResolved={handleMutationResolvedStatus} />
          </Card>
        </Col>
        <Col sm={24} lg={16}>
          <Card title={"Employees"} loading={loading}>
            <EmployeeTable
              onMutationResolved={handleMutationResolvedStatus}
              isLoadingEmployees={loading}
              employees={employees}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
