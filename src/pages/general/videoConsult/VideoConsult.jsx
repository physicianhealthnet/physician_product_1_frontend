import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Icon } from "@iconify/react";
import { Modal, DatePicker, TimePicker, AutoComplete, Input, message, Tooltip } from "antd";
import dayjs from "dayjs";
import { AxiosInstance, AxiosInstanceDependency } from "../../../utilities/AxiosInstance";
import Button from "../../../component/ui/Button";
import Card from "../../../component/ui/Card";
import { StaggerContainer, StaggerItem } from "../../../component/ui/Transitions";

const VideoConsult = () => {
  const navigate = useNavigate();
  // Navigation tabs: "instant" or "scheduled"
  const [activeTab, setActiveTab] = useState("scheduled");
  
  // Instant Meet states
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [copied, setCopied] = useState(false);
  const [sdkLoading, setSdkLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Scheduled Meetings states
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  
  // Schedule Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeStep, setActiveStep] = useState("basic"); // "basic" or "schedule"
  
  const initialFormState = {
    patientId: "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    date: "",
    time: "",
    duration: 30,
    notes: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  
  const [googleConnected, setGoogleConnected] = useState(true); // Keeping state for backwards compat if needed, but not used
  
  // Get doctor user details from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  // The patient side creates video meetings using the clinic ID (cid) as the doctorId
  const doctorId = user?.cid || user?.clinicId || user?._id || "";
  const doctorName = user?.userName || "Specialist (Doctor)";

  // Load scheduled meetings
  const fetchMeetings = async () => {
    if (!doctorId) return;
    try {
      setLoadingMeetings(true);
      const res = await AxiosInstanceDependency.get(`/video-meetings?doctorId=${doctorId}`);
      if (res.data && res.data.success) {
        setMeetings(res.data.data);
      }
    } catch (err) {
      console.error("Error loading meetings:", err);
      message.error("Failed to load scheduled video consultations.");
    } finally {
      setLoadingMeetings(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [doctorId]);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.roomName) {
      setActiveTab("instant");
      setRoomName(location.state.roomName);
      setMeetingStarted(true);
      
      // Clear the state so it doesn't auto-join on subsequent navigation
      window.history.replaceState({}, document.title);
    } else {
      setRoomName("");
    }
  }, [location.state]);

  useEffect(() => {
    if (isModalOpen) {
      setActiveStep("basic");
    }
  }, [isModalOpen]);

  const handleStartMeet = async (customRoomName = null) => {
    let targetRoom = customRoomName || roomName;

    // If no room is specified, auto-generate a Jitsi room name
    if (!targetRoom || !targetRoom.trim()) {
      const randomString = Math.random().toString(36).substring(2, 12);
      targetRoom = `PHN-Consultation-${randomString}`;
    } else {
      // If the user provided a full URL, extract the room name
      if (targetRoom.startsWith("http")) {
        const parts = targetRoom.split("/");
        targetRoom = parts[parts.length - 1];
      }
    }

    setRoomName(targetRoom);
    setMeetingStarted(true);
  };

  const handleEndMeet = () => {
    setMeetingStarted(false);
    setRoomName("");
    fetchMeetings();
  };

  const handleCopyLink = (codeToCopy = null) => {
    let target = codeToCopy || roomName;
    if (target && !target.startsWith("http")) {
      target = `https://meet.jit.si/${target}`;
    }
    if (target) {
      navigator.clipboard.writeText(target);
      message.success("Join link copied to clipboard!");
      if (!codeToCopy) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // Autocomplete patient search
  const handlePatientSearch = async (value) => {
    if (!value) return;
    try {
      setSearchLoading(true);
      const res = await AxiosInstance.get(`/appointments/search?query=${value}`);
      if (res.data?.patients) {
        setSearchResults(
          res.data.patients.map((p) => ({
            value: p.patientName,
            label: (
              <div className="flex flex-col p-1.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded">
                <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Icon icon="solar:user-bold" className="text-primary-500" />
                  {p.patientName}
                </div>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-4">
                  <span className="flex items-center gap-1"><Icon icon="solar:phone-bold" className="text-green-500" /> {p.patientPhone}</span>
                  <span className="flex items-center gap-1"><Icon icon="solar:id-card-bold" className="text-purple-500" /> ID: {p.patientId}</span>
                </div>
              </div>
            ),
            data: p,
          }))
        );
      }
    } catch (err) {
      console.error("Patient search error:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectPatient = (value, option) => {
    const p = option.data;
    setFormData((prev) => ({
      ...prev,
      patientId: p.patientId,
      patientName: p.patientName,
      patientPhone: p.patientPhone || "",
      patientEmail: p.patientEmail || "",
    }));
    message.success(`Patient "${p.patientName}" selected`);
  };

  const handleScheduleSubmit = async () => {
    const { patientName, date, time } = formData;
    if (!patientName.trim() || !date || !time) {
      message.error("Please fill all required fields: Patient Name, Date, Time");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        ...formData,
        doctorId,
        doctorName,
      };

      const res = await AxiosInstanceDependency.post("/video-meetings", payload);
      if (res.data && res.data.success) {
        message.success("Video Consultation scheduled successfully!");
        setIsModalOpen(false);
        setFormData(initialFormState);
        fetchMeetings();
      }
    } catch (err) {
      console.error("Error scheduling video meeting:", err);
      message.error("Failed to schedule meeting.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (meetingDbId, newStatus) => {
    try {
      const res = await AxiosInstanceDependency.patch(`/video-meetings/${meetingDbId}/status`, { status: newStatus });
      if (res.data && res.data.success) {
        message.success(`Consultation successfully marked as ${newStatus}`);
        fetchMeetings();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      message.error("Failed to update status.");
    }
  };

  const filteredMeetings = meetings.filter((meet) => {
    const searchString = searchTerm.toLowerCase();
    const patientNameMatch = meet.patientName?.toLowerCase().includes(searchString);
    const phoneMatch = meet.patientPhone?.toLowerCase().includes(searchString);
    const emailMatch = meet.patientEmail?.toLowerCase().includes(searchString);
    const statusMatch = meet.status?.toLowerCase().includes(searchString);
    return patientNameMatch || phoneMatch || emailMatch || statusMatch;
  });

  if (meetingStarted) {
    return (
      <div className="p-4 md:p-8 flex flex-col gap-4 animate-in fade-in duration-300">
        {/* Call Controls Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 px-6 py-4 rounded-t-2xl border-b border-slate-800 text-white gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center border border-red-500/20">
              <Icon icon="solar:videocamera-record-bold" className="text-xl animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white mb-0">Active Consultation</h1>
              <p className="text-xs text-slate-400">Room: {roomName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopyLink()}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer ${
                copied ? "bg-emerald-600 text-white border-transparent" : "bg-slate-800 hover:bg-slate-700 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Icon icon="solar:check-circle-bold" className="text-sm" /> Copied Link
                </>
              ) : (
                <>
                  <Icon icon="solar:copy-bold-duotone" className="text-sm" /> Copy Call Link
                </>
              )}
            </button>
            <Button
              onClick={handleEndMeet}
              className="bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-600/20 text-xs px-5 py-2 rounded-xl font-bold transition-all hover:scale-105"
            >
              End Call
            </Button>
          </div>
        </div>
        {/* Jitsi Call Frame */}
        <div className="w-full h-[650px] bg-slate-950 rounded-b-2xl overflow-hidden shadow-2xl border border-slate-900">
          <JitsiMeeting
            domain="alpha.jitsi.net"
            roomName={roomName}
            configOverwrite={{
              startWithAudioMuted: false,
              startWithVideoMuted: false,
              disableModeratorIndicator: true,
              prejoinPageEnabled: false,
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo={{
              displayName: doctorName
            }}
            onApiReady={(externalApi) => {
              externalApi.addListener("videoConferenceLeft", () => {
                handleEndMeet();
              });
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100%';
              iframeRef.style.width = '100%';
              iframeRef.style.border = 'none';
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <StaggerContainer>
      <div className="p-4 md:p-8 flex flex-col gap-8">
        {/* Header Section */}
        <StaggerItem>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-row flex-nowrap gap-3 items-center">
              <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
                <Icon icon="tabler:arrow-left" className="w-4 h-4" />
                Back
              </Button>
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">
                  Video <span className="text-blue-500">Consultation</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-xl">
                  Schedule and conduct secure video calls, manage appointments, and connect with patients instantly.
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setFormData(initialFormState);
                setIsModalOpen(true);
              }}
              className="rounded-2xl px-8 h-12 shadow-lg shadow-blue-500/25 flex items-center gap-3 transition-all hover:scale-105"
            >
              <Icon icon="solar:calendar-add-bold" className="text-xl" />
              <span>Schedule Consultation</span>
            </Button>
          </div>
        </StaggerItem>

        {/* Tab Navigation & Search/Stats Bar */}
        <StaggerItem>
          <div className="flex flex-col gap-4">
            {/* Pills Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200/40">
              <button
                onClick={() => setActiveTab("scheduled")}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none ${
                  activeTab === "scheduled"
                    ? "bg-white text-blue-500 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                <Icon icon="solar:calendar-bold" className="text-base" />
                Scheduled Consultations
              </button>
              <button
                onClick={() => setActiveTab("instant")}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border-none ${
                  activeTab === "instant"
                    ? "bg-white text-blue-500 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                <Icon icon="solar:play-circle-bold" className="text-base" />
                Instant Meet Room
              </button>
            </div>

            {activeTab === "scheduled" && (
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar Card */}
                <div className="flex items-center shadow shadow-slate-200 flex-1 w-full gap-4 px-6 py-2 bg-white rounded-2xl border border-slate-200/50">
                  <Icon icon="tabler:search" className="text-[#14BEF0] text-xl" />
                  <input
                    type="text"
                    placeholder="Search consultations by patient name, phone, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 dark:text-slate-600 font-medium h-12"
                  />
                </div>
                {/* Stats Card */}
                <div className="flex items-center shadow shadow-slate-200 justify-between w-full max-lg:w-full lg:w-1/3 gap-4 px-6 py-2 bg-white rounded-2xl border border-slate-200/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#14BEF0]">
                      Total Consultations
                    </span>
                    <span className="text-2xl font-black text-[#14BEF0]">
                      {meetings.length}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#14BEF0]/10 flex items-center justify-center">
                    <Icon
                      icon="solar:videocamera-record-bold-duotone"
                      className="text-2xl text-[#14BEF0]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </StaggerItem>

        {/* Content Section */}
        <StaggerItem>
          {activeTab === "instant" ? (
            /* Instant Meet View */
            <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm text-center animate-in slide-in-from-bottom duration-300">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-4 border border-blue-100">
                <Icon icon="solar:play-circle-bold-duotone" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">Create Consultation Room</h2>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Start a secure video consultation session immediately. Leave blank to auto-generate a unique meeting space.
              </p>
              
              <div className="text-left mb-6">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Room Code / Meeting URL (Optional)</label>
                <input
                  type="text"
                  placeholder="Leave blank to auto-generate"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm transition-shadow font-semibold"
                />
              </div>

              <Button
                onClick={() => handleStartMeet()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl shadow-md cursor-pointer text-sm font-semibold hover:scale-[1.02] transition-transform"
              >
                <Icon icon="solar:videocamera-bold" className="text-lg" />
                Start Video Consultation
              </Button>
            </div>
          ) : (
            /* Scheduled Consultations Card Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingMeetings ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-slate-100 border border-slate-200/60 rounded-2xl h-48" />
                ))
              ) : filteredMeetings.length > 0 ? (
                filteredMeetings.map((meet) => {
                  const isCancelled = meet.status === "Cancelled";
                  const isCompleted = meet.status === "Completed";
                  const isScheduled = meet.status === "Scheduled";
                  const isRequested = meet.status === "Requested";

                  return (
                    <Card
                      key={meet._id}
                      className={`group hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden border-slate-200/60 ${
                        isCancelled 
                          ? "bg-slate-50/50 opacity-60" 
                          : isCompleted 
                          ? "bg-emerald-50/10" 
                          : isRequested
                          ? "bg-amber-50/10"
                          : "bg-white"
                      }`}
                    >
                      <div className="p-6 flex flex-col gap-4">
                        {/* Top row: Patient details & Status Badge */}
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-1">
                            <h3 className="font-black text-slate-800 text-lg group-hover:text-blue-500 transition-colors mb-0 flex items-center gap-1.5">
                              <Icon icon="solar:user-circle-bold" className="text-slate-400 text-xl" />
                              {meet.patientName}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                isCancelled 
                                  ? "bg-red-50 text-red-600 border-red-100"
                                  : isCompleted 
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                  : isRequested
                                  ? "bg-amber-50 text-amber-600 border-amber-200 animate-pulse"
                                  : "bg-blue-50 text-blue-600 border-blue-100"
                              }`}>
                                {meet.status}
                              </span>
                            </div>
                          </div>
                          
                          {/* Action buttons (top right) */}
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {isScheduled && (
                              <>
                                <Tooltip title="Copy Room Code">
                                  <button
                                    onClick={() => handleCopyLink(meet.roomName)}
                                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all shadow-sm border-none cursor-pointer"
                                  >
                                    <Icon icon="solar:copy-bold" className="text-lg" />
                                  </button>
                                </Tooltip>
                                <Tooltip title="Cancel Meeting">
                                  <button
                                    onClick={() => handleStatusChange(meet._id, "Cancelled")}
                                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm border-none cursor-pointer"
                                  >
                                    <Icon icon="solar:trash-bin-trash-bold" className="text-lg" />
                                  </button>
                                </Tooltip>
                                <Tooltip title="Mark Completed">
                                  <button
                                    onClick={() => handleStatusChange(meet._id, "Completed")}
                                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm border-none cursor-pointer"
                                  >
                                    <Icon icon="solar:check-circle-bold" className="text-lg" />
                                  </button>
                                </Tooltip>
                              </>
                            )}

                            {isRequested && (
                              <>
                                <Tooltip title="Decline Request">
                                  <button
                                    onClick={() => handleStatusChange(meet._id, "Cancelled")}
                                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-red-500 hover:text-white transition-all shadow-sm border-none cursor-pointer"
                                  >
                                    <Icon icon="solar:close-circle-bold" className="text-lg" />
                                  </button>
                                </Tooltip>
                                <Tooltip title="Approve Request">
                                  <button
                                    onClick={() => handleStatusChange(meet._id, "Scheduled")}
                                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm border-none cursor-pointer"
                                  >
                                    <Icon icon="solar:check-circle-bold" className="text-lg" />
                                  </button>
                                </Tooltip>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Middle row: Schedule info */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Session Schedule
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-50/50 text-[#14BEF0] text-[10px] font-bold rounded-lg border border-blue-100 shadow-sm flex items-center gap-1">
                              <Icon icon="solar:calendar-minimalistic-bold" />
                              {dayjs(meet.date).format("DD MMM YYYY")}
                            </span>
                            <span className="px-2 py-1 bg-blue-50/50 text-[#14BEF0] text-[10px] font-bold rounded-lg border border-blue-100 shadow-sm flex items-center gap-1">
                              <Icon icon="solar:clock-circle-bold" />
                              {meet.time} ({meet.duration}m)
                            </span>
                            {meet.roomName && (
                              <span className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-200 flex items-center gap-1 max-w-[120px] truncate" title={meet.roomName}>
                                <Icon icon="solar:key-bold" />
                                {meet.roomName}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Row: Patient contact details (left) and CTA Join Call (right) */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex flex-col text-slate-400 gap-0.5 text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1">
                              <Icon icon="solar:phone-bold" className="text-xs" />
                              {meet.patientPhone || "No Phone"}
                            </span>
                          </div>
                          <div>
                            {isScheduled ? (
                              <button
                                onClick={() => handleStartMeet(meet.roomName)}
                                className="bg-transparent border-none p-0 flex items-center gap-1.5 text-blue-500 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer"
                              >
                                Join Call
                                <Icon icon="tabler:chevron-right" />
                              </button>
                            ) : isRequested ? (
                              <button
                                onClick={() => handleStatusChange(meet._id, "Scheduled")}
                                className="bg-transparent border-none p-0 flex items-center gap-1.5 text-amber-600 font-black text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer animate-pulse"
                              >
                                Approve
                                <Icon icon="tabler:chevron-right" />
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-400 italic">Call closed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200/60 shadow-xs text-slate-400 gap-2">
                  <Icon icon="solar:calendar-add-linear" className="text-5xl opacity-40" />
                  <span className="text-sm font-semibold">No scheduled video consultations found.</span>
                  <button 
                    onClick={() => {
                      setFormData(initialFormState);
                      setIsModalOpen(true);
                    }}
                    className="mt-2 text-xs font-bold text-primary-500 hover:underline border-none bg-transparent cursor-pointer"
                  >
                    Schedule One Now
                  </button>
                </div>
              )}
            </div>
          )}
        </StaggerItem>
      </div>

      {/* Schedule Consultation Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={null}
        closeIcon={null}
        width={800}
        centered
        className="rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        styles={{
          mask: { backdropFilter: "blur(4px)" },
          content: { padding: "0px", borderRadius: "32px" },
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${activeStep === "basic" ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"}`}>
              <Icon icon={activeStep === "basic" ? "solar:user-bold" : "solar:calendar-add-bold"} className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 m-0 leading-none">
                {activeStep === "basic" ? "Patient Details" : "Date & Schedule"}
              </h2>
              <p className="text-xs text-slate-400 font-semibold m-0 mt-1 leading-none">
                {activeStep === "basic" ? "Step 1 of 2: Search & Demographics" : "Step 2 of 2: Set Meeting Schedule"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer border-0 bg-transparent"
          >
            <Icon icon="tabler:x" className="text-xl" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div 
            className={`h-full transition-all duration-500 ${activeStep === "basic" ? "w-1/2 bg-blue-500" : "w-full bg-emerald-500"}`}
          />
        </div>

        {/* Modal Content Body */}
        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {activeStep === "basic" ? (
            <div className="space-y-6 pt-2 text-slate-700 animate-in fade-in slide-in-from-left-4 duration-300">
              {/* Patient Autocomplete Search */}
              <div className="space-y-1 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">
                  Search Registered Patient (Optional)
                </label>
                <AutoComplete
                  style={{ width: "100%" }}
                  options={searchResults}
                  onSearch={handlePatientSearch}
                  onSelect={handleSelectPatient}
                  placeholder="Search Patient by Name, Phone, Email or ID..."
                  allowClear
                  loading={searchLoading}
                  className="h-10 border border-slate-200 rounded-lg hover:border-slate-300 focus:border-primary-500 transition-colors"
                  popupClassName="rounded-xl shadow-lg border border-slate-100"
                />
                <p className="text-[10px] text-slate-400 italic m-0">
                  Type to search from database. Selecting auto-fills the patient details.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">Patient Name *</label>
                  <Input
                    placeholder="Enter patient full name"
                    value={formData.patientName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, patientName: e.target.value }))}
                    className="h-10 rounded-lg border-slate-200 focus:border-primary-500 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">Phone Number</label>
                  <Input
                    placeholder="Enter 10-digit number"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, patientPhone: e.target.value.replace(/[^0-9]/g, "") }))}
                    className="h-10 rounded-lg border-slate-200 focus:border-primary-500 text-sm font-semibold"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">Email ID</label>
                  <Input
                    placeholder="patient@example.com"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, patientEmail: e.target.value }))}
                    className="h-10 rounded-lg border-slate-200 focus:border-primary-500 text-sm font-semibold"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-2 text-slate-700 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">Date *</label>
                  <DatePicker
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    value={formData.date ? dayjs(formData.date, "YYYY-MM-DD") : null}
                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                    onChange={(date, dateString) => setFormData((prev) => ({ ...prev, date: dateString }))}
                    className="h-10 rounded-lg border-slate-200 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">Start Time *</label>
                  <TimePicker
                    style={{ width: "100%" }}
                    format="hh:mm A"
                    use12Hours
                    value={formData.time ? dayjs(formData.time, "hh:mm A") : null}
                    onChange={(time, timeString) => setFormData((prev) => ({ ...prev, time: timeString }))}
                    className="h-10 rounded-lg border-slate-200 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">Duration (Min)</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                    className="w-full h-10 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 px-3 text-sm font-semibold bg-white"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1">Consultation Notes / Reason</label>
                <Input.TextArea
                  placeholder="Provide a brief summary or symptoms description..."
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="rounded-lg border-slate-200 focus:border-primary-500 text-sm font-semibold"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50">
          {/* Left Side Button */}
          <div>
            {activeStep === "schedule" ? (
              <Button
                onClick={() => setActiveStep("basic")}
                variant="secondary"
                className="rounded-xl px-5 py-2.5 flex items-center gap-2 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
              >
                <Icon icon="tabler:arrow-left" />
                Previous
              </Button>
            ) : (
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="secondary"
                className="rounded-xl px-5 py-2.5 border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Right Side Button */}
          <div>
            {activeStep === "basic" ? (
              <Button
                onClick={() => {
                  if (!formData.patientName?.trim()) {
                    message.error("Patient Name is required");
                    return;
                  }
                  setActiveStep("schedule");
                }}
                variant="primary"
                className="rounded-xl px-6 py-2.5 flex items-center gap-2 cursor-pointer"
              >
                Next
                <Icon icon="tabler:arrow-right" />
              </Button>
            ) : (
              <Button
                onClick={handleScheduleSubmit}
                loading={submitting}
                variant="primary"
                className="rounded-xl px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer border-0"
              >
                <Icon icon="tabler:circle-check" />
                {submitting ? "Scheduling..." : "Schedule Meeting"}
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </StaggerContainer>
  );
};

export default VideoConsult;
