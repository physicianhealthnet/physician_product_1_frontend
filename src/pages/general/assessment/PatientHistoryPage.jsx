import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { AxiosInstance, AxiosInstanceSecondryServer } from "../../../utilities/AxiosInstance";
import Button from "../../../component/ui/Button";
import Input from "../../../component/ui/Input";
import MedicalHistoryReadOnly from "./MedicalHistoryReadOnly";
import { Collapse, message } from "antd";
import { Icon } from "@iconify/react";

const PatientHistoryPage = () => {
  const [todayPatients, setTodayPatients] = useState([]);
  const [tomorrowPatients, setTomorrowPatients] = useState([]);
  const [otherPatients, setOtherPatients] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Read-only medical history state
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [medicalChecks, setMedicalChecks] = useState({});
  const [medicalTexts, setMedicalTexts] = useState({});

  const navigate = useNavigate();

  const userInfo = JSON.parse(
    sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}"
  );
  const clinicId = userInfo?.cid || userInfo?.clinicId;

  // Extract patient from appointment data
  const extractPatients = (appointments) => {
    if (!appointments) return [];
    const patientsMap = new Map();
    appointments.forEach(apt => {
      if (apt.patientId) {
        const patientData = apt.patientId._id ? apt.patientId : apt;
        if (!patientsMap.has(patientData._id || apt.patientId)) {
          patientsMap.set(patientData._id || apt.patientId, {
            ...patientData,
            _id: patientData._id || apt.patientId,
            patientName: patientData.patientName || apt.patientName || "Unknown",
            patientPhone: patientData.patientPhone || apt.patientPhone || "N/A",
            PHN_ID: patientData.PHN_ID || apt.PHN_ID,
            patientGender: patientData.patientGender || apt.patientGender,
            patientAge: patientData.patientAge || apt.patientAge
          });
        }
      }
    });
    return Array.from(patientsMap.values());
  };

  const loadAppointments = async () => {
    setLoadingInitial(true);
    try {
      const today = dayjs().format("YYYY-MM-DD");
      const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

      const [resToday, resTomorrow] = await Promise.all([
        AxiosInstance.get(`/appointments/get?date=${today}&page=1&limit=1000`),
        AxiosInstance.get(`/appointments/get?date=${tomorrow}&page=1&limit=1000`)
      ]);

      setTodayPatients(extractPatients(resToday.data?.data || resToday.data || []));
      setTomorrowPatients(extractPatients(resTomorrow.data?.data || resTomorrow.data || []));
    } catch (error) {
      console.error("Failed to load appointments:", error);
      message.error("Failed to load today's/tomorrow's appointments");
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    loadAppointments();
    searchOtherPatients(""); // initial load for others
  }, [clinicId]);

  const searchOtherPatients = async (query) => {
    setSearching(true);
    try {
      const res = await AxiosInstanceSecondryServer.post("/patientregistration/list", {
        clinicId,
        search: query,
      });
      setOtherPatients(res.data.patients || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchOtherPatients(searchQuery);
  };

  const handleSelectPatient = async (patientId, patient) => {
    setSelectedPatientId(patientId);
    if (!patientId || !patient) return;

    // Fetch the existing assessment data for this patient
    const id = patient.PHN_ID || patient.patientId || patient._id;
    try {
      const res = await AxiosInstance.get(`/assessment/get/${id}`);
      if (res.data && res.data.data) {
        const d = res.data.data;
        setMedicalChecks(d.medicalChecks || {});
        setMedicalTexts(d.medicalNotes || {});
      } else {
        setMedicalChecks({});
        setMedicalTexts({});
      }
    } catch (error) {
       console.log("No previous assessment or failed to load:", error);
       setMedicalChecks({});
       setMedicalTexts({});
    }
  };

  const renderPatientList = (patientsList, emptyMsg) => (
    patientsList.length > 0 ? (
      <div className="max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
        <Collapse 
          accordion 
          activeKey={selectedPatientId} 
          onChange={(key) => {
            if (key) {
               const p = patientsList.find(pt => String(pt._id) === String(key));
               handleSelectPatient(String(key), p);
            } else {
               handleSelectPatient(null, null);
            }
          }}
          className="bg-transparent border-none space-y-3"
          expandIconPlacement="end"
        >
          {patientsList.map((p) => (
            <Collapse.Panel 
              key={String(p._id)}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
              header={
                <div className="flex items-center gap-4 py-1">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {p.patientName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 m-0">{p.patientName}</h3>
                    <div className="text-xs text-slate-500 font-medium flex gap-3 mt-1">
                      <span>Ph: {p.patientPhone}</span>
                      <span>PHN: {p.PHN_ID || p.patientId || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              }
            >
              {selectedPatientId === String(p._id) && (
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                  <MedicalHistoryReadOnly 
                    medicalChecks={medicalChecks} 
                    medicalTexts={medicalTexts} 
                    patientGender={p.patientGender || "Male"} 
                    department={userInfo?.department || "general"}
                  />
                </div>
              )}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    ) : (
      <div className="text-center p-6 text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
        {emptyMsg}
      </div>
    )
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Icon icon="solar:history-bold-duotone" className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Patient History</h1>
            <p className="text-sm text-slate-500 font-medium">View historical clinical assessments</p>
          </div>
        </div>

        {loadingInitial ? (
           <div className="flex justify-center p-12 text-blue-500">
              <Icon icon="solar:spinner-bold-duotone" className="text-4xl animate-spin" />
           </div>
        ) : (
          <Collapse 
            defaultActiveKey={['today']} 
            className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden"
            expandIconPlacement="end"
            size="large"
          >
            <Collapse.Panel 
              key="today" 
              header={<div className="font-bold text-slate-800 flex items-center gap-2"><Icon icon="solar:calendar-date-bold-duotone" className="text-blue-500 text-lg"/> Patient History - Today's Appointments</div>}
            >
              {renderPatientList(todayPatients, "No appointments scheduled for today.")}
            </Collapse.Panel>

            <Collapse.Panel 
              key="tomorrow" 
              header={<div className="font-bold text-slate-800 flex items-center gap-2"><Icon icon="solar:calendar-mark-bold-duotone" className="text-orange-500 text-lg"/> Patient History - Tomorrow's Appointments</div>}
            >
              {renderPatientList(tomorrowPatients, "No appointments scheduled for tomorrow.")}
            </Collapse.Panel>

            <Collapse.Panel 
              key="others" 
              header={<div className="font-bold text-slate-800 flex items-center gap-2"><Icon icon="solar:users-group-rounded-bold-duotone" className="text-purple-500 text-lg"/> Patient History - Others</div>}
            >
              <form onSubmit={handleSearch} className="mb-6 flex gap-3 relative z-10">
                <div className="flex-1 relative">
                  <Icon icon="solar:minimalistic-magnifer-line-duotone" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                  <Input
                    type="text"
                    placeholder="Search other patients by name, phone, or PHN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 w-full bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
                <Button type="submit" variant="primary" loading={searching} className="px-8 shadow-md shadow-blue-500/20">
                  Search
                </Button>
              </form>

              {searching ? (
                <div className="flex justify-center p-8 text-blue-500">
                  <Icon icon="solar:spinner-bold-duotone" className="text-3xl animate-spin" />
                </div>
              ) : (
                renderPatientList(otherPatients, searchQuery ? "No matching patients found." : "Use the search bar to find patients.")
              )}
            </Collapse.Panel>
          </Collapse>
        )}

      </div>
    </div>
  );
};

export default PatientHistoryPage;
