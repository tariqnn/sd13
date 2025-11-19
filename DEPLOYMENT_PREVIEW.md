# 🚀 Preview Deployment Guide (No Database Required)

This guide will help you deploy the SD13 Sports Academy website to Vercel for preview purposes **without requiring a paid database**. The site will use mock data to showcase the design and functionality.

## ✅ What Works in Preview Mode

- ✅ Full website design and layout
- ✅ All components and animations
- ✅ Mock data for all sections:
  - Hero section with video
  - Training programs
  - Coaches profiles
  - Testimonials
  - Gallery images
  - Events
- ✅ Bilingual support (English/Arabic)
- ✅ Responsive design
- ✅ All UI interactions

## ❌ What Doesn't Work in Preview Mode

- ❌ Admin panel (requires database)
- ❌ Content management (requires database)
- ❌ Form submissions (contact form won't save)
- ❌ Real-time content updates

## 📋 Deployment Steps

### 1. Push to GitHub

Your code is already pushed to: `https://github.com/tariqnn/sd13`

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `tariqnn/sd13`
4. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

### 3. Environment Variables (Optional for Preview)

For preview mode, you **don't need** to add any environment variables. The site will automatically use mock data.

However, if you want to test with a real database later, you can add these in Vercel's environment variables section:

```
SUPABASE_KEY=your-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-key-here
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
```

**For preview mode, leave these empty or don't add them at all.**

### 4. Deploy!

Click **"Deploy"** and wait for the build to complete. Vercel will:
- Install dependencies
- Build the Next.js application
- Deploy to a public URL

### 5. Access Your Site

Once deployed, Vercel will provide you with:
- **Preview URL:** `https://sd13-xxxxx.vercel.app`
- **Production URL:** (if you set up a custom domain)

## 🎨 What Your Client Will See

The deployed site will show:
- Beautiful hero section with video background
- 3 sample training programs
- 3 coach profiles
- 3 testimonials
- 8 gallery images
- 2 upcoming events
- Fully functional contact form (UI only, won't save)
- Responsive design on all devices
- Smooth animations and transitions

## 🔄 Updating Content

To update the mock data shown in preview mode:
1. Edit `src/data/mockData.ts`
2. Push changes to GitHub
3. Vercel will automatically redeploy

## 🚀 Moving to Production (Later)

When you're ready to add a real database:

1. Set up Supabase (free tier available)
2. Add environment variables in Vercel
3. Run database migrations
4. The site will automatically switch from mock data to real data

See `PRODUCTION_SETUP.md` for detailed instructions.

## 📝 Notes

- The site works perfectly for design previews without a database
- All images and videos are included in the repository
- No API keys or credentials needed for preview
- Build time: ~2-3 minutes
- Free on Vercel's hobby plan

---

**Ready to deploy?** Just connect your GitHub repo to Vercel and click deploy! 🎉

