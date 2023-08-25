import React, { useState } from "react";
import { Col, Row, Card } from "antd";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeTable } from "./EmployeeTable";
import { IEmployeeArray } from "../../services/employeeservice";
import { ISkillsArray } from "../../services/skillsservice";

type ManageEmployeesProps = {
  initialEmployees: IEmployeeArray | null;
  initialSkills: ISkillsArray | null;
  initialLoading: boolean;
};

export const ManageEmployees: React.FC<ManageEmployeesProps> = ({
  initialEmployees,
  initialSkills,
  initialLoading,
}: ManageEmployeesProps) => {
  const [error, setError] = useState<string | null>(null); // TODO - ERROR STATE
  const [
    requestRefetchEmployeesFromMutation,
    setRequestRefetchEmployesFromMutation,
  ] = useState<boolean>(false);

  const handleMutationResolvedStatus = (data: boolean) => {
    setRequestRefetchEmployesFromMutation(data);
  };

  // const fetchEmployees = async () => {
  //   try {
  //     const employeesResponse: GetEmployeesResponseType =
  //       await getAllEmployees();
  //     setEmployees(employeesResponse.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (requestRefetchEmployeesFromMutation) {
  //     fetchEmployees();
  //     setRequestRefetchEmployesFromMutation(false);
  //   }
  // }, [requestRefetchEmployeesFromMutation]);

  return (
    <>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Card title={"Add an employee"} loading={initialLoading}>
            <EmployeeForm
              skillsToSelect={initialSkills}
              onMutationResolved={handleMutationResolvedStatus}
            />
          </Card>
        </Col>
        <Col sm={24} lg={16}>
          <Card title={"Employees"} loading={initialLoading}>
            <EmployeeTable
              onMutationResolved={handleMutationResolvedStatus}
              isLoadingEmployees={initialLoading}
              skills={initialSkills}
              employees={initialEmployees}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
