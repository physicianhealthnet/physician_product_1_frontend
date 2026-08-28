import React from 'react';
import { Icon } from '@iconify/react';

const UnderConstruction = ({ pageTitle, pageIcon }) => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Icon icon={pageIcon || "solar:settings-bold-duotone"} className="text-4xl" />
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-slate-500 font-medium mb-6">
          This page is currently under construction. We are working hard to bring you these features soon.
        </p>
        <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm">
          <Icon icon="solar:clock-circle-bold-duotone" className="mr-2 text-lg" />
          Coming Soon
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
