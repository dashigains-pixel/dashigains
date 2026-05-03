"use client";

type ButtonProps = {
  children: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export function Button({
  children,
  isLoading = false,
  disabled = false,
  type = "button",
  variant = "primary",
  onClick,
}: ButtonProps) {
  const base =
    "w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1";

  const styles = {
    primary:
      "bg-[#6366F1] text-white hover:bg-[#4F46E5] focus:ring-[#6366F1]/40 shadow-sm",
    secondary:
      "bg-[#EEF2FF] text-[#6366F1] hover:bg-[#E0E7FF] focus:ring-[#6366F1]/20",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${base} ${styles[variant]}`}
    >
      {isLoading ? "Please wait…" : children}
    </button>
  );
}
