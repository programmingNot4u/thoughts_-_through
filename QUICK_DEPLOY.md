# Quick cPanel Deployment Checklist

## 🚀 Quick Steps

### 1. Build Frontend Locally
```bash
# Create .env.production with your API URL
echo "VITE_API_BASE_URL=https://yourdomain.com/api/api" > .env.production

# Build
npm install
npm run build
```

### 2. Prepare Backend
```bash
cd backend
# Create .env file (copy from env.example and update values)
cp env.example .env
# Edit .env with your production settings

# Collect static files
python manage.py collectstatic --noinput
```

### 3. Upload to cPanel

**File Structure:**
```
public_html/
├── api/
│   ├── backend/          (entire backend folder)
│   ├── .htaccess         (from backend/.htaccess)
│   └── passenger_wsgi.py (from backend/passenger_wsgi.py)
├── index.html            (from dist/)
├── assets/               (from dist/assets/)
└── .htaccess             (from root .htaccess)
```

### 4. Configure in cPanel

1. **Python App Setup:**
   - Go to: Software → Setup Python App
   - Create app with:
     - Python version: 3.8+
     - App root: `api`
     - App URL: `/api`
     - Startup file: `passenger_wsgi.py`

2. **Install Dependencies:**
   ```bash
   cd ~/public_html/api/backend
   pip install -r requirements.txt
   ```

3. **Run Migrations:**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

### 5. Update Environment Variables

**Backend `.env` file** (`public_html/api/backend/.env`):
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### 6. Test

- Frontend: `https://yourdomain.com`
- API: `https://yourdomain.com/api/api/research/`
- Admin: `https://yourdomain.com/api/admin/`

## ⚠️ Important Notes

1. **Generate Secret Key:**
   ```bash
   python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
   ```

2. **File Permissions:**
   ```bash
   chmod 755 ~/public_html/api
   chmod 600 ~/public_html/api/backend/.env
   ```

3. **Restart Python App** after any changes in cPanel

4. **Database:** Use MySQL for production (create in cPanel → MySQL Databases)

## 🐛 Common Issues

- **500 Error:** Check error logs, verify .env file exists
- **Static files not loading:** Run `collectstatic` again
- **CORS errors:** Update CORS_ALLOWED_ORIGINS in .env

