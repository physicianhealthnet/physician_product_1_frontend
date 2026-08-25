import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { Icon } from "@iconify/react";
import { DatePicker, TimePicker, AutoComplete, Input, message, Tooltip } from "antd";
import dayjs from "dayjs";
import { AxiosInstance, AxiosInstanceDependency } from "../../../utilities/AxiosInstance";
import Button from "../../../component/ui/Button";
import Card from "../../../component/ui/Card";
import { StaggerContainer, StaggerItem } from "../../../component/ui/Transitions";

const SCHEDULE_SLIDES = [
  {
    id: 1,
    key: "search",
    title: "Search Patient",
    description: "Search registered patient records to auto-fill details.",
    icon: "tabler:user-search",
    required: false,
  },
  {
    id: 2,
    key: "patient_info",
    title: "Patient Details",
    description: "Enter patient full name, phone number, and email address.",
    icon: "tabler:user",
    required: true,
  },
  {
    id: 3,
    key: "date_time",
    title: "Date & Time",
    description: "Set consultation date, start time, and session duration.",
    icon: "tabler:calendar-time",
    required: true,
  },
  {
    id: 4,
    key: "notes_review",
    title: "Notes & Confirmation",
    description: "Add clinical consultation notes and confirm schedule.",
    icon: "tabler:file-check",
    required: false,
  },
];

const VideoConsult = () => {
  const navigate = useNavigate();
  // Navigation tabs: "scheduled" or "instant"
  const [activeTab, setActiveTab] = useState("scheduled");

  // Instant Meet states
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Scheduled Meetings states
  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);

  // Schedule Wizard states (full page / area slider)
  const [isSchedulingMode, setIsSchedulingMode] = useState(false);
  const [scheduleStep, setScheduleStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

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

  // Get doctor user details from sessionStorage
  const user = JSON.parse(
    sessionStorage.getItem("user") || sessionStorage.getItem("master") || "{}"
  );
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
      window.history.replaceState({}, document.title);
    } else {
      setRoomName("");
    }
  }, [location.state]);

  const handleStartMeet = async (customRoomName = null) => {
    let targetRoom = customRoomName || roomName;

    if (!targetRoom || !targetRoom.trim()) {
      targetRoom = `phn-clinic-${Math.random().toString(36).substring(2, 9)}`;
    }

    setRoomName(targetRoom);
    setMeetingStarted(true);
  };

  const handleEndMeet = () => {
    setMeetingStarted(false);
    setRoomName("");
  };

  const handleCopyLink = () => {
    const meetingUrl = `${window.location.origin}/video-consult?room=${roomName}`;
    navigator.clipboard.writeText(meetingUrl);
    setCopied(true);
    message.success("Call link copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePatientSearch = async (value) => {
    if (!value || !value.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setSearchLoading(true);
      const res = await AxiosInstance.get(`/appointments/search?query=${value}`);
      const list = res.data?.patients || res.data?.data || [];
      const query = value.toLowerCase();
      const filtered = list.filter((p) => {
        return (
          p.patientName?.toLowerCase().includes(query) ||
          p.patientPhone?.toLowerCase().includes(query) ||
          p.patientEmail?.toLowerCase().includes(query) ||
          p.patientId?.toLowerCase().includes(query)
        );
      });

      setSearchResults(
        filtered.map((p) => ({
          value: p.patientName,
          label: (
            <div className="py-1 flex flex-col border-b border-slate-100 last:border-0 hover:bg-blue-50/60 p-1 rounded-lg transition-colors">
              <div className="font-bold text-slate-800 text-sm">
                {p.patientName}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Icon icon="solar:phone-linear" className="text-emerald-500" /> {p.patientPhone}
                </span>
                {p.patientId && (
                  <span className="flex items-center gap-1">
                    <Icon icon="solar:id-card-linear" className="text-purple-500" /> ID: {p.patientId}
                  </span>
                )}
              </div>
            </div>
          ),
          data: p,
        }))
      );
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
    message.success(`Selected patient: "${p.patientName}"`);
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
        setIsSchedulingMode(false);
        setScheduleStep(1);
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
      const res = await AxiosInstanceDependency.patch(
        `/video-meetings/${meetingDbId}/status`,
        { status: newStatus }
      );
      if (res.data && res.data.success) {
        message.success(`Consultation marked as ${newStatus}`);
        fetchMeetings();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      message.error("Failed to update status.");
    }
  };

  const handleDeleteMeeting = async (meetingDbId) => {
    try {
      const res = await AxiosInstanceDependency.delete(`/video-meetings/${meetingDbId}`);
      if (res.data && res.data.success) {
        message.success("Consultation deleted successfully!");
        fetchMeetings();
      }
    } catch (err) {
      console.error("Error deleting meeting:", err);
      message.error("Failed to delete meeting.");
    }
  };

  const activeSlideMeta = SCHEDULE_SLIDES[scheduleStep - 1];

  const handleNextStep = () => {
    if (scheduleStep === 2) {
      if (!formData.patientName?.trim()) {
        message.error("Please enter Patient Name before proceeding");
        return;
      }
    } else if (scheduleStep === 3) {
      if (!formData.date || !formData.time) {
        message.error("Please select Date and Start Time before proceeding");
        return;
      }
    }

    if (scheduleStep < SCHEDULE_SLIDES.length) {
      setScheduleStep((prev) => prev + 1);
    } else {
      handleScheduleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (scheduleStep > 1) {
      setScheduleStep((prev) => prev - 1);
    }
  };

  const handleSkipStep = () => {
    if (scheduleStep < SCHEDULE_SLIDES.length) {
      setScheduleStep((prev) => prev + 1);
    } else {
      handleScheduleSubmit();
    }
  };

  const filteredMeetings = meetings.filter((meet) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const patientNameMatch = meet.patientName?.toLowerCase().includes(term);
    const phoneMatch = meet.patientPhone?.toLowerCase().includes(term);
    const emailMatch = meet.patientEmail?.toLowerCase().includes(term);
    const statusMatch = meet.status?.toLowerCase().includes(term);
    return patientNameMatch || phoneMatch || emailMatch || statusMatch;
  });

  if (meetingStarted) {
    return (
      <div className="p-4 md:p-8 flex flex-col gap-4 animate-in fade-in duration-300">
        {/* Call Controls Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 px-6 py-4 rounded-t-2xl border-b border-slate-800 text-white gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center border border-red-500/20">
              <Icon icon="solar:videocamera-record-linear" className="text-xl animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white mb-0">Active Consultation</h1>
              <p className="text-xs text-slate-400">Room: {roomName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5 cursor-pointer ${
                copied ? "bg-emerald-600 text-white border-transparent" : "bg-slate-800 hover:bg-slate-700 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Icon icon="solar:check-circle-linear" className="text-sm" /> Copied Link
                </>
              ) : (
                <>
                  <Icon icon="solar:copy-linear" className="text-sm" /> Copy Call Link
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
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            }}
            userInfo={{
              displayName: doctorName,
            }}
            onApiReady={(externalApi) => {
              externalApi.addListener("videoConferenceLeft", () => {
                handleEndMeet();
              });
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = "100%";
              iframeRef.style.width = "100%";
              iframeRef.style.border = "none";
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
              <Button
                onClick={() => {
                  if (isSchedulingMode) {
                    setIsSchedulingMode(false);
                  } else {
                    navigate(-1);
                  }
                }}
                className="flex items-center gap-2"
              >
                <Icon icon="tabler:arrow-left" className="w-4 h-4" />
                {isSchedulingMode ? "Back to Consultations" : "Back"}
              </Button>
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight m-0">
                  Video <span className="text-blue-500">Consultation</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-xl text-xs m-0">
                  Schedule and conduct secure video calls, manage appointments, and connect with patients instantly.
                </p>
              </div>
            </div>

            {!isSchedulingMode && (
              <Button
                onClick={() => {
                  setFormData(initialFormState);
                  setScheduleStep(1);
                  setIsSchedulingMode(true);
                }}
                className="rounded-2xl px-6 h-11 shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Icon icon="solar:calendar-add-bold" className="text-lg" />
                <span>Schedule Consultation</span>
              </Button>
            )}
          </div>
        </StaggerItem>

        {/* FULL PAGE SLIDER WIZARD VIEW */}
        {isSchedulingMode ? (
          <StaggerItem>
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
              {/* Stepper Nav Pills */}
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
                {SCHEDULE_SLIDES.map((step) => {
                  const isActive = step.id === scheduleStep;
                  const isCompleted = step.id < scheduleStep;

                  return (
                    <button
                      type="button"
                      key={step.id}
                      onClick={() => {
                        if (step.id <= scheduleStep || isCompleted) {
                          setScheduleStep(step.id);
                        }
                      }}
                      className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-center gap-2 ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                          : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                      }`}
                    >
                      <span>{step.id}.</span>
                      <span className="truncate">{step.title}</span>
                      {isCompleted && (
                        <Icon icon="tabler:check" className="text-xs shrink-0 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${(scheduleStep / SCHEDULE_SLIDES.length) * 100}%` }}
                />
              </div>

              {/* Active Slide Header Bar */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Icon icon={activeSlideMeta.icon} className="text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        Step {scheduleStep} of {SCHEDULE_SLIDES.length}
                      </span>
                      {activeSlideMeta.required ? (
                        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          Mandatory *
                        </span>
                      ) : (
                        <span className="bg-slate-200 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded-full">
                          Optional (Can Skip)
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 m-0 mt-0.5">
                      {activeSlideMeta.title}
                    </h3>
                  </div>
                </div>

                {!activeSlideMeta.required && (
                  <button
                    type="button"
                    onClick={handleSkipStep}
                    className="text-xs text-slate-500 hover:text-blue-600 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 bg-white transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Skip</span>
                    <Icon icon="tabler:player-skip-forward" className="text-sm" />
                  </button>
                )}
              </div>

              {/* Slide Body */}
              <div className="min-h-[220px]">
                {scheduleStep === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-1 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Search Registered Patient Database (Optional)
                      </label>
                      <AutoComplete
                        style={{ width: "100%" }}
                        options={searchResults}
                        onSearch={handlePatientSearch}
                        onSelect={handleSelectPatient}
                        placeholder="Search Patient by Name, Phone, Email or ID..."
                        allowClear
                        loading={searchLoading}
                        className="h-12 text-base rounded-xl"
                      />
                      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                        <Icon icon="tabler:info-circle" className="text-blue-500 text-sm" />
                        Type to search existing patient records. Selecting auto-fills demographic details in Step 2.
                      </p>
                    </div>
                  </div>
                )}

                {scheduleStep === 2 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 block mb-1">
                          Patient Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="Enter patient full name"
                          value={formData.patientName}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, patientName: e.target.value }))
                          }
                          className="h-12 text-base rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 block mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="Enter 10-digit number"
                          value={formData.patientPhone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              patientPhone: e.target.value.replace(/[^0-9]/g, ""),
                            }))
                          }
                          className="h-12 text-base rounded-xl"
                        />
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700 block mb-1">
                          Email Address
                        </label>
                        <Input
                          placeholder="patient@example.com"
                          value={formData.patientEmail}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, patientEmail: e.target.value }))
                          }
                          className="h-12 text-base rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {scheduleStep === 3 && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="text-sm font-semibold text-slate-700 block mb-1">
                          Consultation Date <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                          style={{ width: "100%" }}
                          format="YYYY-MM-DD"
                          value={formData.date ? dayjs(formData.date, "YYYY-MM-DD") : null}
                          disabledDate={(current) => current && current < dayjs().startOf("day")}
                          onChange={(date, dateString) =>
                            setFormData((prev) => ({ ...prev, date: dateString }))
                          }
                          className="h-12 rounded-xl text-base"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 block mb-1">
                          Start Time <span className="text-red-500">*</span>
                        </label>
                        <TimePicker
                          style={{ width: "100%" }}
                          format="hh:mm A"
                          use12Hours
                          value={formData.time ? dayjs(formData.time, "hh:mm A") : null}
                          onChange={(time, timeString) =>
                            setFormData((prev) => ({ ...prev, time: timeString }))
                          }
                          className="h-12 rounded-xl text-base"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700 block mb-1">
                          Duration (Minutes)
                        </label>
                        <select
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, duration: Number(e.target.value) }))
                          }
                          className="w-full h-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 px-3 text-base font-medium bg-white"
                        >
                          <option value={15}>15 Minutes</option>
                          <option value={30}>30 Minutes</option>
                          <option value={45}>45 Minutes</option>
                          <option value={60}>60 Minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {scheduleStep === 4 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 block mb-1">
                        Consultation Notes / Reason
                      </label>
                      <Input.TextArea
                        placeholder="Provide a brief summary or symptoms description..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, notes: e.target.value }))
                        }
                        rows={3}
                        className="rounded-xl border-slate-300 text-base"
                      />
                    </div>

                    {/* Schedule Overview Box */}
                    <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Icon icon="tabler:video" className="text-emerald-400 text-base" />
                          Consultation Schedule Overview
                        </span>
                        <span className="text-xs bg-blue-500/20 text-blue-300 font-semibold px-2 py-0.5 rounded-full">
                          Ready to Schedule
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400 m-0">Patient Name</p>
                          <p className="font-bold text-slate-100 m-0 truncate">
                            {formData?.patientName || "Not set"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 m-0">Phone Number</p>
                          <p className="font-bold text-slate-100 m-0 truncate">
                            {formData?.patientPhone || "Not set"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 m-0">Date & Time</p>
                          <p className="font-bold text-slate-100 m-0 truncate">
                            {formData?.date || "N/A"} @ {formData?.time || "N/A"} ({formData?.duration}m)
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 m-0">Doctor / Specialist</p>
                          <p className="font-bold text-emerald-400 m-0 truncate">
                            Dr. {doctorName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Controls Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  {scheduleStep > 1 && (
                    <Button
                      onClick={handlePrevStep}
                      variant="secondary"
                      className="rounded-xl px-4 py-2 flex items-center gap-1.5 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 cursor-pointer text-xs font-semibold"
                    >
                      <Icon icon="tabler:arrow-left" className="text-sm" />
                      Previous Step
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!activeSlideMeta.required && (
                    <Button
                      onClick={handleSkipStep}
                      variant="secondary"
                      className="rounded-xl px-4 py-2 border border-slate-200 text-slate-500 bg-white hover:bg-slate-50 cursor-pointer text-xs font-medium flex items-center gap-1"
                    >
                      Skip Step
                      <Icon icon="tabler:player-skip-forward" className="text-sm" />
                    </Button>
                  )}

                  {scheduleStep < SCHEDULE_SLIDES.length ? (
                    <Button
                      onClick={handleNextStep}
                      variant="primary"
                      className="rounded-xl px-5 py-2 flex items-center gap-1.5 cursor-pointer text-xs font-semibold shadow-md shadow-blue-500/20"
                    >
                      Next Step
                      <Icon icon="tabler:arrow-right" className="text-sm" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleScheduleSubmit}
                      loading={submitting}
                      variant="primary"
                      className="rounded-xl px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer border-0 text-xs font-bold"
                    >
                      <Icon icon="tabler:circle-check" className="text-base" />
                      Confirm & Schedule Consultation
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ) : (
          /* REGULAR CONSULTATIONS LIST VIEW */
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
                </div>
              )}
            </div>
          </StaggerItem>
        )}

        {/* CONSULTATIONS CONTENT */}
        {!isSchedulingMode && (
          <StaggerItem>
            {activeTab === "instant" ? (
              /* Instant Meeting Card */
              <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                    <Icon icon="solar:videocamera-bold" className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 m-0">Start Instant Meeting</h3>
                    <p className="text-xs text-slate-500 m-0 mt-0.5">
                      Launch an instant video meeting room and invite patients via call link.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Custom Room Name (Optional)
                  </label>
                  <Input
                    placeholder="Enter custom room name or leave blank to auto-generate"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="h-12 rounded-xl text-base"
                  />
                </div>

                <Button
                  onClick={() => handleStartMeet()}
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <Icon icon="solar:play-circle-bold" className="text-xl" />
                  Launch Instant Meeting Now
                </Button>
              </div>
            ) : (
              /* Scheduled Meetings Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingMeetings ? (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
                    <Icon icon="tabler:loader-2" className="animate-spin text-3xl text-blue-500" />
                    <span className="text-sm font-semibold">Loading consultations...</span>
                  </div>
                ) : filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meet) => {
                    const isScheduled = meet.status === "Scheduled";
                    const isCompleted = meet.status === "Completed";
                    const isCancelled = meet.status === "Cancelled";
                    const isRequested = meet.status === "Requested";

                    return (
                      <Card
                        key={meet._id}
                        className="group hover:border-blue-400/80 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl bg-white border border-slate-200 overflow-hidden"
                      >
                        <div className="p-5 flex flex-col gap-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  isScheduled
                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                    : isCompleted
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                    : isCancelled
                                    ? "bg-red-50 text-red-600 border border-red-200"
                                    : "bg-amber-50 text-amber-600 border border-amber-200"
                                }`}
                              >
                                {meet.status}
                              </span>
                              <h3 className="text-base font-bold text-slate-800 m-0 mt-1.5 truncate">
                                {meet.patientName}
                              </h3>
                            </div>

                            <div className="flex items-center gap-1">
                              <Tooltip title="Delete Consultation">
                                <button
                                  onClick={() => handleDeleteMeeting(meet._id)}
                                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 flex items-center justify-center transition-all border-none cursor-pointer"
                                >
                                  <Icon icon="solar:trash-bin-trash-linear" className="text-sm" />
                                </button>
                              </Tooltip>

                              {isScheduled && (
                                <Tooltip title="Mark Completed">
                                  <button
                                    onClick={() => handleStatusChange(meet._id, "Completed")}
                                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 flex items-center justify-center transition-all border-none cursor-pointer"
                                  >
                                    <Icon icon="solar:check-circle-linear" className="text-sm" />
                                  </button>
                                </Tooltip>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                              <Icon icon="solar:calendar-linear" className="text-blue-500" />
                              <span>{dayjs(meet.date).format("DD MMM YYYY")}</span>
                              <span>•</span>
                              <Icon icon="solar:clock-circle-linear" className="text-blue-500" />
                              <span>{meet.time} ({meet.duration}m)</span>
                            </div>
                            {meet.patientPhone && (
                              <div className="flex items-center gap-2 text-slate-500">
                                <Icon icon="solar:phone-linear" className="text-emerald-500" />
                                <span>{meet.patientPhone}</span>
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-mono">
                              ID: {meet.patientId || "N/A"}
                            </span>
                            {isScheduled && (
                              <button
                                onClick={() => handleStartMeet(meet.roomName)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg border-none cursor-pointer flex items-center gap-1 shadow-sm transition-all"
                              >
                                Join Call
                                <Icon icon="tabler:chevron-right" className="text-xs" />
                              </button>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-400 gap-2 text-center">
                    <Icon icon="solar:calendar-add-linear" className="text-5xl opacity-40" />
                    <span className="text-sm font-semibold">No scheduled video consultations found.</span>
                    <button
                      onClick={() => {
                        setFormData(initialFormState);
                        setScheduleStep(1);
                        setIsSchedulingMode(true);
                      }}
                      className="mt-2 text-xs font-bold text-blue-600 hover:underline border-none bg-transparent cursor-pointer"
                    >
                      Schedule Consultation Now
                    </button>
                  </div>
                )}
              </div>
            )}
          </StaggerItem>
        )}
      </div>
    </StaggerContainer>
  );
};

export default VideoConsult;
