import React, { useEffect, useState, useRef } from "react";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { Icon } from "@iconify/react";
import { StaggerContainer, StaggerItem } from "../../../component/ui/Transitions";
import DoctorDashboard from "../../doctor/home/DoctorDashboard";

const ReceptionistDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [clinicId, setClinicId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const userSession = sessionStorage.getItem("user");
        const userData = userSession ? JSON.parse(userSession) : null;
        const cid = userData?.clinicId || "";
        setClinicId(cid);

        const url = cid ? `/user/get-doctor?clinicId=${cid}` : `/user/get-doctor`;
        const res = await AxiosInstance.get(url);
        
        if (res.data && res.data.users) {
          const allOption = { _id: "ALL", userName: "All Doctors", userType: "all" };
          const docs = [allOption, ...res.data.users];
          setDoctors(docs);
          setSelectedDoctor(allOption);
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDropdownOpen(false);
  };

  if (loadingDoctors) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Icon icon="solar:spinner-linear" className="animate-spin text-blue-500 text-5xl" />
          <span className="text-slate-400 font-black uppercase tracking-widest text-xs">Initializing Clinic Systems...</span>
        </div>
      </div>
    );
  }

  return (
    <StaggerContainer>
      <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
        <StaggerItem>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex flex-col gap-1">
              <h1 className="font-black text-slate-800 text-4xl tracking-tight leading-none">
                Central <span className="text-blue-500">Dashboard</span>
              </h1>
              <p className="text-slate-500 font-medium mt-2">
                Overview of clinic operations and daily appointments
              </p>
            </div>

            <div className="flex flex-col gap-3 relative" ref={dropdownRef}>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Switch View</label>
              
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-3 px-5 py-2.5 min-w-[240px] bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                {selectedDoctor ? (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">
                      {selectedDoctor.userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-slate-700 truncate max-w-[140px] text-left">{selectedDoctor.userName}</span>
                  </div>
                ) : (
                  <span className="text-sm font-bold text-slate-400">Select Physician</span>
                )}
                <Icon 
                  icon="solar:alt-arrow-down-linear" 
                  width={20} 
                  className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-[100%] mt-2 left-0 w-full min-w-[240px] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 flex flex-col p-2 gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {doctors.map((doc) => (
                    <button
                      key={doc.userId || doc._id}
                      onClick={() => handleDoctorSelect(doc)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${
                        selectedDoctor?._id === doc._id
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center font-black text-xs ${
                        selectedDoctor?._id === doc._id ? "bg-white text-blue-600 shadow-sm" : "bg-slate-100 text-slate-500"
                      }`}>
                        {doc.userName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold truncate flex-1">{doc.userName}</span>
                      {selectedDoctor?._id === doc._id && (
                        <Icon icon="solar:check-circle-bold" className="text-blue-500" width={20} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </StaggerItem>

        {selectedDoctor ? (
          <StaggerItem>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
              <DoctorDashboard targetDoctor={selectedDoctor} isEmbedded={true} />
            </div>
          </StaggerItem>
        ) : (
          <StaggerItem>
            <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[40px] border border-slate-200 border-dashed gap-6">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                <Icon icon="solar:users-group-two-rounded-linear" width={60} className="text-slate-200" />
              </div>
              <p className="font-black text-slate-400 uppercase tracking-widest text-sm text-center px-10">
                Please select a physician to access the clinical dashboard
              </p>
            </div>
          </StaggerItem>
        )}
      </div>
    </StaggerContainer>
  );
};

export default ReceptionistDashboard;
