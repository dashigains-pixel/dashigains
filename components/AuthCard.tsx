import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-[440px] rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-8">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#6366F1]" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 15L9 10L13 14L20 7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 7H15M20 7V12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#0F172A]">{title}</h1>
        <p className="mt-1.5 text-sm text-[#475569]">{subtitle}</p>
      </div>
      {children}
      <div className="mt-6 border-t border-[#E2E8F0] pt-5 text-center text-sm text-[#94A3B8]">{footer}</div>
    </div>
  );
}
