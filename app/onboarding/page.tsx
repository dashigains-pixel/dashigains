"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile, completeOnboarding } from "@/lib/db";
import { ProgressBar } from "@/components/ProgressBar";
import { OnboardingStep } from "@/components/OnboardingStep";

const STEPS = ["Basic Info", "Metrics", "Goal"];

type FormData = {
  name: string;
  business_name: string;
  mrr: string;
  expenses: string;
  customers: string;
  goal: "profit" | "growth" | "expenses" | "";
};

const GOAL_OPTIONS: { value: FormData["goal"]; label: string; icon: string; description: string }[] = [
  { value: "profit", label: "Profit", icon: "💰", description: "Maximize what you keep after expenses" },
  { value: "growth", label: "Growth", icon: "📈", description: "Track revenue growth & new customers" },
  { value: "expenses", label: "Expenses", icon: "🧾", description: "Keep costs under control" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    business_name: "",
    mrr: "",
    expenses: "",
    customers: "",
    goal: "",
  });

  // Guard: load user & check if onboarding already done
  useEffect(() => {
    async function init() {
      const user = await getCurrentUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      const { data: profile } = await getProfile(user.id);
      if (profile?.onboarding_completed) {
        router.replace("/dashboard");
        return;
      }
      // Pre-fill name from auth metadata
      const metaName =
        (user.user_metadata?.name as string) ||
        (user.user_metadata?.full_name as string) ||
        "";
      setForm((prev) => ({ ...prev, name: metaName }));
      setUserId(user.id);
      setIsLoading(false);
    }
    void init();
  }, [router]);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Per-step validation
  const canAdvance = (): boolean => {
    if (step === 0) return form.name.trim().length > 0 && form.business_name.trim().length > 0;
    if (step === 1) return form.mrr.trim().length > 0 && form.expenses.trim().length > 0;
    if (step === 2) return form.goal !== "";
    return false;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!userId) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const { error } = await completeOnboarding(userId, {
      name: form.name.trim(),
      business_name: form.business_name.trim(),
      goal: form.goal as string,
      mrr: parseFloat(form.mrr) || 0,
      expenses: parseFloat(form.expenses) || 0,
      customers: form.customers.trim() ? parseInt(form.customers, 10) : null,
    });

    if (error) {
      setSubmitError(error);
      setIsSubmitting(false);
      return;
    }

    setIsDone(true);
    setTimeout(() => router.replace("/dashboard"), 1800);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020b17] text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400/30 border-t-emerald-400" />
          <p className="text-sm">Loading…</p>
        </div>
      </main>
    );
  }

  if (isDone) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020b17]">
        <div
          className="flex flex-col items-center gap-4 text-center"
          style={{ animation: "onboardingSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}
        >
          <style>{`
            @keyframes onboardingSlideIn {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-3xl shadow-lg shadow-emerald-500/30">
            ✓
          </div>
          <h2 className="text-2xl font-semibold text-white">You&apos;re all set!</h2>
          <p className="text-sm text-slate-400">Redirecting to your dashboard…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020b17] px-4 py-12">
      {/* Background gradient grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.12),transparent_35%),linear-gradient(rgba(12,26,45,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(12,26,45,0.45)_1px,transparent_1px)] [background-size:100%_100%,100%_100%,52px_52px,52px_52px]" />

      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Dashigains
          </p>
          <h1 className="text-2xl font-semibold text-white">Welcome aboard 👋</h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Let&apos;s set up your workspace in under a minute.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar steps={STEPS} currentStep={step} />
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-emerald-300/15 bg-slate-950/70 p-7 shadow-2xl shadow-emerald-950/30 backdrop-blur-2xl sm:p-9">
          {/* Step 1 — Basic Info */}
          {step === 0 && (
            <OnboardingStep
              stepKey="step-0"
              title="Tell us about yourself"
              description="This helps us personalise your experience."
            >
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-200">Your name</span>
                <input
                  id="onboarding-name"
                  type="text"
                  placeholder="Alex Johnson"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full rounded-2xl border border-emerald-300/20 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-200">SaaS / Product name</span>
                <input
                  id="onboarding-business"
                  type="text"
                  placeholder="Acme SaaS"
                  value={form.business_name}
                  onChange={(e) => setField("business_name", e.target.value)}
                  className="w-full rounded-2xl border border-emerald-300/20 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
              </label>
            </OnboardingStep>
          )}

          {/* Step 2 — Business Metrics */}
          {step === 1 && (
            <OnboardingStep
              stepKey="step-1"
              title="Your current numbers"
              description="A quick snapshot to kick off your dashboard."
            >
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-200">Monthly Revenue (MRR)</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    $
                  </span>
                  <input
                    id="onboarding-mrr"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="5000"
                    value={form.mrr}
                    onChange={(e) => setField("mrr", e.target.value)}
                    className="w-full rounded-2xl border border-emerald-300/20 bg-slate-900/70 px-4 py-3 pl-8 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                  />
                </div>
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-200">Monthly Expenses</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    $
                  </span>
                  <input
                    id="onboarding-expenses"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="2000"
                    value={form.expenses}
                    onChange={(e) => setField("expenses", e.target.value)}
                    className="w-full rounded-2xl border border-emerald-300/20 bg-slate-900/70 px-4 py-3 pl-8 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                  />
                </div>
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-200">
                  Number of customers{" "}
                  <span className="text-slate-500">(optional)</span>
                </span>
                <input
                  id="onboarding-customers"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="42"
                  value={form.customers}
                  onChange={(e) => setField("customers", e.target.value)}
                  className="w-full rounded-2xl border border-emerald-300/20 bg-slate-900/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
                />
              </label>
            </OnboardingStep>
          )}

          {/* Step 3 — Goal */}
          {step === 2 && (
            <OnboardingStep
              stepKey="step-2"
              title="What do you want to track most?"
              description="We'll highlight what matters to you on your dashboard."
            >
              {GOAL_OPTIONS.map((opt) => {
                const isSelected = form.goal === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    id={`goal-${opt.value}`}
                    onClick={() => setField("goal", opt.value)}
                    className="w-full rounded-2xl border p-4 text-left transition-all duration-200"
                    style={{
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(34,211,238,0.08))"
                        : "rgba(15,23,42,0.5)",
                      borderColor: isSelected
                        ? "rgba(52,211,153,0.5)"
                        : "rgba(148,163,184,0.1)",
                      boxShadow: isSelected ? "0 0 20px rgba(52,211,153,0.12)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: isSelected ? "#34d399" : "#e2e8f0" }}
                        >
                          {opt.label}
                        </p>
                        <p className="text-xs text-slate-400">{opt.description}</p>
                      </div>
                      {isSelected && (
                        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400">
                          <svg className="h-3 w-3 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </OnboardingStep>
          )}

          {/* Error */}
          {submitError && (
            <p className="mt-4 text-sm text-rose-300">{submitError}</p>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 rounded-2xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                ← Back
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                id="onboarding-next"
                onClick={handleNext}
                disabled={!canAdvance()}
                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                id="onboarding-finish"
                onClick={handleSubmit}
                disabled={!canAdvance() || isSubmitting}
                className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Setting up…" : "Launch Dashboard 🚀"}
              </button>
            )}
          </div>
        </div>

        {/* Step counter */}
        <p className="mt-5 text-center text-xs text-slate-500">
          Step {step + 1} of {STEPS.length}
        </p>
      </div>
    </main>
  );
}
