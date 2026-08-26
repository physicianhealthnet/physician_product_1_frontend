import React from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { Tabs } from "antd";
import Button from "../../../../component/ui/Button";

const IncomingWebRequests = ({ allRequests = [], onApprove, onReschedule, filterDate, searchTerm, filterDoctor }) => {
  const filteredRequests = allRequests.filter(appt => {
    // 1. Date filter
    if (filterDate) {
      const apptDate = appt.appointmentDate ? dayjs(appt.appointmentDate).format("YYYY-MM-DD") : (appt.date ? dayjs(appt.date).format("YYYY-MM-DD") : null);
      if (apptDate !== filterDate) return false;
    }
    // 2. Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (!((appt.patientName || "").toLowerCase().includes(q) || (appt.phoneNumber || appt.patientPhone || appt.patientPhno || "").includes(q))) {
        return false;
      }
    }
    // 3. Doctor filter
    if (filterDoctor) {
      const doc = appt.doctor || appt.docName || appt.doctorName;
      if (doc !== filterDoctor) return false;
    }
    return true;
  });

  const pendingRequests = filteredRequests.filter(appt => {
    const s = appt.status?.toLowerCase();
    return s === "pending" || (!s && !appt.localAppointmentId);
  });

  const approvedRequests = filteredRequests.filter(appt => {
    const s = appt.status?.toLowerCase();
    return s === "approve" || s === "approved" || appt.mappedStatus === "Booked";
  });

  const rejectedRequests = filteredRequests.filter(appt => {
    const s = appt.status?.toLowerCase();
    return s === "reject" || s === "rejected" || s === "cancelled";
  });

  const renderTable = (requests, isPending) => (
    <div className="overflow-x-auto custom-scrollbar max-h-[300px]">
      <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
        <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-slate-200 shadow-sm">
          <tr>
            <th className="p-4 pl-6">Patient Name</th>
            <th className="p-4">Requested Date</th>
            <th className="p-4">Reason for Visit</th>
            <th className="p-4">Preferred Window</th>
            <th className="p-4 text-center">Action/Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-10 text-center opacity-60">
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <Icon icon="solar:inbox-line-bold-duotone" className="text-4xl text-slate-300" />
                  <p className="text-slate-500 font-extrabold text-sm uppercase tracking-widest">No Requests Found</p>
                </div>
              </td>
            </tr>
          ) : (
            requests.map((appt, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 border-b border-slate-100/50 transition-colors duration-200">
                <td className="p-4 pl-6 font-extrabold text-slate-800 text-sm">
                  {appt.patientName}
                </td>
                <td className="p-4 text-sm font-bold text-slate-700">
                  {appt.appointmentDate ? dayjs(appt.appointmentDate).format("MMM DD, YYYY") : (appt.date ? dayjs(appt.date).format("MMM DD, YYYY") : "No Date")}
                </td>
                <td className="p-4 text-sm font-medium text-slate-600 truncate max-w-[200px]" title={appt.problemDescription || appt.category}>
                  {appt.problemDescription || appt.category || "Consultation"}
                </td>
                <td className="p-4 text-sm text-slate-500">
                  {appt.selectedSlot || "Anytime"}
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {isPending ? (
                      <>
                        <Button size="sm" onClick={() => onApprove(appt)} className="text-[10px] px-3 py-1.5 h-auto uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => onReschedule(appt)} className="text-[10px] px-3 py-1.5 h-auto uppercase tracking-widest">
                          Reschedule
                        </Button>
                      </>
                    ) : (
                      <span className={`px-3 py-1.5 text-[10px] uppercase font-bold rounded-full ${appt.status?.toLowerCase() === "reject" || appt.status?.toLowerCase() === "cancelled" || appt.status?.toLowerCase() === "rejected" ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                        {appt.status || appt.mappedStatus || "Booked"}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full bg-white">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Pending",
            children: renderTable(pendingRequests, true),
          },
          {
            key: "2",
            label: "Approved",
            children: renderTable(approvedRequests, false),
          },
          {
            key: "3",
            label: "Rejected",
            children: renderTable(rejectedRequests, false),
          }
        ]}
        className="px-4"
        tabBarStyle={{ marginBottom: 0 }}
      />
    </div>
  );
};

export default IncomingWebRequests;
