import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import { message } from "antd";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { StaggerContainer, StaggerItem } from "../ui/Transitions";

const SUPPLIER_FIELD_SLIDES = [
  { id: 1, key: "name", title: "Supplier Name", isMandatory: true },
  { id: 2, key: "contact", title: "Phone Contact Number", isMandatory: true },
  { id: 3, key: "email", title: "Email Address", isMandatory: false },
  { id: 4, key: "business", title: "Address & GSTIN", isMandatory: false },
  { id: 5, key: "review", title: "Review & Save Supplier", isMandatory: true },
];

function Supplier() {
  const [swaper, setSwaper] = useState(false);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [formData, setFormData] = useState({});
  const [subSlideStep, setSubSlideStep] = useState(1);

  useEffect(() => {
    if (swaper) {
      setSubSlideStep(1);
    }
  }, [swaper]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetAllSuppliers = async () => {
    try {
      const response = await AxiosInstance.get("/supplier/get-all");
      setAllSuppliers(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await AxiosInstance.post("/supplier/add", formData);
      message.success("Supplier Added Successfully");
      handleGetAllSuppliers();
      setFormData({});
      setSwaper(false);
    } catch (error) {
      message.error("Supplier failed to Add");
      console.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      await AxiosInstance.patch(
        `/supplier/update/${formData._id}`,
        formData
      );
      message.success("Supplier Updated Successfully");
      handleGetAllSuppliers();
      setFormData({});
      setSwaper(false);
    } catch (error) {
      message.error("Supplier failed to Update");
      console.error(error);
    }
  };

  const handleDelete = async (data) => {
    try {
      await AxiosInstance.delete(
        `/supplier/delete/${data?._id}`
      );
      message.success("Supplier Deleted Successfully");
      handleGetAllSuppliers();
    } catch (error) {
      message.error("Supplier failed to Delete");
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllSuppliers();
  }, []);

  const isCurrentSlideValid = () => {
    if (subSlideStep === 1) {
      return !!formData.name?.trim();
    }
    if (subSlideStep === 2) {
      return !!formData.contact?.toString().trim();
    }
    return true;
  };

  const handleNextSlide = () => {
    if (!isCurrentSlideValid()) {
      if (subSlideStep === 1) message.error("Please enter the supplier name.");
      if (subSlideStep === 2) message.error("Please enter a contact phone number.");
      return;
    }
    setSubSlideStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevSlide = () => {
    setSubSlideStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <StaggerContainer>
      <div className="flex flex-col gap-8 pb-8">
        {/* Header Section */}
        <StaggerItem>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="font-black text-slate-800 text-4xl tracking-tight">
                <span className="text-blue-500">Suppliers</span>
              </h1>
              <p className="text-slate-500 font-medium">
                Manage supplier information and contacts
              </p>
            </div>

            {swaper && (
              <button
                onClick={() => {
                  setFormData({});
                  setSwaper(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                <Icon icon="tabler:arrow-left" className="text-base" />
                <span>← Back to Supplier Directory</span>
              </button>
            )}
          </div>
        </StaggerItem>

        {/* Toggle Button for Add Supplier */}
        {!swaper && (
          <StaggerItem>
            <div className="flex items-center gap-3">
              <Button
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 cursor-pointer"
                onClick={() => {
                  setFormData({});
                  setSwaper(true);
                }}
              >
                <Icon icon="tabler:plus" className="text-xl" />
                Add New Supplier
              </Button>
            </div>
          </StaggerItem>
        )}

        <StaggerItem>
          <div>
            {!swaper ? (
              /* Suppliers Table with Inner Scroll & Sticky Header */
              allSuppliers?.length > 0 ? (
                <Card className="overflow-hidden bg-white/60 backdrop-blur-md border-slate-200/80 rounded-3xl shadow-xl">
                  <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-sm relative border-collapse">
                      <thead className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur-md shadow-xs">
                        <tr className="border-b border-slate-200">
                          <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Name</th>
                          <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Contact</th>
                          <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Email</th>
                          <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">Address</th>
                          <th className="p-4 text-left font-black text-slate-600 uppercase tracking-wider text-xs">GSTIN</th>
                          <th className="p-4 text-center font-black text-slate-600 uppercase tracking-wider text-xs">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {allSuppliers.map((data, index) => (
                          <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4 font-bold text-slate-800">{data?.name}</td>
                            <td className="p-4 font-medium text-slate-600">{data?.contact || "-"}</td>
                            <td className="p-4 font-medium text-slate-600">{data?.email || "-"}</td>
                            <td className="p-4 font-medium text-slate-600">{data?.address || "-"}</td>
                            <td className="p-4 font-black text-blue-600">{data?.gstin || "-"}</td>
                            <td className="p-4">
                              <div className="flex gap-2 justify-center">
                                <button
                                  title="Edit"
                                  onClick={() => {
                                    setFormData(data);
                                    setSwaper(true);
                                  }}
                                  className="w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-600 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer border-none"
                                >
                                  <Icon icon="tabler:edit" className="text-lg" />
                                </button>
                                <button
                                  title="Delete"
                                  onClick={() => handleDelete(data)}
                                  className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer border-none"
                                >
                                  <Icon icon="tabler:trash" className="text-lg" />
                                </button>
                              </div>
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
                    <Icon icon="tabler:building-store" className="text-6xl text-slate-300" />
                    <p className="text-slate-500 font-semibold">No suppliers found in directory</p>
                  </div>
                </Card>
              )
            ) : (
              /* FULL CONTAINER SLIDER WIZARD VIEW FOR ADD / EDIT SUPPLIER */
              <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-8">
                {/* Wizard Title Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm">
                      <Icon icon={formData?._id ? "tabler:edit" : "tabler:building-store"} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 m-0">
                        {formData?._id ? "Update Supplier Record" : "Add New Supplier Record"}
                      </h2>
                      <p className="text-xs text-slate-400 font-medium m-0 mt-0.5">
                        Field {subSlideStep} of 5: {SUPPLIER_FIELD_SLIDES[subSlideStep - 1].title}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                    Step {subSlideStep} / 5
                  </span>
                </div>

                {/* Sub-stepper Pill Bar */}
                <div className="flex items-center gap-2">
                  {SUPPLIER_FIELD_SLIDES.map((slide) => {
                    const isActive = subSlideStep === slide.id;
                    const isCompleted = subSlideStep > slide.id;

                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => {
                          if (slide.id < subSlideStep || isCurrentSlideValid()) {
                            setSubSlideStep(slide.id);
                          }
                        }}
                        className={`flex-1 py-3 px-3 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between gap-2 cursor-pointer ${
                          isActive
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                            : isCompleted
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
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
                  {/* SUB-SLIDE 1: NAME */}
                  {subSlideStep === 1 && (
                    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="text-center space-y-2">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-blue-100 shadow-sm">
                          <Icon icon="tabler:building-store" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">Supplier / Company Name</h3>
                        <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                          Enter the full legal business title or supplier agency name.
                        </p>
                      </div>

                      <div className="space-y-3 pt-4">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Supplier Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData?.name || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. MedTech Global Distributors Inc."
                          className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none transition-all"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* SUB-SLIDE 2: CONTACT */}
                  {subSlideStep === 2 && (
                    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="text-center space-y-2">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-sm">
                          <Icon icon="tabler:phone" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">Contact Phone Number</h3>
                        <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                          Primary phone or mobile contact number for supply orders.
                        </p>
                      </div>

                      <div className="space-y-3 pt-4">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Contact Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="contact"
                          value={formData?.contact || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. 9876543210"
                          className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none transition-all"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* SUB-SLIDE 3: EMAIL */}
                  {subSlideStep === 3 && (
                    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="text-center space-y-2">
                        <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-purple-100 shadow-sm">
                          <Icon icon="tabler:mail" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">Email Address (Optional)</h3>
                        <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                          Official supplier email address for digital invoices and receipts.
                        </p>
                      </div>

                      <div className="space-y-3 pt-4">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData?.email || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. sales@medtechglobal.com"
                          className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none transition-all"
                          autoFocus
                        />
                      </div>
                    </div>
                  )}

                  {/* SUB-SLIDE 4: ADDRESS & GSTIN */}
                  {subSlideStep === 4 && (
                    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="text-center space-y-2">
                        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-amber-100 shadow-sm">
                          <Icon icon="tabler:map-pin" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">Address & GSTIN Identification</h3>
                        <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                          Physical office location address and tax identification number.
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                            Business Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData?.address || ""}
                            onChange={handleInputChange}
                            placeholder="e.g. 123 Healthcare Blvd, Suite 400, New York, NY"
                            className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                            GSTIN Tax Identification Number
                          </label>
                          <input
                            type="text"
                            name="gstin"
                            value={formData?.gstin || ""}
                            onChange={handleInputChange}
                            placeholder="e.g. 33AAAAA0000A1Z5"
                            className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-SLIDE 5: REVIEW & SAVE */}
                  {subSlideStep === 5 && (
                    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="text-center space-y-2">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-sm">
                          <Icon icon="solar:clipboard-check-bold-duotone" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">Review Supplier Profile</h3>
                        <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                          Please verify the supplier details before saving to directory.
                        </p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supplier Name:</span>
                          <span className="text-sm font-black text-slate-800">{formData.name || "-"}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Phone:</span>
                          <span className="text-sm font-bold text-slate-800">{formData.contact || "-"}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address:</span>
                          <span className="text-xs font-bold text-blue-600">{formData.email || "-"}</span>
                        </div>

                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Business Address:</span>
                          <span className="text-xs font-bold text-slate-700">{formData.address || "-"}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">GSTIN Identification:</span>
                          <span className="text-xs font-black text-emerald-600">{formData.gstin || "-"}</span>
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
                    {(subSlideStep === 3 || subSlideStep === 4) && (
                      <button
                        type="button"
                        onClick={() => setSubSlideStep((prev) => prev + 1)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer border-none"
                      >
                        Skip Field →
                      </button>
                    )}

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
                        onClick={formData?._id ? handleEdit : handleSubmit}
                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all border-none uppercase tracking-wider"
                      >
                        <Icon icon="solar:check-circle-bold" className="text-lg" />
                        <span>{formData?._id ? "Commit Supplier Updates" : "Confirm & Save Supplier"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
}

export default Supplier;
