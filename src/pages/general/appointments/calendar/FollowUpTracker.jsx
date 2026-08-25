import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../../utilities/AxiosInstance";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

const FollowUpTracker = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await AxiosInstance.get(`/treatment-tracker/get-all`);
        const cleaned = response?.data.flatMap((row) => {
          if (row.upcomming_sessions?.length > 0) {
            return row.upcomming_sessions
              .filter((s) => s.nextReview && s.nextReview !== "")
              .map((s) => ({
                ...s,
                patientName: row.patientName || "",
              }));
          }
          if (row.nextReview && row.nextReview !== "") {
            return [{
              ...row,
              patientName: row.patientName || "",
            }];
          }
          return [];
        });

        // Filter for upcoming
        const today = dayjs().startOf("day");
        const upcoming = cleaned
          .filter((item) => dayjs(item.nextReview).isSameOrAfter(today, "day"))
          .sort((a, b) => dayjs(a.nextReview) - dayjs(b.nextReview));

        setReviews(upcoming);
      } catch (error) {
        console.error("Failed to fetch next reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200/50 p-4">
        <h3 className="font-black text-slate-700 tracking-tight flex items-center gap-2 text-sm uppercase">
          <Icon icon="solar:calendar-date-bold-duotone" className="text-blue-500 text-lg" />
          Next Reviews <span className="text-slate-400 font-medium normal-case text-xs">(Planned Follow-up)</span>
        </h3>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar h-[350px]">
        <table className="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-md text-[10px] uppercase font-black text-slate-500 tracking-widest border-b border-slate-200 shadow-sm">
            <tr>
              <th className="p-4 pl-6">Patient Name</th>
              <th className="p-4">Target Date</th>
              <th className="p-4">Follow-up Reason</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-slate-400 font-bold">Loading...</td>
              </tr>
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-10 text-center opacity-60">
                  <div className="flex flex-col items-center justify-center gap-2 py-4">
                    <Icon icon="solar:folder-open-bold-duotone" className="text-4xl text-slate-300" />
                    <p className="text-slate-500 font-extrabold text-sm uppercase tracking-widest">No Upcoming Reviews</p>
                  </div>
                </td>
              </tr>
            ) : (
              reviews.map((rev, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 border-b border-slate-100/50 transition-colors duration-200">
                  <td className="p-4 pl-6 font-extrabold text-slate-800 text-sm">
                    {rev.patientName || "Unknown"}
                  </td>
                  <td className="p-4 text-sm font-bold text-blue-600">
                    {dayjs(rev.nextReview).format("MMM DD")} ({dayjs(rev.nextReview).diff(dayjs().startOf('day'), 'day')} days)
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-medium">
                    {rev.reason || rev.treatmentName || "Routine Review"}
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

export default FollowUpTracker;
