# 🚀 Digi-Bh Admin Dashboard - Quick Start

## Prerequisites
- Node.js 18+
- Supabase account (free)

## 1. Setup Supabase Database

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for setup to complete

### Get Credentials
1. Go to Project Settings → API
2. Copy:
   - **Project URL**
   - **anon/public key**

### Update Environment
Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your_secure_jwt_secret_key_here_change_this
```

### Run Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste contents of `supabase-schema.sql`
3. Click "Run"

## 2. Generate Secure JWT Secret
```bash
openssl rand -base64 32
```
Replace `JWT_SECRET` in `.env.local`

## 3. Start Development Server
```bash
npm run dev
```

## 4. Access Admin Panel
- **URL**: http://localhost:3000/admin
- **Username**: admin
- **Password**: admin123

## 📊 Database Tables Created
- ✅ categories
- ✅ sub_categories
- ✅ super_sub_categories
- ✅ products
- ✅ contact_enquiries
- ✅ newsletter_enquiries

## 🎯 Start with Categories
1. Login to admin panel
2. Go to "Categories" in sidebar
3. Add your main categories
4. Then add sub-categories and super sub-categories
5. Finally add products with proper category hierarchy

## 🔧 Troubleshooting
- If build fails: Check Supabase credentials
- If login fails: Verify JWT_SECRET is set
- If database errors: Check SQL schema was run correctly