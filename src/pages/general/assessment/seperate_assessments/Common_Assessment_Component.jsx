import React from "react";

export const Input = ({
  label,
  name,
  type = "text",
  placeholder = "",
  step,
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {label}
    </label>

    <input
      type={type}
      name={name}
      placeholder={placeholder}
      step={step}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

export const Select = ({ label, name, options = [] }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {label}
    </label>

    <select
      name={name}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    >
      <option value="">Select {label}</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export const Textarea = ({
  label,
  name,
  rows = 4,
  placeholder = "",
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {label}
    </label>

    <textarea
      name={name}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>
);

export const Checkbox = ({ label, name }) => (
  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition hover:bg-gray-50">
    <input
      type="checkbox"
      name={name}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />

    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

export const Section = ({ title, children }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-5">
    <h2 className="mb-5 border-b border-gray-100 pb-3 text-base font-semibold text-gray-800">
      {title}
    </h2>

    {children}
  </section>
);

export const AssessmentRenderer = ({ sections }) => {
  return (
    <div className="space-y-5">
      {sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.type === "checkbox" ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {section.fields.map(([label, name]) => (
                <Checkbox
                  key={name}
                  label={label}
                  name={name}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.fields.map((field) => {
                if (field.type === "input") {
                  return (
                    <Input
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.inputType || "text"}
                      placeholder={field.placeholder}
                      step={field.step}
                    />
                  );
                }

                if (field.type === "select") {
                  return (
                    <Select
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      options={field.options}
                    />
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div
                      key={field.name}
                      className="md:col-span-2 lg:col-span-3"
                    >
                      <Textarea
                        label={field.label}
                        name={field.name}
                        rows={field.rows || 4}
                        placeholder={field.placeholder}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          )}
        </Section>
      ))}
    </div>
  );
};