-- Create tables for SD13 Sports Academy

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero content table
CREATE TABLE IF NOT EXISTS hero_content (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    subtitle_en TEXT NOT NULL,
    subtitle_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    image_url TEXT,
    features TEXT NOT NULL, -- JSON string
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coaches table
CREATE TABLE IF NOT EXISTS coaches (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    bio_en TEXT NOT NULL,
    bio_ar TEXT NOT NULL,
    image_url TEXT,
    experience INTEGER NOT NULL,
    specialties TEXT NOT NULL, -- JSON string
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    text_en TEXT NOT NULL,
    text_ar TEXT NOT NULL,
    rating INTEGER NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact info table
CREATE TABLE IF NOT EXISTS contact_info (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address_en TEXT NOT NULL,
    address_ar TEXT NOT NULL,
    map_embed TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    site_name_en TEXT NOT NULL,
    site_name_ar TEXT NOT NULL,
    logo_url TEXT,
    favicon_url TEXT,
    meta_description_en TEXT NOT NULL,
    meta_description_ar TEXT NOT NULL,
    meta_keywords_en TEXT NOT NULL,
    meta_keywords_ar TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON users FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON programs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON coaches FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON site_settings FOR SELECT USING (true);

-- Create policies for admin write access (you'll need to implement proper auth later)
CREATE POLICY "Enable insert for authenticated users only" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON users FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON users FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON hero_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON hero_content FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON hero_content FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON programs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON programs FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON programs FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON coaches FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON coaches FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON coaches FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON testimonials FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON gallery_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON gallery_images FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON gallery_images FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON contact_info FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON contact_info FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON contact_info FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON site_settings FOR DELETE USING (true);
