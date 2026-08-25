import React from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import Button from "../../../../component/ui/Button";

const IncomingWebRequests = ({ pendingRequests, onApprove, onReschedule }) => {
  return (
    <div className="w-full bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm mb-6">
      <div className="bg-slate-50 border-b border-slate-200/50 p-4">
        <h3 className="font-black text-slate-700 tracking-tight flex items-center gap-2 text-sm uppercase">
          <Icon icon="solar:global-bold-duotone" className="text-blue-500 text-lg" />
          Web Appointment Requests <span className="text-slate-400 font-medium normal-case text-xs">(Incoming Portal Queue)</span>
        </h3>
      </div>

      <div className="overflow-x-auto custom-scrollbar max-h-[300px]">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-slate-200 shadow-sm">
            <tr>
              <th className="p-4 pl-6">Patient Name</th>
              <th className="p-4">Requested Date</th>
              <th className="p-4">Reason for Visit</th>
              <th className="p-4">Preferred Window</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center opacity-60">
                  <div className="flex flex-col items-center justify-center gap-2 py-4">
                    <Icon icon="solar:inbox-line-bold-duotone" className="text-4xl text-slate-300" />
                    <p className="text-slate-500 font-extrabold text-sm uppercase tracking-widest">No Pending Requests</p>
                  </div>
                </td>
              </tr>
            ) : (
              pendingRequests.map((appt, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 border-b border-slate-100/50 transition-colors duration-200">
                  <td className="p-4 pl-6 font-extrabold text-slate-800 text-sm">
                    {appt.patientName}
                  </td>
                  <td className="p-4 text-sm font-bold text-slate-700">
                    {dayjs(appt.appointmentDate).format("MMM DD")}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600 truncate max-w-[200px]" title={appt.problemDescription || appt.category}>
                    {appt.problemDescription || appt.category || "Consultation"}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {appt.selectedSlot || "Anytime"}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button size="sm" onClick={() => onApprove(appt)} className="text-[10px] px-3 py-1.5 h-auto uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700">
                        Approve
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => onReschedule(appt)} className="text-[10px] px-3 py-1.5 h-auto uppercase tracking-widest">
                        Reschedule
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomingWebRequests;
