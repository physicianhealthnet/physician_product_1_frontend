import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

/**
 * QuickLinks Component
 * 
 * @param {Array} links - Array of link objects { label, icon, route, color }
 * Colors available: 'blue', 'purple', 'emerald', 'amber', 'rose', 'indigo', 'cyan', 'teal'
 */
const QuickLinks = ({ links = [] }) => {
  const navigate = useNavigate();

  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 items-center w-full">
      <h1 className="text-xl font-semibold text-slate-700 mr-2">QUICK LINKS :</h1>
      {links.map((link, index) => {
        // Tailwind classes can't be dynamically constructed reliably if they aren't in the safelist,
        // so we map standard color strings to full tailwind classes.
        const colorMap = {
          blue: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 [&>svg]:text-blue-600",
          purple: "hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 [&>svg]:text-purple-600",
          emerald: "hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 [&>svg]:text-emerald-600",
          amber: "hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 [&>svg]:text-amber-600",
          rose: "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 [&>svg]:text-rose-600",
          indigo: "hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 [&>svg]:text-indigo-600",
          cyan: "hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-200 [&>svg]:text-cyan-600",
          teal: "hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 [&>svg]:text-teal-600",
        };

        const themeClasses = colorMap[link.color] || colorMap['blue'];

        return (
          <button
            key={index}
            onClick={() => navigate(link.route, { state: link.state })}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border bg-white text-slate-500 border-slate-200 ${themeClasses}`}
          >
            <Icon icon={link.icon} className="text-lg shrink-0" />
            {link.label}
          </button>
        );
      })}
    </div>
  );
};

export default QuickLinks;
