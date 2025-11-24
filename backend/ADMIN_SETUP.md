# Modern Admin Panel Setup Guide

## Installation

1. **Install the new dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run migrations for admin-interface:**
   ```bash
   python manage.py migrate
   ```

3. **Collect static files:**
   ```bash
   python manage.py collectstatic --noinput
   ```

4. **Create a superuser (if you haven't already):**
   ```bash
   python manage.py createsuperuser
   ```

5. **Run the server:**
   ```bash
   python manage.py runserver
   ```

6. **Access the admin panel:**
   - Go to: `http://localhost:8000/admin/`
   - Login with your superuser credentials

## Features

### 🎨 Modern Design
- Beautiful, modern interface with custom styling
- Color-coded badges for status, types, and categories
- Improved typography and spacing
- Responsive design for mobile devices

### 📊 Enhanced List Views
- Color-coded badges for easy identification
- Image previews in list views
- Quick edit capabilities (order, active status)
- Better filtering and search
- Date hierarchy navigation

### 🖼️ Image Previews
- Thumbnail previews in admin forms
- Circular previews for profile images
- Hover effects and better styling

### 🔗 Smart Linking
- Clickable links to related objects
- Hierarchy visualization for organizational members
- Subordinates list with direct links

### 📝 Better Organization
- Logical grouping with fieldsets
- Collapsible sections for metadata
- Clear section headers
- Helpful descriptions

### 🎯 Improved UX
- Better form field styling
- Modern buttons with hover effects
- Improved pagination
- Better message display
- Enhanced search functionality

## Customization

### Changing Admin Theme Colors

1. Go to Django Admin
2. Navigate to **Admin Interface** > **Themes**
3. Create or edit a theme
4. Customize colors to match your brand:
   - Primary Color: `#1C7C54` (Forest Green)
   - Secondary Color: `#11543A` (Deep Green)
   - Accent Color: `#E6F4EC` (Light Green)

### Adding Custom CSS

Edit `backend/api/static/admin/css/custom_admin.css` to add more customizations.

## Admin Organization

The admin is organized into logical sections:

1. **Surveys** - Survey management with tags, objectives, and links
2. **Research** - Research areas with images, tags, and videos
3. **Media Coverage** - Articles, videos, news, interviews
4. **Publications** - Research reports, policy briefs, etc.
5. **Webinars** - Webinar management
6. **Promotional Content** - Homepage slider content
7. **Relevant Links** - External resource links
8. **Resource Panel** - Team member profiles
9. **About Page** - Customizable about sections and content
10. **Organizational** - Team hierarchy management

## Tips

- Use the **Quick Edit** feature (list_editable) to quickly update order and active status
- Use **Filters** to narrow down large lists
- Use **Search** to find specific items quickly
- Check **Image Previews** to see images before saving
- Use **Hierarchy** features in Organizational Members to build your org chart

## Troubleshooting

If you see styling issues:
1. Run `python manage.py collectstatic --noinput`
2. Clear your browser cache
3. Make sure `STATICFILES_DIRS` is set correctly in settings.py

If admin-interface doesn't work:
1. Make sure it's before `django.contrib.admin` in INSTALLED_APPS
2. Run migrations: `python manage.py migrate`
3. Restart the server

