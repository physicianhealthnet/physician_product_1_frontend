import React, { useEffect, useState } from "react";
import { message, Select, Modal, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CloseCircleOutlined,
  CalendarOutlined,
  ClockCircleFilled,
  FolderOpenOutlined,
  IdcardOutlined,
  PhoneOutlined,
  TagsFilled,
  SolutionOutlined,
  SearchOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import {
  AxiosInstance,
  AxiosInstanceSecondryServer,
} from "../../../../utilities/AxiosInstance";
import Input from "../../../../component/ui/Input";
import Button from "../../../../component/ui/Button";
import Reschedule from "../Reschedule";
import { useNavigate } from "react-router-dom";
import PatientClinicalDataModal from "../../../../component/dashboard/PatientClinicalDataModal";
import { Icon } from "@iconify/react";
import IncomingWebRequests from "./IncomingWebRequests";
import LiveSchedule from "./LiveSchedule";
import FollowUpTracker from "./FollowUpTracker";

const { Option } = Select;

const ManageAppointments = ({
  refresh,
  setStateChange,
  stateChange,
  selectedGroup,
  clinicId,
  onDoctorFilterChange,
}) => {
  const [appointments, setAppointments] = useState([]);
  const [pendingWebRequests, setPendingWebRequests] = useState([]);
  const [filterDate, setFilterDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(1000);
  const [total, setTotal] = useState(0);

  const [doctorsList, setDoctorsList] = useState([]);
  const [filterDoctor, setFilterDoctor] = useState("");

  useEffect(() => {
    const getDoctors = async () => {
      const currentClinicId = clinicId || JSON.parse(sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}")?.clinicId;
      if (!currentClinicId) return;
      try {
        const response = await AxiosInstance.get(
          `/user/get-doctor?clinicId=${currentClinicId}`,
        );
        setDoctorsList(response.data.users || []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
    getDoctors();
  }, [clinicId]);

  useEffect(() => {
    if (selectedGroup) {
      setFilterDoctor(selectedGroup.userName);
    } else {
      setFilterDoctor("");
    }
  }, [selectedGroup]);

  // Patient Details
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, patientId: null });

  const getAppointments = async (date, pageNo = 1) => {
    try {
      const [internalRes, webRes] = await Promise.allSettled([
        AxiosInstance.get(
          `/appointments/get?date=${date}&status=${filterStatus}&search=${searchTerm}&page=${pageNo}&limit=${limit}`,
        ),
        AxiosInstanceSecondryServer.get(
          `user-appointment/clinic-appointments/${sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user"))?.cid : ""}`,
        ),
      ]);

      const internalApptsRaw =
        internalRes.status === "fulfilled"
          ? internalRes.value.data.data || []
          : [];
          
      // Flag internal appointments that originated from web so UI treats them properly
      const internalAppts = internalApptsRaw.map(appt => 
        appt.webAppointmentId ? { ...appt, isWebAppointment: true } : appt
      );
      let webAppts =
        webRes.status === "fulfilled" ? webRes.value.data.data || [] : [];

      // Extract pending requests globally (not filtered by date)
      const pendingWeb = webAppts.filter(appt => {
        const s = appt.status?.toLowerCase();
        return s === "pending" || (!s && !appt.localAppointmentId);
      }).map(appt => ({ ...appt, isWebAppointment: true }));
      setPendingWebRequests(pendingWeb);

      // Filter approved web appointments by date for Live Schedule
      let approvedWebAppts = webAppts
        .filter((appt) => {
          if (!appt.appointmentDate) return false;
          const apptDate = dayjs(appt.appointmentDate).format("YYYY-MM-DD");
          if (date && apptDate !== date) return false;

          // Apply search if exists
          if (
            searchTerm &&
            !appt.patientName?.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return false;
          }

          // Only show approved web appointments in Live Schedule
          const webStatus = appt.status?.toLowerCase();
          if (webStatus !== "approve" && webStatus !== "approved") {
            return false;
          }

          // Apply selected status filter if exists
          if (filterStatus) {
            const searchStatusLower = filterStatus.toLowerCase();
            if (searchStatusLower !== "completed" && searchStatusLower !== "booked") {
              return false;
            }
          }

          return true;
        })
        .map((appt) => {
          // Link with local status if already synced
          const localMatch = internalAppts.find((l) => l.webAppointmentId === appt._id);
          
          return {
            ...appt,
            isWebAppointment: true,
            localAppointmentId: localMatch?._id,
            localStatus: localMatch?.status,
            startTime: appt.selectedSlot
              ? appt.selectedSlot.split("-")[0].trim()
              : "TBD",
            endTime:
              appt.selectedSlot && appt.selectedSlot.includes("-")
                ? appt.selectedSlot.split("-")[1].trim()
                : "TBD",
            doctor: appt.docName,
            mappedStatus: (function () {
              if (localMatch) return localMatch.status;
              const s = appt.status?.toLowerCase();
              if (s === "approve" || s === "approved") return "Booked";
              if (s === "reject" || s === "cancelled") return "Cancelled";
              return "Booked";
            })(),
          };
        });

      // Filter out web appts that are already synced locally
      const syncedWebIds = new Set(internalAppts.map(l => l.webAppointmentId).filter(Boolean));
      approvedWebAppts = approvedWebAppts.filter(w => !syncedWebIds.has(w._id));

      const combined = [...internalAppts, ...approvedWebAppts];

      setAppointments(combined);
      setTotal(combined.length);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    getAppointments(filterDate, page);
  }, [
    filterDate,
    filterStatus,
    searchTerm,
    page,
    refresh,
    showRescheduleModal,
    stateChange,
  ]);

  // Fetch detailed info for patients in the current appointment list
  useEffect(() => {
    const fetchDetails = async () => {
      // Extract unique patient IDs
      const patientIds = appointments
        .map((appt) => appt.patientId || appt.PHN_ID)
        .filter(Boolean);
      
      const uniqueIds = [...new Set(patientIds)].join(",");
      if (!uniqueIds) return;

      setLoadingDetails(true);
      try {
        const res = await AxiosInstance.get(`/business-tool/dashboard-patient-list?patientIds=${uniqueIds}`);
        if (res.data && res.data.data) {
          setPatientDetails(prev => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.error("Failed to fetch patient detailed list", err);
      } finally {
        setLoadingDetails(false);
      }
    };

    if (appointments.length > 0) {
      fetchDetails();
    }
  }, [appointments]);

  const updateStatus = async (appt, status) => {
    console.log(appt);
    
    try {
      let appointmentId = appt._id;

      // If it's a web appointment, we need to ensure it exists locally first.
      // Internal appointments have 'appointmentId' string. Web appts with a local match have 'localAppointmentId'.
      const isLocallyExisting = !!(appt.appointmentId || appt.localAppointmentId);
      if (appt.isWebAppointment && !isLocallyExisting) {
        try {
          // Try to create/sync it locally
          const syncData = {
            patientName: appt.patientName,
            patientId: appt.patientId || appt.PHN_ID,
            phoneNumber: appt.phoneNumber || appt.patientPhone || appt.patientPhno,
            doctor: appt.doctor || appt.docName,
            doctorId: appt.doctorId || appt.docId,
            category: appt.category || "Consultation",
            date: appt.appointmentDate || appt.date,
            startTime: appt.startTime || appt.selectedSlot,
            endTime: appt.endTime,
            clinicId: appt.clinicId || appt.cid || (sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user"))?.cid : ""),
            status: "Booked", // Initial local status
            webAppointmentId: appt._id, // Reference to Hub ID
          };
          const createRes = await AxiosInstance.post("/appointments/", syncData);
          appointmentId = createRes.data.appointment._id;
        } catch (createErr) {
          // If it fails because it already exists (400), we might need to find it
          if (createErr.response?.status === 400 && createErr.response?.data?.appointment) {
            appointmentId = createErr.response.data.appointment._id;
          } else {
            throw createErr;
          }
        }
      }

      // 🔄 Sync status back to Hub if it's a web-booked appointment
      if (appt.isWebAppointment || appt.webAppointmentId) {
        const hubId = appt.webAppointmentId || appt._id;
        try {
          // Send status to Hub (map 'booked' to 'approve' for web appointments)
          let hubStatus = status.toLowerCase();
          if (hubStatus === "booked") hubStatus = "approve";
          await AxiosInstanceSecondryServer.patch(`/user-appointment/status/${hubId}`, {
            status: hubStatus
          });
        } catch (hubErr) {
          console.error("Failed to sync status to Hub:", hubErr);
        }
      }

      if (status === "Cancelled") {
        const reason = prompt("Enter cancellation reason (Patient/PT):");
        if (!reason) return;
        await AxiosInstance.put(`/appointments/${appointmentId}`, {
          status,
          cancelReason: reason,
          cancelledBy: "PT",
        });
      } else {
        await AxiosInstance.put(`/appointments/${appointmentId}`, {
          status,
        });
      }
      message.success(`Status updated to ${status}`);
      getAppointments(filterDate);
      setStateChange(status);
    } catch (err) {
      console.error(err);
      message.error("Failed to update status");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Booked":
        return <ClockCircleOutlined className="text-yellow-500" />;
      case "Checked-in":
        return <UserOutlined className="text-blue-500" />;
      case "Engaged":
        return <ClockCircleFilled className="text-purple-500" />;
      case "Completed":
        return <CheckCircleOutlined className="text-green-500" />;
      case "Checked-out":
        return <CheckCircleOutlined className="text-pink-500" />;
      case "Cancelled":
        return <CloseCircleOutlined className="text-red-500" />;
      default:
        return <ClockCircleOutlined className="text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "bg-yellow-50 text-yellow-700   border border-yellow-100 ";
      case "Checked-in":
        return "bg-blue-50 text-blue-700   border border-blue-100 ";
      case "Engaged":
        return "bg-purple-50 text-purple-700   border border-purple-100 ";
      case "Completed":
        return "bg-green-50 text-green-700   border border-green-100 ";
      case "Checked-out":
        return "bg-pink-50 text-pink-700   border border-pink-100 ";
      case "Cancelled":
        return "bg-red-50 text-red-700   border border-red-100 ";
      default:
        return "bg-slate-50 text-slate-700   border border-slate-100 ";
    }
  };

  const getStatusTime = (appt, status) => {
    switch (status) {
      case "Checked-in":
        return appt.checkedInAt
          ? dayjs(appt.checkedInAt).format("hh:mm A")
          : "-";
      case "Engaged":
        return appt.engagedStartAt
          ? dayjs(appt.engagedStartAt).format("hh:mm A")
          : "-";
      case "Completed":
        return appt.completedAt
          ? dayjs(appt.completedAt).format("hh:mm A")
          : "-";
      case "Checked-out":
        return appt.checkedOutAt
          ? dayjs(appt.checkedOutAt).format("hh:mm A")
          : "-";
      default:
        return "-";
    }
  };

  const openModal = (appt) => {
    setSelectedAppt(appt);
    setModalVisible(true);
  };

  const openRescheduleModal = (appt) => {
    setSelectedAppt(appt);
    setShowRescheduleModal(true);
  };

  const onClose = () => {
    setShowRescheduleModal(false);
  };

  const onSuccess = () => {
    setShowRescheduleModal(false);
  };

  const toggleRow = (id) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedRows(newSet);
  };

  const filteredAppointments = appointments.filter((appt) => {
    const docFilter = filterDoctor || selectedGroup?.userName;
    if (docFilter) {
      const apptDoc = appt.doctor || appt.docName || appt.doctorName;
      return apptDoc === docFilter;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-5 flex-1 min-w-0 w-full bg-white p-5 border border-slate-200/50 rounded-2xl">
      {/* Filters */}
      <div className="flex flex-col gap-4 bg-slate-50/50 border border-slate-200/50  shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
          <div className="relative group w-full sm:w-52">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-all duration-300 z-10">
              <CalendarOutlined className="text-lg" />
            </div>
            <Input
              type={filterDate ? "date" : "text"}
              placeholder="Select Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full h-12 pl-12 pr-10 bg-white border-slate-200/60 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight"
            />
            {filterDate && (
              <button
                onClick={() => setFilterDate("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors z-10"
                title="Clear Date"
              >
                <Icon icon="solar:close-circle-bold" className="text-lg" />
              </button>
            )}
          </div>

          <Select
            placeholder="Filter by Status"
            allowClear
            value={filterStatus || undefined}
            onChange={(val) => setFilterStatus(val || "")}
            className="w-full sm:w-52 h-12 custom-select-premium"
            popupClassName="  rounded-2xl shadow-2xl border-slate-700/50"
          >
            {[
              "Booked",
              "Checked-in",
              "Engaged",
              "Completed",
              "Checked-out",
              "Cancelled",
            ].map((status) => (
              <Option key={status} value={status}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(status).split(" ")[0]}`}
                  ></div>
                  {status}
                </div>
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Doctor"
            allowClear
            value={filterDoctor || undefined}
            onChange={(val) => {
              const selected = doctorsList.find((doc) => doc.userName === val);
              setFilterDoctor(val || "");
              if (onDoctorFilterChange) {
                onDoctorFilterChange(selected || null);
              }
            }}
            className="w-full sm:w-52 h-12 custom-select-premium"
            popupClassName="rounded-2xl shadow-2xl border-slate-700/50"
          >
            {doctorsList.map((doc) => (
              <Option key={doc._id} value={doc.userName}>
                {doc.userName}
              </Option>
            ))}
          </Select>

          <div className="relative group w-full sm:w-52">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-all duration-300 z-10">
              <SearchOutlined className="text-lg" />
            </div>
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 bg-white  border-slate-200/60  rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 transition-all font-bold tracking-tight"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <IncomingWebRequests
          pendingRequests={pendingWebRequests}
          onApprove={(appt) => updateStatus(appt, "Booked")}
          onReschedule={(appt) => openRescheduleModal(appt)}
        />
        
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <LiveSchedule
            appointments={filteredAppointments}
            updateStatus={updateStatus}
            getStatusIcon={getStatusIcon}
            getStatusColor={getStatusColor}
          />
          <FollowUpTracker />
        </div>
      </div>


      {/* Modal */}
      <Reschedule
        appt={selectedAppt}
        visible={showRescheduleModal}
        onClose={onClose}
        onSuccess={onSuccess}
      />
      <Modal
        open={modalVisible}
        title={
          <span className="text-xl font-bold text-slate-800 ">
            Appointment Details
          </span>
        }
        footer={[
          selectedAppt && (selectedAppt.mappedStatus || selectedAppt.status) === "Booked" && (
            <Button
              key="checkin"
              onClick={() => {
                updateStatus(selectedAppt, "Checked-in");
                setModalVisible(false);
              }}
            >
              Check In
            </Button>
          ),
          selectedAppt && (selectedAppt.mappedStatus || selectedAppt.status) === "Checked-in" && (
            <Button
              key="engage"
              onClick={() => {
                updateStatus(selectedAppt, "Engaged");
                setModalVisible(false);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white border-0"
            >
              Engage
            </Button>
          ),
          selectedAppt && (selectedAppt.mappedStatus || selectedAppt.status) === "Engaged" && (
            <Button
              key="complete"
              onClick={() => {
                updateStatus(selectedAppt, "Completed");
                setModalVisible(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white border-0"
            >
              Complete
            </Button>
          ),
          selectedAppt && (selectedAppt.mappedStatus || selectedAppt.status) === "Completed" && (
            <Button
              key="checkout"
              onClick={() => {
                updateStatus(selectedAppt, "Checked-out");
                setModalVisible(false);
              }}
              className="bg-slate-600 hover:bg-slate-700 text-white border-0"
            >
              Check Out
            </Button>
          ),
          <Button
            key="close"
            variant="secondary"
            onClick={() => setModalVisible(false)}
          >
            Close
          </Button>,
        ]}
        onCancel={() => setModalVisible(false)}
        width={600}
        centered
        className="dark-modal"
        styles={{
          mask: { backdropFilter: "blur(4px)" },
          content: { padding: "24px", borderRadius: "16px" },
        }}
      >
        {selectedAppt && (
          <div className="flex flex-col gap-6 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 ">
                  <CheckCircleOutlined className="text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Appointment ID
                    </span>
                    <span className="font-semibold">
                      {selectedAppt.appointmentId}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 ">
                  <UserOutlined className="text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Patient Name
                    </span>
                    <span className="font-semibold">
                      {selectedAppt.patientName}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 ">
                  <IdcardOutlined className="text-purple-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Aadhaar
                    </span>
                    <span className="font-semibold">
                      {selectedAppt.aadhaarNumber || "—"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 ">
                  <PhoneOutlined className="text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Phone
                    </span>
                    <span className="font-semibold">
                      {selectedAppt.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 ">
                  <TagsFilled className="text-orange-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Category
                    </span>
                    <span className="font-semibold">
                      {selectedAppt.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 ">
                  <SolutionOutlined className="text-pink-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Doctor
                    </span>
                    <span className="font-semibold">{selectedAppt.doctor}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 ">
                  <CalendarOutlined className="text-slate-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Date
                    </span>
                    <span className="font-semibold">
                      {dayjs(selectedAppt.date).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 ">
                  <ClockCircleOutlined className="text-yellow-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Time
                    </span>
                    <span className="font-semibold">
                      {selectedAppt.startTime} - {selectedAppt.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50  border border-slate-100 ">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Status
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(selectedAppt.mappedStatus || selectedAppt.status)}`}
                >
                  {selectedAppt.mappedStatus || selectedAppt.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Checked-in:</span>
                  <span className="font-bold text-slate-700 ">
                    {getStatusTime(selectedAppt, "Checked-in")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Engaged:</span>
                  <span className="font-bold text-slate-700 ">
                    {getStatusTime(selectedAppt, "Engaged")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Completed:</span>
                  <span className="font-bold text-slate-700 ">
                    {getStatusTime(selectedAppt, "Completed")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Checked-out:</span>
                  <span className="font-bold text-slate-700 ">
                    {getStatusTime(selectedAppt, "Checked-out")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Clinical Data Modal */}
      <PatientClinicalDataModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ isOpen: false, type: null, patientId: null })}
        type={modalConfig.type}
        patientId={modalConfig.patientId}
      />
    </div>
  );
};

export default ManageAppointments;
