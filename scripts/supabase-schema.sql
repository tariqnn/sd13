-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hero_content table
CREATE TABLE IF NOT EXISTS hero_content (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "subtitleEn" TEXT NOT NULL,
    "subtitleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "imageUrl" TEXT,
    features TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coaches table
CREATE TABLE IF NOT EXISTS coaches (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "bioEn" TEXT NOT NULL,
    "bioAr" TEXT NOT NULL,
    "imageUrl" TEXT,
    experience INTEGER NOT NULL,
    specialties TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "textAr" TEXT NOT NULL,
    rating INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    "isActive" BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    "addressEn" TEXT NOT NULL,
    "addressAr" TEXT NOT NULL,
    "mapEmbed" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "siteNameEn" TEXT NOT NULL,
    "siteNameAr" TEXT NOT NULL,
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "metaDescriptionEn" TEXT NOT NULL,
    "metaDescriptionAr" TEXT NOT NULL,
    "metaKeywordsEn" TEXT NOT NULL,
    "metaKeywordsAr" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO users (email, password, name, role) VALUES 
('admin@sd13academy.com', 'admin123', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO hero_content (id, "titleEn", "titleAr", "subtitleEn", "subtitleAr", "descriptionEn", "descriptionAr", "videoUrl") VALUES 
('hero-1', 'Welcome to SD13 Sports Academy', 'مرحباً بكم في أكاديمية SD13 الرياضية', 'Elite Basketball Training in Amman, Jordan', 'تدريب كرة السلة النخبوي في عمان، الأردن', 'Join our premier basketball academy and develop your skills with professional coaching, state-of-the-art facilities, and a championship mindset.', 'انضم إلى أكاديمية كرة السلة الرائدة وطور مهاراتك مع التدريب المهني والمرافق المتطورة وعقلية البطولة.', '/videos/hero-video.mp4')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public read access for coaches" ON coaches FOR SELECT USING (true);
CREATE POLICY "Public read access for testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read access for hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read access for site_settings" ON site_settings FOR SELECT USING (true);
