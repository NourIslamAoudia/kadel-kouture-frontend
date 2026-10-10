-- Landing page : contacts des visiteurs indécis et demandes des marques.
-- PostgreSQL standard : à exécuter dans l'éditeur SQL de Supabase,
-- puis à reprendre tel quel dans la future base Postgres.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('guide', 'workshop')),
  channel text not null check (channel in ('email', 'whatsapp')),
  contact text not null,
  locale text not null default 'fr',
  consent_at timestamptz not null
);

create table if not exists public.brand_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  brand text not null,
  email text not null,
  need text not null,
  status text not null default 'new'
);

-- Données personnelles : aucun accès public. Seul le serveur (clé service role) lit et écrit.
alter table public.leads enable row level security;
alter table public.brand_requests enable row level security;
