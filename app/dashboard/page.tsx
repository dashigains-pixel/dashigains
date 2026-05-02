"use client";

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
      <main className="flex min-h-screen items-center justify-center bg-[#020b17] text-slate-200">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020b17] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl border border-emerald-300/15 bg-slate-950/70 p-6 shadow-xl shadow-emerald-950/25 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Dashigains Dashboard</p>
              <h1 className="text-3xl font-semibold text-white">Your SaaS Metrics</h1>
            </div>
            <Button type="button" isLoading={isLoggingOut} disabled={isLoggingOut} onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard label="MRR" value={metrics.mrr} />
          <MetricCard label="Churn Rate" value={metrics.churn_rate} suffix="%" />
          <MetricCard label="Expenses" value={metrics.expenses} />
          <MetricCard label="Profit" value={metrics.profit} />
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-slate-950/70 p-6 shadow-xl shadow-emerald-950/25 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white">Update Metrics</h2>
          <p className="mt-1 text-sm text-slate-400">Insert your first snapshot or update the latest one.</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <MetricInput label="MRR" value={metrics.mrr} onChange={(value) => handleMetricChange("mrr", value)} />
            <MetricInput
              label="Churn Rate (%)"
              value={metrics.churn_rate}
              onChange={(value) => handleMetricChange("churn_rate", value)}
            />
            <MetricInput
              label="Expenses"
              value={metrics.expenses}
              onChange={(value) => handleMetricChange("expenses", value)}
            />
            <MetricInput label="Profit" value={metrics.profit} onChange={(value) => handleMetricChange("profit", value)} />
          </div>

          {errorMessage ? <p className="mt-4 text-sm text-rose-300">{errorMessage}</p> : null}
          {statusMessage ? <p className="mt-4 text-sm text-emerald-300">{statusMessage}</p> : null}

          <div className="mt-6">
            <Button type="button" isLoading={isSaving} disabled={!canSave} onClick={saveMetrics}>
              {metricsId ? "Update Metrics" : "Save Metrics"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">
        {value}
        {suffix}
      </p>
    </div>
  );
}

function MetricInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm text-slate-300">{label}</span>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-emerald-300/20 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20"
      />
    </label>
  );
}
