#!/bin/bash

# Build and Deploy Script for cPanel
# This script builds the frontend and prepares files for deployment

echo "🚀 Starting build process..."

# Build frontend
echo "📦 Building React frontend..."
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend build complete!"

# Prepare backend
echo "📦 Preparing Django backend..."
cd backend

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

if [ $? -ne 0 ]; then
    echo "❌ Static files collection failed!"
    exit 1
fi

echo "✅ Static files collected!"

cd ..

echo ""
echo "✅ Build process complete!"
echo ""
echo "📋 Next steps for cPanel deployment:"
echo "1. Upload backend/ folder to public_html/api/backend/"
echo "2. Upload contents of dist/ folder to public_html/"
echo "3. Upload .htaccess files to their respective locations"
echo "4. Create .env file in backend/ with production settings"
echo "5. Set up Python app in cPanel"
echo "6. Run migrations: python manage.py migrate"
echo "7. Create superuser: python manage.py createsuperuser"
echo ""
echo "📖 See DEPLOYMENT_CPANEL.md for detailed instructions"

