import React, { useState } from "react";
import ManageAppointments from "./ManageAppointments";
import { ArrowLeft } from "lucide-react";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../../component/ui/Transitions";
import Button from "../../../../component/ui/Button";
import { useNavigate } from "react-router-dom";
import QuickLinks from "../../../../component/ui/QuickLinks";

export default function Calendar({ refreshTrigger }) {
  const navigate = useNavigate();
  const user = (() => {
    try {
      const str =
        sessionStorage.getItem("master") || sessionStorage.getItem("user");
      return str ? JSON.parse(str) : null;
    } catch (e) {
      return null;
    }
  })();

  const [selectedGroup, setSelectedGroup] = useState(null); // selected doctor
  const [stateChange, setStateChange] = useState(null);

  return (
    <StaggerContainer>
      <div className="flex flex-col gap-6 p-4 sm:p-6 bg-slate-50/50 min-h-screen">
        <StaggerItem>
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center w-full">
            <div className="flex flex-row flex-nowrap gap-3 items-center">
              <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="font-black text-slate-800 text-4xl tracking-tight">
                Appointments <span className="text-blue-500">Dashboard</span>
              </h1>
            </div>
            <Button
              onClick={() => navigate("/appointment-booking")}
              className="justify-center gap-3 h-10 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all font-bold"
            >
              Book Appointment
            </Button>
          </div>
        </StaggerItem>

        <div className="flex flex-col gap-8 w-full items-start">
          <StaggerItem>
            <QuickLinks links={[
              { label: "Patients", icon: "solar:users-group-two-rounded-linear", route: "/home", color: "blue" },
              { label: "Video Consultation", icon: "solar:videocamera-record-linear", route: "/video-consult", color: "purple" },
              { label: "Doctors & Staff", icon: "solar:stethoscope-linear", route: "/master/doctor-and-staffs", color: "emerald" },
            ]} />
          </StaggerItem>

          <StaggerItem className="w-full">
            <div className="flex flex-col w-full self-start gap-8 transition-all">
              <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
                <ManageAppointments
                  clinicId={user?.clinicId}
                  stateChange={stateChange}
                  setStateChange={setStateChange}
                  refresh={refreshTrigger}
                  selectedGroup={selectedGroup}
                  onDoctorFilterChange={setSelectedGroup}
                />
              </div>
            </div>
          </StaggerItem>
        </div>
      </div>
    </StaggerContainer>
  );
}
