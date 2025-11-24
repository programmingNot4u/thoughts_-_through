# Thoughts & Through - Django REST API

Django REST API backend for the Thoughts & Through web application.

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On Mac/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env` file with your settings.

### 4. Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

### 6. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### Surveys
- `GET /api/surveys/` - List all surveys
- `GET /api/surveys/{id}/` - Get survey details
- `GET /api/surveys/active/` - Get active surveys
- `GET /api/surveys/completed/` - Get completed surveys
- `POST /api/surveys/` - Create survey
- `PUT /api/surveys/{id}/` - Update survey
- `DELETE /api/surveys/{id}/` - Delete survey

### Research Areas
- `GET /api/research/` - List all research items
- `GET /api/research/{id}/` - Get research details
- `GET /api/research/health/` - Get health research
- `GET /api/research/climate/` - Get climate research
- `GET /api/research/social/` - Get social research
- `POST /api/research/` - Create research item
- `PUT /api/research/{id}/` - Update research item
- `DELETE /api/research/{id}/` - Delete research item

### Media Coverage
- `GET /api/media/` - List all media items
- `GET /api/media/{id}/` - Get media details
- `POST /api/media/` - Create media item
- `PUT /api/media/{id}/` - Update media item
- `DELETE /api/media/{id}/` - Delete media item

### Publications
- `GET /api/publications/` - List all publications
- `GET /api/publications/{id}/` - Get publication details
- `POST /api/publications/` - Create publication
- `PUT /api/publications/{id}/` - Update publication
- `DELETE /api/publications/{id}/` - Delete publication

### Webinars
- `GET /api/webinars/` - List all webinars
- `GET /api/webinars/{id}/` - Get webinar details
- `POST /api/webinars/` - Create webinar
- `PUT /api/webinars/{id}/` - Update webinar
- `DELETE /api/webinars/{id}/` - Delete webinar

### Promotional Content
- `GET /api/promotional/` - List all promotional items
- `GET /api/promotional/{id}/` - Get promotional item details
- `POST /api/promotional/` - Create promotional item
- `PUT /api/promotional/{id}/` - Update promotional item
- `DELETE /api/promotional/{id}/` - Delete promotional item

### Relevant Links
- `GET /api/relevant-links/` - List all links
- `GET /api/relevant-links/{id}/` - Get link details
- `POST /api/relevant-links/` - Create link
- `PUT /api/relevant-links/{id}/` - Update link
- `DELETE /api/relevant-links/{id}/` - Delete link

### Resource Panel
- `GET /api/resource-panel/` - List all panel members
- `GET /api/resource-panel/{id}/` - Get panel member details
- `POST /api/resource-panel/` - Create panel member
- `PUT /api/resource-panel/{id}/` - Update panel member
- `DELETE /api/resource-panel/{id}/` - Delete panel member

## Filtering and Search

All endpoints support:
- **Search**: `?search=keyword` (searches in relevant fields)
- **Filtering**: `?status=Active&category=Health` (varies by endpoint)
- **Ordering**: `?ordering=-date` (newest first)
- **Pagination**: `?page=1&page_size=20`

## Example API Calls

### Get all active surveys
```bash
GET http://localhost:8000/api/surveys/?status=Active
```

### Get health research
```bash
GET http://localhost:8000/api/research/health/
```

### Search media coverage
```bash
GET http://localhost:8000/api/media/?search=mental%20health
```

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/` to manage all data through a user-friendly interface.

## CORS Configuration

The API is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

Update `CORS_ALLOWED_ORIGINS` in `settings.py` for production.

