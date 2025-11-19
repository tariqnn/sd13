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

-- Create policies for admin access
CREATE POLICY "Admin full access for programs" ON programs FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admin full access for coaches" ON coaches FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admin full access for gallery_images" ON gallery_images FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admin full access for hero_content" ON hero_content FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('gallery', 'gallery', true),
  ('programs', 'programs', true),
  ('coaches', 'coaches', true),
  ('testimonials', 'testimonials', true);

-- Create storage policies
CREATE POLICY "Public read access for gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Public read access for programs" ON storage.objects FOR SELECT USING (bucket_id = 'programs');
CREATE POLICY "Public read access for coaches" ON storage.objects FOR SELECT USING (bucket_id = 'coaches');
CREATE POLICY "Public read access for testimonials" ON storage.objects FOR SELECT USING (bucket_id = 'testimonials');

CREATE POLICY "Admin upload access for gallery" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'gallery' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admin update access for gallery" ON storage.objects FOR UPDATE USING (
  bucket_id = 'gallery' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admin delete access for gallery" ON storage.objects FOR DELETE USING (
  bucket_id = 'gallery' AND
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);
