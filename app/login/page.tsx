"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { handleLogin as loginWithSupabase } from "@/lib/auth";
import { getProfile } from "@/lib/db";

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isFormEmpty = useMemo(
    () => !values.email.trim() || !values.password.trim(),
    [values.email, values.password],
  );

  const validateLogin = (data: LoginValues): LoginErrors => {
    const nextErrors: LoginErrors = {};

    if (!data.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(data.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!data.password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleLogin = async (data: LoginValues) => {
    const result = await loginWithSupabase(data);
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateLogin(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      setAuthError(null);
      const { supabase } = await import("@/lib/supabaseClient");
      await handleLogin(values);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await getProfile(user.id);
        if (profile?.onboarding_completed) {
          router.replace("/dashboard");
        } else {
          router.replace("/onboarding");
        }
      } else {
        router.replace("/onboarding");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to log in right now.";
      setAuthError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFC] px-4 py-10">
      {/* Subtle decorative gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.07),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.05),transparent_40%)]" />

      <AuthCard
        title="Welcome back"
        subtitle="Log in to track your real SaaS profit."
        footer={
          <>
            New to Dashigains?{" "}
            <Link href="/register" className="font-medium text-[#6366F1] transition hover:text-[#4F46E5]">
              Create an account
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <InputField
            label="Email"
            type="email"
            placeholder="you@company.com"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex justify-end">
            <button type="button" className="text-xs text-[#94A3B8] transition hover:text-[#475569]">
              Forgot Password?
            </button>
          </div>

          <Button type="submit" isLoading={isLoading} disabled={isFormEmpty}>
            Login
          </Button>
          {authError ? <p className="text-sm text-[#EF4444]">{authError}</p> : null}
        </form>
      </AuthCard>
    </main>
  );
}
