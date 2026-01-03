#!/bin/bash

# Admin Dashboard Quick Setup Script
# This script helps you quickly set up the admin dashboard

echo "🚀 Admin Dashboard Setup"
echo "========================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your Supabase credentials"
    echo "See ADMIN_README.md for details"
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Check if Supabase variables are set
if grep -q "your_supabase_url_here" .env.local || grep -q "your_supabase_anon_key_here" .env.local; then
    echo "⚠️  Warning: Supabase credentials not configured!"
    echo "Please update .env.local with your actual Supabase URL and keys"
    echo ""
    echo "To get your Supabase credentials:"
    echo "1. Go to https://supabase.com/dashboard"
    echo "2. Select your project"
    echo "3. Go to Settings > API"
    echo "4. Copy URL and anon/public key"
    echo ""
    read -p "Have you updated .env.local? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Supabase credentials configured"
echo ""

# Check if JWT secret is default
if grep -q "your_jwt_secret_key_here" .env.local; then
    echo "⚠️  Warning: Using default JWT secret!"
    echo "For production, generate a secure secret:"
    echo "  openssl rand -base64 32"
    echo ""
fi

# Check if admin password is default
if grep -q "ADMIN_PASSWORD=admin123" .env.local; then
    echo "⚠️  Warning: Using default admin password!"
    echo "Please change ADMIN_PASSWORD in .env.local for security"
    echo ""
fi

echo "📊 Next Steps:"
echo "=============="
echo ""
echo "1. Set up your Supabase database:"
echo "   - Go to your Supabase project dashboard"
echo "   - Navigate to SQL Editor"
echo "   - Copy and run the SQL from: supabase-schema.sql"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Access the admin panel:"
echo "   http://localhost:3000/admin"
echo ""
echo "4. Login with your credentials:"
echo "   Username: admin"
echo "   Password: (check your .env.local)"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - ADMIN_README.md (Setup guide)"
echo "   - IMPLEMENTATION_SUMMARY.md (Feature overview)"
echo ""
echo "✨ Ready to start your admin dashboard!"
