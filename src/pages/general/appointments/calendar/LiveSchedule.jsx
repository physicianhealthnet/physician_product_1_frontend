import React, { useState } from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import Button from "../../../../component/ui/Button";

const LiveSchedule = ({ appointments, updateStatus, getStatusIcon, getStatusColor }) => {
  return (
    <div className="flex flex-col flex-1 bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200/50 p-4 flex items-center justify-between">
        <h3 className="font-black text-slate-700 tracking-tight flex items-center gap-2 text-sm uppercase">
          <Icon icon="solar:clock-circle-bold-duotone" className="text-blue-500 text-lg" />
          Appointment List <span className="text-slate-400 font-medium normal-case text-xs">(Live Day Schedule)</span>
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 mr-4">
            <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-purple-200">
              <span className="scale-110"><Icon icon="solar:global-bold-duotone" /></span> Web Appt
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-emerald-200">
              <span className="scale-110"><Icon icon="duo-icons:building" /></span> Internal
            </span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar h-[350px]">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-slate-200 shadow-sm">
            <tr>
              <th className="p-4 pl-6">Date & Time</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Doctor</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center opacity-60">
                  <div className="flex flex-col items-center justify-center gap-2 py-4">
                    <Icon icon="solar:folder-open-bold-duotone" className="text-4xl text-slate-300" />
                    <p className="text-slate-500 font-extrabold text-sm uppercase tracking-widest">No Appointments</p>
                  </div>
                </td>
              </tr>
            ) : (
              appointments.map((appt, idx) => (
                <tr key={idx} className={`border-b border-slate-100/50 transition-colors duration-200 group ${appt.isWebAppointment ? 'bg-purple-50 hover:bg-purple-100' : 'bg-emerald-50 hover:bg-emerald-100'}`}>
                  <td className="p-4 pl-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-700 text-sm">{appt.startTime}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        {appt.appointmentDate ? dayjs(appt.appointmentDate).format("MMM DD, YYYY") : (appt.date ? dayjs(appt.date).format("MMM DD, YYYY") : "No Date")}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-extrabold text-slate-800 text-sm tracking-tight">{appt.patientName}</span>
                      <span className="text-xs text-slate-500">{appt.phoneNumber || appt.patientPhone || appt.patientPhno}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-blue-600">
                    {appt.doctor || appt.docName || appt.doctorName || "—"}
                  </td>
                  <td className="p-4 text-center">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${getStatusColor(appt.mappedStatus || appt.status)}`}>
                      <div className="scale-110">
                        {getStatusIcon(appt.mappedStatus || appt.status)}
                      </div>
                      <span className="text-indent-[0.2em]">{appt.mappedStatus || appt.status}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2 transition-opacity">
                      {(appt.mappedStatus || appt.status) === "Booked" && (
                        <>
                          <Button size="sm" onClick={() => updateStatus(appt, "Checked-in")} className="text-[10px] px-2 py-1 h-auto uppercase tracking-widest">
                            Check In
                          </Button>
                          {!appt.isWebAppointment && (
                            <Button size="sm" variant="secondary" onClick={() => updateStatus(appt, "Cancelled")} className="text-red-600 text-[10px] px-2 py-1 h-auto uppercase tracking-widest border-red-200 hover:bg-red-50">
                              Cancel
                            </Button>
                          )}
                        </>
                      )}
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

export default LiveSchedule;
