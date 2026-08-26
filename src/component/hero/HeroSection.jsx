import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const HeroSection = ({ role }) => {
  const [greeting, setGreeting] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    setDateStr(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const getRoleConfig = () => {
    switch (role?.toLowerCase()) {
      case "receptionist":
        return {
          title: "Reception Desk",
          subtitle: "Manage appointments, patients, and front-desk operations efficiently.",
          icon: "solar:desk-bold-duotone",
          color: "blue"
        };
      case "doctor":
        return {
          title: "Physician Dashboard",
          subtitle: "Review your schedule, patient records, and upcoming appointments.",
          icon: "solar:stethoscope-bold-duotone",
          color: "emerald"
        };
      case "master":
        return {
          title: "Master Control",
          subtitle: "Overview of all clinic operations, staffs, and performance.",
          icon: "solar:settings-minimalistic-bold-duotone",
          color: "purple"
        };
      default:
        return {
          title: "Welcome Back",
          subtitle: "Here's your overview for today.",
          icon: "solar:home-smile-bold-duotone",
          color: "indigo"
        };
    }
  };

  const config = getRoleConfig();

  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-${config.color}-500 opacity-5 blur-3xl`} />
      <div className={`absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-${config.color}-400 opacity-5 blur-2xl`} />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 rounded-2xl bg-${config.color}-50 flex items-center justify-center shrink-0`}>
            <Icon icon={config.icon} className={`text-3xl text-${config.color}-500`} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black uppercase tracking-widest text-${config.color}-500 bg-${config.color}-50 px-2 py-0.5 rounded-md`}>
                {greeting}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {dateStr}
              </span>
            </div>
            <h1 className="font-black text-slate-800 text-3xl md:text-4xl tracking-tight leading-none">
              {config.title}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {config.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 self-stretch md:self-auto min-w-[200px]">
          <div className="flex flex-col flex-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              Quick Action
            </span>
            <span className="text-sm font-bold text-slate-700">
              Ready for the day
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
            <Icon icon="solar:check-circle-bold" className="text-emerald-500 text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
