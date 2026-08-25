import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";
import { message } from "antd";
import Card from "../../component/ui/Card";
import Input from "../../component/ui/Input";
import Button from "../../component/ui/Button";
import { StaggerContainer, StaggerItem } from "../../component/ui/Transitions";

const ROLE_OPTIONS = [
  { id: "doctor", label: "Doctor / Specialist", icon: "solar:user-md-linear", color: "blue" },
  { id: "receptionist", label: "Receptionist / Front Desk", icon: "solar:user-linear", color: "rose" },
  { id: "accountant", label: "Accountant / Finance", icon: "solar:calculator-linear", color: "emerald" },
  { id: "generalManager", label: "General Manager / Admin", icon: "solar:shield-user-linear", color: "amber" },
];

const STAFF_FIELD_SLIDES = [
  { id: 1, key: "role", title: "Select Member Role", isMandatory: true },
  { id: 2, key: "name", title: "Member Full Name", isMandatory: true },
  { id: 3, key: "department", title: "Clinical Department", isMandatory: true },
  { id: 4, key: "credentials", title: "Contact & Password", isMandatory: true },
  { id: 5, key: "review", title: "Review & Register", isMandatory: true },
];

function DoctorAndStaffs() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [clinicFilter, setClinicFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [subSlideStep, setSubSlideStep] = useState(1);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    userType: "doctor",
    department: ""
  });

  const departmentList = [
    "General Physician", "Dentist", "Dermatologist", "ENT Specialist", "Ophthalmologist",
    "Cardiologist", "Orthopedic", "Gynecologist", "Pediatrician", "Endocrinologist", "Psychiatrist",
  ];

  const handleGetAllUsers = async () => {
    try {
      const response = await AxiosInstance.get("/user/getAllUsers");
      setUsers(response.data.user || []);
      setFilteredUsers(response.data.user || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      setSubSlideStep(1);
    }
  }, [isModalOpen]);

  useEffect(() => {
    let filtered = users;

    if (clinicFilter) {
      filtered = filtered.filter(
        (user) => user.clinicId?.toString() === clinicFilter.toString()
      );
    }

    if (searchFilter) {
      const lower = searchFilter.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.userName?.toLowerCase().includes(lower) ||
          user.userId?.toLowerCase().includes(lower) ||
          user.userType?.toLowerCase().includes(lower) ||
          user.email?.toLowerCase().includes(lower) ||
          user.phone?.toLowerCase().includes(lower) ||
          user.clinicId?.toString().includes(lower)
      );
    }

    setFilteredUsers(filtered);
  }, [clinicFilter, searchFilter, users]);

  const clinicIds = [...new Set(users.map((u) => u.clinicId))];

  const getRoleBadge = (role) => {
    const badges = {
      master: "bg-purple-500/20 text-purple-600",
      doctor: "bg-blue-500/20 text-blue-600",
      accountant: "bg-emerald-500/20 text-emerald-600",
      generalManager: "bg-amber-500/20 text-amber-600",
      receptionist: "bg-rose-500/20 text-rose-600",
    };
    return badges[role] || "bg-slate-500/20 text-slate-600";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (formData.userType === "doctor" && !formData.department) {
      message.error("Please select a department for the Doctor!");
      return;
    }
    
    const userStr = sessionStorage.getItem("master") || sessionStorage.getItem("user");
    const loggedInUser = userStr ? JSON.parse(userStr) : null;
    const cid = loggedInUser?.clinicId || "PHN-C-0001";

    setAddLoading(true);
    try {
      const payload = {
        userName: formData.userName,
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType,
        clinicId: cid
      };

      if (!isEditMode && formData.password) {
        payload.password = formData.password;
      }

      if (formData.userType === "doctor") {
        payload.department = formData.department;
      }

      if (isEditMode) {
        await AxiosInstance.patch(`/user/update/${selectedUserId}`, payload);
        message.success(`${formData.userType} updated successfully!`);
      } else {
        await AxiosInstance.post("/user/add", payload);
        message.success(`${formData.userType} added successfully!`);
      }
      
      closeModal();
      handleGetAllUsers();

    } catch (error) {
      console.error("Submit Error:", error);
      message.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} user!`);
    } finally {
      setAddLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedUserId(null);
    setFormData({ userName: "", email: "", phone: "", password: "", userType: "doctor", department: "" });
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setSelectedUserId(user.userId);
    setFormData({
      userName: user.userName || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      userType: user.userType || "doctor",
      department: user.department || ""
    });
    setIsModalOpen(true);
  };

  const isCurrentSlideValid = () => {
    if (subSlideStep === 1) {
      return !!formData.userType;
    }
    if (subSlideStep === 2) {
      return !!formData.userName?.trim();
    }
    if (subSlideStep === 3) {
      return formData.userType !== "doctor" || !!formData.department;
    }
    if (subSlideStep === 4) {
      return !!formData.email?.trim() && !!formData.phone?.trim() && (isEditMode || !!formData.password);
    }
    return true;
  };

  const handleNextSlide = () => {
    if (!isCurrentSlideValid()) {
      if (subSlideStep === 1) message.error("Please select a member role.");
      if (subSlideStep === 2) message.error("Please enter the member's full name.");
      if (subSlideStep === 3) message.error("Please select a clinical department for the doctor.");
      if (subSlideStep === 4) message.error("Please fill in email, phone, and initial password.");
      return;
    }

    // Auto-skip department slide if not doctor
    if (subSlideStep === 2 && formData.userType !== "doctor") {
      setSubSlideStep(4);
    } else {
      setSubSlideStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevSlide = () => {
    if (subSlideStep === 4 && formData.userType !== "doctor") {
      setSubSlideStep(2);
    } else {
      setSubSlideStep((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <StaggerContainer>
      <div className="flex flex-col gap-8 pb-8">
        {/* Modern Header */}
        <StaggerItem>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-black text-slate-800 text-4xl tracking-tight">
                Doctor & <span className="text-blue-500">Staff</span>
              </h1>
              <p className="text-slate-500 font-medium">
                Manage doctors, staff members, and user accounts
              </p>
            </div>

            {isModalOpen && (
              <button
                onClick={closeModal}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Icon icon="tabler:arrow-left" className="text-base" />
                <span>← Back to Staff Directory</span>
              </button>
            )}
          </div>
        </StaggerItem>

        {/* Filters & Actions */}
        {!isModalOpen && (
          <StaggerItem>
            <div className="flex flex-wrap items-center gap-3">
              {/* Clinic Filter */}
              <div className="relative">
                <Icon icon="tabler:building-hospital" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <select
                  value={clinicFilter}
                  onChange={(e) => setClinicFilter(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-md border border-slate-200/80 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer"
                >
                  <option value="">All Clinics</option>
                  {clinicIds.map((id, idx) => (
                    <option key={idx} value={id}>
                      Clinic {id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Filter */}
              <div className="relative flex-1 max-w-md">
                <Icon icon="tabler:search" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <Input
                  type="text"
                  placeholder="Search by name, email, phone, role..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
              
              <div className="ml-auto">
                <Button 
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 px-6 py-3 rounded-xl transition-all cursor-pointer"
                  onClick={() => {
                    setIsEditMode(false);
                    setFormData({ userName: "", email: "", phone: "", password: "", userType: "doctor", department: "" });
                    setIsModalOpen(true);
                  }}
                >
                  <Icon icon="tabler:plus" className="text-xl" />
                  <span className="font-extrabold uppercase tracking-wider text-xs">+ Add Doctor / Staff</span>
                </Button>
              </div>
            </div>
          </StaggerItem>
        )}

        {/* FULL CONTAINER SLIDER WIZARD VIEW */}
        {isModalOpen ? (
          <StaggerItem className="w-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-8">
              {/* Wizard Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm">
                    <Icon icon={isEditMode ? "tabler:user-edit" : "solar:user-plus-linear"} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 m-0">
                      {isEditMode ? "Edit Staff Member Profile" : "Add New Staff Member"}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium m-0 mt-0.5">
                      Field {subSlideStep} of 5: {STAFF_FIELD_SLIDES[subSlideStep - 1].title}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                  Step {subSlideStep} / 5
                </span>
              </div>

              {/* Sub-stepper Pill Bar */}
              <div className="flex items-center gap-2">
                {STAFF_FIELD_SLIDES.map((slide) => {
                  const isActive = subSlideStep === slide.id;
                  const isCompleted = subSlideStep > slide.id;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        if (slide.id < subSlideStep || isCurrentSlideValid()) {
                          if (slide.id === 3 && formData.userType !== "doctor") return;
                          setSubSlideStep(slide.id);
                        }
                      }}
                      className={`flex-1 py-3 px-3 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between gap-2 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : slide.id === 3 && formData.userType !== "doctor"
                          ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center font-black ${
                            isActive
                              ? "bg-white text-blue-600"
                              : isCompleted
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {slide.id}
                        </span>
                        <span className="truncate leading-tight font-extrabold">{slide.title}</span>
                      </div>
                      {isCompleted && (
                        <Icon icon="tabler:check" className="text-sm shrink-0 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                  style={{ width: `${(subSlideStep / 5) * 100}%` }}
                />
              </div>

              {/* SLIDE CONTENT AREA */}
              <div className="py-4 min-h-[280px]">
                {/* SUB-SLIDE 1: ROLE SELECTION */}
                {subSlideStep === 1 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-blue-100 shadow-sm">
                        <Icon icon="solar:shield-user-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Select Member Role</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Choose the staff member's administrative role and access level.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {ROLE_OPTIONS.map((role) => {
                        const isSelected = formData.userType === role.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, userType: role.id }))}
                            className={`p-5 rounded-2xl border flex items-center gap-4 text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-blue-600"}`}>
                              <Icon icon={role.icon} />
                            </div>
                            <div>
                              <span className="text-sm font-extrabold block">{role.label}</span>
                              <span className={`text-[11px] font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                                Full clinical & portal permissions
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SUB-SLIDE 2: FULL NAME */}
                {subSlideStep === 2 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-sm">
                        <Icon icon="solar:user-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Member Full Name</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Enter the official full title and name for patient records and billing.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        placeholder="e.g. Dr. John Smith / Sarah Jenkins"
                        className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none transition-all"
                        autoFocus
                      />
                    </div>
                  </div>
                )}

                {/* SUB-SLIDE 3: DEPARTMENT (FOR DOCTORS) */}
                {subSlideStep === 3 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-purple-100 shadow-sm">
                        <Icon icon="solar:stethoscope-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Clinical Department</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Select the medical specialty department for appointment routing.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                        Medical Specialty Department <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none cursor-pointer"
                        autoFocus
                      >
                        <option value="">-- Select Department --</option>
                        {departmentList.map((dep) => (
                          <option key={dep} value={dep}>
                            {dep}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* SUB-SLIDE 4: CONTACT & PASSWORD */}
                {subSlideStep === 4 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-amber-100 shadow-sm">
                        <Icon icon="solar:lock-keyhole-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Contact & Login Credentials</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Set official email, phone number, and initial login password.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="name@clinic.com"
                            className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none"
                            autoFocus
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 234 567 890"
                            className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none"
                          />
                        </div>
                      </div>

                      {!isEditMode && (
                        <div className="space-y-2 pt-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                            Setup Initial Password <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SUB-SLIDE 5: REVIEW & CONFIRM */}
                {subSlideStep === 5 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-sm">
                        <Icon icon="solar:clipboard-check-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Review Member Account</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Please review the staff profile parameters before saving to directory.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Member Role:</span>
                        <span className="text-xs font-black uppercase bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                          {formData.userType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name:</span>
                        <span className="text-sm font-black text-slate-800">{formData.userName || "-"}</span>
                      </div>

                      {formData.userType === "doctor" && (
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department:</span>
                          <span className="text-xs font-bold text-slate-800">{formData.department || "-"}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address:</span>
                        <span className="text-xs font-bold text-blue-600">{formData.email || "-"}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Contact:</span>
                        <span className="text-xs font-bold text-slate-800">{formData.phone || "-"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* GUIDED WIZARD BOTTOM ACTION BAR */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div>
                  {subSlideStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <Icon icon="tabler:arrow-left" className="text-base" />
                      <span>Previous Field</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {subSlideStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all border-none"
                    >
                      <span>Next Field</span>
                      <Icon icon="tabler:arrow-right" className="text-base" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={addLoading}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all border-none uppercase tracking-wider disabled:opacity-50"
                    >
                      <Icon icon="solar:check-circle-linear" className="text-lg" />
                      <span>{isEditMode ? "Update Member Details" : "Confirm & Sync Member"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ) : (
          /* USERS TABLE WITH INNER SCROLL & STICKY HEADER */
          <StaggerItem>
            {filteredUsers.length > 0 ? (
              <Card className="overflow-hidden bg-white/60 backdrop-blur-md border-slate-200/80 rounded-3xl shadow-xl">
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                  <table className="w-full text-sm relative border-collapse">
                    <thead className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur-md shadow-xs">
                      <tr className="border-b border-slate-200">
                        <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">S.No</th>
                        <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">User ID</th>
                        <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Username</th>
                        <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Role</th>
                        <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Email</th>
                        <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Phone</th>
                        <th className="p-4 text-center font-black text-slate-600 uppercase tracking-wider text-xs">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredUsers.map((data, index) => (
                        <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-semibold text-slate-700">{index + 1}</td>
                          <td className="p-4 font-black text-blue-600">{data.userId}</td>
                          <td className="p-4 font-bold text-slate-800">{data.userName}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getRoleBadge(data.userType)}`}>
                              {data.userType}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-slate-600">{data.email}</td>
                          <td className="p-4 font-medium text-slate-600">{data.phone}</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => openEditModal(data)}
                              className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer border-none"
                              title="Edit User"
                            >
                              <Icon icon="tabler:edit" className="text-xl" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <Card className="p-16 text-center bg-white/60 backdrop-blur-md border-slate-200/80 rounded-3xl shadow-sm">
                <div className="flex flex-col items-center gap-3">
                  <Icon icon="tabler:users-group" className="text-6xl text-slate-300" />
                  <p className="text-slate-500 font-semibold">No users found in directory</p>
                </div>
              </Card>
            )}
          </StaggerItem>
        )}
      </div>
    </StaggerContainer>
  );
}

export default DoctorAndStaffs;
