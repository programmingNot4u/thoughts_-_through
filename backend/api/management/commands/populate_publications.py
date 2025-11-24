from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from api.models import Publication, PublicationTag


class Command(BaseCommand):
    help = 'Populate Publications with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Populating Publications...')
        
        publications_data = [
            {
                'title': 'Mental Health Impact of Climate Change in Urban Areas',
                'description': 'A comprehensive study examining the psychological and mental health effects of climate change on urban populations, with focus on vulnerable communities and adaptation strategies. This research provides evidence-based insights into how environmental stressors affect mental well-being and offers recommendations for policy interventions.',
                'authors': ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Rodriguez'],
                'date': '2024-03-15',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 145,
                'language': 'English',
                'publisher': 'Thoughts & Thorough Research Center',
                'tags': ['Mental Health', 'Climate Change', 'Urban', 'Public Health', 'Adaptation'],
            },
            {
                'title': 'Social Inequality and Family Well-being: A Longitudinal Study',
                'description': 'Longitudinal research tracking the relationship between social inequality and family well-being across different socioeconomic groups over a five-year period. The study examines how economic disparities impact family dynamics, child development, and overall household stability.',
                'authors': ['Dr. Jennifer Lee', 'Dr. David Martinez'],
                'date': '2024-02-20',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Social',
                'pages': 98,
                'language': 'English',
                'tags': ['Social Inequality', 'Family', 'Longitudinal Study', 'Well-being', 'Socioeconomic'],
            },
            {
                'title': 'Environmental Health Assessment Report 2023',
                'description': 'Annual assessment of environmental health indicators, pollution levels, and their impact on public health in Bangladesh. This comprehensive report analyzes air quality, water contamination, and environmental degradation trends, providing actionable recommendations for policymakers.',
                'authors': ['Dr. Patricia Williams', 'Dr. James Wilson'],
                'date': '2024-01-10',
                'category': 'Annual Report',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 203,
                'language': 'English',
                'tags': ['Environmental Health', 'Assessment', 'Pollution', 'Public Health', 'Bangladesh'],
            },
            {
                'title': 'Data Analysis Methods in Public Health Research',
                'description': 'A methodological guide for researchers on advanced data analysis techniques and statistical methods used in public health research. This publication covers quantitative and qualitative approaches, survey design, and data interpretation best practices.',
                'authors': ['Dr. Robert Taylor', 'Dr. Lisa Anderson'],
                'date': '2023-12-05',
                'category': 'Methodology',
                'type': 'DOCX',
                'sector': 'Research',
                'pages': 67,
                'language': 'English',
                'tags': ['Data Analysis', 'Methodology', 'Statistics', 'Research Methods', 'Public Health'],
            },
            {
                'title': 'Climate Change Adaptation Strategies for Rural Communities',
                'description': 'Research report on effective adaptation strategies for rural communities facing climate change impacts, with case studies from Bangladesh. The study identifies successful community-led initiatives and provides a framework for replicating these approaches in similar contexts.',
                'authors': ['Dr. Thomas Brown', 'Dr. Maria Garcia'],
                'date': '2023-11-18',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 156,
                'language': 'English',
                'tags': ['Climate Adaptation', 'Rural', 'Community', 'Sustainability', 'Bangladesh'],
            },
            {
                'title': 'Mental Health Services Accessibility Study',
                'description': 'Comprehensive study on the accessibility and availability of mental health services in urban and rural areas, identifying barriers and recommendations. The research examines service gaps, infrastructure challenges, and proposes innovative solutions for improving mental healthcare delivery.',
                'authors': ['Dr. Emily Rodriguez', 'Dr. Sarah Johnson'],
                'date': '2023-10-22',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 112,
                'language': 'English',
                'tags': ['Mental Health', 'Accessibility', 'Healthcare Services', 'Urban', 'Rural'],
            },
            {
                'title': 'Universal Health Coverage: Policy Recommendations for Bangladesh',
                'description': 'Policy brief outlining key recommendations for achieving universal health coverage in Bangladesh, based on comprehensive research and analysis. The document provides actionable policy frameworks and implementation strategies for expanding healthcare access to all citizens.',
                'authors': ['Dr. Patricia Williams', 'Dr. Michael Chen'],
                'date': '2024-04-10',
                'category': 'Policy Brief',
                'type': 'PDF',
                'sector': 'Policy',
                'pages': 24,
                'language': 'English',
                'tags': ['Health Policy', 'Universal Health Coverage', 'Policy Recommendations', 'Bangladesh'],
            },
            {
                'title': 'Social Protection Systems in South Asia: A Comparative Analysis',
                'description': 'Comparative analysis of social protection systems across South Asian countries, identifying best practices and policy implications. The study examines social safety nets, welfare programs, and their effectiveness in reducing poverty and inequality.',
                'authors': ['Dr. Jennifer Lee', 'Dr. David Martinez'],
                'date': '2023-09-15',
                'category': 'Working Paper',
                'type': 'PDF',
                'sector': 'Social',
                'pages': 89,
                'language': 'English',
                'tags': ['Social Protection', 'Comparative Analysis', 'South Asia', 'Policy', 'Welfare'],
            },
            {
                'title': 'Community-Based Environmental Management: A Case Study',
                'description': 'Case study examining successful community-based environmental management initiatives and their replicability in other contexts. The research highlights grassroots approaches to environmental conservation and sustainable resource management.',
                'authors': ['Dr. James Wilson', 'Dr. Thomas Brown'],
                'date': '2023-08-20',
                'category': 'Case Study',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 45,
                'language': 'English',
                'tags': ['Environmental Management', 'Community-Based', 'Case Study', 'Conservation'],
            },
            {
                'title': 'Health Equity in Urban Slums: Evidence from Dhaka',
                'description': 'Peer-reviewed journal article examining health equity issues in urban slums, published in the Journal of Public Health Research. The study investigates disparities in healthcare access, health outcomes, and proposes interventions to address inequities.',
                'authors': ['Dr. Sarah Johnson', 'Dr. Emily Rodriguez', 'Dr. Michael Chen'],
                'date': '2024-05-01',
                'category': 'Journal Article',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 18,
                'language': 'English',
                'publisher': 'Journal of Public Health Research',
                'tags': ['Health Equity', 'Urban Slums', 'Journal Article', 'Public Health', 'Dhaka'],
            },
            {
                'title': 'Water Quality and Public Health: A Comprehensive Analysis',
                'description': 'In-depth analysis of water quality issues and their impact on public health in Bangladesh. The report examines contamination sources, health implications, and provides recommendations for water safety and treatment interventions.',
                'authors': ['Dr. Ahmed Rahman', 'Dr. Fatima Khan'],
                'date': '2024-06-12',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 134,
                'language': 'English',
                'tags': ['Water Quality', 'Public Health', 'Contamination', 'Bangladesh', 'Health Safety'],
            },
            {
                'title': 'Gender Inequality in Education: Policy Framework and Recommendations',
                'description': 'Policy brief addressing gender disparities in education access and outcomes. The document provides evidence-based recommendations for promoting gender equality in educational systems and improving learning outcomes for all students.',
                'authors': ['Dr. Ayesha Begum', 'Dr. Mohammad Ali'],
                'date': '2024-05-25',
                'category': 'Policy Brief',
                'type': 'PDF',
                'sector': 'Social',
                'pages': 32,
                'language': 'English',
                'tags': ['Gender Inequality', 'Education', 'Policy', 'Social Equity', 'Access'],
            },
            {
                'title': 'Air Pollution and Respiratory Health: Urban Case Studies',
                'description': 'Research examining the relationship between air pollution levels and respiratory health outcomes in major urban centers. The study provides epidemiological evidence and policy recommendations for air quality management.',
                'authors': ['Dr. Kamal Hossain', 'Dr. Nasreen Akter'],
                'date': '2024-04-18',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 167,
                'language': 'English',
                'tags': ['Air Pollution', 'Respiratory Health', 'Urban', 'Epidemiology', 'Public Health'],
            },
            {
                'title': 'Child Nutrition and Development: Longitudinal Findings',
                'description': 'Longitudinal study tracking child nutrition and development outcomes across different socioeconomic contexts. The research examines factors influencing child growth, cognitive development, and provides intervention strategies.',
                'authors': ['Dr. Rina Das', 'Dr. Hasan Mahmud'],
                'date': '2024-03-28',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 189,
                'language': 'English',
                'tags': ['Child Nutrition', 'Development', 'Longitudinal Study', 'Health', 'Children'],
            },
            {
                'title': 'Sustainable Agriculture Practices: Research and Implementation Guide',
                'description': 'Comprehensive guide on sustainable agriculture practices for smallholder farmers. The publication covers climate-resilient farming techniques, resource conservation, and economic viability of sustainable agricultural methods.',
                'authors': ['Dr. Farid Uddin', 'Dr. Sharmin Sultana'],
                'date': '2024-02-14',
                'category': 'Methodology',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 78,
                'language': 'English',
                'tags': ['Sustainable Agriculture', 'Farming', 'Climate Resilience', 'Methodology', 'Rural'],
            },
            {
                'title': 'Digital Health Solutions for Rural Healthcare Delivery',
                'description': 'Case study exploring the implementation and effectiveness of digital health solutions in rural healthcare settings. The research examines telemedicine, mobile health applications, and their impact on healthcare accessibility.',
                'authors': ['Dr. Tariq Islam', 'Dr. Nusrat Jahan'],
                'date': '2024-01-30',
                'category': 'Case Study',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 56,
                'language': 'English',
                'tags': ['Digital Health', 'Telemedicine', 'Rural Healthcare', 'Technology', 'Case Study'],
            },
            {
                'title': 'Social Cohesion and Community Resilience: A Working Paper',
                'description': 'Working paper examining the role of social cohesion in building community resilience to various shocks and stresses. The study analyzes social networks, community organizations, and their contribution to adaptive capacity.',
                'authors': ['Dr. Meherun Nesa', 'Dr. Abdullah Al Mamun'],
                'date': '2023-12-20',
                'category': 'Working Paper',
                'type': 'PDF',
                'sector': 'Social',
                'pages': 42,
                'language': 'English',
                'tags': ['Social Cohesion', 'Community Resilience', 'Social Networks', 'Working Paper'],
            },
            {
                'title': 'Climate Finance and Adaptation: Policy Analysis',
                'description': 'Policy analysis of climate finance mechanisms and their effectiveness in supporting adaptation initiatives. The report examines funding sources, allocation mechanisms, and provides recommendations for improving climate finance delivery.',
                'authors': ['Dr. Rezaul Karim', 'Dr. Tahmina Khatun'],
                'date': '2023-11-10',
                'category': 'Policy Brief',
                'type': 'PDF',
                'sector': 'Policy',
                'pages': 28,
                'language': 'English',
                'tags': ['Climate Finance', 'Adaptation', 'Policy', 'Funding', 'Climate Change'],
            },
            {
                'title': 'Elderly Care and Social Support Systems: Research Findings',
                'description': 'Research report on elderly care systems and social support mechanisms in Bangladesh. The study examines care arrangements, support networks, and identifies gaps in services for the aging population.',
                'authors': ['Dr. Salma Begum', 'Dr. Rafiqul Islam'],
                'date': '2023-10-05',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Social',
                'pages': 123,
                'language': 'English',
                'tags': ['Elderly Care', 'Social Support', 'Aging', 'Social Services', 'Research'],
            },
            {
                'title': 'Biodiversity Conservation in Protected Areas: Assessment Report',
                'description': 'Comprehensive assessment of biodiversity conservation efforts in protected areas. The report evaluates conservation strategies, species protection measures, and provides recommendations for enhancing biodiversity outcomes.',
                'authors': ['Dr. Anwar Hossain', 'Dr. Roksana Parvin'],
                'date': '2023-09-28',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 198,
                'language': 'English',
                'tags': ['Biodiversity', 'Conservation', 'Protected Areas', 'Environment', 'Wildlife'],
            },
            {
                'title': 'Maternal and Child Health Services: Access and Quality Assessment',
                'description': 'Comprehensive assessment of maternal and child health services, examining access barriers, service quality, and health outcomes. The study provides evidence-based recommendations for improving healthcare delivery for mothers and children.',
                'authors': ['Dr. Farzana Rahman', 'Dr. Mohammad Hasan'],
                'date': '2024-07-15',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 178,
                'language': 'English',
                'tags': ['Maternal Health', 'Child Health', 'Healthcare Access', 'Quality Assessment', 'Public Health'],
            },
            {
                'title': 'Renewable Energy Transition: Policy Framework for Bangladesh',
                'description': 'Policy brief outlining strategies for transitioning to renewable energy sources in Bangladesh. The document examines current energy infrastructure, renewable energy potential, and provides policy recommendations for sustainable energy development.',
                'authors': ['Dr. Khaled Ahmed', 'Dr. Nusrat Jahan'],
                'date': '2024-06-28',
                'category': 'Policy Brief',
                'type': 'PDF',
                'sector': 'Policy',
                'pages': 35,
                'language': 'English',
                'tags': ['Renewable Energy', 'Energy Policy', 'Sustainability', 'Climate Change', 'Policy'],
            },
            {
                'title': 'Youth Employment and Skills Development: Research Findings',
                'description': 'Research report examining youth employment trends, skills gaps, and training needs. The study analyzes labor market dynamics and provides recommendations for improving youth employability and career development opportunities.',
                'authors': ['Dr. Sharmin Akter', 'Dr. Rashedul Alam'],
                'date': '2024-05-20',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Social',
                'pages': 156,
                'language': 'English',
                'tags': ['Youth Employment', 'Skills Development', 'Labor Market', 'Education', 'Social'],
            },
            {
                'title': 'Disaster Risk Reduction and Climate Resilience: Methodology Guide',
                'description': 'Methodological guide for assessing disaster risks and building climate resilience in vulnerable communities. The publication provides frameworks, tools, and best practices for disaster risk reduction planning and implementation.',
                'authors': ['Dr. Monirul Islam', 'Dr. Sabina Yasmin'],
                'date': '2024-04-05',
                'category': 'Methodology',
                'type': 'DOCX',
                'sector': 'Environment',
                'pages': 92,
                'language': 'English',
                'tags': ['Disaster Risk', 'Climate Resilience', 'Methodology', 'Risk Assessment', 'Environment'],
            },
            {
                'title': 'Food Security and Nutrition: A Comprehensive Analysis',
                'description': 'Comprehensive analysis of food security and nutrition challenges in Bangladesh. The report examines food availability, access, utilization, and stability, providing evidence-based recommendations for improving food security outcomes.',
                'authors': ['Dr. Laila Begum', 'Dr. Ashraf Ali'],
                'date': '2024-03-22',
                'category': 'Research Report',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 201,
                'language': 'English',
                'tags': ['Food Security', 'Nutrition', 'Public Health', 'Agriculture', 'Health'],
            },
            {
                'title': 'Urban Planning and Sustainable Development: Case Studies',
                'description': 'Case study collection examining sustainable urban planning practices and their implementation. The research highlights successful urban development projects and provides lessons learned for future planning initiatives.',
                'authors': ['Dr. Tanvir Rahman', 'Dr. Nasima Akter'],
                'date': '2024-02-18',
                'category': 'Case Study',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 67,
                'language': 'English',
                'tags': ['Urban Planning', 'Sustainable Development', 'Case Study', 'Urbanization', 'Environment'],
            },
            {
                'title': 'Healthcare Financing Models: A Comparative Working Paper',
                'description': 'Working paper comparing different healthcare financing models and their effectiveness. The study examines public and private financing mechanisms, insurance schemes, and their impact on healthcare access and quality.',
                'authors': ['Dr. Mahmud Hasan', 'Dr. Rina Chowdhury'],
                'date': '2024-01-12',
                'category': 'Working Paper',
                'type': 'PDF',
                'sector': 'Policy',
                'pages': 54,
                'language': 'English',
                'tags': ['Healthcare Financing', 'Health Policy', 'Insurance', 'Working Paper', 'Policy'],
            },
            {
                'title': 'Waste Management and Circular Economy: Policy Recommendations',
                'description': 'Policy brief on waste management strategies and circular economy principles. The document provides recommendations for reducing waste generation, improving recycling systems, and promoting sustainable consumption patterns.',
                'authors': ['Dr. Faisal Karim', 'Dr. Tahmina Sultana'],
                'date': '2023-12-15',
                'category': 'Policy Brief',
                'type': 'PDF',
                'sector': 'Environment',
                'pages': 29,
                'language': 'English',
                'tags': ['Waste Management', 'Circular Economy', 'Sustainability', 'Policy', 'Environment'],
            },
            {
                'title': 'Social Media and Mental Health: Emerging Research Trends',
                'description': 'Journal article exploring the relationship between social media usage and mental health outcomes. The research examines both positive and negative impacts, providing insights for public health interventions and digital wellness strategies.',
                'authors': ['Dr. Emily Rodriguez', 'Dr. Sarah Johnson', 'Dr. Michael Chen'],
                'date': '2024-08-10',
                'category': 'Journal Article',
                'type': 'PDF',
                'sector': 'Health',
                'pages': 22,
                'language': 'English',
                'publisher': 'Journal of Digital Health and Well-being',
                'tags': ['Social Media', 'Mental Health', 'Digital Health', 'Journal Article', 'Public Health'],
            },
        ]

        created_count = 0
        updated_count = 0

        for pub_data in publications_data:
            tags = pub_data.pop('tags', [])
            date_str = pub_data.pop('date')
            
            # Check if publication already exists
            publication, created = Publication.objects.get_or_create(
                title=pub_data['title'],
                defaults={
                    **pub_data,
                    'date': datetime.strptime(date_str, '%Y-%m-%d').date(),
                }
            )
            
            if created:
                # Add tags
                for tag_name in tags:
                    PublicationTag.objects.create(
                        publication=publication,
                        name=tag_name
                    )
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {publication.title}'))
            else:
                # Update existing publication
                for key, value in pub_data.items():
                    if key != 'date':
                        setattr(publication, key, value)
                publication.date = datetime.strptime(date_str, '%Y-%m-%d').date()
                publication.save()
                
                # Update tags
                publication.tags.all().delete()
                for tag_name in tags:
                    PublicationTag.objects.create(
                        publication=publication,
                        name=tag_name
                    )
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Updated: {publication.title}'))

        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully populated Publications!'))
        self.stdout.write(self.style.SUCCESS(f'Created: {created_count} publications'))
        self.stdout.write(self.style.SUCCESS(f'Updated: {updated_count} publications'))
        self.stdout.write(self.style.SUCCESS('You can now view publications in Django admin and the frontend.'))

