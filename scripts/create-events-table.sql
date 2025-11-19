-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY DEFAULT 'event-' || substr(md5(random()::text), 1, 8),
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location_en TEXT,
    location_ar TEXT,
    event_type TEXT NOT NULL DEFAULT 'tournament', -- 'tournament', 'training', 'workshop', 'other'
    registration_url TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    order_index INTEGER DEFAULT 0
);

-- Create email subscriptions table
CREATE TABLE IF NOT EXISTS email_subscriptions (
    id TEXT PRIMARY KEY DEFAULT 'sub-' || substr(md5(random()::text), 1, 8),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{"events": true, "news": true, "promotions": true}'::jsonb
);

-- Create event notifications log
CREATE TABLE IF NOT EXISTS event_notifications (
    id TEXT PRIMARY KEY DEFAULT 'notif-' || substr(md5(random()::text), 1, 8),
    event_id TEXT REFERENCES events(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL, -- 'created', 'updated', 'cancelled'
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    recipients_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'sent' -- 'sent', 'failed', 'pending'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured);
CREATE INDEX IF NOT EXISTS idx_email_subscriptions_active ON email_subscriptions(is_active);
CREATE INDEX IF NOT EXISTS idx_event_notifications_event_id ON event_notifications(event_id);

-- Insert some sample events
INSERT INTO events (title_en, title_ar, description_en, description_ar, event_date, location_en, location_ar, event_type, is_featured) VALUES
('Summer Basketball Championship', 'بطولة كرة السلة الصيفية', 'Join us for the biggest basketball tournament of the summer! Open to all skill levels.', 'انضم إلينا في أكبر بطولة كرة سلة في الصيف! مفتوحة لجميع المستويات.', NOW() + INTERVAL '30 days', 'SD13 Sports Academy', 'أكاديمية SD13 الرياضية', 'tournament', true),
('Youth Training Camp', 'معسكر تدريب الشباب', 'Intensive training camp for young athletes aged 12-18.', 'معسكر تدريب مكثف للرياضيين الشباب من سن 12-18.', NOW() + INTERVAL '45 days', 'SD13 Sports Academy', 'أكاديمية SD13 الرياضية', 'training', true),
('Coaching Workshop', 'ورشة تدريب المدربين', 'Professional development workshop for basketball coaches.', 'ورشة تطوير مهني لمدربي كرة السلة.', NOW() + INTERVAL '60 days', 'SD13 Sports Academy', 'أكاديمية SD13 الرياضية', 'workshop', false);
