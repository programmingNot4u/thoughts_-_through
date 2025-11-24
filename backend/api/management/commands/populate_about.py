from django.core.management.base import BaseCommand
from api.models import AboutPageSection, AboutPageContent, OrganizationalMember


class Command(BaseCommand):
    help = 'Populate About page with initial data'

    def handle(self, *args, **options):
        self.stdout.write('Populating About page sections...')
        
        # Create About Page Sections
        sections_data = [
            {
                'title': 'Vision',
                'section_type': 'vision',
                'items': [
                    'To be a leading research organization that drives evidence-based decision making',
                    'Creating sustainable solutions for global challenges',
                    'Fostering environmental consciousness and social equity',
                ],
                'order': 1,
            },
            {
                'title': 'Mission',
                'section_type': 'mission',
                'items': [
                    'Conduct rigorous surveys and research across health, environment, and social sectors',
                    'Provide consultancy services grounded in data and scientific evidence',
                    'Bridge the gap between research and policy implementation',
                ],
                'order': 2,
            },
            {
                'title': 'Goals',
                'section_type': 'goals',
                'items': [
                    'Advance knowledge in health, mental health, and social well-being',
                    'Address climate change impacts through actionable research',
                    'Promote social justice and reduce inequality',
                ],
                'order': 3,
            },
            {
                'title': 'Objectives',
                'section_type': 'objectives',
                'items': [
                    'Publish high-quality research reports and publications',
                    'Collaborate with national and international research institutions',
                    'Provide evidence-based consultancy to governments and organizations',
                    'Build capacity through knowledge sharing and training',
                ],
                'order': 4,
            },
        ]

        for section_data in sections_data:
            section, created = AboutPageSection.objects.get_or_create(
                title=section_data['title'],
                defaults=section_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created section: {section.title}'))
            else:
                self.stdout.write(self.style.WARNING(f'Section already exists: {section.title}'))

        # Create About Page Content (Chairman Intro)
        self.stdout.write('Populating About page content...')
        
        chairman_content = {
            'title': 'Introduction by Chairman',
            'content_type': 'chairman_intro',
            'content': '''<p>Welcome to Thoughts & Thorough. Our commitment to evidence-based research and sustainable solutions drives everything we do. Through rigorous surveys, comprehensive studies, and strategic consultancy, we aim to create meaningful impact in health, environment, and social equity. Together, we can build a more sustainable and equitable future for all.</p>
            <div class="pt-4">
              <p class="text-forest-green font-heading font-bold text-xl mb-2">Ishrat Jahan Dilruba</p>
              <p class="text-medium-gray font-semibold mb-1">Chairman</p>
              <p class="text-medium-gray italic" style="font-family: cursive;">Thoughts & Thorough</p>
            </div>''',
            'image_position': 'left',
            'order': 1,
        }

        content, created = AboutPageContent.objects.get_or_create(
            content_type='chairman_intro',
            defaults=chairman_content
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Created chairman introduction content'))
        else:
            self.stdout.write(self.style.WARNING('Chairman introduction already exists'))

        # Create Organizational Members
        self.stdout.write('Populating organizational members...')
        
        # Create Chairman first
        chairman_data = {
            'name': 'Ishrat Jahan Dilruba',
            'designation': 'Chairman',
            'bio': 'Leading the organization with strategic vision and commitment to excellence in research and consultancy services.',
            'reports_to': None,
            'level': 0,
            'order': 1,
        }
        
        chairman, created = OrganizationalMember.objects.get_or_create(
            name=chairman_data['name'],
            defaults=chairman_data
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Created member: {chairman.name}'))
        else:
            self.stdout.write(self.style.WARNING(f'Member already exists: {chairman.name}'))
        
        # Create other members that report to chairman
        other_members_data = [
            {
                'name': 'Md Taufikuzzaman',
                'designation': 'Managing Director',
                'bio': 'Overseeing day-to-day operations and driving organizational growth through innovative research methodologies and strategic partnerships.',
                'level': 1,
                'order': 1,
            },
            {
                'name': 'Kazi Mohammad Azizul Islam',
                'designation': 'Director',
                'bio': 'Contributing expertise in research development and strategic planning to advance the organization\'s mission and objectives.',
                'level': 1,
                'order': 2,
            },
            {
                'name': 'Rasheda Begum',
                'designation': 'Director',
                'bio': 'Providing strategic guidance and oversight to ensure the organization\'s continued success and impact in research and consultancy.',
                'level': 1,
                'order': 3,
            },
        ]

        for member_data in other_members_data:
            member_data['reports_to'] = chairman
            member, created = OrganizationalMember.objects.get_or_create(
                name=member_data['name'],
                defaults=member_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created member: {member.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Member already exists: {member.name}'))

        self.stdout.write(self.style.SUCCESS('\nSuccessfully populated About page data!'))
        self.stdout.write(self.style.SUCCESS('You can now view the About page and edit content in Django admin.'))

