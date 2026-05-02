import type { ReactNode } from "react";

type OnboardingStepProps = {
  title: string;
  description: string;
  children: ReactNode;
  stepKey: string; // unique per step for animation re-trigger
};

export function OnboardingStep({ title, description, children, stepKey }: OnboardingStepProps) {
  return (
    <div
      key={stepKey}
      style={{
        animation: "onboardingSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      <style>{`
        @keyframes onboardingSlideIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-1.5 text-sm text-slate-400">{description}</p>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}
