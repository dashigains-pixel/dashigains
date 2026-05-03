"use client";

import type { ReactNode } from "react";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { getCurrentUser, handleLogout } from "@/lib/auth";
import { getLatestMetrics, getProfile, insertMetrics, updateMetrics, type MetricInput, type MetricRecord } from "@/lib/db";

const defaultMetrics: MetricInput = {
  mrr: 0,
  churn_rate: 0,
  expenses: 0,
  profit: 0,
};

// Icon helpers
const icons = {
  mrr: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3V21M17 8C17 6.34 14.76 5 12 5C9.24 5 7 6.34 7 8C7 9.66 9.24 11 12 11C14.76 11 17 12.34 17 14C17 15.66 14.76 17 12 17C9.24 17 7 15.66 7 14" strokeLinecap="round" />
    </svg>
  ),
  churn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 20H21M5 11L9 7L13 11L19 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  expenses: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" />
    </svg>
  ),
  profit: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 15L9 10L13 14L20 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 7H15M20 7V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [metricsId, setMetricsId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<MetricInput>(defaultMetrics);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSave = useMemo(() => userId !== null && !isSaving, [isSaving, userId]);

  const hydrateMetrics = (record: MetricRecord) => {
    setMetricsId(record.id);
    setMetrics({
      mrr: record.mrr,
      churn_rate: record.churn_rate,
      expenses: record.expenses,
      profit: record.profit,
    });
  };

  useEffect(() => {
    async function loadDashboard() {
      setIsPageLoading(true);
      setErrorMessage(null);

      const user = await getCurrentUser();
      if (!user) {
        router.replace("/login");
        return;
      }

      // Onboarding guard
      const { data: profile } = await getProfile(user.id);
      if (!profile?.onboarding_completed) {
        router.replace("/onboarding");
        return;
      }

      setUserId(user.id);

      const { data, error } = await getLatestMetrics(user.id);
      if (error) {
        setErrorMessage(error);
      }

      if (data) {
        hydrateMetrics(data);
      }

      setIsPageLoading(false);
    }

    void loadDashboard();
  }, [router]);

  const handleMetricChange = (key: keyof MetricInput, value: string) => {
    setMetrics((current) => ({
      ...current,
      [key]: Number(value) || 0,
    }));
  };

  const saveMetrics = async () => {
    if (!userId) return;

    setIsSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);

    const request = metricsId
      ? updateMetrics(metricsId, metrics)
      : insertMetrics(userId, metrics);

    const { data, error } = await request;

    if (error) {
      setErrorMessage(error);
      setIsSaving(false);
      return;
    }

    if (data) {
      hydrateMetrics(data);
    }

    setStatusMessage(metricsId ? "Metrics updated successfully." : "Metrics saved successfully.");
    setIsSaving(false);
  };

  const onLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await handleLogout();
    setIsLoggingOut(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    router.replace("/login");
  };

  if (isPageLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E2E8F0] border-t-[#6366F1]" />
          <p className="text-sm text-[#475569]">Loading dashboard…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-[#E2E8F0] bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FF] text-sm font-bold text-[#6366F1]">D</span>
            <div>
              <p className="text-xs text-[#94A3B8]">Dashigains</p>
              <h1 className="text-base font-semibold text-[#0F172A]">Your SaaS Metrics</h1>
            </div>
          </div>
          <Button type="button" isLoading={isLoggingOut} disabled={isLoggingOut} onClick={onLogout} variant="secondary">
            Logout
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">

        {/* Metric cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="MRR"
            value={metrics.mrr}
            icon={icons.mrr}
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#22C55E]"
          />
          <MetricCard
            label="Churn Rate"
            value={metrics.churn_rate}
            suffix="%"
            icon={icons.churn}
            iconBg="bg-[#FEF3C7]"
            iconColor="text-[#F59E0B]"
          />
          <MetricCard
            label="Expenses"
            value={metrics.expenses}
            icon={icons.expenses}
            iconBg="bg-[#FEE2E2]"
            iconColor="text-[#EF4444]"
          />
          <MetricCard
            label="Profit"
            value={metrics.profit}
            icon={icons.profit}
            iconBg="bg-[#EEF2FF]"
            iconColor="text-[#6366F1]"
          />
        </div>

        {/* Update metrics form */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#0F172A]">Update Metrics</h2>
            <p className="mt-1 text-sm text-[#475569]">Insert your first snapshot or update the latest one.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <MetricInputField label="MRR ($)" value={metrics.mrr} onChange={(value) => handleMetricChange("mrr", value)} />
            <MetricInputField
              label="Churn Rate (%)"
              value={metrics.churn_rate}
              onChange={(value) => handleMetricChange("churn_rate", value)}
            />
            <MetricInputField
              label="Expenses ($)"
              value={metrics.expenses}
              onChange={(value) => handleMetricChange("expenses", value)}
            />
            <MetricInputField label="Profit ($)" value={metrics.profit} onChange={(value) => handleMetricChange("profit", value)} />
          </div>

          {errorMessage ? (
            <div className="mt-4 rounded-xl border border-[#FEE2E2] bg-[#FFF5F5] px-4 py-3">
              <p className="text-sm text-[#EF4444]">{errorMessage}</p>
            </div>
          ) : null}
          {statusMessage ? (
            <div className="mt-4 rounded-xl border border-[#DCFCE7] bg-[#F0FFF4] px-4 py-3">
              <p className="text-sm text-[#22C55E]">{statusMessage}</p>
            </div>
          ) : null}

          <div className="mt-5">
            <Button type="button" isLoading={isSaving} disabled={!canSave} onClick={saveMetrics}>
              {metricsId ? "Update Metrics" : "Save Metrics"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  suffix = "",
  icon,
  iconBg,
  iconColor,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-[#475569]">{label}</p>
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          {icon}
        </span>
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-[#0F172A]">
        {value.toLocaleString()}
        {suffix}
      </p>
    </div>
  );
}

function MetricInputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-sm font-medium text-[#0F172A]">{label}</span>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all duration-150 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/15"
      />
    </label>
  );
}
