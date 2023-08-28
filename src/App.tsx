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

  const handleMutationResolvedStatus = (data: boolean) => {
    setRequestRefetchSkillsFromMutation(data);
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
    console.log("fetchEmployeesAndSkills called");
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

  if (!storedToken) {
    // TODO - This is compromised, come back to later stage
    // If not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route
          index
          element={
            <ManageEmployees
              initialEmployees={employees}
              initialSkills={skills}
              initialLoading={loading}
            />
          }
        />
        <Route
          path="manage-employees"
          element={
            <ManageEmployees
              initialEmployees={employees}
              initialSkills={skills}
              initialLoading={loading}
            />
          }
        />
        <Route
          path="manage-employees/view/:employeeId"
          element={<ViewEmployee />}
        />
        <Route
          path="manage-employees/edit/:employeeId"
          element={<EditEmployee />}
        />
        <Route
          path="manage-skills"
          element={
            <ManageSkills
              onMutationResolved={handleMutationResolvedStatus}
              initialSkills={skills}
              initialLoading={loading}
            />
          }
        />
        <Route path="manage-skills/view/:skillId" element={<ViewSkill />} />
        <Route path="manage-skills/edit/:skillId" element={<EditSkill />} />
      </Route>
    </Routes>
  );
}

export default App;
