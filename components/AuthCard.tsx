import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-[440px] rounded-3xl border border-emerald-300/20 bg-slate-950/65 p-6 shadow-2xl shadow-emerald-950/35 backdrop-blur-2xl sm:p-8">
      <div className="mb-7 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
      </div>
      {children}
      <div className="mt-6 border-t border-white/10 pt-5 text-center text-sm text-slate-400">{footer}</div>
    </div>
  );
}
