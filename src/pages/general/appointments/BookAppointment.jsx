import React, { useEffect, useState } from "react";
import { Modal, TimePicker, message, Select, AutoComplete } from "antd";
import dayjs from "dayjs";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";

const { Option } = Select;

const BookAppointment = ({
  visible,
  setVisible,
  onBooked,
  clinicId,
  setStateChange,
  selectedDoctor,
}) => {
  const initialData = {
    patientName: "",
    patient: "", // holds the _id of patient
    patientId: "",
    patientAadhar: "",
    phoneNumber: "",
    doctor: "",
    category: "",
    date: "",
    startTime: "",
    clinicId: "",
    doctorId: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allDoctors, setAllDoctors] = useState([]);
  const [reasons, setReasons] = useState([
    "Consultation",
    "Treatment",
    "Rehab Training",
    "Follow-up Visit",
    "Routine Check-up",
    "Diagnostic Scan",
    "Lab Test / Blood Work",
    "Prescription Refill",
    "Vaccination / Immunization",
    "Emergency / Urgent Care"
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [activeStep, setActiveStep] = useState("basic"); // "basic" or "appointment"

  const user = JSON.parse(
    sessionStorage.getItem("user") || sessionStorage.getItem("master"),
  );

  const getDoctors = async () => {
    try {
      const response = await AxiosInstance.get(
        `/user/get-doctor?clinicId=${user?.clinicId}`,
      );
      setAllDoctors(response.data.users);
    } catch (error) {}
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // Search patients
  const handleSearch = async (value) => {
    if (!value) return;
    try {
      setSearchLoading(true);
      const res = await AxiosInstance.get(
        `/appointments/search?query=${value}`,
      );
      console.log(res, "response");

      if (res.data?.patients) {
        setSearchResults(
          res.data.patients.map((p) => ({
            value: p.patientId,
            label: (
              <div className="flex flex-col p-1 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors rounded">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
                  <UserOutlined className="text-blue-500" />
                  {p.patientName}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <PhoneOutlined className="text-green-500" />
                  {p.patientPhone}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MailOutlined className="text-red-500" />
                  {p.patientEmail || "—"}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <IdcardOutlined className="text-purple-500" />
                  ID: {p.patientId}
                </div>
              </div>
            ),
            data: p,
          })),
        );
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Autofill patient details
  const handleSelectPatient = (value, option) => {
    const p = option.data;
    console.log(p, option, "data");

    setFormData((prev) => ({
      ...prev,
      patientName: p.patientName,
      patient: p._id, // store patient ObjectId
      patientAadhar: p.patientAadhar || "",
      phoneNumber: p.patientPhone,
      patientId: p.patientId || "",
      fcmToken: p?.fcmToken?.[0],
    }));

    message.success("Patient details loaded");
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      clinicId: user?.clinicId || "",
      doctorId: selectedDoctor ? selectedDoctor._id : (user._id || ""),
      doctor: selectedDoctor ? selectedDoctor.userName : "",
    }));
  }, [visible, selectedDoctor]);

  // Reset to first step when modal opens
  useEffect(() => {
    if (visible) {
      setActiveStep("basic");
    }
  }, [visible]);

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (time, timeString, name) => {
    setFormData((prev) => ({ ...prev, [name]: timeString }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "patientName",
      "phoneNumber",
      "doctor",
      "category",
      "date",
      "startTime",
      "clinicId",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        message.error("Please fill all required fields");
        return;
      }
    }

    try {
      await AxiosInstance.post("/appointments/", formData);

      message.success("Appointment booked successfully");
      setFormData(initialData);
      setVisible(false);
      onBooked();
      setStateChange((prev) => (prev === null ? true : !prev));
    } catch (err) {
      console.error(err);
      message.error("Booking failed");
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      title={null}
      closeIcon={null}
      width={800}
      centered
      className="rounded-[32px] overflow-hidden shadow-2xl"
      styles={{
        mask: { backdropFilter: "blur(4px)" },
        content: { padding: "0px", borderRadius: "32px" },
      }}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl ${activeStep === "basic" ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"}`}>
            <Icon icon={activeStep === "basic" ? "tabler:user-circle" : "tabler:calendar-event"} className="text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 m-0 leading-none">
              {activeStep === "basic" ? "Patient Details" : "Appointment Details"}
            </h2>
            <p className="text-xs text-slate-400 font-semibold m-0 mt-1 leading-none">
              {activeStep === "basic" ? "Step 1 of 2: Demographics & Contact Info" : "Step 2 of 2: Set Doctor, Reason & Schedule"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-slate-700 animate-in fade-in slide-in-from-left-4 duration-300">
            {/* Search Patient */}
            <div className="col-span-1 md:col-span-2 space-y-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <label className="text-sm font-semibold text-slate-700 block mb-1">
                Search Patient
              </label>
              <AutoComplete
                style={{ width: "100%" }}
                options={searchResults}
                onSearch={handleSearch}
                onSelect={(value, option) => handleSelectPatient(value, option)}
                placeholder="Search by Name / Phone / Email / Patient ID"
                allowClear
                loading={searchLoading}
                className="w-full h-11"
                popupClassName="rounded-xl shadow-md"
              />
              <p className="text-xs text-slate-500 italic">
                Quickly find existing patient records or fill manually below.
              </p>
            </div>

            <div>
              <Input
                label="Patient Name"
                placeholder="Enter patient name"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                label="Phone Number"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Input
                label="Aadhaar Number"
                placeholder="Enter Aadhaar (Optional)"
                name="patientAadhar"
                value={formData.patientAadhar}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-slate-700 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Select Doctor
              </label>
              <Select
                placeholder="Select Doctor"
                value={formData.doctor || undefined}
                onChange={(val) => {
                  const selected = allDoctors.find((d) => d.userName === val);
                  setFormData((prev) => ({
                    ...prev,
                    doctor: val,
                    doctorId: selected ? selected._id : "",
                  }));
                }}
                className="w-full h-10 rounded-xl"
                popupClassName="rounded-xl"
              >
                {allDoctors.map((d) => (
                  <Option key={d._id} value={d.userName}>
                    {d.userName}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Select Reason
              </label>
              <Select
                showSearch
                placeholder="Select or type reason"
                value={formData.category || undefined}
                onChange={(val) => {
                  if (val && !reasons.includes(val)) {
                    setReasons((prev) => [...prev, val]);
                  }
                  setFormData((prev) => ({ ...prev, category: val }));
                }}
                onSearch={(val) => setSearchValue(val)}
                className="w-full h-10 rounded-xl"
                popupClassName="rounded-xl"
                filterOption={(input, option) =>
                  (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
                }
              >
                {reasons.map((res) => (
                  <Option key={res} value={res}>
                    {res}
                  </Option>
                ))}
                {searchValue && !reasons.includes(searchValue) && (
                  <Option key={searchValue} value={searchValue}>
                    Create "{searchValue}"
                  </Option>
                )}
              </Select>
            </div>
            <div>
              <Input
                type="date"
                label="Appointment Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Appointment Time
              </label>
              <TimePicker
                format="hh:mm A"
                use12Hours
                value={
                  formData.startTime ? dayjs(formData.startTime, "hh:mm A") : null
                }
                onChange={(time, timeString) =>
                  handleTimeChange(time, timeString, "startTime")
                }
                className="w-full h-11 border border-slate-300 rounded-xl bg-white text-slate-900 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal Footer */}
      <div className="flex items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50">
        {/* Left Side Button */}
        <div>
          {activeStep === "appointment" ? (
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
              onClick={() => setVisible(false)}
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
                if (!formData.phoneNumber?.trim()) {
                  message.error("Phone Number is required");
                  return;
                }
                setActiveStep("appointment");
              }}
              variant="primary"
              className="rounded-xl px-6 py-2.5 flex items-center gap-2 cursor-pointer"
            >
              Next
              <Icon icon="tabler:arrow-right" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="primary"
              className="rounded-xl px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer border-0"
            >
              <Icon icon="tabler:circle-check" />
              Book Appointment
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BookAppointment;
