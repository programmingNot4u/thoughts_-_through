from django.core.management.base import BaseCommand
from api.models import ResourcePanel


class Command(BaseCommand):
    help = 'Populate Resource Panel with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Populating Resource Panel...')
        
        members_data = [
            {
                'name': 'Dr. Sarah Johnson',
                'title': 'Senior Research Fellow - Public Health',
                'bio': 'Dr. Sarah Johnson is a distinguished public health researcher with over 15 years of experience in health policy, epidemiology, and community health interventions. She has led numerous research projects focusing on maternal and child health, mental health services, and healthcare accessibility in underserved communities.',
                'email': 'sarah.johnson@thoughtsthrough.org',
                'phone': '+880-1712-345678',
                'expertise': [
                    'Public Health',
                    'Epidemiology',
                    'Health Policy',
                    'Maternal and Child Health',
                    'Mental Health Services',
                    'Healthcare Accessibility'
                ],
            },
            {
                'name': 'Dr. Michael Chen',
                'title': 'Research Director - Environmental Studies',
                'bio': 'Dr. Michael Chen specializes in environmental health, climate change adaptation, and sustainable development. With a Ph.D. in Environmental Science, he has published extensively on air quality, water pollution, and community-based environmental management strategies.',
                'email': 'michael.chen@thoughtsthrough.org',
                'phone': '+880-1712-345679',
                'expertise': [
                    'Environmental Health',
                    'Climate Change Adaptation',
                    'Air Quality',
                    'Water Pollution',
                    'Sustainable Development',
                    'Environmental Policy'
                ],
            },
            {
                'name': 'Dr. Emily Rodriguez',
                'title': 'Senior Research Analyst - Social Sciences',
                'bio': 'Dr. Emily Rodriguez is an expert in social inequality, family dynamics, and community resilience. Her research focuses on understanding social structures, gender equity, and developing evidence-based interventions to address social disparities.',
                'email': 'emily.rodriguez@thoughtsthrough.org',
                'phone': '+880-1712-345680',
                'expertise': [
                    'Social Inequality',
                    'Gender Studies',
                    'Family Dynamics',
                    'Community Resilience',
                    'Social Policy',
                    'Qualitative Research'
                ],
            },
            {
                'name': 'Dr. Ahmed Rahman',
                'title': 'Research Fellow - Water Quality & Public Health',
                'bio': 'Dr. Ahmed Rahman is a leading researcher in water quality assessment and its impact on public health. He has conducted extensive studies on water contamination, treatment methods, and water safety interventions in Bangladesh.',
                'email': 'ahmed.rahman@thoughtsthrough.org',
                'phone': '+880-1712-345681',
                'expertise': [
                    'Water Quality',
                    'Public Health',
                    'Environmental Contamination',
                    'Water Treatment',
                    'Health Safety',
                    'Epidemiology'
                ],
            },
            {
                'name': 'Dr. Ayesha Begum',
                'title': 'Research Associate - Education & Gender Equity',
                'bio': 'Dr. Ayesha Begum focuses on education policy, gender inequality in education, and access to quality education. Her work emphasizes evidence-based policy recommendations for improving educational outcomes and reducing gender disparities.',
                'email': 'ayesha.begum@thoughtsthrough.org',
                'phone': '+880-1712-345682',
                'expertise': [
                    'Education Policy',
                    'Gender Equity',
                    'Educational Access',
                    'Social Equity',
                    'Policy Analysis',
                    'Qualitative Research'
                ],
            },
            {
                'name': 'Dr. Kamal Hossain',
                'title': 'Senior Researcher - Environmental Epidemiology',
                'bio': 'Dr. Kamal Hossain specializes in the intersection of environmental factors and public health outcomes. His research examines air pollution impacts, respiratory health, and urban environmental challenges.',
                'email': 'kamal.hossain@thoughtsthrough.org',
                'phone': '+880-1712-345683',
                'expertise': [
                    'Environmental Epidemiology',
                    'Air Pollution',
                    'Respiratory Health',
                    'Urban Health',
                    'Public Health',
                    'Data Analysis'
                ],
            },
            {
                'name': 'Dr. Rina Das',
                'title': 'Research Fellow - Child Nutrition & Development',
                'bio': 'Dr. Rina Das is an expert in child nutrition, development, and health outcomes. She conducts longitudinal studies on child growth, cognitive development, and nutritional interventions in various socioeconomic contexts.',
                'email': 'rina.das@thoughtsthrough.org',
                'phone': '+880-1712-345684',
                'expertise': [
                    'Child Nutrition',
                    'Child Development',
                    'Longitudinal Studies',
                    'Public Health',
                    'Nutritional Interventions',
                    'Health Outcomes'
                ],
            },
            {
                'name': 'Dr. Farid Uddin',
                'title': 'Research Director - Sustainable Agriculture',
                'bio': 'Dr. Farid Uddin specializes in sustainable agriculture practices, climate-resilient farming, and rural development. His research focuses on helping smallholder farmers adopt sustainable practices while maintaining economic viability.',
                'email': 'farid.uddin@thoughtsthrough.org',
                'phone': '+880-1712-345685',
                'expertise': [
                    'Sustainable Agriculture',
                    'Climate Resilience',
                    'Rural Development',
                    'Farming Practices',
                    'Agricultural Policy',
                    'Rural Economics'
                ],
            },
            {
                'name': 'Dr. Tariq Islam',
                'title': 'Research Associate - Digital Health Solutions',
                'bio': 'Dr. Tariq Islam focuses on digital health technologies, telemedicine, and mobile health applications. He researches how technology can improve healthcare accessibility, especially in rural and underserved areas.',
                'email': 'tariq.islam@thoughtsthrough.org',
                'phone': '+880-1712-345686',
                'expertise': [
                    'Digital Health',
                    'Telemedicine',
                    'Mobile Health',
                    'Healthcare Technology',
                    'Rural Healthcare',
                    'Health Informatics'
                ],
            },
            {
                'name': 'Dr. Meherun Nesa',
                'title': 'Senior Research Analyst - Social Cohesion',
                'bio': 'Dr. Meherun Nesa studies social cohesion, community resilience, and social networks. Her research examines how communities build adaptive capacity and respond to various shocks and stresses.',
                'email': 'meherun.nesa@thoughtsthrough.org',
                'phone': '+880-1712-345687',
                'expertise': [
                    'Social Cohesion',
                    'Community Resilience',
                    'Social Networks',
                    'Community Development',
                    'Social Research',
                    'Qualitative Methods'
                ],
            },
            {
                'name': 'Dr. Rezaul Karim',
                'title': 'Research Fellow - Climate Finance & Policy',
                'bio': 'Dr. Rezaul Karim specializes in climate finance mechanisms, adaptation funding, and policy analysis. He examines how climate finance can effectively support adaptation initiatives and improve delivery mechanisms.',
                'email': 'rezaul.karim@thoughtsthrough.org',
                'phone': '+880-1712-345688',
                'expertise': [
                    'Climate Finance',
                    'Adaptation Policy',
                    'Policy Analysis',
                    'Funding Mechanisms',
                    'Climate Change',
                    'Environmental Policy'
                ],
            },
            {
                'name': 'Dr. Salma Begum',
                'title': 'Research Associate - Elderly Care & Social Support',
                'bio': 'Dr. Salma Begum focuses on elderly care systems, social support mechanisms, and aging population challenges. Her research examines care arrangements, support networks, and identifies gaps in services for the aging population.',
                'email': 'salma.begum@thoughtsthrough.org',
                'phone': '+880-1712-345689',
                'expertise': [
                    'Elderly Care',
                    'Social Support',
                    'Aging Studies',
                    'Social Services',
                    'Community Care',
                    'Social Policy'
                ],
            },
            {
                'name': 'Dr. Anwar Hossain',
                'title': 'Senior Research Fellow - Biodiversity Conservation',
                'bio': 'Dr. Anwar Hossain is an expert in biodiversity conservation, protected area management, and wildlife protection. He conducts comprehensive assessments of conservation strategies and species protection measures.',
                'email': 'anwar.hossain@thoughtsthrough.org',
                'phone': '+880-1712-345690',
                'expertise': [
                    'Biodiversity Conservation',
                    'Protected Areas',
                    'Wildlife Protection',
                    'Environmental Conservation',
                    'Ecology',
                    'Conservation Policy'
                ],
            },
            {
                'name': 'Dr. Farzana Rahman',
                'title': 'Research Director - Maternal & Child Health',
                'bio': 'Dr. Farzana Rahman specializes in maternal and child health services, healthcare access, and quality assessment. Her research provides evidence-based recommendations for improving healthcare delivery for mothers and children.',
                'email': 'farzana.rahman@thoughtsthrough.org',
                'phone': '+880-1712-345691',
                'expertise': [
                    'Maternal Health',
                    'Child Health',
                    'Healthcare Access',
                    'Quality Assessment',
                    'Public Health',
                    'Health Services Research'
                ],
            },
            {
                'name': 'Dr. Khaled Ahmed',
                'title': 'Research Fellow - Renewable Energy & Policy',
                'bio': 'Dr. Khaled Ahmed focuses on renewable energy transition, energy policy, and sustainable energy development. He examines current energy infrastructure and provides policy recommendations for transitioning to renewable sources.',
                'email': 'khaled.ahmed@thoughtsthrough.org',
                'phone': '+880-1712-345692',
                'expertise': [
                    'Renewable Energy',
                    'Energy Policy',
                    'Sustainability',
                    'Climate Change',
                    'Policy Analysis',
                    'Energy Systems'
                ],
            },
        ]

        created_count = 0
        updated_count = 0

        for member_data in members_data:
            # Check if member already exists
            member, created = ResourcePanel.objects.get_or_create(
                name=member_data['name'],
                defaults=member_data
            )
            
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {member.name}'))
            else:
                # Update existing member
                for key, value in member_data.items():
                    setattr(member, key, value)
                member.save()
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Updated: {member.name}'))

        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully populated Resource Panel!'))
        self.stdout.write(self.style.SUCCESS(f'Created: {created_count} members'))
        self.stdout.write(self.style.SUCCESS(f'Updated: {updated_count} members'))
        self.stdout.write(self.style.SUCCESS('You can now view resource panel members in Django admin and the frontend.'))

