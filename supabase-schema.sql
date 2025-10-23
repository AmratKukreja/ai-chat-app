-- Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Models table - stores available AI models
create table if not exists public.models (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  tag text unique not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages table - stores chat history
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  model_tag text not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.models enable row level security;
alter table public.messages enable row level security;

-- Policies for models table
create policy "Anyone can read models"
  on public.models for select
  using (true);

-- Policies for messages table
create policy "Users can read their own messages"
  on public.messages for select
  using (auth.uid() = user_id);

create policy "Users can insert their own messages"
  on public.messages for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own messages"
  on public.messages for delete
  using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists messages_user_id_idx on public.messages(user_id);
create index if not exists messages_created_at_idx on public.messages(created_at);
create index if not exists messages_model_tag_idx on public.messages(model_tag);

-- Seed data for models
insert into public.models (name, tag, description) values
  ('GPT-4o', 'gpt-4o', 'Most capable GPT-4 model, great for complex tasks'),
  ('GPT-4o Mini', 'gpt-4o-mini', 'Affordable and fast GPT-4 model'),
  ('GPT-3.5 Turbo', 'gpt-3.5-turbo', 'Fast and efficient for most tasks'),
  ('Claude 3.5 Sonnet', 'claude-3-5-sonnet-20241022', 'Anthropic Claude model for nuanced tasks')
on conflict (tag) do nothing;

