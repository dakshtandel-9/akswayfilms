-- ============================================================
-- 003_storage_buckets.sql
-- Storage bucket setup — run in Supabase SQL Editor
-- ============================================================

-- Create the main media bucket (publicly readable)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'aksway-media',
  'aksway-media',
  true,
  104857600,  -- 100MB max per file
  array[
    'image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif',
    'video/mp4', 'video/webm', 'video/quicktime'
  ]
)
on conflict (id) do nothing;

-- Public read policy on storage objects
create policy "Public read aksway-media"
  on storage.objects for select
  using (bucket_id = 'aksway-media');

-- Only authenticated users can upload
create policy "Admin insert aksway-media"
  on storage.objects for insert
  with check (
    bucket_id = 'aksway-media'
    and auth.role() = 'authenticated'
  );

-- Only authenticated users can update
create policy "Admin update aksway-media"
  on storage.objects for update
  using (
    bucket_id = 'aksway-media'
    and auth.role() = 'authenticated'
  );

-- Only authenticated users can delete
create policy "Admin delete aksway-media"
  on storage.objects for delete
  using (
    bucket_id = 'aksway-media'
    and auth.role() = 'authenticated'
  );
