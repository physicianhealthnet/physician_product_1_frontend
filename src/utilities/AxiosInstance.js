import axios from "axios";
import { mockDashboardData, mockPatientsList, mockPatientDetails } from "../pages/doctor/home/mockDashboardData";

const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const AxiosInstance = axios.create({
  baseURL: isLocal ? "http://localhost:3026" : "https://demo.physicianhealthnet.com/api"
});

const AxiosInstanceSecondryServer = axios.create({
  baseURL: isLocal ? "http://localhost:3028" : "https://dependencyforphn.physicianhealthnet.com/api/"
});

const AxiosInstanceDependency = AxiosInstanceSecondryServer;

const handleMockRequest = (config) => {
  const url = config.url || "";
  let cleanPath = url;
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    try {
      cleanPath = new URL(cleanPath).pathname;
    } catch (e) {
      const match = cleanPath.match(/^https?:\/\/[^/]+(\/.*)/);
      if (match) cleanPath = match[1];
    }
  }

  // Strip query parameters
  cleanPath = cleanPath.split("?")[0];
  
  // Standardize slashes
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }

  const lowerUrl = cleanPath.toLowerCase();

  // 1. Dashboard API
  if (lowerUrl.includes("/business-tool/dashboard-v2")) {
    return mockDashboardData;
  }

  // 2. Doctor / Staff APIs
  if (lowerUrl.includes("/get-doctor") || lowerUrl.includes("/doctor") || lowerUrl.includes("/staff") || lowerUrl.includes("/user/get-all")) {
    return {
      users: [
        { _id: "doc-1", userName: "Dr. Saravanan (Mylapore)", name: "Dr. Saravanan (Mylapore)", userType: "doctor", phone: "9840112233", email: "saravanan@phn.com" },
        { _id: "doc-2", userName: "Dr. Priya (Coimbatore)", name: "Dr. Priya (Coimbatore)", userType: "doctor", phone: "9444012233", email: "priya@phn.com" },
        { _id: "staff-1", userName: "Rajesh (Receptionist)", name: "Rajesh (Receptionist)", userType: "receptionist", phone: "9894012233", email: "rajesh@phn.com" }
      ]
    };
  }

  // 3. Appointments search & Patient search
  if (lowerUrl.includes("/appointments/search") || lowerUrl.includes("/patient/search") || lowerUrl.includes("/patientregistration/list")) {
    return { patients: mockPatientsList, status: 200, success: true };
  }

  // 4. Appointments list/get
  if (lowerUrl.includes("/appointments/get") || lowerUrl.includes("/appointments/list")) {
    return {
      data: mockPatientsList.map((p, i) => ({
        _id: `apt-int-${i}`,
        patientId: p.patientId,
        patientName: p.patientName,
        name: p.patientName,
        appointmentDate: i < 13 ? new Date().toISOString().split("T")[0] : new Date(Date.now() + 86400000 * (i - 12)).toISOString().split("T")[0],
        time: i < 13 ? (i % 2 === 0 ? "10:00 AM" : "03:00 PM") : "11:00 AM",
        status: i % 3 === 0 ? "Completed" : (i % 3 === 1 ? "Checked-in" : "Scheduled"),
        purpose: "General Checkup",
        doctorName: "Dr. Saravanan (Mylapore)"
      }))
    };
  }

  // 5. Web Appointments
  if (lowerUrl.includes("user-appointment/clinic-appointments")) {
    return {
      data: mockPatientsList.slice(5, 15).map((p, i) => ({
        _id: `apt-web-${i}`,
        patientId: p.patientId,
        patientName: p.patientName,
        name: p.patientName,
        appointmentDate: new Date().toISOString().split("T")[0],
        appointmentTime: i % 2 === 0 ? "11:30 AM" : "04:30 PM",
        status: "Pending",
        problemDescription: "Routine General Checkup"
      }))
    };
  }

  // 6. Treatment Tracker (Upcoming Reviews)
  if (lowerUrl.includes("/treatment-tracker/")) {
    return mockPatientsList.slice(0, 10).map((p, i) => ({
      _id: `track-${i}`,
      patientId: p.patientId,
      patientName: p.patientName,
      patientPhone: p.patientPhone,
      patientAddress: p.location,
      treatmentName: i % 2 === 0 ? "Physiotherapy Care" : "Cardiac Rehabilitation",
      nextReview: new Date(Date.now() + 86400000 * (i - 1)).toISOString().split("T")[0],
      status: "Active"
    }));
  }

  // 7. All patients list
  if (lowerUrl.includes("/patient/get-all") || lowerUrl.includes("/patient/get-all-by-clinic")) {
    return { patients: mockPatientsList };
  }

  // 8. Patients details list
  if (lowerUrl.includes("/dashboard-patient-list")) {
    return { data: mockPatientDetails };
  }

  // 9. Patient by ID
  if (lowerUrl.includes("/patient/get-by-id/")) {
    const extractedId = cleanPath.split("/").pop();
    const patient = mockPatientsList.find(p => p.patientId === extractedId) || mockPatientsList[0];
    return { patient };
  }

  // 10. Patient medical details
  if (lowerUrl.includes("/patientregistration/get-by-patient/")) {
    const extractedId = cleanPath.split("/").pop();
    const p = mockPatientsList.find(p => p.patientId === extractedId) || mockPatientsList[0];
    const det = mockPatientDetails[p.patientId]?.patientDetails || {};
    return {
      patient: {
        _id: `med-${p.patientId}`,
        patientId: p.patientId,
        patientName: p.patientName,
        patientAge: p.patientAge,
        patientGender: p.patientGender,
        patientDOB: "1980-01-01",
        patientPhone: p.patientPhone,
        patientEmail: p.patientName.toLowerCase().replace(/\s/g, "") + "@example.com",
        patientAddress: p.location,
        patientAadhar: "1234 5678 9012",
        primaryComplaint: det.primaryComplaint || "Routine Checkup",
        duration: "2 weeks",
        painScore: "4/10",
        bp: "120/80",
        rbs: "110",
        symptomData: [
          { key: "toothache", present: true, severity: 5, notes: "Mild discomfort" },
          { key: "sensitivity", present: false },
          { key: "swelling", present: false },
          { key: "bleeding", present: false },
          { key: "bitingPain", present: true, severity: 4 }
        ],
        lastPhysicianVisit: "3 months ago",
        previousTreatments: "None",
        historyExtraction: "No",
        orthodontic: "No",
        bruxism: "No",
        floss: "Yes"
      }
    };
  }

  // 11. Assessment get
  if (lowerUrl.includes("/assessment/get/")) {
    const extractedId = cleanPath.split("/").pop();
    const p = mockPatientsList.find(p => p.patientId === extractedId) || mockPatientsList[0];
    const det = mockPatientDetails[p.patientId]?.patientDetails || {};
    return {
      data: {
        _id: `assess-${p.patientId}`,
        patientId: p.patientId,
        medicalChecks: {
          hypertension: p.patientAge > 50,
          diabetes: p.patientAge > 45,
          thyroid: p.patientGender === "female"
        },
        medicalNotes: {
          generalNotes: `Patient presents with chief complaint of ${det.primaryComplaint || "general issues"}. Formulated initial care plan.`
        },
        chiefComplaints: det.primaryComplaint || "Routine consultation",
        historyOfPresentIllness: "Onset since last week, gradually progressing.",
        vitals: [
          { bp: "120/80", pulse: "72", weight: "70", date: new Date().toISOString() }
        ]
      }
    };
  }

  // 12. Prescriptions list
  if (lowerUrl.includes("/prescription/patient/")) {
    return [
      {
        _id: "presc-001",
        medicineName: "Paracetamol 650mg",
        dosage: "1-0-1",
        duration: "5 days",
        instructions: "After food"
      },
      {
        _id: "presc-002",
        medicineName: "Pantocid 40mg",
        dosage: "1-0-0",
        duration: "5 days",
        instructions: "Before food"
      }
    ];
  }

  // 13. Scan and Lab documents by patient
  if (lowerUrl.includes("/scan-prescription/by-patient/") || lowerUrl.includes("/lab-prescription/by-patient/")) {
    return { data: [] };
  }

  // 14. Inventory APIs
  if (lowerUrl.includes("/inventory")) {
    return {
      data: [
        { _id: "inv-1", name: "Digital Blood Pressure Monitor", quantity: 12, status: "In Stock", price: 1500, category: "Equipment" },
        { _id: "inv-2", name: "Surgical Gloves (Box of 100)", quantity: 45, status: "In Stock", price: 450, category: "Consumables" },
        { _id: "inv-3", name: "N95 Face Masks", quantity: 120, status: "In Stock", price: 60, category: "Consumables" },
        { _id: "inv-4", name: "Pulse Oximeter", quantity: 8, status: "Low Stock", price: 900, category: "Equipment" }
      ],
      inventories: [
        { _id: "inv-1", name: "Digital Blood Pressure Monitor", quantity: 12, status: "In Stock", price: 1500, category: "Equipment" },
        { _id: "inv-2", name: "Surgical Gloves (Box of 100)", quantity: 45, status: "In Stock", price: 450, category: "Consumables" }
      ]
    };
  }

  // 15. Pharmacy / Medicines APIs
  if (lowerUrl.includes("/pharmacy") || lowerUrl.includes("/medicine")) {
    return {
      data: [
        { _id: "med-1", name: "Paracetamol 650mg", stock: 350, price: 15, manufacturer: "Cipla" },
        { _id: "med-2", name: "Amoxicillin 500mg", stock: 180, price: 65, manufacturer: "Abbott" },
        { _id: "med-3", name: "Cetirizine 10mg", stock: 500, price: 10, manufacturer: "Alkem" },
        { _id: "med-4", name: "Metformin 500mg", stock: 250, price: 30, manufacturer: "Sun Pharma" }
      ],
      medicines: [
        { _id: "med-1", name: "Paracetamol 650mg", stock: 350, price: 15, manufacturer: "Cipla" },
        { _id: "med-2", name: "Amoxicillin 500mg", stock: 180, price: 65, manufacturer: "Abbott" }
      ]
    };
  }

  // 16. Billing APIs
  if (lowerUrl.includes("/bill")) {
    return {
      data: mockPatientsList.slice(0, 5).map((p, i) => ({
        _id: `bill-${i}`,
        billNumber: `BILL-2026-00${i+1}`,
        patientId: p.patientId,
        patientName: p.patientName,
        amount: 850 + (i * 200),
        status: i % 2 === 0 ? "Paid" : "Pending",
        date: new Date().toISOString().split("T")[0]
      }))
    };
  }

  // 17. Expenditure APIs
  if (lowerUrl.includes("/expenditure")) {
    return {
      data: [
        {
          _id: "exp-1",
          billInvoiceNo: "INV-2026-001",
          billDate: "2026-07-01",
          supplier: { name: "Kovai Medical Supplies" },
          financials: {
            totalAmount: 35000,
            netAmount: 33000,
            gst: { amount: 3000 },
            discount: { amount: 5000 }
          },
          payment: {
            status: "completed",
            dueAmount: 0
          },
          products: [
            { type: "equipment", amount: 15000, quantity: 2 },
            { type: "consumable", amount: 1000, quantity: 5 }
          ]
        },
        {
          _id: "exp-2",
          billInvoiceNo: "INV-2026-002",
          billDate: "2026-07-10",
          supplier: { name: "Chennai Pharma Distributors" },
          financials: {
            totalAmount: 12000,
            netAmount: 12000,
            gst: { amount: 1000 },
            discount: { amount: 1000 }
          },
          payment: {
            status: "pending",
            dueAmount: 2000
          },
          products: [
            { type: "consumable", amount: 2000, quantity: 6 }
          ]
        },
        {
          _id: "exp-3",
          billInvoiceNo: "INV-2026-003",
          billDate: "2026-07-25",
          supplier: { name: "Kovai Medical Supplies" },
          financials: {
            totalAmount: 150000,
            netAmount: 145000,
            gst: { amount: 12000 },
            discount: { amount: 17000 }
          },
          payment: {
            status: "completed",
            dueAmount: 0
          },
          products: [
            { type: "equipment", amount: 140000, quantity: 1 },
            { type: "consumable", amount: 5000, quantity: 2 }
          ]
        },
        {
          _id: "exp-4",
          billInvoiceNo: "INV-2026-004",
          billDate: "2026-07-28",
          supplier: { name: "Chennai Pharma Distributors" },
          financials: {
            totalAmount: 3500,
            netAmount: 3500,
            gst: { amount: 300 },
            discount: { amount: 300 }
          },
          payment: {
            status: "pending",
            dueAmount: 500
          },
          products: [
            { type: "consumable", amount: 700, quantity: 5 }
          ]
        }
      ]
    };
  }

  // 18. Feedback APIs
  if (lowerUrl.includes("/feedback")) {
    return {
      feedbacks: mockPatientsList.slice(0, 5).map((p, i) => ({
        _id: `feed-${i}`,
        patientName: p.patientName,
        rating: 5 - (i % 2),
        comment: i % 2 === 0 ? "Very kind doctor, excellent clinic experience in Tamil Nadu." : "Friendly staff and clean environment.",
        date: new Date().toISOString().split("T")[0]
      }))
    };
  }

  // 19. Supplier APIs
  if (lowerUrl.includes("/supplier")) {
    return {
      data: [
        { _id: "sup-1", name: "Kovai Medical Supplies", contactPerson: "Murugan", phone: "9842011223", email: "kovai@medsupplies.com", location: "Coimbatore" },
        { _id: "sup-2", name: "Chennai Pharma Distributors", contactPerson: "Srinivasan", phone: "9841098765", email: "chennai@pharmadist.com", location: "Chennai" }
      ]
    };
  }

  // 20. Preload Prescription template endpoints
  if (lowerUrl.includes("/preload-prescription/get-titles")) {
    return {
      data: [
        { _id: "temp-1", title: "General Fever & Cold Template" },
        { _id: "temp-2", title: "Hypertension Management" },
        { _id: "temp-3", title: "Diabetes Initial Care" }
      ]
    };
  }
  if (lowerUrl.includes("/preload-prescription/get-all-data")) {
    return {
      data: [
        {
          _id: "temp-1",
          title: "General Fever & Cold Template",
          preloadedMedicinesData: [
            { medicine: "Paracetamol 650mg", dosage: "1-0-1", duration: "5 days", instructions: "After food" },
            { medicine: "Cetirizine 10mg", dosage: "0-0-1", duration: "3 days", instructions: "Before sleep" }
          ]
        },
        {
          _id: "temp-2",
          title: "Hypertension Management",
          preloadedMedicinesData: [
            { medicine: "Amlodipine 5mg", dosage: "1-0-0", duration: "30 days", instructions: "Morning, after food" }
          ]
        },
        {
          _id: "temp-3",
          title: "Diabetes Initial Care",
          preloadedMedicinesData: [
            { medicine: "Metformin 500mg", dosage: "1-0-1", duration: "30 days", instructions: "With food" }
          ]
        }
      ]
    };
  }
  if (lowerUrl.includes("/inventory/get-name")) {
    return {
      data: [
        "Paracetamol 650mg",
        "Amlodipine 5mg",
        "Metformin 500mg",
        "Amoxicillin 500mg",
        "Pantocid 40mg"
      ]
    };
  }

  // 21. Pharmacy Prescriptions & Inventory
  if (lowerUrl.includes("/prescription/get-for-pharmacy")) {
    return {
      data: mockPatientsList.slice(0, 5).map((p, i) => ({
        _id: `presc-${p.patientId}`,
        prescriptionId: `PR-${p.patientId.slice(-4)}-2026`,
        patientId: p.patientId,
        patientName: p.patientName,
        patientPhone: p.patientPhone,
        patientAddress: p.location.split(",")[0],
        PHN_ID: p.patientId,
        createdAt: new Date().toISOString(),
        dispenseStatus: i === 0 ? "Fully Dispensed" : (i === 1 ? "Partially Dispensed" : "Pending"),
        isRefillable: i % 2 === 0,
        refillCount: i % 2 === 0 ? 1 : 0,
        refillLimit: 3,
        medicines: [
          { medicine: "Paracetamol 650mg", dosage: "1-0-1", duration: "5 days", instructions: "After food", quantity: 10, morning: "1", afternoon: "0", night: "1", days: "5" },
          { medicine: "Pantocid 40mg", dosage: "1-0-0", duration: "5 days", instructions: "Before food", quantity: 5, morning: "1", afternoon: "0", night: "0", days: "5" }
        ],
        medicinesData: [
          { medication: "Paracetamol 650mg", morning: "1", afternoon: "0", night: "1", days: "5", instructions: "After food" },
          { medication: "Pantocid 40mg", morning: "1", afternoon: "0", night: "0", days: "5", instructions: "Before food" }
        ]
      }))
    };
  }
  if (lowerUrl.includes("/inventory/get-all")) {
    const mockInventoryList = [
      { _id: "inv-1", productName: "Paracetamol 650mg", productType: "Tablet", quantity: 500, productCurrentCount: 500, price: 2.50, costPrice: 1.50, supplier: "Kovai Medical Supplies", batchNo: "B-PAR-22", expiryDate: "2028-12-31" },
      { _id: "inv-2", productName: "Amlodipine 5mg", productType: "Tablet", quantity: 350, productCurrentCount: 350, price: 4.00, costPrice: 2.00, supplier: "Chennai Pharma Distributors", batchNo: "B-AML-04", expiryDate: "2027-10-30" },
      { _id: "inv-3", productName: "Metformin 500mg", productType: "Tablet", quantity: 600, productCurrentCount: 600, price: 3.50, costPrice: 1.80, supplier: "Kovai Medical Supplies", batchNo: "B-MET-88", expiryDate: "2029-05-15" },
      { _id: "inv-4", productName: "Amoxicillin 500mg", productType: "Capsule", quantity: 200, productCurrentCount: 200, price: 8.00, costPrice: 5.00, supplier: "Chennai Pharma Distributors", batchNo: "B-AMX-19", expiryDate: "2027-06-30" },
      { _id: "inv-5", productName: "Pantocid 40mg", productType: "Tablet", quantity: 450, productCurrentCount: 450, price: 6.50, costPrice: 3.50, supplier: "Kovai Medical Supplies", batchNo: "B-PAN-44", expiryDate: "2028-02-28" }
    ];
    return {
      data: mockInventoryList,
      product: mockInventoryList
    };
  }

  // 22. Treatment Bill list
  if (lowerUrl.includes("/treatment-bill/get-all")) {
    return {
      data: mockPatientsList.slice(0, 6).map((p, i) => {
        const totalAmount = 1500 + i * 350;
        const discount = i % 3 === 0 ? 10 : 0;
        const subtotal = totalAmount;
        const discountAmt = (subtotal * discount) / 100;
        const payable = subtotal - discountAmt;
        const balanceAmount = i % 2 === 0 ? 0 : 500;
        const paidAmount = payable - balanceAmount;

        return {
          _id: `bill-${p.patientId}`,
          patientId: p.patientId,
          patientName: p.patientName,
          patientPhone: p.patientPhone,
          invoiceDate: new Date().toISOString(),
          modeOfPayment: i % 2 === 0 ? "UPI" : "Cash",
          totalAmount,
          discount,
          paidAmount,
          balanceAmount,
          createdAt: new Date(Date.now() - 86400000 * i).toISOString(),
          isDeleted: false,
          treatments: [
            { name: "General Consultation", price: 500, quantity: 1, total: 500 },
            { name: i % 2 === 0 ? "Physiotherapy Session" : "Lab Diagnostics Set", price: totalAmount - 500, quantity: 1, total: totalAmount - 500 }
          ]
        };
      })
    };
  }

  // 23. Lab Prescription list & stats
  if (lowerUrl.includes("/lab-prescription/stats")) {
    return {
      data: {
        createdToday: 8,
        todayTotal: 8,
        morning: 3,
        afternoon: 3,
        evening: 2,
        yesterday: 6,
        thisWeek: 42,
        thisMonth: 180,
        last3Months: 540,
        notScheduled: 2,
        missing: 1,
        reportNotReady: 3,
        notReviewed: 2
      }
    };
  }
  if (lowerUrl.includes("/lab-prescription/by-status")) {
    return {
      data: mockPatientsList.slice(0, 10).map((p, i) => {
        let status = "Not Scheduled";
        if (i % 3 === 1) status = "Completed";
        else if (i % 3 === 2) status = "Missing";
        
        return {
          _id: `lab-${p.patientId}-${i}`,
          ptrName: p.patientName,
          ptNo: p.patientId,
          labType: i % 2 === 0 ? "Blood Glucose / Lipid Profile" : "Thyroid Panel (T3, T4, TSH)",
          drName: "Dr. Murugan",
          createdAt: new Date(Date.now() - 86400000 * i).toISOString(),
          appointmentDateTime: new Date(Date.now() + 3600000 * i).toISOString(),
          labCenter: i % 2 === 0 ? "Internal" : "External",
          status,
          finalReportNotes: "Thyroid values are within limits. Re-evaluate in 3 months.",
          finalReportFileUrl: ""
        };
      })
    };
  }

  // 24. Scan Prescription list & stats
  if (lowerUrl.includes("/scan-prescription/stats")) {
    return {
      data: {
        createdToday: 6,
        todayTotal: 6,
        morning: 2,
        afternoon: 2,
        evening: 2,
        yesterday: 4,
        thisWeek: 28,
        thisMonth: 120,
        last3Months: 360,
        notScheduled: 1,
        missing: 1,
        reportNotReady: 2,
      }
    };
  }

  if (lowerUrl.includes("/scan-prescription/get-all")) {
    return {
      data: mockPatientsList.slice(0, 10).map((p, i) => ({
        _id: `scan-${p.patientId}-${i}`,
        prescriptionId: `PR-${1000 + i}`,
        ptrName: p.patientName,
        ptNo: p.patientId,
        scanType: i % 2 === 0 ? "Chest X-Ray PA View" : "MRI Lumbar Spine",
        drName: "Dr. Murugan",
        priority: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
        status: i % 2 === 0 ? "Not Scheduled" : "Completed",
        createdAt: new Date().toISOString(),
      })),
    };
  }

  if (lowerUrl.includes("/scan-prescription/create")) {
    return { status: 201, success: true, message: "Scan prescription created successfully" };
  }

  if (lowerUrl.includes("/scan-prescription/by-status")) {
    return {
      data: mockPatientsList.slice(0, 10).map((p, i) => {
        let status = "Not Scheduled";
        if (i % 3 === 1) status = "Completed";
        else if (i % 3 === 2) status = "Missing";
        
        return {
          _id: `scan-${p.patientId}-${i}`,
          ptrName: p.patientName,
          ptNo: p.patientId,
          scanType: i % 2 === 0 ? "Chest X-Ray PA View" : "MRI Lumbar Spine",
          drName: "Dr. Murugan",
          createdAt: new Date(Date.now() - 86400000 * i).toISOString(),
          appointmentDateTime: new Date(Date.now() + 3600000 * i).toISOString(),
          scanCenter: i % 2 === 0 ? "Internal" : "External",
          status,
          finalReportNotes: "No abnormalities detected. X-Ray is clear.",
          finalReportFileUrl: ""
        };
      })
    };
  }

  // Fallback for mock queries to avoid properties reading crash
  return {
    data: [],
    patients: [],
    users: [],
    feedbacks: [],
    success: true
  };
};

const standardAdapter = typeof axios.getAdapter === "function"
  ? axios.getAdapter(axios.defaults.adapter)
  : axios.defaults.adapter;

const customAdapter = async (config) => {
  const isDemo = localStorage.getItem("isDemoMode") === "true";
  const url = config.url || "";
  const isAuthOrCheckRoute = url.includes("/user/login") || 
                             url.includes("/user/check-new-account") || 
                             url.includes("/user/set-password");

  if (isDemo && !isAuthOrCheckRoute) {
    const mockRes = handleMockRequest(config);
    if (mockRes !== null) {
      return {
        data: mockRes,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
        request: {}
      };
    }
    // Intercept mock writes (POST/PUT/PATCH/DELETE)
    if (config.method === "post" || config.method === "put" || config.method === "patch" || config.method === "delete") {
      return {
        data: { success: true, message: "Action simulated successfully in Demo Mode" },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
        request: {}
      };
    }
  }

  // Fallback to normal network requests
  return standardAdapter(config);
};

AxiosInstance.defaults.adapter = customAdapter;
AxiosInstanceSecondryServer.defaults.adapter = customAdapter;

export { AxiosInstance, AxiosInstanceSecondryServer, AxiosInstanceDependency };

