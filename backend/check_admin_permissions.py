"""
Quick script to check admin permissions for Legal Documents
Run this with: python manage.py shell < check_admin_permissions.py
Or run: python manage.py shell, then paste the code
"""
from django.contrib.auth.models import User
from api.models import LegalDocument

# Check if there are any users
users = User.objects.all()
print(f"Total users: {users.count()}")
print("\nUser permissions:")
for user in users:
    print(f"\nUser: {user.username}")
    print(f"  Is staff: {user.is_staff}")
    print(f"  Is superuser: {user.is_superuser}")
    if user.is_staff:
        # Check specific permissions
        has_add = user.has_perm('api.add_legaldocument')
        has_change = user.has_perm('api.change_legaldocument')
        has_delete = user.has_perm('api.delete_legaldocument')
        print(f"  Can add LegalDocument: {has_add}")
        print(f"  Can change LegalDocument: {has_change}")
        print(f"  Can delete LegalDocument: {has_delete}")

# Check LegalDocument model
print(f"\n\nLegal Documents in database: {LegalDocument.objects.count()}")
print("\nTo add a Legal Document in admin:")
print("1. Make sure you're logged in as a superuser or staff user")
print("2. Go to: http://localhost:8000/admin/api/legaldocument/")
print("3. Look for the 'Add Legal Document' button in the top right")
print("4. If you don't see it, check your user permissions above")

