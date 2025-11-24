#!/usr/bin/env python
import os
import sys
import django

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'thoughts_through.settings')
django.setup()

from api.models import PromotionalContent

items = PromotionalContent.objects.filter(is_active=True).order_by('order')
print(f'Total active promotional content items: {items.count()}\n')
for item in items:
    print(f"  - {item.title}")
    print(f"    Order: {item.order}")
    print(f"    Link: {item.link or 'N/A'}")
    print()

