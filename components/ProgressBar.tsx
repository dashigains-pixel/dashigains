type ProgressBarProps = {
  steps: string[];
  currentStep: number; // 0-indexed
};

export function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className="flex items-center">
            {/* Connector line before each step except the first */}
            {index > 0 && (
              <div
                className="h-px w-10 sm:w-14 transition-all duration-500"
                style={{
                  background: isCompleted
                    ? "linear-gradient(90deg, #34d399, #22d3ee)"
                    : "rgba(148,163,184,0.2)",
                }}
              />
            )}

            {/* Step dot */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-500"
                style={{
                  background: isCompleted
                    ? "linear-gradient(135deg, #34d399, #22d3ee)"
                    : isActive
                      ? "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(34,211,238,0.25))"
                      : "rgba(15,23,42,0.8)",
                  border: isCompleted
                    ? "2px solid transparent"
                    : isActive
                      ? "2px solid #34d399"
                      : "2px solid rgba(148,163,184,0.2)",
                  color: isCompleted ? "#020617" : isActive ? "#34d399" : "#64748b",
                  boxShadow: isActive ? "0 0 16px rgba(52,211,153,0.35)" : "none",
                }}
              >
                {isCompleted ? (
                  // Checkmark
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className="text-[10px] font-medium transition-colors duration-300 hidden sm:block"
                style={{ color: isActive ? "#34d399" : isCompleted ? "#94a3b8" : "#475569" }}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
