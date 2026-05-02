import { supabase } from "./supabaseClient";

export type MetricInput = {
  mrr: number;
  churn_rate: number;
  expenses: number;
  profit: number;
  customers?: number | null;
};

export type MetricRecord = MetricInput & {
  id: string;
  user_id: string;
  created_at: string;
};

export type ProfileRecord = {
  id: string;
  name: string;
  business_name: string | null;
  goal: string | null;
  onboarding_completed: boolean;
  created_at: string;
};

export type OnboardingData = {
  name: string;
  business_name: string;
  goal: string;
  mrr: number;
  expenses: number;
  customers: number | null;
};

export async function getProfile(userId: string): Promise<{
  data: ProfileRecord | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return { data: data as ProfileRecord | null, error: error?.message ?? null };
}

export async function createProfile({ id, name }: { id: string; name: string }) {
  const { error } = await supabase.from("profiles").upsert(
    {
      id,
      name,
    },
    { onConflict: "id" },
  );

  return { error: error?.message ?? null };
}

export async function completeOnboarding(
  userId: string,
  data: OnboardingData,
): Promise<{ error: string | null }> {
  // 1. Upsert profile with all onboarding fields + mark completed
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: userId,
      name: data.name,
      business_name: data.business_name,
      goal: data.goal,
      onboarding_completed: true,
    },
    { onConflict: "id" },
  );

  if (profileError) return { error: profileError.message };

  // 2. Insert initial metrics snapshot
  const profit = data.mrr - data.expenses;
  const { error: metricsError } = await supabase.from("metrics").insert({
    user_id: userId,
    mrr: data.mrr,
    churn_rate: 0,
    expenses: data.expenses,
    profit: profit < 0 ? profit : profit,
    customers: data.customers,
  });

  if (metricsError) return { error: metricsError.message };

  return { error: null };
}

export async function getLatestMetrics(userId: string): Promise<{
  data: MetricRecord | null;
  error: string | null;
}> {
  const { data, error } = await supabase
    .from("metrics")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return { data: data as MetricRecord | null, error: error?.message ?? null };
}

export async function insertMetrics(userId: string, metrics: MetricInput) {
  const { data, error } = await supabase
    .from("metrics")
    .insert({
      user_id: userId,
      ...metrics,
    })
    .select("*")
    .single();

  return { data: data as MetricRecord | null, error: error?.message ?? null };
}

export async function updateMetrics(id: string, metrics: MetricInput) {
  const { data, error } = await supabase
    .from("metrics")
    .update(metrics)
    .eq("id", id)
    .select("*")
    .single();

  return { data: data as MetricRecord | null, error: error?.message ?? null };
}
