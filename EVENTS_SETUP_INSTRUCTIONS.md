# Events Table Setup Instructions

## 🚨 IMPORTANT: You need to create the events table in Supabase manually

The events system is ready, but the database table needs to be created. Follow these steps:

### Step 1: Go to Supabase Dashboard
1. Open your browser and go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project: `jwqtvzxiufvinsliewij`

### Step 2: Open SQL Editor
1. In the left sidebar, click on "SQL Editor"
2. Click "New Query"

### Step 3: Run This SQL Code
Copy and paste this entire SQL code into the SQL Editor and click "Run":

```sql
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
    event_type TEXT NOT NULL DEFAULT 'tournament',
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
    notification_type TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    recipients_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'sent'
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
```

### Step 4: Verify Tables Created
After running the SQL, you should see:
- ✅ `events` table created
- ✅ `email_subscriptions` table created  
- ✅ `event_notifications` table created
- ✅ 3 sample events inserted

### Step 5: Test the System
1. Go back to your website: http://localhost:3000
2. Scroll down to the "Events & Tournaments" section
3. You should see 3 sample events displayed
4. Go to the admin panel: http://localhost:3000/admin-access
5. Login and click on the "Events" tab
6. You should see the events management interface

## 🎉 That's it! Your Events System is Ready!

Once you run this SQL, the events system will be fully functional with:
- ✅ Event display on the homepage
- ✅ Admin event management
- ✅ Email subscription system
- ✅ Sample events to get started

**The error will disappear and everything will work perfectly!** 🚀
