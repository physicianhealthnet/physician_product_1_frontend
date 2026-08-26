import React from "react";
import DoctorDashboard from "../pages/doctor/home/DoctorDashboard";
import ReceptionistDashboard from "../pages/receptionist/home/ReceptionistDashboard";

const DashboardWrapper = () => {
  let userType = null;
  try {
    const userSession = sessionStorage.getItem("user");
    const role = sessionStorage.getItem("master");
    const masterRole = role ? JSON.parse(role) : null;
    const userData = userSession ? JSON.parse(userSession) : null;
    userType = userData?.userType || masterRole?.userType;
  } catch (err) {
    console.error("Failed to parse user role in DashboardWrapper:", err);
  }

  const normalizedRole = userType?.toLowerCase();
  console.log(normalizedRole);
  if (normalizedRole === "doctor") {
    return <DoctorDashboard />;
  }

  // Default to Doctor Dashboard for doctors/masters
  return <ReceptionistDashboard />;
};

export default DashboardWrapper;
