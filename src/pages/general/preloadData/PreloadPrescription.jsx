import { Icon } from "@iconify/react/dist/iconify.js";
import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import CreatableSelect from "react-select/creatable";
import { CardSkeleton } from "../../../component/ui/Skeleton";
import Card from "../../../component/ui/Card";
import Button from "../../../component/ui/Button";
import Input from "../../../component/ui/Input";
import { StaggerContainer, StaggerItem } from "../../../component/ui/Transitions";
import { useNavigate } from "react-router-dom";

const BUNDLE_SLIDES = [
  {
    id: 1,
    key: "bundle_info",
    title: "Bundle Details & Age Group",
    description: "Specify clinical bundle title and target patient age group.",
    icon: "tabler:file-text",
    required: true,
  },
  {
    id: 2,
    key: "medications",
    title: "Medications & Dosage Builder",
    description: "Add prescription drugs, dosages, timing, and treatment duration.",
    icon: "tabler:pill",
    required: true,
  },
  {
    id: 3,
    key: "review_save",
    title: "Review & Save Bundle",
    description: "Review complete bundle composition list and confirm template.",
    icon: "tabler:circle-check",
    required: false,
  },
];

const AGE_GROUPS = [
  { label: "All Ages", icon: "tabler:users" },
  { label: "Pediatric (0-12 yrs)", icon: "tabler:baby-carriage" },
  { label: "Teens (13-18 yrs)", icon: "tabler:user" },
  { label: "Adults (19-60 yrs)", icon: "tabler:user-check" },
  { label: "Senior (60+ yrs)", icon: "tabler:heart-rate-monitor" },
];

const DOSAGE_PRESETS = [
  { label: "1-0-1 (Twice a day)", m: "1", a: "0", n: "1" },
  { label: "1-1-1 (Thrice a day)", m: "1", a: "1", n: "1" },
  { label: "1-0-0 (Morning only)", m: "1", a: "0", n: "0" },
  { label: "0-0-1 (Night only)", m: "0", a: "0", n: "1" },
  { label: "0-1-0 (Afternoon only)", m: "0", a: "1", n: "0" },
];

const DAY_PRESETS = ["3", "5", "7", "10", "14", "30"];

function PreloadPrescription() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [preloadedMedicinesData, setPreloadedMedicinesData] = useState([]);
  const [singleMedicineData, setSingleMedicineData] = useState({
    medicine: "",
    af_bf: "AF",
    dosageM: "1",
    dosageA: "0",
    dosageN: "1",
    days: "5",
    dosage: "",
  });
  const [formData, setFormData] = useState({ title: "", age: "All Ages" });
  const [titles, setTitles] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState("");
  const [editingMedicineIndex, setEditingMedicineIndex] = useState(null);
  const [medicineOptions, setMedicineOptions] = useState([]);

  useEffect(() => {
    if (modalOpen) {
      setWizardStep(1);
    }
  }, [modalOpen]);

  const handleMedicineChange = (name, value) => {
    setSingleMedicineData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyDosagePreset = (preset) => {
    setSingleMedicineData((prev) => ({
      ...prev,
      dosageM: preset.m,
      dosageA: preset.a,
      dosageN: preset.n,
    }));
  };

  const handleMedicineSubmit = () => {
    if (
      !singleMedicineData.medicine ||
      (!singleMedicineData.dosageM &&
        !singleMedicineData.dosageA &&
        !singleMedicineData.dosageN)
    ) {
      message.error("Please fill in Medicine Name and at least one dosage.");
      return;
    }
    setPreloadedMedicinesData((prev) => {
      let updated;
      if (editingMedicineIndex !== null) {
        updated = prev.map((med, idx) =>
          idx === editingMedicineIndex ? { ...singleMedicineData } : med
        );
        setEditingMedicineIndex(null);
        message.success("Medicine updated in bundle.");
      } else {
        updated = [...prev, { ...singleMedicineData }];
        message.success("Medicine added to bundle list.");
      }
      return updated;
    });
    setSingleMedicineData({
      medicine: "",
      af_bf: "AF",
      dosageM: "1",
      dosageA: "0",
      dosageN: "1",
      days: "5",
      dosage: "",
    });
  };

  const handleEditMedicine = (index) => {
    const med = preloadedMedicinesData[index];
    setSingleMedicineData({ ...med });
    setEditingMedicineIndex(index);
  };

  const handleDeleteMedicine = (index) => {
    setPreloadedMedicinesData((prev) => prev.filter((_, i) => i !== index));
    message.success("Medicine removed from bundle.");
  };

  const handleDeleteTemplate = async (id, e) => {
    e.stopPropagation();
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this template?",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await AxiosInstance.delete(`/preload-prescription/delete/${id}`);
          message.success("Template deleted successfully");
          getAllData();
        } catch (error) {
          console.error(error);
          message.error("Failed to delete template");
        }
      },
    });
  };

  const summitData = async () => {
    const titleVal =
      formData.title === "othersEntry" ? formData.others : formData.title;

    if (!titleVal || titleVal.trim() === "") {
      message.error("Please provide a title for the template");
      return;
    }

    if (preloadedMedicinesData.length === 0) {
      message.error("Please add at least one medication to the bundle before saving.");
      return;
    }

    const cleanedMedicines = preloadedMedicinesData.map((med) => {
      const { _id, ...rest } = med;
      return rest;
    });

    const payload = {
      title: titleVal,
      age: formData.age || "All Ages",
      preloadedMedicinesData: cleanedMedicines,
    };

    try {
      if (editId) {
        await AxiosInstance.put(
          `/preload-prescription/update/${editId}`,
          payload
        );
        message.success("Template bundle updated successfully");
      } else {
        await AxiosInstance.post("/preload-prescription/create", payload);
        message.success("Template bundle created successfully");
      }
      setFormData({ title: "", age: "All Ages" });
      setPreloadedMedicinesData([]);
      setEditId("");
      setEditingMedicineIndex(null);
      setModalOpen(false);
      getTitles();
      getAllData();
    } catch (error) {
      console.error(error);
      message.error("Failed to save template bundle");
    }
  };

  const getTitles = async () => {
    try {
      const response = await AxiosInstance.get(
        "/preload-prescription/get-titles"
      );
      const rawTitles = response.data?.data || [];
      const titleStrings = rawTitles
        .map((t) => (typeof t === "object" ? t?.title || t?.name || "" : t))
        .filter(Boolean);
      setTitles([...new Set(titleStrings)]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllData = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(
        "/preload-prescription/get-all-data"
      );
      setAllData(response.data.data);

      const allMeds = response.data.data.flatMap(
        (template) =>
          template.preloadedMedicinesData?.map((med) => med.medicine) || []
      );

      let invMeds = [];
      try {
        const invResponse = await AxiosInstance.get("/inventory/get-name");
        invMeds = invResponse?.data?.data || [];
      } catch (err) {
        console.error("Failed to fetch inventory names for autocomplete", err);
      }

      const uniqueMeds = [...new Set([...allMeds, ...invMeds].filter(Boolean))];
      setMedicineOptions(uniqueMeds.map((med) => ({ label: med, value: med })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTitles();
    getAllData();
  }, []);

  const filteredAllData = allData.filter((data) => {
    const searchString = searchTerm.toLowerCase();
    const titleMatch = data?.title?.toLowerCase().includes(searchString);
    const medicineMatch = data?.preloadedMedicinesData?.some((med) =>
      med?.medicine?.toLowerCase().includes(searchString)
    );
    return titleMatch || medicineMatch;
  });

  const activeSlideMeta = BUNDLE_SLIDES[wizardStep - 1];

  const handleNextStep = () => {
    if (wizardStep === 1) {
      const titleVal =
        formData.title === "othersEntry" ? formData.others : formData.title;
      if (!titleVal || titleVal.trim() === "") {
        message.error("Please select or enter a Bundle Title");
        return;
      }
    } else if (wizardStep === 2) {
      if (preloadedMedicinesData.length === 0) {
        message.error("Please add at least one medication to the bundle before proceeding");
        return;
      }
    }

    if (wizardStep < BUNDLE_SLIDES.length) {
      setWizardStep((prev) => prev + 1);
    } else {
      summitData();
    }
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) {
      setWizardStep((prev) => prev - 1);
    }
  };

  return (
    <StaggerContainer>
      <div className="p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <StaggerItem>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-row flex-nowrap gap-3 items-center">
              <Button
                onClick={() => {
                  if (modalOpen) {
                    setModalOpen(false);
                  } else {
                    navigate(-1);
                  }
                }}
                className="flex items-center gap-2 rounded-xl"
              >
                <Icon icon="tabler:arrow-left" className="w-4 h-4" />
                {modalOpen ? "Back to Templates" : "Back"}
              </Button>
              <div className="flex flex-col gap-0.5">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight m-0">
                  Prescription <span className="text-blue-600">Templates</span>
                </h1>
                <p className="text-slate-500 font-medium max-w-xl text-xs m-0">
                  Create and manage clinical bundles for faster, stress-free prescription workflows.
                </p>
              </div>
            </div>

            {!modalOpen && (
              <Button
                onClick={() => {
                  setEditId("");
                  setFormData({ title: "", age: "All Ages" });
                  setPreloadedMedicinesData([]);
                  setSingleMedicineData({
                    medicine: "",
                    af_bf: "AF",
                    dosageM: "1",
                    dosageA: "0",
                    dosageN: "1",
                    days: "5",
                    dosage: "",
                  });
                  setEditingMedicineIndex(null);
                  setWizardStep(1);
                  setModalOpen(true);
                }}
                className="rounded-2xl px-6 h-11 shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Icon icon="tabler:plus" className="text-lg" />
                <span>New Template Bundle</span>
              </Button>
            )}
          </div>
        </StaggerItem>

        {/* FULL PAGE SLIDER WIZARD VIEW */}
        {modalOpen ? (
          <StaggerItem>
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
              {/* Stepper Nav Pills */}
              <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-1">
                {BUNDLE_SLIDES.map((step) => {
                  const isActive = step.id === wizardStep;
                  const isCompleted = step.id < wizardStep;

                  return (
                    <button
                      type="button"
                      key={step.id}
                      onClick={() => {
                        if (step.id <= wizardStep || isCompleted) {
                          setWizardStep(step.id);
                        }
                      }}
                      className={`flex-1 min-w-[150px] py-3 px-4 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between gap-2 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                          : isCompleted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
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
                          {step.id}
                        </span>
                        <span className="truncate">{step.title}</span>
                      </div>
                      {isCompleted && (
                        <Icon icon="tabler:check" className="text-sm shrink-0 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                  style={{ width: `${(wizardStep / BUNDLE_SLIDES.length) * 100}%` }}
                />
              </div>

              {/* Active Slide Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50/80 to-slate-50 p-5 rounded-2xl border border-blue-100/80">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20 flex items-center justify-center">
                    <Icon icon={activeSlideMeta.icon} className="text-xl" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">
                      Step {wizardStep} of {BUNDLE_SLIDES.length}
                    </span>
                    <h3 className="text-lg font-black text-slate-800 m-0 mt-0.5">
                      {activeSlideMeta.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Slide Body */}
              <div className="min-h-[300px]">
                {/* STEP 1: BUNDLE TITLE & TARGET AGE */}
                {wizardStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-4xl mx-auto py-2">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">
                        1. Select Clinical Bundle Title <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full h-12 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 px-4 text-base font-semibold bg-white shadow-xs"
                      >
                        <option value="">-- Choose Bundle Title --</option>
                        {titles.map((titleItem, index) => {
                          const titleText =
                            typeof titleItem === "object"
                              ? titleItem?.title || titleItem?.name || String(titleItem)
                              : String(titleItem);
                          return (
                            <option key={index} value={titleText}>
                              {titleText}
                            </option>
                          );
                        })}
                        <option value="othersEntry">+ Create Custom Bundle Title</option>
                      </select>
                    </div>

                    {formData.title === "othersEntry" && (
                      <div className="space-y-2 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                        <label className="text-xs font-black text-blue-700 uppercase tracking-wider block">
                          Enter Custom Clinical Bundle Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="e.g. Acute Gastritis Protocol, Post-Extraction Care..."
                          name="others"
                          value={formData.others || ""}
                          onChange={handleChange}
                          className="h-12 rounded-xl text-base bg-white border-blue-200"
                        />
                      </div>
                    )}

                    <div className="space-y-3 pt-2">
                      <label className="text-xs font-black text-slate-600 uppercase tracking-wider block">
                        2. Select Target Patient Age Group
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {AGE_GROUPS.map((group) => {
                          const isSelected = formData.age === group.label;
                          return (
                            <button
                              type="button"
                              key={group.label}
                              onClick={() => setFormData((prev) => ({ ...prev, age: group.label }))}
                              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                                isSelected
                                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105"
                                  : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                              }`}
                            >
                              <Icon icon={group.icon} className="text-xl" />
                              <span className="text-xs font-bold leading-tight">{group.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: MEDICATIONS & DOSAGE BUILDER (2-COLUMN SPLIT LAYOUT) */}
                {wizardStep === 2 && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
                    {/* LEFT COLUMN: MEDICINE FORM */}
                    <div className="lg:col-span-6 bg-slate-50/70 p-6 rounded-3xl border border-slate-200/80 space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 m-0 flex items-center gap-2">
                          <Icon icon="tabler:capsule" className="text-blue-600 text-lg" />
                          {editingMedicineIndex !== null
                            ? "Edit Medication Item"
                            : "Add Medication Item"}
                        </h4>
                        {editingMedicineIndex !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingMedicineIndex(null);
                              setSingleMedicineData({
                                medicine: "",
                                af_bf: "AF",
                                dosageM: "1",
                                dosageA: "0",
                                dosageN: "1",
                                days: "5",
                                dosage: "",
                              });
                            }}
                            className="text-xs text-slate-500 hover:text-slate-700 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </div>

                      {/* Medicine Search Input */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">
                          Medicine Name / Formulation <span className="text-red-500">*</span>
                        </label>
                        <CreatableSelect
                          isClearable
                          options={medicineOptions}
                          onChange={(newValue) =>
                            handleMedicineChange(
                              "medicine",
                              newValue ? newValue.value : ""
                            )
                          }
                          value={
                            singleMedicineData.medicine
                              ? {
                                  label: singleMedicineData.medicine,
                                  value: singleMedicineData.medicine,
                                }
                              : null
                          }
                          placeholder="Search or type medicine name..."
                          className="text-sm font-semibold"
                          styles={{
                            control: (base) => ({
                              ...base,
                              borderRadius: "1rem",
                              minHeight: "46px",
                              borderColor: "#cbd5e1",
                            }),
                          }}
                        />
                      </div>

                      {/* Dosage Presets Bar */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Dosage Frequency Quick Presets
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {DOSAGE_PRESETS.map((preset) => {
                            const isMatch =
                              singleMedicineData.dosageM === preset.m &&
                              singleMedicineData.dosageA === preset.a &&
                              singleMedicineData.dosageN === preset.n;

                            return (
                              <button
                                type="button"
                                key={preset.label}
                                onClick={() => applyDosagePreset(preset)}
                                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border cursor-pointer ${
                                  isMatch
                                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                                }`}
                              >
                                {preset.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Manual Dosage M-A-N Inputs */}
                      <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded-2xl border border-slate-200">
                        <div className="flex flex-col gap-1 text-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Morning (M)</span>
                          <Input
                            placeholder="1"
                            value={singleMedicineData.dosageM || ""}
                            onChange={(e) => handleMedicineChange("dosageM", e.target.value)}
                            className="h-10 text-center font-bold rounded-xl text-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Afternoon (A)</span>
                          <Input
                            placeholder="0"
                            value={singleMedicineData.dosageA || ""}
                            onChange={(e) => handleMedicineChange("dosageA", e.target.value)}
                            className="h-10 text-center font-bold rounded-xl text-sm"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Night (N)</span>
                          <Input
                            placeholder="1"
                            value={singleMedicineData.dosageN || ""}
                            onChange={(e) => handleMedicineChange("dosageN", e.target.value)}
                            className="h-10 text-center font-bold rounded-xl text-sm"
                          />
                        </div>
                      </div>

                      {/* Food Timing & Days */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                            Food Timing
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {["AF", "BF"].map((type) => (
                              <button
                                type="button"
                                key={type}
                                onClick={() => handleMedicineChange("af_bf", type)}
                                className={`h-10 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                                  singleMedicineData.af_bf === type
                                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {type === "AF" ? "After Food (AF)" : "Before Food (BF)"}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                            Treatment Days
                          </label>
                          <div className="flex items-center gap-1.5">
                            <Input
                              type="number"
                              placeholder="5"
                              value={singleMedicineData.days || ""}
                              onChange={(e) => handleMedicineChange("days", e.target.value)}
                              className="h-10 text-base font-bold rounded-xl"
                            />
                            <span className="text-xs font-bold text-slate-500">Days</span>
                          </div>
                        </div>
                      </div>

                      {/* Day Presets */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Quick Days:</span>
                        <div className="flex flex-wrap gap-1">
                          {DAY_PRESETS.map((d) => (
                            <button
                              type="button"
                              key={d}
                              onClick={() => handleMedicineChange("days", d)}
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border cursor-pointer ${
                                singleMedicineData.days === d
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {d}d
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Additional Instructions */}
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Special Instructions (Optional)
                        </label>
                        <Input
                          placeholder="e.g. Take with lukewarm water..."
                          value={singleMedicineData.dosage || ""}
                          onChange={(e) => handleMedicineChange("dosage", e.target.value)}
                          className="h-10 text-sm rounded-xl"
                        />
                      </div>

                      {/* Add Button */}
                      <Button
                        onClick={handleMedicineSubmit}
                        className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        <Icon
                          icon={
                            editingMedicineIndex !== null ? "tabler:check" : "tabler:plus"
                          }
                          className="text-base"
                        />
                        <span>
                          {editingMedicineIndex !== null
                            ? "Update Item in Bundle"
                            : "+ Add Medicine to Bundle List"}
                        </span>
                      </Button>
                    </div>

                    {/* RIGHT COLUMN: LIVE BUNDLE LIST CART */}
                    <div className="lg:col-span-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                          <Icon icon="tabler:shopping-cart" className="text-blue-600 text-xl" />
                          <h4 className="font-black text-slate-800 text-sm m-0">
                            Current Bundle Composition List
                          </h4>
                        </div>
                        <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                          {preloadedMedicinesData.length} Drugs Added
                        </span>
                      </div>

                      {/* Medicines List Cards */}
                      <div className="space-y-3 max-h-[460px] overflow-y-auto custom-scrollbar pr-1">
                        {preloadedMedicinesData.map((med, index) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-800 text-sm">
                                  {med.medicine}
                                </span>
                                {med.af_bf && (
                                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                    {med.af_bf}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs text-slate-600">
                                <span className="font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                  Dosage: {med.dosageM || 0}-{med.dosageA || 0}-{med.dosageN || 0}
                                </span>
                                <span className="font-semibold text-emerald-600">
                                  {med.days || 0} Days
                                </span>
                              </div>

                              {med.dosage && (
                                <p className="text-xs text-slate-500 italic m-0 pt-0.5">
                                  "{med.dosage}"
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleEditMedicine(index)}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-none cursor-pointer transition-all"
                                title="Edit"
                              >
                                <Icon icon="tabler:edit" className="text-sm" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteMedicine(index)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none cursor-pointer transition-all"
                                title="Remove"
                              >
                                <Icon icon="tabler:trash" className="text-sm" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {preloadedMedicinesData.length === 0 && (
                          <div className="py-12 px-4 flex flex-col items-center justify-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 text-slate-400 gap-3 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                              <Icon icon="tabler:pill" className="text-2xl" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-700 text-sm m-0">
                                Bundle is empty
                              </p>
                              <p className="text-xs text-slate-400 m-0 mt-0.5">
                                Add medications using the form on the left to build your template.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: REVIEW & SAVE BUNDLE */}
                {wizardStep === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 max-w-4xl mx-auto py-2">
                    {/* Bundle Summary Box */}
                    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Icon icon="tabler:circle-check" className="text-emerald-400 text-xl" />
                          <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                            Clinical Template Summary
                          </span>
                        </div>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                          Ready to Save
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-slate-400 text-xs m-0">Bundle Title</p>
                          <p className="font-black text-slate-100 text-lg m-0 truncate">
                            {formData.title === "othersEntry" ? formData.others : formData.title}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs m-0">Target Age Group</p>
                          <p className="font-bold text-blue-400 text-base m-0">
                            {formData.age || "All Ages"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs m-0">Total Medications</p>
                          <p className="font-bold text-emerald-400 text-base m-0">
                            {preloadedMedicinesData.length} Prescribed Drugs
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Final Composition Review List */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm m-0">
                        Prescription Drugs Composition
                      </h4>
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                              <th className="px-4 py-3">Medication</th>
                              <th className="px-4 py-3 text-center">Dosage Pattern</th>
                              <th className="px-4 py-3 text-center">Duration</th>
                              <th className="px-4 py-3">Instructions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {preloadedMedicinesData.map((med, index) => (
                              <tr key={index}>
                                <td className="px-4 py-3 font-bold text-slate-800">
                                  {med.medicine}
                                  {med.af_bf && (
                                    <span className="ml-2 text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                                      {med.af_bf}
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-center font-mono font-bold text-slate-700">
                                  {med.dosageM || 0}-{med.dosageA || 0}-{med.dosageN || 0}
                                </td>
                                <td className="px-4 py-3 text-center text-slate-600 font-semibold">
                                  {med.days || 0} Days
                                </td>
                                <td className="px-4 py-3 text-slate-500">
                                  {med.dosage || "None"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Controls Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  {wizardStep > 1 && (
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
                  {wizardStep < BUNDLE_SLIDES.length ? (
                    <Button
                      onClick={handleNextStep}
                      variant="primary"
                      className="rounded-xl px-6 py-2 flex items-center gap-1.5 cursor-pointer text-xs font-bold shadow-md shadow-blue-500/20"
                    >
                      Next Step
                      <Icon icon="tabler:arrow-right" className="text-sm" />
                    </Button>
                  ) : (
                    <Button
                      onClick={summitData}
                      variant="primary"
                      className="rounded-xl px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer border-0 text-xs font-bold"
                    >
                      <Icon icon="tabler:circle-check" className="text-base" />
                      {editId ? "Update Template Bundle" : "Confirm & Save Clinical Bundle"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ) : (
          /* TEMPLATES LIST VIEW */
          <>
            <StaggerItem>
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex items-center shadow shadow-slate-200 flex-1 w-full gap-4 px-6 py-2 bg-white rounded-2xl border border-slate-200/60">
                  <Icon icon="tabler:search" className="text-[#14BEF0] text-xl" />
                  <input
                    type="text"
                    placeholder="Search templates by title or condition..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium h-12"
                  />
                </div>
                <div className="flex items-center shadow shadow-slate-200 justify-between w-full max-lg:w-full lg:w-1/3 gap-4 px-6 py-2 bg-white rounded-2xl border border-slate-200/60">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#14BEF0]">
                      Total Templates
                    </span>
                    <span className="text-2xl font-black text-[#14BEF0]">
                      {allData.length}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Template Cards Grid */}
            <StaggerItem>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  Array(6)
                    .fill(0)
                    .map((_, i) => <CardSkeleton key={i} />)
                ) : filteredAllData.length > 0 ? (
                  filteredAllData.map((template) => (
                    <Card
                      key={template._id}
                      onClick={() => {
                        setEditId(template._id);
                        setFormData({
                          title: template.title,
                          age: template.age || "All Ages",
                        });
                        setPreloadedMedicinesData(
                          template.preloadedMedicinesData || []
                        );
                        setWizardStep(1);
                        setModalOpen(true);
                      }}
                      className="group hover:border-[#14BEF0]/80 transition-all duration-300 cursor-pointer shadow hover:shadow-xl rounded-2xl bg-white border border-slate-200"
                    >
                      <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                              {template.age || "All Ages"}
                            </span>
                            <h3 className="text-lg font-bold text-slate-800 mt-2 mb-0 group-hover:text-blue-600 transition-colors">
                              {template.title}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteTemplate(template._id, e)}
                            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer border-none bg-transparent"
                            title="Delete Template"
                          >
                            <Icon icon="tabler:trash" className="text-lg" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <Icon icon="tabler:pill" className="text-blue-500 text-sm" />
                          <span>
                            {template.preloadedMedicinesData?.length || 0} Medications in Bundle
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-400 gap-2 text-center">
                    <Icon icon="tabler:file-search" className="text-5xl opacity-40 text-blue-500" />
                    <span className="text-sm font-semibold">No prescription templates found.</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditId("");
                        setFormData({ title: "", age: "All Ages" });
                        setPreloadedMedicinesData([]);
                        setWizardStep(1);
                        setModalOpen(true);
                      }}
                      className="mt-2 text-xs font-bold text-blue-600 hover:underline border-none bg-transparent cursor-pointer"
                    >
                      Create First Template Bundle Now
                    </button>
                  </div>
                )}
              </div>
            </StaggerItem>
          </>
        )}
      </div>
    </StaggerContainer>
  );
}

export default PreloadPrescription;
