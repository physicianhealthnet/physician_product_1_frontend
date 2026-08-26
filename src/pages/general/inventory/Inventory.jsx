import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { Icon } from "@iconify/react/dist/iconify.js";
import { message } from "antd";
import chatSocketService from "../../../utilities/chatSocketService";
import formatDateToDDMMYYYY from "../../../utilities/formatter";
import { TableSkeleton, Skeleton } from "../../../component/ui/Skeleton";
import { StaggerContainer, StaggerItem } from "../../../component/ui/Transitions";
import QuickLinks from "../../../component/ui/QuickLinks";

const CATEGORY_OPTIONS = [
  { id: "Consumable", label: "Consumable", icon: "solar:box-minimalistic-linear", color: "blue" },
  { id: "Pharmaceutical", label: "Pharmaceutical", icon: "solar:pill-linear", color: "emerald" },
  { id: "Equipment", label: "Equipment", icon: "solar:monitor-linear", color: "purple" },
  { id: "Surgical", label: "Surgical", icon: "solar:medical-kit-linear", color: "rose" },
  { id: "Diagnostic", label: "Diagnostic", icon: "solar:test-tube-linear", color: "amber" },
  { id: "General", label: "General Supply", icon: "solar:box-linear", color: "slate" },
];

const INVENTORY_FIELD_SLIDES = [
  { id: 1, key: "name", title: "Item Name & Description", isMandatory: true },
  { id: 2, key: "category", title: "Category & Supplier", isMandatory: true },
  { id: 3, key: "stock", title: "Stock Capacity & Quantity", isMandatory: true },
  { id: 4, key: "pricing", title: "Unit Price & Reorder Threshold", isMandatory: false },
  { id: 5, key: "review", title: "Review & Register Item", isMandatory: true },
];

function Inventory() {
  const [productsName, setProductsName] = useState([]);
  const [addSwaper, setAddSwaper] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // Slider wizard step state (1 to 5)
  const [subSlideStep, setSubSlideStep] = useState(1);

  useEffect(() => {
    if (addSwaper) {
      setSubSlideStep(1);
    }
  }, [addSwaper]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetProducts = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("/inventory/get-all");
      setProductsName(response.data.product || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitData = async () => {
    try {
      const payload = {
        ...formData,
        productCurrentCount: formData.productCurrentCount || formData.productTotalCount || 0,
      };
      await AxiosInstance.post("/inventory/add", payload);
      message.success("Product Added Successfully");
      handleGetProducts();
      setFormData({});
      setAddSwaper(false);
    } catch (error) {
      message.error("Product failed to Add");
      console.error(error);
    }
  };

  const handleUpdateData = async () => {
    try {
      const response = await AxiosInstance.patch(
        `/inventory/update/${formData._id}`,
        formData
      );
      message.success("Product Updated Successfully");
      setFormData(response.data.data || {});
      handleGetProducts();
      setFormData({});
      setAddSwaper(false);
    } catch (error) {
      message.error("Product failed to Update");
      console.error(error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await AxiosInstance.delete(`/inventory/delete/${id}`);
      message.success("Product Deleted Successfully");
      handleGetProducts();
    } catch (error) {
      message.error("Product failed to Delete");
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    const handleInventoryUpdate = (payload) => {
      if (payload.entity === "inventory") {
        console.log("[Inventory] Received real-time inventory update:", payload);
        handleGetProducts();
      }
    };

    chatSocketService.on("data:updated", handleInventoryUpdate);

    return () => {
      chatSocketService.off("data:updated", handleInventoryUpdate);
    };
  }, []);

  const filteredProducts = productsName.filter((p) =>
    p.productName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isCurrentSlideValid = () => {
    if (subSlideStep === 1) {
      return !!formData.productName?.trim();
    }
    if (subSlideStep === 3) {
      return !!formData.productTotalCount && Number(formData.productTotalCount) > 0;
    }
    return true;
  };

  const handleNextSlide = () => {
    if (!isCurrentSlideValid()) {
      if (subSlideStep === 1) message.error("Please enter a product description / item name.");
      if (subSlideStep === 3) message.error("Please enter a valid stock capacity quantity.");
      return;
    }
    setSubSlideStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevSlide = () => {
    setSubSlideStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <StaggerContainer>
      <div className="flex flex-col gap-10 p-10 bg-white/70 rounded-3xl backdrop-blur-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] min-h-[900px]">
        {/* Header Section */}
        <StaggerItem>
          <div className="flex flex-col lg:flex-row justify-between rounded-2xl items-start lg:items-center gap-8">
            <div>
              <h1 className="font-black text-slate-800 text-4xl tracking-tight leading-tight">
                Inventory <span className="text-blue-500">Management</span>
              </h1>
              <p className="text-slate-500 font-medium mt-2 tracking-wide uppercase text-[10px]">
                Track clinical supplies, stocks, and pharmacy availability
              </p>
            </div>

            <div className="flex items-center gap-4">
              {!addSwaper && (
                <>
                  <div className="flex items-center gap-4 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-200/50 shadow-inner">
                    <div className="relative group flex-1">
                      <Icon icon="solar:magnifer-bold-duotone" width="18" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="Search supply list..."
                        className="h-10 w-80 pl-12 pr-4 bg-white rounded-xl border border-slate-200 text-xs font-bold shadow-sm focus:border-blue-500 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFormData({ category: "Consumable" });
                      setAddSwaper(true);
                    }}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer border-none"
                  >
                    <Icon icon="solar:add-circle-bold-duotone" width="18" />
                    + Add New Item
                  </button>
                </>
              )}

              {addSwaper && (
                <button
                  onClick={() => {
                    setFormData({});
                    setAddSwaper(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Icon icon="tabler:arrow-left" className="text-base" />
                  <span>← Back to Inventory Dashboard</span>
                </button>
              )}
            </div>
          </div>
        </StaggerItem>

        {!addSwaper && (
          <StaggerItem>
            <QuickLinks links={[
              { label: "Pharmacy", icon: "solar:pill-linear", route: "/pharmacy", color: "purple" },
              { label: "Suppliers", icon: "solar:shop-linear", route: "/supplier", color: "amber" },
              { label: "Expenditure", icon: "solar:ticket-sale-linear", route: "/expenditure", color: "rose" },
            ]} />
          </StaggerItem>
        )}

        {/* FULL CONTAINER SLIDER WIZARD VIEW */}
        {addSwaper ? (
          <StaggerItem className="w-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-8">
              {/* Wizard Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl border border-blue-100 shadow-sm">
                    <Icon icon={formData?._id ? "solar:pen-linear" : "solar:box-linear"} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 m-0">
                      {formData?._id ? "Update Supply Item" : "Register New Inventory Item"}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium m-0 mt-0.5">
                      Field {subSlideStep} of 5: {INVENTORY_FIELD_SLIDES[subSlideStep - 1].title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                    Step {subSlideStep} / 5
                  </span>
                </div>
              </div>

              {/* Sub-stepper Pill Bar */}
              <div className="flex items-center gap-2">
                {INVENTORY_FIELD_SLIDES.map((slide) => {
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
              <div className="py-4 min-h-[300px]">
                {/* SUB-SLIDE 1: PRODUCT NAME */}
                {subSlideStep === 1 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-blue-100 shadow-sm">
                        <Icon icon="solar:box-minimalistic-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Product Name & Description</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Enter the official medical product title, brand name, packaging size, or description.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                        Item Description / Product Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData?.productName || ""}
                        onChange={handleInputChange}
                        placeholder="e.g. Disposable Surgical Masks (Box of 50)"
                        className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none transition-all"
                        autoFocus
                      />
                      <p className="text-[11px] text-slate-400 font-medium">
                        Example: N95 Respirator Masks, Paracetamol 500mg, Disposable Syringes 5ml
                      </p>
                    </div>
                  </div>
                )}

                {/* SUB-SLIDE 2: CATEGORY & SUPPLIER */}
                {subSlideStep === 2 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-sm">
                        <Icon icon="solar:tag-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Category & Supplier Details</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Select the supply category and specify the manufacturer or preferred distributor.
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                        Select Item Category <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {CATEGORY_OPTIONS.map((cat) => {
                          const isSelected = (formData?.category || "Consumable") === cat.id;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, category: cat.id }))}
                              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                  : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                              }`}
                            >
                              <Icon icon={cat.icon} className="text-2xl" />
                              <span className="text-xs font-extrabold">{cat.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-2 pt-4">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Supplier / Manufacturer Name (Optional)
                        </label>
                        <input
                          type="text"
                          name="supplierName"
                          value={formData?.supplierName || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. MedTech Global Distributors Inc."
                          className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-SLIDE 3: STOCK QUANTITY & CAPACITY */}
                {subSlideStep === 3 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-purple-100 shadow-sm">
                        <Icon icon="solar:box-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Stock Capacity & Parameters</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Specify total stock capacity limits and current available count.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Total Capacity / Target Limit <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="productTotalCount"
                          value={formData?.productTotalCount || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. 100"
                          className="w-full h-14 px-4 text-center bg-white rounded-2xl border border-slate-300 font-black text-slate-800 text-xl focus:border-blue-500 shadow-xs outline-none transition-all"
                          autoFocus
                        />
                        <p className="text-[11px] text-slate-400 font-medium text-center">
                          Maximum batch volume capacity
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Current Stock Available
                        </label>
                        <input
                          type="number"
                          name="productCurrentCount"
                          value={formData?.productCurrentCount ?? formData?.productTotalCount ?? ""}
                          onChange={handleInputChange}
                          placeholder="e.g. 85"
                          className="w-full h-14 px-4 text-center bg-white rounded-2xl border border-slate-300 font-black text-blue-600 text-xl focus:border-blue-500 shadow-xs outline-none transition-all"
                        />
                        <p className="text-[11px] text-slate-400 font-medium text-center">
                          Defaults to Total Capacity if left unchanged
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-SLIDE 4: PRICING & THRESHOLD (OPTIONAL / SKIP) */}
                {subSlideStep === 4 && (
                  <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-amber-100 shadow-sm">
                        <Icon icon="solar:dollar-minimalistic-linear" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Unit Price & Reorder Level</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Set unit procurement cost and low stock warning trigger thresholds.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Unit Cost Price ($ / ₹) (Optional)
                        </label>
                        <input
                          type="number"
                          name="unitPrice"
                          value={formData?.unitPrice || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. 12.50"
                          className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                          Low Stock Warning Threshold (Optional)
                        </label>
                        <input
                          type="number"
                          name="reorderThreshold"
                          value={formData?.reorderThreshold || ""}
                          onChange={handleInputChange}
                          placeholder="e.g. 15"
                          className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none transition-all"
                        />
                      </div>
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
                      <h3 className="text-2xl font-black text-slate-800">Review Item Details</h3>
                      <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                        Please review the registered inventory supply parameters before confirming.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Title:</span>
                        <span className="text-sm font-black text-slate-800">{formData.productName || "-"}</span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category:</span>
                        <span className="text-xs font-extrabold bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                          {formData.category || "Consumable"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Capacity:</span>
                        <span className="text-sm font-black text-slate-800">{formData.productTotalCount || 0} units</span>
                      </div>

                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Available Stock:</span>
                        <span className="text-sm font-black text-blue-600">
                          {formData.productCurrentCount ?? formData.productTotalCount ?? 0} units
                        </span>
                      </div>

                      {formData.supplierName && (
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supplier / Manufacturer:</span>
                          <span className="text-xs font-bold text-slate-700">{formData.supplierName}</span>
                        </div>
                      )}

                      {formData.unitPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unit Cost Price:</span>
                          <span className="text-xs font-bold text-slate-800">${formData.unitPrice}</span>
                        </div>
                      )}
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
                  {subSlideStep === 4 && (
                    <button
                      type="button"
                      onClick={() => setSubSlideStep(5)}
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
                      onClick={formData?._id ? handleUpdateData : handleSubmitData}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all border-none uppercase tracking-wider"
                    >
                      <Icon icon="solar:check-circle-linear" className="text-lg" />
                      <span>{formData?._id ? "Commit Item Updates" : "Confirm & Register Item"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ) : (
          <>
            {/* DETAIL PANEL FOR SELECTED ITEM */}
            <StaggerItem className="xl:col-span-12">
              <div>
                {loading ? (
                  <div className="bg-white/50 backdrop-blur-md rounded-2xl p-10 border border-slate-200 shadow-sm overflow-hidden relative h-[200px]">
                    <div className="flex gap-6 items-center">
                      <Skeleton className="w-16 h-16 rounded-2xl" />
                      <div className="flex-1 space-y-4">
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                  </div>
                ) : formData?._id ? (
                  <div className="bg-white/50 backdrop-blur-md rounded-3xl p-10 border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -mr-48 -mt-48 blur-3xl" />

                    <div className="flex flex-col lg:flex-row justify-between items-start gap-10 relative">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                            <Icon icon="solar:box-linear" width="32" />
                          </div>
                          <div>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-none capitalize">
                              {formData.productName}
                            </h2>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-500 tracking-wider">
                                ID: {formData._id?.slice(-8).toUpperCase()}
                              </span>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Added {formatDateToDDMMYYYY(formData?.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 min-w-[200px]">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Capacity</div>
                          <div className="text-3xl font-black text-slate-800">{formData.productTotalCount}</div>
                        </div>
                        <div className="group bg-blue-500 p-6 rounded-2xl shadow-[0_8px_16px_-4px_rgba(59,130,246,0.4)] flex-1 min-w-[220px] relative overflow-hidden transition-transform hover:scale-105">
                          <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform">
                            <Icon icon="solar:box-linear" width="80" />
                          </div>
                          <div className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 drop-shadow opacity-90">Current Stock</div>
                          <div className="flex items-end justify-between">
                            <div className="text-3xl font-black text-white drop-shadow-md">{formData.productCurrentCount}</div>
                            <button
                              onClick={() => setAddSwaper(true)}
                              className="w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 drop-shadow-md cursor-pointer border-none"
                            >
                              <Icon icon="solar:pen-linear" width="18" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50/50 rounded-3xl p-16 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center transition-all group hover:bg-slate-100/50">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-200 group-hover:scale-110 transition-transform">
                      <Icon icon="solar:hand-stars-linear" width="40" className="text-blue-500" />
                    </div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight text-center">Ready to manage stock?</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Select a product from the list below to view detailed metrics</p>
                  </div>
                )}
              </div>
            </StaggerItem>

            {/* PRODUCT CATALOG TABLE WITH INNER SCROLL & STICKY HEADER */}
            <StaggerItem className="xl:col-span-12">
              <div className="bg-white/50 rounded-3xl border border-slate-200 overflow-hidden shadow-xl flex flex-col">
                <div className="flex justify-between items-center px-8 py-5 border-b border-slate-200 bg-slate-50/50">
                  <h2 className="text-[10px] font-black tracking-widest uppercase text-slate-500">
                    Supply & Inventory Catalog
                  </h2>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full">
                    {filteredProducts.length} PRODUCTS FOUND
                  </span>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-separate border-spacing-0 relative">
                    <thead className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur-md shadow-xs">
                      <tr>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">#</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">Product Description</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 text-center">Status</th>
                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="p-0">
                            <TableSkeleton rows={8} />
                          </td>
                        </tr>
                      ) : filteredProducts.length > 0 ? (
                        <>
                          {filteredProducts.map((data, index) => {
                            const isLowStock =
                              data.productCurrentCount < data.productTotalCount * 0.2;
                            const isVeryLow = data.productCurrentCount < 5;

                            return (
                              <tr
                                key={index}
                                className={`group transition-all duration-300 cursor-pointer ${
                                  selected === index
                                    ? "bg-blue-50/50 border-l-4 border-l-blue-500"
                                    : "hover:bg-slate-50/50"
                                }`}
                                onClick={() => {
                                  setFormData(data);
                                  setSelected(index);
                                }}
                              >
                                <td className="px-8 py-5 text-xs font-black text-slate-400">
                                  {index + 1}
                                </td>
                                <td className="px-8 py-5">
                                  <div className="font-bold text-slate-800 text-sm">
                                    {data.productName}
                                  </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                  <div
                                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                      isVeryLow
                                        ? "bg-rose-100 text-rose-600"
                                        : isLowStock
                                        ? "bg-orange-100 text-orange-600"
                                        : "bg-emerald-100 text-emerald-600"
                                    }`}
                                  >
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        isVeryLow
                                          ? "bg-rose-500 animate-ping shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                                          : isLowStock
                                          ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                                          : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                      }`}
                                    />
                                    {isVeryLow
                                      ? "Critical Stock"
                                      : isLowStock
                                      ? "Low Stock"
                                      : "In Stock"}
                                  </div>
                                </td>
                                <td className="px-8 py-5 text-center">
                                  <div className="flex justify-center items-center gap-2">
                                    <button
                                      className="p-2.5 bg-white text-slate-400 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all shadow-xs border border-slate-200 rounded-xl cursor-pointer"
                                      title="Quick View"
                                    >
                                      <Icon icon="solar:eye-linear" width="18" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteData(data._id);
                                      }}
                                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-xs border border-rose-100 rounded-xl cursor-pointer"
                                      title="Permanent Delete"
                                    >
                                      <Icon
                                        icon="solar:trash-bin-trash-linear"
                                        width="18"
                                      />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                                <Icon
                                  icon="solar:box-search-linear"
                                  width="32"
                                  className="text-slate-300"
                                />
                              </div>
                              <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                                No supplies match your search criteria
                              </span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </StaggerItem>
          </>
        )}
      </div>
    </StaggerContainer>
  );
}

export default Inventory;
