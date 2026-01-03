#!/bin/bash

echo "🚀 Setting up Digi-Bh Admin Dashboard Database"
echo "=============================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    exit 1
fi

echo "📋 Please complete these steps:"
echo ""
echo "1. 🌐 Create a Supabase project at: https://supabase.com"
echo "2. 📊 Go to your project dashboard"
echo "3. 🔑 Copy your Project URL and Anon Key"
echo "4. ✏️  Update .env.local with your credentials"
echo "5. 🗄️  Run the SQL schema in Supabase SQL Editor"
echo ""
echo "📄 SQL Schema location: supabase-schema.sql"
echo ""
echo "🔐 Generate a secure JWT secret:"
echo "   openssl rand -base64 32"
echo ""
echo "⚡ After setup, run: npm run dev"
echo ""
echo "📚 Demo login: admin / admin123"