-- ============================================================
-- 002_rls_policies.sql
-- Row Level Security — run AFTER 001_create_tables.sql
-- ============================================================

-- Enable RLS on all tables
alter table site_settings enable row level security;
alter table sections enable row level security;
alter table media enable row level security;
alter table packages enable row level security;
alter table addons enable row level security;
alter table testimonials enable row level security;

-- ============================================================
-- PUBLIC READ — Landing page can read published data
-- ============================================================

-- Anyone can read site settings
create policy "Public read site_settings"
  on site_settings for select
  using (true);

-- Anyone can read visible sections + content
create policy "Public read sections"
  on sections for select
  using (is_visible = true);

-- Anyone can read media (for portfolio)
create policy "Public read media"
  on media for select
  using (true);

-- Anyone can read packages
create policy "Public read packages"
  on packages for select
  using (true);

-- Anyone can read addons
create policy "Public read addons"
  on addons for select
  using (true);

-- Anyone can read visible testimonials
create policy "Public read testimonials"
  on testimonials for select
  using (is_visible = true);

-- ============================================================
-- ADMIN WRITE — Only authenticated users can mutate
-- ============================================================

-- site_settings
create policy "Admin update site_settings"
  on site_settings for update
  using (auth.role() = 'authenticated');

-- sections
create policy "Admin all sections"
  on sections for all
  using (auth.role() = 'authenticated');

-- media
create policy "Admin all media"
  on media for all
  using (auth.role() = 'authenticated');

-- packages
create policy "Admin all packages"
  on packages for all
  using (auth.role() = 'authenticated');

-- addons
create policy "Admin all addons"
  on addons for all
  using (auth.role() = 'authenticated');

-- testimonials
create policy "Admin all testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated');
