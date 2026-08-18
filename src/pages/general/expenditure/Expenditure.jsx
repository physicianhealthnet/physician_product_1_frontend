import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../utilities/AxiosInstance";
import { message } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "../../../component/ui/Card";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";

function setDeepValue(obj, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  let temp = Array.isArray(obj) ? [...obj] : { ...obj };
  let cur = temp;
  keys.forEach((key, idx) => {
    if (!isNaN(key)) {
      cur[key] = Array.isArray(cur[key]) ? [...cur[key]] : { ...cur[key] };
      cur = cur[key];
    } else {
      if (keys[idx + 1] && !isNaN(keys[idx + 1])) {
        cur[key] = cur[key] ? [...cur[key]] : [];
      } else {
        cur[key] = cur[key] ? { ...cur[key] } : {};
      }
      cur = cur[key];
    }
  });
  cur[lastKey] = value;
  return temp;
}

const EXPENDITURE_FIELD_SLIDES = [
  { id: 1, title: "Invoice No & Bill Date", subtitle: "Set invoice identifier and billing date", isMandatory: true },
  { id: 2, title: "Supplier Selection", subtitle: "Select supplier or manufacturer details", isMandatory: true },
  { id: 3, title: "Purchased Line Items", subtitle: "Add products, quantities & costs", isMandatory: true },
  { id: 4, title: "Financials & Taxes", subtitle: "Discounts, subtotal, and GST %", isMandatory: false },
  { id: 5, title: "Payment & Confirmation", subtitle: "Payment mode, paid amount, and submit", isMandatory: true },
];

function Expenditure({ targetedData, setSwaper, swaper, refresh }) {
  const [billFile, setBillFile] = useState(null);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [discountType, setDiscountType] = useState("percentage");
  const [subSlideStep, setSubSlideStep] = useState(1);

  useEffect(() => {
    setSubSlideStep(1);
  }, [swaper]);

  const [formData, setFormData] = useState({
    billInvoiceNo: "",
    billDate: "",
    supplier: {
      name: "",
      contact: "",
      email: "",
      address: "",
      gstin: "",
    },
    products: [
      {
        type: "consumable",
        productName: "",
        quantity: 1,
        purchaseDate: "",
        amount: 0,
        expiryDate: "",
        brand: "",
        model: "",
        serialNumber: "",
        warrantyExpiryDate: "",
        calibrationDueDate: "",
      },
    ],
    financials: {
      subtotal: 0,
      discount: { percentage: 0, amount: 0 },
      gst: { percentage: 0, amount: 0 },
      totalAmount: 0,
      netAmount: 0,
    },
    payment: {
      mode: "cash",
      transactionId: "",
      status: "pending",
      paidAmount: 0,
      dueAmount: 0,
    },
    billFile: null,
  });

  useEffect(() => {
    if (targetedData) {
      setFormData((prev) => ({
        ...prev,
        ...targetedData,
        supplier: { ...prev.supplier, ...targetedData.supplier },
        financials: { ...prev.financials, ...targetedData.financials },
        payment: { ...prev.payment, ...targetedData.payment },
        products: targetedData.products || prev.products,
      }));
      setBillFile(targetedData.billFile || null);
    }
  }, [targetedData]);

  // Financial calculations
  useEffect(() => {
    const subtotal = formData.products.reduce(
      (sum, p) => sum + (Number(p.amount) || 0) * (Number(p.quantity) || 1),
      0
    );

    let discountAmount = 0;
    let percentage = 0;

    if (discountType === "percentage") {
      percentage = Number(formData.financials.discount?.percentage) || 0;
      discountAmount = (subtotal * percentage) / 100;
    } else {
      discountAmount = Number(formData.financials.discount?.amount) || 0;
      percentage = subtotal ? (discountAmount / subtotal) * 100 : 0;
    }

    const afterDiscount = subtotal - discountAmount;
    const gstPercentage = Number(formData.financials.gst?.percentage) || 0;
    const gstAmount = (afterDiscount * gstPercentage) / 100;
    const totalAmount = afterDiscount + gstAmount;
    const paidAmount = Number(formData.payment.paidAmount) || 0;
    const dueAmount = totalAmount - paidAmount;

    setFormData((prev) => ({
      ...prev,
      financials: {
        ...prev.financials,
        subtotal,
        discount: { amount: discountAmount, percentage },
        gst: {
          ...prev.financials.gst,
          amount: gstAmount,
          percentage: gstPercentage,
        },
        totalAmount,
        netAmount: totalAmount,
      },
      payment: { ...prev.payment, dueAmount },
    }));
  }, [
    formData.products,
    formData.financials.discount?.percentage,
    formData.financials.discount?.amount,
    formData.financials.gst?.percentage,
    formData.payment.paidAmount,
    discountType,
  ]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (type === "number") val = Number(value) || 0;

    if (name === "financials.discount.percentage") setDiscountType("percentage");
    if (name === "financials.discount.amount") setDiscountType("amount");

    if (name === "supplier.name") {
      const selectedSupplier = allSuppliers.find((s) => s.name === val);
      if (selectedSupplier) {
        setFormData((prev) => ({
          ...prev,
          supplier: {
            id: selectedSupplier._id,
            name: selectedSupplier.name,
            contact: selectedSupplier.contact,
            email: selectedSupplier.email,
            address: selectedSupplier.address,
            gstin: selectedSupplier.gstin,
          },
        }));
        return;
      }
    }

    setFormData((prev) => setDeepValue(prev, name, val));
  };

  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        {
          type: "consumable",
          productName: "",
          quantity: 1,
          purchaseDate: "",
          amount: 0,
          expiryDate: "",
          brand: "",
          model: "",
          serialNumber: "",
          warrantyExpiryDate: "",
          calibrationDueDate: "",
        },
      ],
    }));
  };

  const removeProduct = (index) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBillFile(file);
    setFormData((prev) => ({ ...prev, billFile: file }));
  };

  const buildFormData = () => {
    const data = new FormData();
    data.append("billInvoiceNo", formData.billInvoiceNo || "");
    data.append("billDate", formData.billDate || "");
    data.append("supplier", JSON.stringify(formData.supplier || {}));
    data.append("products", JSON.stringify(formData.products || []));
    data.append("financials", JSON.stringify(formData.financials || {}));
    data.append("payment", JSON.stringify(formData.payment || {}));
    if (billFile) data.append("billFile", billFile);
    return data;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const data = buildFormData();
      await AxiosInstance.post("/expenditure/add-purchase", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Bill submitted successfully!");
      setSwaper((prev) => !prev);
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Failed to submit bill");
    }
  };

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    try {
      const data = buildFormData();
      await AxiosInstance.patch(`/expenditure/update/${formData._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Bill updated successfully!");
      setSwaper((prev) => !prev);
      if (refresh) refresh();
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Failed to update bill");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await AxiosInstance.get("/supplier/get-all");
        setAllSuppliers(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const isCurrentSlideValid = () => {
    if (subSlideStep === 1) {
      return !!formData.billInvoiceNo?.trim() && !!formData.billDate;
    }
    if (subSlideStep === 2) {
      return !!formData.supplier?.name?.trim();
    }
    if (subSlideStep === 3) {
      return formData.products.length > 0 && formData.products.some((p) => p.productName?.trim());
    }
    return true;
  };

  const handleNextSlide = () => {
    if (!isCurrentSlideValid()) {
      if (subSlideStep === 1) message.error("Please enter the invoice number and bill date.");
      if (subSlideStep === 2) message.error("Please select a supplier from the list.");
      if (subSlideStep === 3) message.error("Please enter at least one product name.");
      return;
    }
    setSubSlideStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevSlide = () => {
    setSubSlideStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex flex-col gap-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Back Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
            <Icon icon="tabler:receipt" className="text-2xl" />
          </div>
          <div>
            <h1 className="font-black text-slate-800 text-3xl tracking-tight m-0">
              {formData?._id ? "Edit" : "New"} <span className="text-blue-500">Purchase Entry</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs m-0 mt-0.5">
              Field {subSlideStep} of 5: {EXPENDITURE_FIELD_SLIDES[subSlideStep - 1].title}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSwaper((prev) => !prev)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          <Icon icon="tabler:arrow-left" className="text-base" />
          <span>← Back to Expenditure List</span>
        </button>
      </div>

      {/* FULL CONTAINER GUIDED SLIDER WIZARD CARD */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col gap-8">
        {/* Sub-stepper Pill Bar */}
        <div className="flex items-center gap-2">
          {EXPENDITURE_FIELD_SLIDES.map((slide) => {
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
                className={`flex-1 py-3.5 px-3 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between gap-2 cursor-pointer ${
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
        <div className="py-4 min-h-[340px]">
          {/* SUB-SLIDE 1: INVOICE NO & BILL DATE */}
          {subSlideStep === 1 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-blue-100 shadow-sm">
                  <Icon icon="tabler:file-invoice" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Bill & Invoice Information</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                  Enter the supplier's official invoice number, bill date, and optional invoice copy.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Invoice Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="billInvoiceNo"
                    value={formData.billInvoiceNo}
                    onChange={handleChange}
                    placeholder="e.g. INV-2026-8941"
                    className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none transition-all"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                      Bill Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="billDate"
                      value={formData.billDate}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                      Upload Bill / Receipt (Optional)
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full h-12 px-4 py-2 bg-white rounded-xl border border-slate-300 font-medium text-slate-600 text-xs focus:border-blue-500 shadow-xs outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-SLIDE 2: SUPPLIER SELECTION */}
          {subSlideStep === 2 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-sm">
                  <Icon icon="tabler:building-store" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Select Supplier</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                  Choose a registered supplier from your directory or type to set supplier details.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Supplier Name <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="supplier.name"
                    value={formData.supplier.name}
                    onChange={handleChange}
                    className="w-full h-14 px-5 bg-white rounded-2xl border border-slate-300 font-bold text-slate-800 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 shadow-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="">-- Select Supplier from Directory --</option>
                    {allSuppliers.map((sup) => (
                      <option key={sup._id} value={sup.name}>
                        {sup.name} {sup.contact ? `(${sup.contact})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.supplier.name && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                    <div>
                      <span className="text-slate-400 block font-normal">Contact:</span>
                      {formData.supplier.contact || "-"}
                    </div>
                    <div>
                      <span className="text-slate-400 block font-normal">Email:</span>
                      {formData.supplier.email || "-"}
                    </div>
                    <div>
                      <span className="text-slate-400 block font-normal">Address:</span>
                      {formData.supplier.address || "-"}
                    </div>
                    <div>
                      <span className="text-slate-400 block font-normal">GSTIN:</span>
                      {formData.supplier.gstin || "-"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUB-SLIDE 3: PURCHASED LINE ITEMS */}
          {subSlideStep === 3 && (
            <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-purple-100 shadow-sm">
                  <Icon icon="tabler:box" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Purchased Line Items</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                  Add products, supplies, or equipment included in this invoice.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {formData.products.map((item, index) => (
                  <div key={index} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 relative">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                        Item #{index + 1}
                      </span>
                      {formData.products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(index)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 cursor-pointer border-none bg-transparent flex items-center gap-1"
                        >
                          <Icon icon="tabler:trash" className="text-base" /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
                          Product Type
                        </label>
                        <select
                          name={`products.${index}.type`}
                          value={item.type}
                          onChange={handleChange}
                          className="w-full h-11 px-3 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-xs focus:border-blue-500 shadow-xs outline-none"
                        >
                          <option value="consumable">Consumable Supply</option>
                          <option value="equipment">Medical Equipment</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
                          Product Name / Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          name={`products.${index}.productName`}
                          value={item.productName}
                          onChange={handleChange}
                          placeholder="e.g. Surgical Gloves Box"
                          className="w-full h-11 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-xs focus:border-blue-500 shadow-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
                          Quantity
                        </label>
                        <input
                          type="number"
                          name={`products.${index}.quantity`}
                          value={item.quantity}
                          onChange={handleChange}
                          placeholder="1"
                          className="w-full h-11 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-xs text-center focus:border-blue-500 shadow-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
                          Unit Price ($ / ₹)
                        </label>
                        <input
                          type="number"
                          name={`products.${index}.amount`}
                          value={item.amount}
                          onChange={handleChange}
                          placeholder="0.00"
                          className="w-full h-11 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-xs text-center focus:border-blue-500 shadow-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">
                          {item.type === "consumable" ? "Expiry Date" : "Warranty Expiry"}
                        </label>
                        <input
                          type="date"
                          name={item.type === "consumable" ? `products.${index}.expiryDate` : `products.${index}.warrantyExpiryDate`}
                          value={item.type === "consumable" ? item.expiryDate : item.warrantyExpiryDate}
                          onChange={handleChange}
                          className="w-full h-11 px-3 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-xs focus:border-blue-500 shadow-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addProduct}
                  className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-dashed border-blue-300 font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Icon icon="tabler:plus" className="text-base" />
                  <span>+ Add Another Product Item</span>
                </button>
              </div>
            </div>
          )}

          {/* SUB-SLIDE 4: FINANCIALS & TAXES */}
          {subSlideStep === 4 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-amber-100 shadow-sm">
                  <Icon icon="tabler:calculator" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Financials & Tax Breakdown</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                  Configure discount percentages and GST tax amounts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Items Subtotal ($ / ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.financials.subtotal || 0}
                    readOnly
                    className="w-full h-12 px-4 bg-slate-100 rounded-xl border border-slate-200 font-black text-slate-800 text-sm shadow-xs outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Discount %
                  </label>
                  <input
                    type="number"
                    name="financials.discount.percentage"
                    value={formData.financials.discount?.percentage || ""}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    GST Tax %
                  </label>
                  <input
                    type="number"
                    name="financials.gst.percentage"
                    value={formData.financials.gst?.percentage || ""}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Net Total Amount ($ / ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.financials.totalAmount || 0}
                    readOnly
                    className="w-full h-12 px-4 bg-blue-50 rounded-xl border border-blue-200 font-black text-blue-600 text-lg shadow-xs outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-SLIDE 5: PAYMENT & CONFIRMATION */}
          {subSlideStep === 5 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-2xl border border-emerald-100 shadow-sm">
                  <Icon icon="tabler:credit-card" />
                </div>
                <h3 className="text-2xl font-black text-slate-800">Payment & Confirmation</h3>
                <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
                  Set payment status and review summary before completing purchase.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Payment Mode
                  </label>
                  <select
                    name="payment.mode"
                    value={formData.payment.mode}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none cursor-pointer"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI / Online</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Payment Status
                  </label>
                  <select
                    name="payment.status"
                    value={formData.payment.status}
                    onChange={handleChange}
                    className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Paid Amount ($ / ₹)
                  </label>
                  <input
                    type="number"
                    name="payment.paidAmount"
                    value={formData.payment.paidAmount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full h-12 px-4 bg-white rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:border-blue-500 shadow-xs outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Due Amount ($ / ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.payment.dueAmount}
                    readOnly
                    className="w-full h-12 px-4 bg-rose-50 rounded-xl border border-rose-200 font-bold text-rose-600 text-sm shadow-xs outline-none"
                  />
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
                <span>Previous Step</span>
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
                Skip Step →
              </button>
            )}

            {subSlideStep < 5 ? (
              <button
                type="button"
                onClick={handleNextSlide}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all border-none"
              >
                <span>Next Step</span>
                <Icon icon="tabler:arrow-right" className="text-base" />
              </button>
            ) : (
              <button
                type="button"
                onClick={formData?._id ? handleUpdate : handleSubmit}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all border-none uppercase tracking-wider"
              >
                <Icon icon="solar:check-circle-bold" className="text-lg" />
                <span>{formData?._id ? "Update Purchase Record" : "Submit Purchase Order"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expenditure;
