# SD13 Sports Academy - Supabase Setup Guide

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `sd13-sports-academy`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your location
6. Click "Create new project"

### 2. Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ`)

### 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@sd13.com
```

### 4. Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `database-schema.sql` from this project
3. Paste and run the SQL script
4. This will create all necessary tables and insert default data

### 5. Set Up Authentication

1. Go to **Authentication** → **Settings**
2. Configure the following:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/admin`
3. Go to **Authentication** → **Users**
4. Create a new user with your admin email
5. Set a strong password

### 6. Set Up Storage (Optional - for image uploads)

1. Go to **Storage**
2. Create a new bucket called `images`
3. Set it to public
4. Configure policies for public read access

## 🎯 Admin Panel Features

### Content Management Sections:

1. **Hero Section**
   - Edit tagline, title, subtitle
   - Update CTA button text
   - Change video URL
   - Bilingual support (English/Arabic)

2. **Programs**
   - Add/Edit/Delete training programs
   - Manage program details, features, images
   - Age groups and duration settings

3. **Events**
   - Create upcoming events and tournaments
   - Set dates, times, locations
   - Manage event types and prizes

4. **Coaches**
   - Add coach profiles
   - Upload coach photos
   - Manage bios and positions

5. **Testimonials**
   - Add customer testimonials
   - Set ratings and photos
   - Manage testimonial content

6. **Gallery**
   - Upload and manage gallery images
   - Organize by categories
   - Bulk image management

## 🔐 Admin Access

### Login Credentials:
- **URL**: `http://localhost:3000/admin/login`
- **Email**: Use the email you set in environment variables
- **Password**: The password you set when creating the user

### Security Features:
- Row Level Security (RLS) enabled
- Admin-only access to edit functions
- Public read access for website content
- Secure authentication with Supabase Auth

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access admin panel
http://localhost:3000/admin

# Access main website
http://localhost:3000
```

## 📱 Frontend Integration

The website will automatically fetch data from Supabase and display it. No manual updates needed - all changes in the admin panel will reflect immediately on the website.

## 🔧 Troubleshooting

### Common Issues:

1. **Authentication not working**
   - Check environment variables are correct
   - Verify user exists in Supabase Auth
   - Check redirect URLs in Supabase settings

2. **Database connection issues**
   - Verify Supabase URL and keys
   - Check if tables exist in database
   - Run the SQL schema script again

3. **Images not loading**
   - Check if storage bucket exists
   - Verify image URLs are correct
   - Check storage policies

### Support:
- Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)

## 🚀 Deployment

### For Production:

1. Update environment variables with production Supabase project
2. Update Site URL in Supabase Auth settings
3. Deploy to your hosting platform (Vercel, Netlify, etc.)
4. Update redirect URLs for production domain

### Environment Variables for Production:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
```

## 📊 Database Schema Overview

- **hero_content**: Main hero section content
- **programs**: Training programs and services
- **events**: Upcoming events and tournaments
- **coaches**: Coach profiles and information
- **testimonials**: Customer testimonials
- **gallery_images**: Gallery photos and images
- **admin_users**: Admin user management

All tables support bilingual content (English/Arabic) and include created_at/updated_at timestamps.








