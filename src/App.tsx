import React, { useEffect, useState } from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/login/Login";
import { ManageEmployees } from "./components/employees/ManageEmployees";
import { ManageSkills } from "./components/skills/ManageSkills";
import { ViewSkill } from "./components/skills/ViewSkill";
import { NotFound } from "./components/dashboard/NotFound";
import { EditSkill } from "./components/skills/EditSkill";
import { IEmployeeArray, getAllEmployees } from "./services/employeeservice";
import { ISkillsArray, getAllSkills } from "./services/skillsservice";
import { ViewEmployee } from "./components/employees/ViewEmployee";
import { EditEmployee } from "./components/employees/EditEmployee";

type GetSkillsResponseType = {
  data: ISkillsArray;
  status: number;
};

type GetEmployeesResponseType = {
  data: IEmployeeArray;
  status: number;
};

const App: React.FC = () => (
  <>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </div>
  </>
);

function DashboardRoutes() {
  const [employees, setEmployees] = useState<IEmployeeArray | null>(null);
  const [skills, setSkills] = useState<ISkillsArray | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // TODO - ERROR STATE
  const [
    requestRefetchSkillsFromMutation,
    setRequestRefetchSkillsFromMutation,
  ] = useState<boolean>(false);

  const [
    requestRefetchEmployeesFromMutation,
    setRequestRefetchEmployeesFromMutation,
  ] = useState<boolean>(false);

  const handleMutationResolvedSkillsStatus = (data: boolean) => {
    setRequestRefetchSkillsFromMutation(data);
  };

  const handleMutationResolvedEmployeesStatus = (data: boolean) => {
    setRequestRefetchEmployeesFromMutation(data);
  };

  const storedToken = localStorage.getItem("token");

  const fetchEmployeesAndSkills = async () => {
    try {
      setLoading(true);

      const [employeesResponse, skillsResponse] = await Promise.all([
        getAllEmployees(),
        getAllSkills(),
      ]);

      setLoading(false);

      const employeesData = employeesResponse.data as IEmployeeArray;
      const skillsData = skillsResponse.data as ISkillsArray;

      setEmployees(employeesData);
      setSkills(skillsData);
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchEmployeesAndSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const skillsResponse: GetSkillsResponseType = await getAllSkills();
      setSkills(skillsResponse.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestRefetchSkillsFromMutation) {
      fetchSkills();
      setRequestRefetchSkillsFromMutation(false);
    }
  }, [requestRefetchSkillsFromMutation]);

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
    if (requestRefetchEmployeesFromMutation) {
      fetchEmployees();
      setRequestRefetchEmployeesFromMutation(false);
    }
  }, [requestRefetchEmployeesFromMutation]);

  if (!storedToken) {
    // TODO - This is compromised, come back to later stage
    // If not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  const EmployeeProps = {
    onMutationResolved: handleMutationResolvedEmployeesStatus,
    initialEmployees: employees,
    initialSkills: skills,
    initialLoading: loading,
  };

  const SkillProps = {
    onMutationResolved: handleMutationResolvedSkillsStatus,
    initialSkills: skills,
    initialLoading: loading,
  };

  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<ManageEmployees {...EmployeeProps} />} />
        <Route
          path="manage-employees"
          element={<ManageEmployees {...EmployeeProps} />}
        />
        <Route
          path="manage-employees/view/:employeeId"
          element={<ViewEmployee />}
        />
        <Route
          path="manage-employees/edit/:employeeId"
          element={
            <EditEmployee
              onMutationResolved={handleMutationResolvedEmployeesStatus}
            />
          }
        />
        <Route
          path="manage-skills"
          element={<ManageSkills {...SkillProps} />}
        />
        <Route path="manage-skills/view/:skillId" element={<ViewSkill />} />
        <Route
          path="manage-skills/edit/:skillId"
          element={
            <EditSkill
              onMutationResolved={handleMutationResolvedSkillsStatus}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
