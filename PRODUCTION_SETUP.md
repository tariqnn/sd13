# 🚀 SD13 Sports Academy - Production Setup Guide

## 📋 **Step-by-Step Supabase Setup**

### 1. **Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new project: `sd13-sports-academy`
4. Choose region closest to your users
5. Set strong database password

### 2. **Get Your Supabase Credentials**
1. Go to **Settings** → **API**
2. Copy these values:
   - `anon public` key → `SUPABASE_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Get Database Connection String**
1. Go to **Settings** → **Database**
2. Copy **Connection string** → `DATABASE_URL`
3. Copy **Connection pooling** → `DIRECT_URL`

### 4. **Set Up Environment Variables**
Create `.env.local` file:
```env
# Supabase Configuration
SUPABASE_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Database URLs
DATABASE_URL="postgresql://postgres:[password]@db.jwqtvzxiufvinsliewij.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@db.jwqtvzxiufvinsliewij.supabase.co:5432/postgres"

# Admin Credentials
ADMIN_EMAIL="admin@sd13academy.com"
ADMIN_PASSWORD="your-secure-password"

# App Configuration
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### 5. **Set Up Database Schema**
1. Run: `npx prisma db push`
2. Run: `npx prisma generate`
3. Execute SQL from `scripts/setup-supabase.sql` in Supabase SQL Editor

### 6. **Create Admin User**
1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Email: `admin@sd13academy.com`
4. Password: `your-secure-password`
5. Copy the user ID

6. Go to **SQL Editor** and run:
```sql
INSERT INTO users (id, email, role) 
VALUES ('user-id-from-step-5', 'admin@sd13academy.com', 'admin');
```

### 7. **Upload Your Images**
1. Go to **Storage** in Supabase
2. Create buckets: `gallery`, `programs`, `coaches`, `testimonials`
3. Upload your images from `public/photos/` folder
4. Make buckets public

### 8. **Deploy to Vercel**
1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 💰 **Cost Breakdown**
- **Supabase**: Free tier (500MB database, 1GB storage)
- **Vercel**: Free tier (100GB bandwidth)
- **Total**: $0/month for small sites!

## 🔧 **Production Features**
- ✅ PostgreSQL database
- ✅ Real-time updates
- ✅ Built-in authentication
- ✅ Image storage
- ✅ Row-level security
- ✅ Automatic backups
- ✅ SSL/HTTPS
- ✅ Global CDN

## 📊 **Storage Limits**
- **Database**: 500MB (free) / 8GB (pro)
- **File Storage**: 1GB (free) / 100GB (pro)
- **Bandwidth**: 2GB (free) / 250GB (pro)

## 🚀 **Ready for Production!**
Your website is now production-ready with:
- Scalable database
- Secure authentication
- Cloud image storage
- Global performance
- Automatic backups
