# Django REST API Setup Guide

## Quick Start

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create .env file:**
   ```bash
   # Copy the example file
   # Windows
   copy .env.example .env

   # Mac/Linux
   cp .env.example .env
   ```

   Edit `.env` and set:
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/api/`

## API Base URL

All API endpoints are prefixed with `/api/`:

- Surveys: `http://localhost:8000/api/surveys/`
- Research: `http://localhost:8000/api/research/`
- Media: `http://localhost:8000/api/media/`
- Publications: `http://localhost:8000/api/publications/`
- Webinars: `http://localhost:8000/api/webinars/`
- Promotional: `http://localhost:8000/api/promotional/`
- Relevant Links: `http://localhost:8000/api/relevant-links/`
- Resource Panel: `http://localhost:8000/api/resource-panel/`

## Testing the API

You can test the API using:
- Browser: Visit `http://localhost:8000/api/surveys/`
- curl: `curl http://localhost:8000/api/surveys/`
- Postman or any REST client
- Django admin: `http://localhost:8000/admin/`

## Next Steps

1. Populate the database with initial data through the admin panel
2. Update your React frontend to fetch data from these API endpoints
3. Configure CORS settings for production deployment

