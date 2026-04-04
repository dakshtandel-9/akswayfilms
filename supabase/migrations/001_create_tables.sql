-- ============================================================
-- 001_create_tables.sql
-- Aksway.in Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- SITE SETTINGS
-- ============================================================
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  site_title text not null default 'Aksway Photography',
  meta_description text default 'Professional wedding photography in Honnavar, Karnataka.',
  favicon_url text,
  social_links jsonb default '{"instagram":"","facebook":"","youtube":"","whatsapp":""}',
  updated_at timestamptz default now()
);

-- Insert default row (only one row ever)
insert into site_settings (site_title, meta_description)
values ('Aksway Photography', 'Professional wedding photography in Honnavar, Karnataka.')
on conflict do nothing;

-- ============================================================
-- SECTIONS (CMS content blocks)
-- ============================================================
create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  content jsonb not null default '{}',
  draft_content jsonb,
  has_draft boolean not null default false,
  published_at timestamptz,
  updated_at timestamptz default now()
);

-- Seed all section rows with empty defaults
insert into sections (slug, title, sort_order, content) values
  ('hero',         'Hero Section',        1, '{"headline":"Capturing Your Eternal Moments","subheadline":"Professional Wedding Photography in Honnavar","cta_text":"View Our Work","cta_link":"#portfolio","background_type":"image","background_url":"","background_alt":"Wedding couple"}'),
  ('about',        'About / Story',       2, '{"headline":"Our Story","bio":"Based in Honnavar, we specialize in capturing the raw emotions and candid moments of your wedding day.","years_experience":5,"location":"Honnavar, Karnataka","photo_url":"","photo_alt":"Photographer"}'),
  ('services',     'Services',            3, '{"headline":"What We Offer","subheadline":"Comprehensive coverage for every moment","items":[]}'),
  ('portfolio',    'Portfolio / Gallery', 4, '{"headline":"Our Work","subheadline":"A glimpse into the stories we have told","show_category_filter":true}'),
  ('packages',     'Packages & Pricing',  5, '{"headline":"Investment In Your Memories","subheadline":"Choose the package that fits your love story"}'),
  ('testimonials', 'Testimonials',        6, '{"headline":"What Couples Say","subheadline":"Stories from our beautiful couples"}'),
  ('reels',        'Instagram Reels',     7, '{"headline":"Follow Our Journey","subheadline":"Find us on Instagram","items":[]}'),
  ('contact',      'Contact',             8, '{"headline":"Let''s Connect","subheadline":"Reach out to book your date","phone":"","whatsapp":"","email":"","address":"Honnavar, Karnataka","maps_embed_url":"","form_recipient_email":""}'),
  ('footer',       'Footer',              9, '{"copyright_text":"© 2025 Aksway Photography. All rights reserved.","tagline":"Capturing Love Stories in Honnavar","social_links":{"instagram":"","facebook":"","youtube":"","whatsapp":""},"quick_links":[]}')
on conflict (slug) do nothing;

-- ============================================================
-- MEDIA
-- ============================================================
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  section_id uuid references sections(id) on delete set null,
  file_name text not null,
  storage_path text not null,
  cdn_url text,
  public_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  category text not null default 'general',
  sort_order integer not null default 0,
  alt_text text default '',
  file_size_bytes bigint,
  width integer,
  height integer,
  duration_seconds numeric,
  created_at timestamptz default now()
);

-- ============================================================
-- PACKAGES
-- ============================================================
create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_inr integer not null,
  badge text,
  badge_color text default 'gray' check (badge_color in ('green','yellow','red','blue','gray')),
  features jsonb not null default '[]',
  is_highlighted boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);

-- Seed the 3 default packages
insert into packages (name, price_inr, badge, badge_color, features, is_highlighted, sort_order) values
(
  'Basic',
  35000,
  'Budget Friendly',
  'green',
  '["Wedding photography (Full coverage)","Traditional + candid photos","150+ edited photos","All photos soft copy (Google Drive/Pendrive)"]',
  false,
  1
),
(
  'Standard',
  65000,
  'Most Selling 🔥',
  'yellow',
  '["Wedding + Haldi photography","Candid photography (Full event)","Cinematic highlight video 🎬","250+ edited photos","Album (30 pages premium design)"]',
  true,
  2
),
(
  'Premium',
  110000,
  'Full Experience 🎬',
  'red',
  '["Prewedding shoot 📸","Wedding + Haldi full coverage","Candid + traditional photography","Cinematic wedding film 🎬","Highlight video","400+ edited photos","Premium Album (30 pages)"]',
  false,
  3
)
on conflict do nothing;

-- ============================================================
-- ADD-ONS
-- ============================================================
create table if not exists addons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_display text not null,
  price_from_inr integer not null default 0,
  price_to_inr integer not null default 0,
  description text,
  sort_order integer not null default 0,
  updated_at timestamptz default now()
);

insert into addons (name, price_display, price_from_inr, price_to_inr, sort_order) values
  ('Prewedding Shoot',  '₹30,000',         30000, 30000, 1),
  ('Drone Coverage',    '₹7,000',           7000,  7000,  2),
  ('Extra Album Pages', '₹2,000 – ₹5,000',  2000,  5000,  3),
  ('Same Day Edit',     '₹5,000',           5000,  5000,  4),
  ('Instagram Reels',   '₹3,000',           3000,  3000,  5)
on conflict do nothing;

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  review_text text not null,
  photo_url text,
  rating integer not null default 5 check (rating between 1 and 5),
  wedding_date text,
  location text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now()
);
