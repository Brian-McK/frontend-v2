import React from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./components/login/Login";
import { ManageEmployees } from "./components/employees/ManageEmployees";
import { ManageSkills } from "./components/skills/ManageSkills";
import { ViewSkill } from "./components/skills/ViewSkill";
import { NotFound } from "./components/dashboard/NotFound";
import { EditSkill } from "./components/skills/EditSkill";

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
  const storedToken = localStorage.getItem("token");

  // TODO - This is compromised, come back to later stage

  if (!storedToken) {
    // If not authenticated, redirect to login
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<ManageEmployees />} />
        <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="manage-skills" element={<ManageSkills />} />
        <Route path="manage-skills/view/:skillId" element={<ViewSkill />} />
        <Route path="manage-skills/edit/:skillId" element={<EditSkill />} />
      </Route>
    </Routes>
  );
}

export default App;
