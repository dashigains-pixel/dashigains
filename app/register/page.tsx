"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AuthCard } from "@/components/AuthCard";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { handleRegister as registerWithSupabase } from "@/lib/auth";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mapRegisterError(message: string) {
  if (/Database error saving new user/i.test(message)) {
    return "Supabase DB setup is incomplete. Run supabase/schema.sql in your Supabase SQL Editor, then try registering again.";
  }

  return message;
}

export default function RegisterPage() {
  const router = useRouter();
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isFormEmpty = useMemo(
    () => !values.name.trim() || !values.email.trim() || !values.password.trim(),
    [values.email, values.name, values.password],
  );

  const validateRegister = (data: RegisterValues): RegisterErrors => {
    const nextErrors: RegisterErrors = {};

    if (!data.name.trim()) {
      nextErrors.name = "Name is required.";
    }

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

  const handleRegister = async (data: RegisterValues) => {
    const result = await registerWithSupabase(data);
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRegister(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      setAuthError(null);
      setSuccessMessage(null);
      const result = await handleRegister(values);

      if (result.needsEmailConfirmation) {
        setSuccessMessage("Check your inbox to confirm your email before logging in.");
      } else {
        router.replace("/onboarding");
      }
      setValues({ name: "", email: "", password: "" });
      setErrors({});
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to register right now.";
      setAuthError(mapRegisterError(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020b17] px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.2),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.16),transparent_30%),linear-gradient(rgba(12,26,45,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(12,26,45,0.5)_1px,transparent_1px)] [background-size:100%_100%,100%_100%,52px_52px,52px_52px]" />

      <AuthCard
        title="Create account"
        subtitle="Start using Dashigains in minutes."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-emerald-300 transition hover:text-emerald-200">
              Log in
            </Link>
          </>
        }
      >
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <InputField
            label="Name"
            type="text"
            placeholder="Your full name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
          />

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
            placeholder="At least 6 characters"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button type="submit" isLoading={isLoading} disabled={isFormEmpty}>
            Register
          </Button>
          {authError ? <p className="text-sm text-rose-300">{authError}</p> : null}
          {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}
        </form>
      </AuthCard>
    </main>
  );
}
