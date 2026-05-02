-- Run this in Supabase SQL editor for Dashigains.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  business_name text,
  goal text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Migration: add onboarding columns if the table already exists
alter table public.profiles
  add column if not exists business_name text,
  add column if not exists goal text,
  add column if not exists onboarding_completed boolean not null default false;

create table if not exists public.metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mrr numeric not null default 0,
  churn_rate numeric not null default 0,
  expenses numeric not null default 0,
  profit numeric not null default 0,
  customers integer,
  created_at timestamptz not null default now()
);

-- Migration: add customers column if the table already exists
alter table public.metrics
  add column if not exists customers integer;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'New User'))
  on conflict (id) do update set name = excluded.name;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.metrics enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

drop policy if exists "Users can read own metrics" on public.metrics;
create policy "Users can read own metrics"
on public.metrics
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own metrics" on public.metrics;
create policy "Users can insert own metrics"
on public.metrics
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own metrics" on public.metrics;
create policy "Users can update own metrics"
on public.metrics
for update
using (auth.uid() = user_id);
