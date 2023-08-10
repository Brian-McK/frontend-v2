import React from "react";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { ManageEmployees } from "./components/employees/ManageEmployees";
import { ManageSkills } from "./components/skills/ManageSkills";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="login" element={<Login />} />
    <Route path="/dashboard/*" element={<DashboardRoutes />} />
  </Routes>
);

function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<Dashboard />}>
        <Route index element={<ManageEmployees />} />
        <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="manage-skills" element={<ManageSkills />} />
      </Route>
    </Routes>
  );
}

export default App;
