create extension if not exists pgcrypto;

create table if not exists public.community_results (
  id uuid primary key default gen_random_uuid(),
  install_id text not null,
  mode_id text not null,
  challenge_id text not null,
  season_id text not null default 'bbva',
  won boolean not null,
  attempts integer,
  time_spent integer,
  created_at timestamptz not null default now(),
  unique (install_id, challenge_id)
);

create table if not exists public.data_reports (
  id uuid primary key default gen_random_uuid(),
  install_id text not null,
  mode_id text not null,
  challenge_id text not null,
  issue text not null,
  path text,
  created_at timestamptz not null default now()
);

alter table public.community_results enable row level security;
alter table public.data_reports enable row level security;

create or replace function public.get_challenge_stats(p_mode_id text, p_challenge_id text)
returns table (plays bigint, wins bigint, completion numeric, average_attempts numeric)
language sql security definer set search_path = public
as $$
  select count(*), count(*) filter (where won), round(100.0 * count(*) filter (where won) / nullif(count(*), 0), 0), round(avg(attempts) filter (where won), 1)
  from public.community_results where mode_id = p_mode_id and challenge_id = p_challenge_id;
$$;

revoke all on function public.get_challenge_stats(text, text) from public;
grant execute on function public.get_challenge_stats(text, text) to service_role;
