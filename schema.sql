-- Kokkok Garden Supabase Schema (Phase 2 Prep)

-- 1. Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- 2. Create tables
CREATE TABLE public.users (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  auth_provider text,
  is_verified boolean DEFAULT false,
  role user_role DEFAULT 'user',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  summary text,
  ingredient text,
  description text,
  price numeric NOT NULL DEFAULT 0,
  original_price numeric,
  images text[] DEFAULT '{}',
  naver_store_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.media_stories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content_type text CHECK (content_type IN ('image', 'video')),
  media_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id),
  total_amount numeric NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.cart_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id),
  product_id uuid REFERENCES public.products(id),
  quantity integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.shorts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_id text NOT NULL,
  title text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.pages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text DEFAULT '',
  is_published boolean DEFAULT false,
  show_in_nav boolean DEFAULT false,
  nav_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.wishlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, product_id)
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- PRODUCTS: Visible to everyone
CREATE POLICY "Products are viewable by everyone" ON public.products
  FOR SELECT USING (true);

-- PRODUCTS: Insertable by anyone (admin mock auth uses anon key)
CREATE POLICY "Products are insertable" ON public.products
  FOR INSERT WITH CHECK (true);

-- PRODUCTS: Updatable by anyone (admin mock auth uses anon key)
CREATE POLICY "Products are updatable" ON public.products
  FOR UPDATE USING (true);

-- PRODUCTS: Deletable by anyone (admin mock auth uses anon key)
CREATE POLICY "Products are deletable" ON public.products
  FOR DELETE USING (true);

-- MEDIA STORIES: Visible to everyone
CREATE POLICY "Media stories are viewable by everyone" ON public.media_stories
  FOR SELECT USING (true);

-- MEDIA STORIES: Editable only by admins
CREATE POLICY "Media stories are editable by admins" ON public.media_stories
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- USERS: Users can see their own profile
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- USERS: Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- SHORTS: Visible to everyone
CREATE POLICY "Shorts are viewable by everyone" ON public.shorts
  FOR SELECT USING (true);

-- SHORTS: Insertable/deletable by anyone (anon key for admin mock auth)
CREATE POLICY "Shorts are manageable" ON public.shorts
  FOR ALL USING (true);

-- WISHLIST: Users can manage their own wishlist
CREATE POLICY "Users can view own wishlist" ON public.wishlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist" ON public.wishlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from own wishlist" ON public.wishlist
  FOR DELETE USING (auth.uid() = user_id);

-- PAGES: Readable by everyone
CREATE POLICY "Pages are viewable by everyone" ON public.pages
  FOR SELECT USING (true);

-- PAGES: Manageable by anyone (admin mock auth)
CREATE POLICY "Pages are manageable" ON public.pages
  FOR ALL USING (true);

-- 5. Trigger for syncing auth.users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, auth_provider, role)
  VALUES (new.id, new.email, new.raw_app_meta_data->>'provider', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- 6. Supabase Storage: Product Images Bucket
-- Run this in your Supabase SQL editor AFTER running the above.
-- Or create the bucket via Supabase Dashboard > Storage.
-- ============================================================

-- Create a public storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to READ (GET) images
CREATE POLICY "Public product images read" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated (admin) users to INSERT images
CREATE POLICY "Admin product images upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated (admin) users to DELETE images
CREATE POLICY "Admin product images delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );

