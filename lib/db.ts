import { supabase } from "./supabaseClient";

export type MetricInput = {
  mrr: number;
  churn_rate: number;
  expenses: number;
  profit: number;
};

export type MetricRecord = MetricInput & {
  id: string;
  user_id: string;
  created_at: string;
};

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
