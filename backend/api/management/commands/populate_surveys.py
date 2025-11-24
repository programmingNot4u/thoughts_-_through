from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from api.models import Survey, SurveyTag, SurveyObjective, SurveyExternalLink


class Command(BaseCommand):
    help = 'Populate Surveys with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Populating Surveys...')
        
        surveys_data = [
            {
                'title': 'Mental Health Awareness and Access Survey 2024',
                'date': '2024-09-15',
                'description': 'Comprehensive survey examining mental health awareness, access to services, and barriers to care in urban and rural communities across Bangladesh.',
                'status': 'Completed',
                'category': 'Health & Mental Health',
                'participants': 3250,
                'author': 'Dr. Sarah Johnson',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This comprehensive survey was conducted to assess mental health awareness, access to services, and identify barriers to mental healthcare in both urban and rural communities across Bangladesh.</p>
                    
                    <h3>Key Objectives</h3>
                    <ul>
                        <li>Assess current levels of mental health awareness in different communities</li>
                        <li>Identify barriers to accessing mental health services</li>
                        <li>Evaluate the availability and quality of mental health resources</li>
                        <li>Understand cultural and social factors affecting mental health service utilization</li>
                    </ul>
                ''',
                'methodology': '''
                    <h3>Research Methodology</h3>
                    <p>The survey employed a mixed-methods approach, combining quantitative questionnaires with qualitative interviews. Data collection was conducted over a six-month period across 15 districts in Bangladesh.</p>
                    
                    <h4>Sampling Strategy</h4>
                    <p>Multi-stage stratified random sampling was used to ensure representation from urban, semi-urban, and rural areas. A total of 3,250 participants aged 18-65 were included in the study.</p>
                    
                    <h4>Data Collection</h4>
                    <p>Data was collected through face-to-face interviews, online surveys, and telephone interviews to ensure broad participation across different demographic groups.</p>
                ''',
                'findings': '''
                    <h3>Key Findings</h3>
                    <ul>
                        <li><strong>Awareness Levels:</strong> 68% of participants demonstrated basic awareness of mental health issues, with higher awareness in urban areas (75%) compared to rural areas (58%).</li>
                        <li><strong>Service Access:</strong> Only 32% of participants who needed mental health services were able to access them, with significant barriers including cost, distance, and stigma.</li>
                        <li><strong>Barriers Identified:</strong> Major barriers include financial constraints (45%), lack of nearby services (38%), cultural stigma (52%), and lack of awareness about available services (41%).</li>
                        <li><strong>Recommendations:</strong> The survey recommends increased investment in community-based mental health services, public awareness campaigns, and training for primary healthcare providers.</li>
                    </ul>
                ''',
                'tags': ['Mental Health', 'Accessibility', 'Public Health', 'Survey', 'Bangladesh'],
                'objectives': [
                    'Assess mental health awareness levels across different communities',
                    'Identify barriers to accessing mental health services',
                    'Evaluate availability and quality of mental health resources',
                    'Understand cultural factors affecting service utilization'
                ],
                'external_links': [
                    {'title': 'Full Survey Report (PDF)', 'url': 'https://example.com/surveys/mental-health-2024'},
                    {'title': 'Executive Summary', 'url': 'https://example.com/surveys/mental-health-summary'},
                ],
            },
            {
                'title': 'Climate Change Impact on Rural Livelihoods Survey',
                'date': '2024-08-20',
                'description': 'Survey examining how climate change affects rural livelihoods, agricultural practices, and adaptation strategies in Bangladesh.',
                'status': 'Completed',
                'category': 'Climate & Environment',
                'participants': 2150,
                'author': 'Dr. Michael Chen',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This survey investigates the impacts of climate change on rural livelihoods, focusing on agricultural practices, income sources, and community adaptation strategies.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Structured interviews were conducted with 2,150 rural households across 10 districts, with focus on agricultural communities and fishing communities.</p>
                ''',
                'findings': '''
                    <h3>Key Findings</h3>
                    <ul>
                        <li>78% of households reported experiencing climate-related impacts on their livelihoods</li>
                        <li>Agricultural productivity decreased by an average of 23% due to climate variability</li>
                        <li>65% of communities have adopted some form of adaptation strategy</li>
                    </ul>
                ''',
                'tags': ['Climate Change', 'Rural Development', 'Agriculture', 'Livelihoods', 'Adaptation'],
                'objectives': [
                    'Assess climate change impacts on rural livelihoods',
                    'Document adaptation strategies and their effectiveness',
                    'Identify support needs for vulnerable communities'
                ],
                'external_links': [
                    {'title': 'Survey Report', 'url': 'https://example.com/surveys/climate-livelihoods'},
                ],
            },
            {
                'title': 'Gender Inequality in Education Access Survey',
                'date': '2024-10-05',
                'description': 'Comprehensive survey examining gender disparities in education access, enrollment rates, and factors influencing educational outcomes.',
                'status': 'Active',
                'category': 'Education & Gender',
                'participants': 1800,
                'author': 'Dr. Ayesha Begum',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This ongoing survey examines gender disparities in education access, focusing on enrollment rates, completion rates, and factors that influence educational outcomes for girls and boys.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Data collection is ongoing through household surveys and school-level assessments across 12 districts.</p>
                ''',
                'findings': '''
                    <h3>Preliminary Findings</h3>
                    <ul>
                        <li>Gender gap in enrollment widens at secondary and higher education levels</li>
                        <li>Economic factors are the primary barrier for girls' education</li>
                        <li>Cultural and social factors also play significant roles</li>
                    </ul>
                ''',
                'tags': ['Gender Equality', 'Education', 'Access', 'Social Equity'],
                'objectives': [
                    'Assess gender disparities in education access',
                    'Identify barriers to girls\' education',
                    'Document factors influencing educational outcomes'
                ],
                'external_links': [
                    {'title': 'Preliminary Report', 'url': 'https://example.com/surveys/gender-education'},
                ],
            },
            {
                'title': 'Digital Health Services Utilization Survey',
                'date': '2024-11-10',
                'description': 'Survey examining the adoption and utilization of digital health services, including telemedicine and mobile health applications.',
                'status': 'Active',
                'category': 'Health & Technology',
                'participants': 950,
                'author': 'Dr. Tariq Islam',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This survey investigates the adoption, utilization, and effectiveness of digital health services, including telemedicine platforms and mobile health applications.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Online and telephone surveys with 950 participants who have used or are aware of digital health services.</p>
                ''',
                'findings': '''
                    <h3>Preliminary Findings</h3>
                    <ul>
                        <li>45% of participants have used digital health services</li>
                        <li>User satisfaction rates are high (78%) among those who have used services</li>
                        <li>Main barriers include internet connectivity and digital literacy</li>
                    </ul>
                ''',
                'tags': ['Digital Health', 'Telemedicine', 'Technology', 'Healthcare Access'],
                'objectives': [
                    'Assess adoption rates of digital health services',
                    'Evaluate user satisfaction and effectiveness',
                    'Identify barriers to utilization'
                ],
                'external_links': [
                    {'title': 'Survey Dashboard', 'url': 'https://example.com/surveys/digital-health'},
                ],
            },
            {
                'title': 'Child Nutrition and Development Survey',
                'date': '2024-07-25',
                'description': 'Longitudinal survey tracking child nutrition, growth, and development outcomes in rural and urban settings.',
                'status': 'Completed',
                'category': 'Health & Nutrition',
                'participants': 4200,
                'author': 'Dr. Rina Das',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This longitudinal survey tracks child nutrition, growth, and development outcomes, examining factors that influence child health and development.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Longitudinal study following 4,200 children from birth through early childhood, with data collection at multiple time points.</p>
                ''',
                'findings': '''
                    <h3>Key Findings</h3>
                    <ul>
                        <li>Early nutritional interventions show significant positive impacts on child development</li>
                        <li>Maternal nutrition during pregnancy is strongly correlated with child outcomes</li>
                        <li>Community-based programs are most effective in improving nutrition outcomes</li>
                    </ul>
                ''',
                'tags': ['Child Nutrition', 'Development', 'Public Health', 'Longitudinal Study'],
                'objectives': [
                    'Track child nutrition and development outcomes',
                    'Identify factors influencing child health',
                    'Evaluate effectiveness of intervention programs'
                ],
                'external_links': [
                    {'title': 'Full Report', 'url': 'https://example.com/surveys/child-nutrition'},
                ],
            },
            {
                'title': 'Elderly Care and Social Support Survey',
                'date': '2024-06-15',
                'description': 'Survey examining elderly care arrangements, social support systems, and service needs for the aging population.',
                'status': 'Completed',
                'category': 'Social Services',
                'participants': 1850,
                'author': 'Dr. Salma Begum',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This survey examines how elderly care is arranged, the role of social support networks, and identifies gaps in services for the aging population.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Household surveys and interviews with 1,850 elderly individuals and their families across urban and rural areas.</p>
                ''',
                'findings': '''
                    <h3>Key Findings</h3>
                    <ul>
                        <li>Family remains the primary care provider for 85% of elderly</li>
                        <li>Significant gaps exist in formal care services</li>
                        <li>Social support networks play crucial role in elderly well-being</li>
                        <li>Economic factors limit access to quality care for many</li>
                    </ul>
                ''',
                'tags': ['Elderly Care', 'Social Support', 'Aging', 'Social Services'],
                'objectives': [
                    'Examine elderly care arrangements',
                    'Assess social support systems',
                    'Identify service gaps and needs'
                ],
                'external_links': [
                    {'title': 'Survey Report', 'url': 'https://example.com/surveys/elderly-care'},
                ],
            },
            {
                'title': 'Water Quality and Public Health Survey',
                'date': '2024-09-30',
                'description': 'Survey assessing water quality issues, contamination sources, and their impact on public health.',
                'status': 'Active',
                'category': 'Environment & Health',
                'participants': 1650,
                'author': 'Dr. Ahmed Rahman',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This survey assesses water quality across different regions, examining contamination sources and their impact on public health outcomes.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Water sampling and household surveys across multiple regions, with 1,650 participants.</p>
                ''',
                'findings': '''
                    <h3>Preliminary Findings</h3>
                    <ul>
                        <li>Significant contamination found in both urban and rural water sources</li>
                        <li>Heavy metal contamination poses serious health risks</li>
                        <li>Treatment interventions show varying levels of effectiveness</li>
                    </ul>
                ''',
                'tags': ['Water Quality', 'Public Health', 'Environment', 'Contamination'],
                'objectives': [
                    'Assess water quality across regions',
                    'Identify contamination sources',
                    'Evaluate health impacts'
                ],
                'external_links': [
                    {'title': 'Survey Dashboard', 'url': 'https://example.com/surveys/water-quality'},
                ],
            },
            {
                'title': 'Social Inequality and Family Well-being Survey',
                'date': '2024-12-01',
                'description': 'Upcoming survey to examine how social inequality affects family well-being and child development outcomes.',
                'status': 'Upcoming',
                'category': 'Social Inequality',
                'participants': 0,
                'author': 'Dr. Emily Rodriguez',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This upcoming survey will examine how social inequality affects family well-being, child development, and access to opportunities.</p>
                ''',
                'methodology': '''
                    <h3>Planned Methodology</h3>
                    <p>The survey will employ a longitudinal design, following families across different socioeconomic groups over a three-year period.</p>
                ''',
                'findings': None,
                'tags': ['Social Inequality', 'Family Well-being', 'Child Development', 'Socioeconomic'],
                'objectives': [
                    'Examine relationship between inequality and family well-being',
                    'Track child development outcomes across socioeconomic groups',
                    'Identify factors that mitigate inequality impacts'
                ],
                'external_links': [
                    {'title': 'Survey Information', 'url': 'https://example.com/surveys/social-inequality'},
                ],
            },
            {
                'title': 'Healthcare Quality and Patient Satisfaction Survey',
                'date': '2024-08-10',
                'description': 'Survey evaluating healthcare quality, patient satisfaction, and service delivery standards across healthcare facilities.',
                'status': 'Completed',
                'category': 'Healthcare Services',
                'participants': 2800,
                'author': 'Dr. Farzana Rahman',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This survey evaluates healthcare quality, patient satisfaction, and service delivery standards across different types of healthcare facilities.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Patient surveys and facility assessments across 50 healthcare facilities, with 2,800 patient responses.</p>
                ''',
                'findings': '''
                    <h3>Key Findings</h3>
                    <ul>
                        <li>Overall patient satisfaction rate is 72%</li>
                        <li>Wait times and service accessibility are major concerns</li>
                        <li>Quality of care varies significantly across facility types</li>
                    </ul>
                ''',
                'tags': ['Healthcare Quality', 'Patient Satisfaction', 'Service Delivery', 'Public Health'],
                'objectives': [
                    'Evaluate healthcare quality standards',
                    'Assess patient satisfaction levels',
                    'Identify areas for improvement'
                ],
                'external_links': [
                    {'title': 'Quality Report', 'url': 'https://example.com/surveys/healthcare-quality'},
                ],
            },
            {
                'title': 'Community Health Worker Program Evaluation Survey',
                'date': '2024-10-20',
                'description': 'Survey evaluating the effectiveness of community health worker programs in improving health outcomes and service access.',
                'status': 'Active',
                'category': 'Public Health',
                'participants': 1200,
                'author': 'Dr. Rina Chowdhury',
                'content': '''
                    <h2>Survey Overview</h2>
                    <p>This survey evaluates the effectiveness of community health worker programs in improving health outcomes and expanding access to healthcare services.</p>
                ''',
                'methodology': '''
                    <h3>Methodology</h3>
                    <p>Surveys with community members and health workers across 30 communities, with 1,200 participants.</p>
                ''',
                'findings': '''
                    <h3>Preliminary Findings</h3>
                    <ul>
                        <li>Community health workers significantly improve service access</li>
                        <li>Health outcomes show improvement in communities with active programs</li>
                        <li>Program effectiveness varies based on training and support levels</li>
                    </ul>
                ''',
                'tags': ['Community Health', 'Public Health', 'Service Delivery', 'Program Evaluation'],
                'objectives': [
                    'Evaluate program effectiveness',
                    'Assess impact on health outcomes',
                    'Identify best practices and improvement areas'
                ],
                'external_links': [
                    {'title': 'Evaluation Dashboard', 'url': 'https://example.com/surveys/community-health'},
                ],
            },
        ]

        created_count = 0
        updated_count = 0

        for survey_data in surveys_data:
            tags = survey_data.pop('tags', [])
            objectives = survey_data.pop('objectives', [])
            external_links = survey_data.pop('external_links', [])
            date_str = survey_data.pop('date')
            
            # Check if survey already exists
            survey, created = Survey.objects.get_or_create(
                title=survey_data['title'],
                defaults={
                    **survey_data,
                    'date': datetime.strptime(date_str, '%Y-%m-%d').date(),
                }
            )
            
            if created:
                # Add tags
                for tag_name in tags:
                    SurveyTag.objects.create(survey=survey, name=tag_name)
                
                # Add objectives
                for objective in objectives:
                    SurveyObjective.objects.create(survey=survey, objective=objective)
                
                # Add external links
                for link_data in external_links:
                    SurveyExternalLink.objects.create(survey=survey, **link_data)
                
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {survey.title}'))
            else:
                # Update existing survey
                for key, value in survey_data.items():
                    if key != 'date':
                        setattr(survey, key, value)
                survey.date = datetime.strptime(date_str, '%Y-%m-%d').date()
                survey.save()
                
                # Update tags
                survey.tags.all().delete()
                for tag_name in tags:
                    SurveyTag.objects.create(survey=survey, name=tag_name)
                
                # Update objectives
                survey.objectives.all().delete()
                for objective in objectives:
                    SurveyObjective.objects.create(survey=survey, objective=objective)
                
                # Update external links
                survey.external_links.all().delete()
                for link_data in external_links:
                    SurveyExternalLink.objects.create(survey=survey, **link_data)
                
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Updated: {survey.title}'))

        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully populated Surveys!'))
        self.stdout.write(self.style.SUCCESS(f'Created: {created_count} surveys'))
        self.stdout.write(self.style.SUCCESS(f'Updated: {updated_count} surveys'))
        self.stdout.write(self.style.SUCCESS('You can now view surveys in Django admin and the frontend.'))

