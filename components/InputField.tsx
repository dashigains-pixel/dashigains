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
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl border bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition ${
          error
            ? "border-rose-400/60 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/25"
            : "border-emerald-300/20 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
        }`}
      />
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
