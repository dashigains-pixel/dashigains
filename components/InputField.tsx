"use client";

import type { ChangeEvent } from "react";

type InputFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function InputField({ label, type, placeholder, value, name, error, onChange }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-[#0F172A]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all duration-150 ${
          error
            ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
            : "border-[#E2E8F0] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/15"
        }`}
      />
      {error ? <p className="text-xs text-[#EF4444]">{error}</p> : null}
    </div>
  );
}
