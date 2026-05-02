import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

type AuthResult = {
  error: string | null;
  needsEmailConfirmation?: boolean;
};

function mapAuthErrorMessage(message: string) {
  if (/Database error saving new user/i.test(message)) {
    return "Supabase could not create the user profile in the database. Run the SQL in supabase/schema.sql, then try again.";
  }

  return message;
}

export async function handleRegister({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        full_name: name,
      },
    },
  });

  if (error && /Database error saving new user/i.test(error.message)) {
    const retry = await supabase.auth.signUp({
      email,
      password,
    });
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    return { error: mapAuthErrorMessage(error.message) };
  }

  const needsEmailConfirmation = !data.session;
  return { error: null, needsEmailConfirmation };
}

export async function handleLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}

export async function handleLogout() {
  const { error } = await supabase.auth.signOut();
  return { error: error?.message ?? null };
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}
