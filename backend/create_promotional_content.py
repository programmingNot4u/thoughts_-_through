#!/usr/bin/env python
"""
Script to create sample promotional content in the database
"""
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'thoughts_through.settings')
django.setup()

from api.models import PromotionalContent

# Clear existing promotional content (optional - comment out if you want to keep existing)
# PromotionalContent.objects.all().delete()

# Create promotional content items
promotional_items = [
    {
        'type': 'announcement',
        'title': 'Welcome to Thoughts Through',
        'description': 'Survey. Research. Consultancy services grounded in data and environmental awareness.',
        'content': 'Join us in our mission to create evidence-based solutions for a sustainable future. Explore our research, participate in surveys, and stay informed about our latest findings.',
        'link': '/research',
        'link_text': 'View Our Research',
        'background_color': '#1C7C54',
        'text_color': '#FFFFFF',
        'order': 1,
        'is_active': True,
    },
    {
        'type': 'text',
        'title': 'Evidence-Based Insights for a Sustainable Future',
        'description': 'Our research spans health, climate change, and social inequality to inform policy and create positive change.',
        'content': 'We conduct comprehensive research across multiple domains to provide actionable insights that drive sustainable development and improve lives.',
        'link': '/surveys',
        'link_text': 'Participate in Surveys',
        'background_color': '#2D5016',
        'text_color': '#FFFFFF',
        'order': 2,
        'is_active': True,
    },
    {
        'type': 'announcement',
        'title': 'New Research Publication Available',
        'description': 'Our latest findings on climate change impacts are now available for download.',
        'content': 'Download our comprehensive report on climate change impacts on health and livelihood. This research provides critical insights for policymakers and communities.',
        'link': '/publications',
        'link_text': 'View Publications',
        'background_color': '#4A7C59',
        'text_color': '#FFFFFF',
        'order': 3,
        'is_active': True,
    },
    {
        'type': 'text',
        'title': 'Join Our Upcoming Webinar',
        'description': 'Learn about our latest research findings and engage with our team of experts.',
        'content': 'Register now for our upcoming webinar where we will discuss recent research findings and answer your questions about our work.',
        'link': '/webinars',
        'link_text': 'Register Now',
        'background_color': '#1C7C54',
        'text_color': '#FFFFFF',
        'order': 4,
        'is_active': True,
    },
    {
        'type': 'announcement',
        'title': 'Media Coverage & Events',
        'description': 'Stay updated with our latest media appearances, conferences, and public events.',
        'content': 'Check out our recent media coverage and upcoming events where we share our research findings with the broader community.',
        'link': '/media-coverage',
        'link_text': 'View Media Coverage',
        'background_color': '#2D5016',
        'text_color': '#FFFFFF',
        'order': 5,
        'is_active': True,
    },
]

# Create promotional content
created_count = 0
for item_data in promotional_items:
    # Check if item already exists (by title)
    if item_data.get('title'):
        existing = PromotionalContent.objects.filter(title=item_data['title']).first()
        if existing:
            print(f"[SKIP] Promotional content '{item_data['title']}' already exists, skipping...")
            continue
    
    promotional = PromotionalContent.objects.create(**item_data)
    created_count += 1
    print(f"[OK] Created promotional content: {promotional.title} (Order: {promotional.order})")

print(f"\n[SUCCESS] Successfully created {created_count} promotional content items!")
print(f"Total promotional content items: {PromotionalContent.objects.filter(is_active=True).count()}")

