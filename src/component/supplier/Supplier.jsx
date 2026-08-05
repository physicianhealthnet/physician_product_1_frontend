import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../utilities/AxiosInstance";
import { message } from "antd";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { StaggerContainer, StaggerItem } from "../ui/Transitions";

function Supplier() {
  const [swaper, setSwaper] = useState(false);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [formData, setFormData] = useState({});
  const [activeStep, setActiveStep] = useState("basic"); // "basic" or "business"

  useEffect(() => {
    if (swaper) {
      setActiveStep("basic");
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
      setAllSuppliers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await AxiosInstance.post("/supplier/add", formData);
      message.success("Supplier Added Successfully");
      handleGetAllSuppliers();
      setFormData({});
      setSwaper(false);
    } catch (error) {
      message.error("Supplier fail to Add");
      console.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await AxiosInstance.patch(
        `/supplier/update/${formData._id}`,
        formData
      );
      message.success("Supplier Updated Successfully");
      handleGetAllSuppliers();
      setFormData({});
      setSwaper(false);
    } catch (error) {
      message.error("Supplier fail to Update");
      console.error(error);
    }
  };

  const handleDelete = async (data) => {
    try {
      const response = await AxiosInstance.delete(
        `/supplier/delete/${data?._id}`
      );

      message.success("Supplier Deleted Successfully");
      handleGetAllSuppliers();
    } catch (error) {
      message.error("Supplier fail to Delete");
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllSuppliers();
  }, []);

  return (
    <StaggerContainer>
      <div className="flex flex-col gap-8 pb-8">
        {/* Modern Header */}
        <StaggerItem>
          <div className="flex flex-col gap-1">
            <h1 className="font-black text-slate-800  text-4xl tracking-tight">
              <span className="text-blue-500">Suppliers</span>
            </h1>
            <p className="text-slate-500  font-medium">
              Manage supplier information and contacts
            </p>
          </div>
        </StaggerItem>

        {/* Add/Show Toggle Button */}
        <StaggerItem>
          <div className="flex items-center gap-3">
            <Button
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${swaper
                  ? "bg-slate-500 hover:bg-slate-600 text-white shadow-slate-500/30"
                  : "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30"
                }`}
              onClick={() => {
                setSwaper((p) => !p);
                if (swaper) setFormData({});
              }}
            >
              <Icon
                icon={swaper ? "tabler:list" : "tabler:plus"}
                className="text-xl transition-transform duration-300"
              />
              {swaper ? "Show Suppliers" : "Add Supplier"}
            </Button>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div>
            {!swaper ? (
              /* Suppliers Table */
              allSuppliers?.length > 0 ? (
                <Card className="overflow-hidden bg-white/40  backdrop-blur-md border-slate-200/60 ">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-100/80  backdrop-blur-sm">
                        <tr className="border-b border-slate-200 ">
                          <th className="p-4 text-left font-black text-slate-600  uppercase tracking-wider text-xs">Name</th>
                          <th className="p-4 text-left font-black text-slate-600  uppercase tracking-wider text-xs">Contact</th>
                          <th className="p-4 text-left font-black text-slate-600  uppercase tracking-wider text-xs">Email</th>
                          <th className="p-4 text-left font-black text-slate-600  uppercase tracking-wider text-xs">Address</th>
                          <th className="p-4 text-left font-black text-slate-600  uppercase tracking-wider text-xs">GSTIN</th>
                          <th className="p-4 text-center font-black text-slate-600  uppercase tracking-wider text-xs">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 ">
                        {allSuppliers.map((data, index) => (
                          <tr key={index} className="hover:bg-slate-50/50 :bg-slate-900/50 transition-colors">
                            <td className="p-4 font-semibold text-slate-800 ">{data?.name}</td>
                            <td className="p-4 font-medium text-slate-600 ">{data?.contact}</td>
                            <td className="p-4 font-medium text-slate-600 ">{data?.email}</td>
                            <td className="p-4 font-medium text-slate-600 ">{data?.address}</td>
                            <td className="p-4 font-black text-blue-600 ">{data?.gstin}</td>
                            <td className="p-4">
                              <div className="flex gap-2 justify-center">
                                <button
                                  title="Edit"
                                  onClick={() => {
                                    setFormData(data);
                                    setSwaper(true);
                                  }}
                                  className="w-9 h-9 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white transition-all duration-200 flex items-center justify-center"
                                >
                                  <Icon icon="tabler:edit" className="text-lg" />
                                </button>
                                <button
                                  title="Delete"
                                  onClick={() => handleDelete(data)}
                                  className="w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white transition-all duration-200 flex items-center justify-center"
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
                <Card className="p-12 text-center bg-white/40  backdrop-blur-md border-slate-200/60 ">
                  <div className="flex flex-col items-center gap-3">
                    <Icon icon="tabler:building-store" className="text-6xl text-slate-300 " />
                    <p className="text-slate-500  font-semibold">No suppliers found</p>
                  </div>
                </Card>
              )
            ) : (
              /* Add/Edit Form */
              <div className="flex items-center justify-center animate-in zoom-in-95 duration-200">
                <Card className="w-full max-w-lg bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-[32px] overflow-hidden shadow-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${activeStep === "basic" ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"}`}>
                        <Icon icon={activeStep === "basic" ? (formData?._id ? "tabler:edit" : "tabler:plus") : "solar:bill-list-bold-duotone"} className="text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-slate-800 m-0 leading-none">
                          {activeStep === "basic" ? (formData?._id ? "Edit Contact" : "Add Supplier") : "Business Details"}
                        </h2>
                        <p className="text-xs text-slate-400 font-semibold m-0 mt-1 leading-none">
                          {activeStep === "basic" ? "Step 1 of 2: Contact Details" : "Step 2 of 2: Address & GSTIN"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step Progress Bar */}
                  <div className="w-full bg-slate-100 h-1">
                    <div 
                      className={`h-full transition-all duration-500 ${activeStep === "basic" ? "w-1/2 bg-blue-500" : "w-full bg-emerald-500"}`}
                    />
                  </div>

                  {/* Content Body */}
                  <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {activeStep === "basic" ? (
                      <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                        {[
                          { label: "Name *", name: "name" },
                          { label: "Contact", name: "contact", type: "number" },
                          { label: "Email", name: "email", type: "email" },
                        ].map((field, index) => (
                          <div key={index} className="flex flex-col gap-1.5">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                              {field.label}
                            </label>
                            <Input
                              type={field.type || "text"}
                              name={field.name}
                              value={formData?.[field.name] || ""}
                              onChange={handleInputChange}
                              className="rounded-xl h-11 font-bold"
                              placeholder={`Enter ${field.label.replace(" *", "").toLowerCase()}`}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        {[
                          { label: "Address", name: "address" },
                          { label: "GSTIN", name: "gstin" },
                        ].map((field, index) => (
                          <div key={index} className="flex flex-col gap-1.5">
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest pl-1">
                              {field.label}
                            </label>
                            <Input
                              type={field.type || "text"}
                              name={field.name}
                              value={formData?.[field.name] || ""}
                              onChange={handleInputChange}
                              className="rounded-xl h-11 font-bold"
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between px-8 py-5 border-t border-slate-100 bg-slate-50/50">
                    {/* Left Side Button */}
                    <div>
                      {activeStep === "business" ? (
                        <button
                          type="button"
                          onClick={() => setActiveStep("basic")}
                          className="px-6 py-2.5 rounded-xl text-xs font-black text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors uppercase tracking-widest cursor-pointer"
                        >
                          Previous
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setSwaper(false);
                            setFormData({});
                          }}
                          className="px-6 py-2.5 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-100 transition-colors uppercase tracking-widest cursor-pointer border-none bg-transparent"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    {/* Right Side Button */}
                    <div>
                      {activeStep === "basic" ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!formData.name?.trim()) {
                              message.error("Supplier name is required");
                              return;
                            }
                            setActiveStep("business");
                          }}
                          className="px-8 py-2.5 rounded-xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 transition-all uppercase tracking-widest cursor-pointer border-none"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => (formData?._id ? handleEdit() : handleSubmit())}
                          className="px-8 py-2.5 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-widest cursor-pointer border-none"
                        >
                          {formData?._id ? "Update" : "Submit"}
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </StaggerItem>
      </div>
    </StaggerContainer>
  );
}

export default Supplier;
