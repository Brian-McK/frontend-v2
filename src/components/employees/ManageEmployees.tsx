import React, { useState } from "react";
import { Col, Row, Card } from "antd";
import { EmployeeForm } from "./EmployeeForm";
import { EmployeeTable } from "./EmployeeTable";
import { IEmployeeArray } from "../../services/employeeservice";
import { ISkillsArray } from "../../services/skillsservice";
import { IMutationResolved } from "../../Interfaces/MutationInterface";

type ManageEmployeesProps = {
  initialEmployees: IEmployeeArray | null;
  initialSkills: ISkillsArray | null;
  initialLoading: boolean;
} & IMutationResolved;

export const ManageEmployees: React.FC<ManageEmployeesProps> = ({
  initialEmployees,
  initialSkills,
  initialLoading,
  onMutationResolved,
}: ManageEmployeesProps) => {
  const [error, setError] = useState<string | null>(null); // TODO - ERROR STATE

  return (
    <>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Card title={"Add an employee"} loading={initialLoading}>
            <EmployeeForm
              skillsToSelect={initialSkills}
              onMutationResolved={onMutationResolved}
            />
          </Card>
        </Col>
        <Col sm={24} lg={16}>
          <Card title={"Employees"} loading={initialLoading}>
            <EmployeeTable
              onMutationResolved={onMutationResolved}
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
