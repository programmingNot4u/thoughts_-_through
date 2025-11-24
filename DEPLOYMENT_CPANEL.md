# cPanel Deployment Guide

This guide will help you deploy both the Django backend and React frontend on the same cPanel account.

## 📋 Prerequisites

- cPanel access with Python support (Python 3.8+)
- Node.js support (for building the frontend)
- MySQL/MariaDB database (recommended) or SQLite
- SSH access (recommended) or File Manager access

## 🗂️ Directory Structure on cPanel

```
public_html/
├── api/                    # Django backend
│   ├── backend/
│   ├── .htaccess
│   └── passenger_wsgi.py
├── static/                 # Django static files
├── media/                  # Django media files
└── index.html              # React frontend (from dist/)
    └── assets/            # React assets (from dist/)
```

## 📦 Step 1: Prepare Files Locally

### 1.1 Build Frontend

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The dist/ folder will contain your built files
```

### 1.2 Prepare Backend

Make sure your backend is ready:
- Update `settings.py` for production
- Create `.env` file with production settings
- Collect static files: `python manage.py collectstatic --noinput`

## 🚀 Step 2: Upload to cPanel

### Option A: Using File Manager

1. **Upload Backend:**
   - Create `public_html/api/` directory
   - Upload entire `backend/` folder to `public_html/api/backend/`
   - Upload `backend/.htaccess` and `backend/passenger_wsgi.py`

2. **Upload Frontend:**
   - Upload contents of `dist/` folder to `public_html/`
   - Make sure `index.html` is in `public_html/`

3. **Upload Static/Media:**
   - Create `public_html/static/` for Django static files
   - Create `public_html/media/` for Django media files

### Option B: Using SSH/SCP

```bash
# Upload backend
scp -r backend/ user@yourdomain.com:~/public_html/api/

# Upload frontend build
scp -r dist/* user@yourdomain.com:~/public_html/
```

## ⚙️ Step 3: Configure Backend

### 3.1 Create `.env` file in `public_html/api/backend/`

```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=mysql://username:password@localhost/dbname
```

### 3.2 Update Django Settings

The `settings.py` should already be configured, but verify:
- `DEBUG = False` in production
- `ALLOWED_HOSTS` includes your domain
- Database settings are correct
- Static and media paths are correct

### 3.3 Set Up Python Environment

In cPanel:
1. Go to **Software** → **Setup Python App**
2. Create a new Python app:
   - Python version: 3.8 or higher
   - App root: `api`
   - App URL: `/api`
   - Application startup file: `passenger_wsgi.py`
   - Application Entry point: `application`

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

### 3.4 Run Migrations

```bash
cd ~/public_html/api/backend
python manage.py migrate
python manage.py collectstatic --noinput
```

### 3.5 Create Superuser

```bash
python manage.py createsuperuser
```

## 🌐 Step 4: Configure Frontend

### 4.1 Update API Base URL

Create `.env.production` in your project root (before building):

```env
VITE_API_BASE_URL=https://yourdomain.com/api/api
```

Then rebuild:
```bash
npm run build
```

### 4.2 Upload Frontend Files

Upload the new `dist/` contents to `public_html/`

## 🔧 Step 5: Configure .htaccess Files

### 5.1 Backend .htaccess (`public_html/api/.htaccess`)

This file is already created. It handles:
- Redirecting API requests to Django
- Serving static files
- Handling media files

### 5.2 Frontend .htaccess (`public_html/.htaccess`)

This file handles:
- React Router (SPA routing)
- Redirecting all requests to `index.html`

## 🔒 Step 6: Security & Performance

### 6.1 Set File Permissions

```bash
# Backend
chmod 755 ~/public_html/api
chmod 644 ~/public_html/api/backend/*.py
chmod 600 ~/public_html/api/backend/.env

# Frontend
chmod 755 ~/public_html
chmod 644 ~/public_html/*.html
chmod 755 ~/public_html/assets
```

### 6.2 Update CORS Settings

In `backend/thoughts_through/settings.py`, update:

```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]
```

## 🧪 Step 7: Test Deployment

1. **Test Frontend:**
   - Visit `https://yourdomain.com`
   - Check if React app loads

2. **Test Backend API:**
   - Visit `https://yourdomain.com/api/api/research/`
   - Should return JSON data

3. **Test Admin:**
   - Visit `https://yourdomain.com/api/admin/`
   - Login with superuser credentials

## 🐛 Troubleshooting

### Issue: 500 Internal Server Error

- Check error logs in cPanel → **Errors**
- Verify `.env` file exists and has correct values
- Check file permissions
- Verify Python app is running in cPanel

### Issue: Frontend can't connect to API

- Check `VITE_API_BASE_URL` in build
- Verify CORS settings in Django
- Check browser console for errors

### Issue: Static files not loading

- Run `python manage.py collectstatic --noinput`
- Check `.htaccess` configuration
- Verify static files path in settings

### Issue: Media files not accessible

- Check media folder permissions (755)
- Verify `MEDIA_URL` and `MEDIA_ROOT` in settings
- Check `.htaccess` media configuration

## 📝 Additional Notes

1. **Database:** If using MySQL, create database in cPanel → **MySQL Databases**
2. **SSL:** Enable SSL certificate in cPanel → **SSL/TLS**
3. **Backup:** Regularly backup database and media files
4. **Updates:** When updating, always test in staging first

## 🔄 Updating the Site

### Update Frontend:
```bash
# Locally
npm run build
# Upload new dist/ contents to public_html/
```

### Update Backend:
```bash
# Via SSH
cd ~/public_html/api/backend
git pull  # if using git
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
# Restart Python app in cPanel
```

## 📞 Support

If you encounter issues:
1. Check cPanel error logs
2. Check Django logs
3. Verify all environment variables
4. Test API endpoints directly

