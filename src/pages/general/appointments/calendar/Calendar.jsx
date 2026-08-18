import React, { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import Toolbar from "./Toolbar";
import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import ManageAppointments from "./ManageAppointments";
import "./Calendar.css";
import { ArrowLeft } from "lucide-react";

import {
  StaggerContainer,
  StaggerItem,
} from "../../../../component/ui/Transitions";
import Button from "../../../../component/ui/Button";
import { useNavigate } from "react-router-dom";

dayjs.extend(isoWeek);

export default function Calendar({ refreshTrigger }) {
  const navigate = useNavigate();
  const user = (() => {
    try {
      const str =
        sessionStorage.getItem("master") || sessionStorage.getItem("user");
      return str ? JSON.parse(str) : null;
    } catch (e) {
      return null;
    }
  })();

  const [view, setView] = useState("week"); // "day" | "week" | "month"
  const [selectedGroup, setSelectedGroup] = useState(null); // selected doctor
  const [stateChange, setStateChange] = useState(null);
  const [date, setDateState] = useState(dayjs().format("YYYY-MM-DD"));
  const [week, setWeekState] = useState(dayjs().format("YYYY-[W]WW"));
  const [month, setMonthState] = useState(dayjs().format("YYYY-MM"));

  // Keep date, week, and month in sync
  const setDate = (newDate) => {
    const d = dayjs(newDate);
    if (!d.isValid()) return;
    setDateState(d.format("YYYY-MM-DD"));
    setWeekState(d.format("YYYY-[W]WW"));
    setMonthState(d.format("YYYY-MM"));
  };

  const setWeek = (newWeek) => {
    if (!newWeek || !newWeek.includes("-W")) return;
    setWeekState(newWeek);
    const [year, weekNum] = newWeek.split("-W").map(Number);
    const startOfWeek = dayjs().year(year).isoWeek(weekNum).startOf("isoWeek");
    if (startOfWeek.isValid()) {
      setDateState(startOfWeek.format("YYYY-MM-DD"));
      setMonthState(startOfWeek.format("YYYY-MM"));
    }
  };

  const setMonth = (newMonth) => {
    if (!newMonth) return;
    setMonthState(newMonth);
    const startOfMonth = dayjs(`${newMonth}-01`);
    if (startOfMonth.isValid()) {
      setDateState(startOfMonth.format("YYYY-MM-DD"));
      setWeekState(startOfMonth.format("YYYY-[W]WW"));
    }
  };

  const onPrev = () => {
    if (view === "day") {
      const prevDate = dayjs(date).subtract(1, "day");
      setDate(prevDate.format("YYYY-MM-DD"));
    } else if (view === "week") {
      const [year, weekNum] = week.split("-W").map(Number);
      const prevWeek = dayjs().year(year).isoWeek(weekNum).subtract(1, "week");
      setWeek(prevWeek.format("YYYY-[W]WW"));
    } else if (view === "month") {
      const prevMonth = dayjs(month).subtract(1, "month");
      setMonth(prevMonth.format("YYYY-MM"));
    }
  };

  const onNext = () => {
    if (view === "day") {
      const nextDate = dayjs(date).add(1, "day");
      setDate(nextDate.format("YYYY-MM-DD"));
    } else if (view === "week") {
      const [year, weekNum] = week.split("-W").map(Number);
      const nextWeek = dayjs().year(year).isoWeek(weekNum).add(1, "week");
      setWeek(nextWeek.format("YYYY-[W]WW"));
    } else if (view === "month") {
      const nextMonth = dayjs(month).add(1, "month");
      setMonth(nextMonth.format("YYYY-MM"));
    }
  };

  const onToday = () => {
    const today = dayjs();
    setDateState(today.format("YYYY-MM-DD"));
    setWeekState(today.format("YYYY-[W]WW"));
    setMonthState(today.format("YYYY-MM"));
  };

  const renderCalendar = () => {
    // Pass selectedGroup (doctor) to all views
    if (view === "day") {
      return (
        <DayView
          startDate={date}
          setDate={setDate}
          selectedGroup={selectedGroup}
          stateChange={stateChange}
          setStateChange={setStateChange}
          refreshTrigger={refreshTrigger}
        />
      );
    }
    if (view === "week") {
      return (
        <WeekView
          startDate={week}
          selectedDoctor={selectedGroup}
          refreshTrigger={refreshTrigger}
          stateChange={stateChange}
          setStateChange={setStateChange}
        />
      );
    }
    return (
      <MonthView
        startDate={month}
        selectedGroup={selectedGroup}
        refreshTrigger={refreshTrigger}
        stateChange={stateChange}
        setStateChange={setStateChange}
      />
    );
  };

  return (
    <StaggerContainer>
      <div className="flex flex-col gap-6 p-4 sm:p-6 bg-slate-50/50">
        <StaggerItem>
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center w-full">
            <div className="flex flex-row flex-nowrap gap-3 items-center">
              <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <h1 className="font-black text-slate-800 text-4xl tracking-tight">
                Internal <span className="text-blue-500">Appointments</span>
              </h1>
            </div>
            <Button
              onClick={() => navigate("/appointment-booking")}
              className="justify-center gap-3 h-10 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all font-bold"
            >
              Book Appointment
            </Button>
          </div>
        </StaggerItem>

        <div className="flex flex-col gap-8 w-full items-start">
          {/* 🛠️ Premium Sidebar */}
          <StaggerItem className="w-full">
            <div className="flex flex-col w-full self-start gap-8 transition-all">
              <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
                <ManageAppointments
                  clinicId={user?.clinicId}
                  stateChange={stateChange}
                  setStateChange={setStateChange}
                  refresh={refreshTrigger}
                  selectedGroup={selectedGroup}
                  onDoctorFilterChange={setSelectedGroup}
                />
              </div>
            </div>
          </StaggerItem>

          {/* 📅 Main Viewport */}
          <StaggerItem className="w-full">
            <div className="flex-1 w-full bg-white/70 backdrop-blur-3xl border border-slate-200/50 flex flex-col gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-10 h-full overflow-visible transition-all duration-700 rounded-3xl shadow-2xl">
              <Toolbar
                view={view}
                onViewChange={setView}
                onPrev={onPrev}
                onNext={onNext}
                onToday={onToday}
                date={date}
                week={week}
                month={month}
                setDate={setDate}
                setWeek={setWeek}
                setMonth={setMonth}
              />
              <div className="flex-1 overflow-visible bg-white border border-slate-100 shadow-[inner_0_2px_10px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 rounded-2xl">
                <div className="h-auto center-body overflow-visible relative p-1">
                  {renderCalendar()}
                </div>
              </div>
            </div>
          </StaggerItem>
        </div>
      </div>
    </StaggerContainer>
  );
}
