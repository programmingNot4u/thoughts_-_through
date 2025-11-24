from django.core.management.base import BaseCommand
from datetime import datetime
from api.models import ResearchArea, ResearchTag, ResearchExternalLink


class Command(BaseCommand):
    help = 'Populate Research Areas with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Populating Research Areas...')
        
        research_data = [
            {
                'area': 'health',
                'title': 'Mental Health Services Accessibility in Urban Communities',
                'date': '2024-08-20',
                'description': 'Comprehensive research examining the accessibility and availability of mental health services in urban areas, identifying barriers and proposing evidence-based solutions for improving service delivery.',
                'content': '''
                    <h2>Executive Summary</h2>
                    <p>This research study investigates the accessibility of mental health services in urban communities, with a focus on identifying systemic barriers and developing actionable recommendations for improvement.</p>
                    
                    <h3>Key Findings</h3>
                    <ul>
                        <li>Over 60% of urban residents face significant barriers to accessing mental health services</li>
                        <li>Geographic accessibility and transportation are major limiting factors</li>
                        <li>Cultural stigma remains a significant barrier in certain demographic groups</li>
                        <li>Cost and insurance coverage continue to prevent many from seeking treatment</li>
                    </ul>
                    
                    <h3>Methodology</h3>
                    <p>The study employed a mixed-methods approach, combining quantitative surveys with qualitative interviews. Over 2,000 participants across multiple urban centers were included in the research.</p>
                    
                    <h3>Recommendations</h3>
                    <p>Based on our findings, we recommend the implementation of community-based mental health centers, improved public transportation access, and culturally-sensitive service delivery models.</p>
                ''',
                'author': 'Dr. Sarah Johnson',
                'image_layout': 'single',
                'youtube_video_id': 'dQw4w9WgXcQ',
                'tags': ['Mental Health', 'Accessibility', 'Urban Health', 'Public Health', 'Healthcare Services'],
                'external_links': [
                    {'title': 'Full Research Report (PDF)', 'url': 'https://example.com/research/mental-health-accessibility'},
                    {'title': 'Policy Brief', 'url': 'https://example.com/policy/mental-health'},
                ],
            },
            {
                'area': 'health',
                'title': 'Maternal and Child Health Outcomes: A Longitudinal Study',
                'date': '2024-07-15',
                'description': 'Longitudinal research tracking maternal and child health outcomes across different socioeconomic groups, examining factors that influence health disparities and developing intervention strategies.',
                'content': '''
                    <h2>Research Overview</h2>
                    <p>This longitudinal study tracks maternal and child health outcomes over a five-year period, examining how socioeconomic factors, access to healthcare, and community support systems influence health outcomes.</p>
                    
                    <h3>Study Design</h3>
                    <p>The research follows 1,500 mother-child pairs from pregnancy through early childhood, collecting data at multiple time points to understand the trajectory of health outcomes.</p>
                    
                    <h3>Preliminary Findings</h3>
                    <ul>
                        <li>Significant disparities in health outcomes based on socioeconomic status</li>
                        <li>Early intervention programs show promising results</li>
                        <li>Community support systems play a crucial role in maternal and child health</li>
                    </ul>
                ''',
                'author': 'Dr. Farzana Rahman',
                'image_layout': 'gallery',
                'tags': ['Maternal Health', 'Child Health', 'Longitudinal Study', 'Health Outcomes', 'Public Health'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/maternal-child-health'},
                ],
            },
            {
                'area': 'health',
                'title': 'Digital Health Solutions for Rural Healthcare Delivery',
                'date': '2024-06-10',
                'description': 'Case study exploring the implementation and effectiveness of digital health solutions, including telemedicine and mobile health applications, in rural healthcare settings.',
                'content': '''
                    <h2>Introduction</h2>
                    <p>This case study examines how digital health technologies can bridge the gap in healthcare delivery between urban and rural areas, with a focus on telemedicine and mobile health applications.</p>
                    
                    <h3>Implementation Challenges</h3>
                    <p>The research identifies key challenges in implementing digital health solutions, including infrastructure limitations, digital literacy, and cultural acceptance of technology-based healthcare.</p>
                    
                    <h3>Success Factors</h3>
                    <ul>
                        <li>Community engagement and training programs</li>
                        <li>Reliable internet connectivity infrastructure</li>
                        <li>Integration with existing healthcare systems</li>
                        <li>Cultural sensitivity in service delivery</li>
                    </ul>
                ''',
                'author': 'Dr. Tariq Islam',
                'image_layout': 'distributed',
                'youtube_video_id': '9bZkp7q19f0',
                'tags': ['Digital Health', 'Telemedicine', 'Rural Healthcare', 'Technology', 'Healthcare Delivery'],
                'external_links': [
                    {'title': 'Case Study Report', 'url': 'https://example.com/research/digital-health-rural'},
                ],
            },
            {
                'area': 'climate',
                'title': 'Climate Change Adaptation Strategies for Rural Communities',
                'date': '2024-08-25',
                'description': 'Research examining effective adaptation strategies for rural communities facing climate change impacts, with case studies from Bangladesh and recommendations for policy implementation.',
                'content': '''
                    <h2>Research Context</h2>
                    <p>Climate change poses significant challenges to rural communities, particularly in developing countries. This research examines adaptation strategies that have proven effective in helping communities cope with changing climate conditions.</p>
                    
                    <h3>Case Study Locations</h3>
                    <p>The study includes detailed case studies from three rural regions in Bangladesh, each facing different climate challenges including flooding, drought, and extreme weather events.</p>
                    
                    <h3>Key Adaptation Strategies</h3>
                    <ul>
                        <li>Climate-resilient agricultural practices</li>
                        <li>Water management and conservation systems</li>
                        <li>Community-based early warning systems</li>
                        <li>Livelihood diversification programs</li>
                    </ul>
                    
                    <h3>Policy Recommendations</h3>
                    <p>Based on the research findings, we provide evidence-based recommendations for policymakers to support climate adaptation in rural communities.</p>
                ''',
                'author': 'Dr. Michael Chen',
                'image_layout': 'gallery',
                'tags': ['Climate Change', 'Adaptation', 'Rural Communities', 'Bangladesh', 'Sustainability'],
                'external_links': [
                    {'title': 'Full Research Report', 'url': 'https://example.com/research/climate-adaptation'},
                    {'title': 'Policy Recommendations', 'url': 'https://example.com/policy/climate-adaptation'},
                ],
            },
            {
                'area': 'climate',
                'title': 'Air Pollution and Respiratory Health in Urban Centers',
                'date': '2024-07-05',
                'description': 'Epidemiological study examining the relationship between air pollution levels and respiratory health outcomes in major urban centers, with focus on vulnerable populations.',
                'content': '''
                    <h2>Study Objectives</h2>
                    <p>This epidemiological study investigates how air pollution levels correlate with respiratory health outcomes, with particular attention to vulnerable populations including children, elderly, and individuals with pre-existing conditions.</p>
                    
                    <h3>Data Collection</h3>
                    <p>Air quality data was collected from multiple monitoring stations across three major urban centers over a two-year period, correlated with health outcome data from local hospitals and clinics.</p>
                    
                    <h3>Findings</h3>
                    <ul>
                        <li>Strong correlation between PM2.5 levels and respiratory illness rates</li>
                        <li>Children and elderly show highest vulnerability</li>
                        <li>Seasonal variations in pollution levels impact health outcomes</li>
                        <li>Urban planning and green spaces can mitigate health impacts</li>
                    </ul>
                ''',
                'author': 'Dr. Kamal Hossain',
                'image_layout': 'single',
                'tags': ['Air Pollution', 'Respiratory Health', 'Urban Health', 'Epidemiology', 'Public Health'],
                'external_links': [
                    {'title': 'Research Article', 'url': 'https://example.com/research/air-pollution-health'},
                ],
            },
            {
                'area': 'climate',
                'title': 'Water Quality Assessment and Public Health Implications',
                'date': '2024-06-20',
                'description': 'Comprehensive assessment of water quality issues and their impact on public health, examining contamination sources, health implications, and treatment interventions.',
                'content': '''
                    <h2>Assessment Overview</h2>
                    <p>This comprehensive assessment examines water quality across multiple regions, analyzing contamination sources, health implications, and effectiveness of treatment interventions.</p>
                    
                    <h3>Sampling Methodology</h3>
                    <p>Water samples were collected from various sources including municipal supplies, groundwater, and surface water bodies. Testing included analysis of chemical contaminants, biological pathogens, and heavy metals.</p>
                    
                    <h3>Key Findings</h3>
                    <ul>
                        <li>Significant contamination in both urban and rural water sources</li>
                        <li>Heavy metal contamination poses serious health risks</li>
                        <li>Treatment interventions show varying levels of effectiveness</li>
                        <li>Community-based water management can improve outcomes</li>
                    </ul>
                ''',
                'author': 'Dr. Ahmed Rahman',
                'image_layout': 'distributed',
                'tags': ['Water Quality', 'Public Health', 'Contamination', 'Health Safety', 'Environmental Health'],
                'external_links': [
                    {'title': 'Assessment Report', 'url': 'https://example.com/research/water-quality'},
                ],
            },
            {
                'area': 'social',
                'title': 'Social Inequality and Family Well-being: A Longitudinal Analysis',
                'date': '2024-08-10',
                'description': 'Longitudinal research tracking the relationship between social inequality and family well-being across different socioeconomic groups, examining how economic disparities affect family dynamics and child development.',
                'content': '''
                    <h2>Research Framework</h2>
                    <p>This longitudinal study examines how social inequality impacts family well-being, tracking families across different socioeconomic groups over a five-year period to understand the long-term effects of inequality.</p>
                    
                    <h3>Study Participants</h3>
                    <p>The research follows 800 families from diverse socioeconomic backgrounds, collecting data on income, education, health outcomes, and family dynamics at multiple time points.</p>
                    
                    <h3>Key Insights</h3>
                    <ul>
                        <li>Income inequality directly correlates with family stress levels</li>
                        <li>Educational opportunities significantly impact child development outcomes</li>
                        <li>Social support networks can mitigate some effects of inequality</li>
                        <li>Policy interventions show promise in reducing inequality impacts</li>
                    </ul>
                ''',
                'author': 'Dr. Emily Rodriguez',
                'image_layout': 'single',
                'tags': ['Social Inequality', 'Family Well-being', 'Longitudinal Study', 'Socioeconomic', 'Child Development'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/social-inequality-family'},
                ],
            },
            {
                'area': 'social',
                'title': 'Gender Inequality in Education: Access and Outcomes',
                'date': '2024-07-20',
                'description': 'Comprehensive analysis of gender disparities in education access and outcomes, examining barriers to education for girls and developing evidence-based recommendations for promoting gender equality.',
                'content': '''
                    <h2>Research Scope</h2>
                    <p>This comprehensive analysis examines gender disparities in education, focusing on enrollment rates, learning outcomes, and barriers to education access for girls across different regions.</p>
                    
                    <h3>Data Analysis</h3>
                    <p>The research analyzes enrollment data, academic performance metrics, and survey responses from students, parents, and educators to understand the factors contributing to gender disparities.</p>
                    
                    <h3>Key Findings</h3>
                    <ul>
                        <li>Significant gender gaps in enrollment at secondary and higher education levels</li>
                        <li>Cultural and social barriers remain major obstacles</li>
                        <li>Economic factors disproportionately affect girls' education</li>
                        <li>Targeted interventions can effectively reduce gender disparities</li>
                    </ul>
                ''',
                'author': 'Dr. Ayesha Begum',
                'image_layout': 'gallery',
                'tags': ['Gender Equality', 'Education', 'Access', 'Social Equity', 'Policy'],
                'external_links': [
                    {'title': 'Policy Brief', 'url': 'https://example.com/policy/gender-education'},
                    {'title': 'Full Report', 'url': 'https://example.com/research/gender-inequality-education'},
                ],
            },
            {
                'area': 'social',
                'title': 'Elderly Care and Social Support Systems',
                'date': '2024-06-15',
                'description': 'Research examining elderly care systems and social support mechanisms, analyzing care arrangements, support networks, and identifying gaps in services for the aging population.',
                'content': '''
                    <h2>Research Focus</h2>
                    <p>This research examines how elderly care systems function, the role of social support networks, and identifies gaps in services for the aging population in Bangladesh.</p>
                    
                    <h3>Methodology</h3>
                    <p>The study combines quantitative surveys with qualitative interviews, examining care arrangements, support networks, and service utilization patterns among elderly populations.</p>
                    
                    <h3>Findings</h3>
                    <ul>
                        <li>Family remains the primary care provider for most elderly</li>
                        <li>Significant gaps in formal care services</li>
                        <li>Social support networks play crucial role in well-being</li>
                        <li>Economic factors limit access to quality care</li>
                    </ul>
                ''',
                'author': 'Dr. Salma Begum',
                'image_layout': 'distributed',
                'tags': ['Elderly Care', 'Social Support', 'Aging', 'Social Services', 'Community Care'],
                'external_links': [
                    {'title': 'Research Report', 'url': 'https://example.com/research/elderly-care'},
                ],
            },
            {
                'area': 'health',
                'title': 'Child Nutrition and Development: Longitudinal Findings',
                'date': '2024-05-25',
                'description': 'Longitudinal study tracking child nutrition and development outcomes, examining factors influencing child growth, cognitive development, and providing intervention strategies.',
                'content': '''
                    <h2>Study Design</h2>
                    <p>This longitudinal study tracks child nutrition and development from infancy through early childhood, examining how nutritional interventions and environmental factors influence growth and cognitive development.</p>
                    
                    <h3>Intervention Programs</h3>
                    <p>The research includes evaluation of various nutritional intervention programs, assessing their effectiveness in improving child health outcomes.</p>
                    
                    <h3>Key Outcomes</h3>
                    <ul>
                        <li>Early nutritional interventions show significant positive impacts</li>
                        <li>Maternal nutrition during pregnancy affects child development</li>
                        <li>Community-based programs are most effective</li>
                        <li>Socioeconomic factors remain significant predictors</li>
                    </ul>
                ''',
                'author': 'Dr. Rina Das',
                'image_layout': 'single',
                'tags': ['Child Nutrition', 'Development', 'Longitudinal Study', 'Public Health', 'Interventions'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/child-nutrition'},
                ],
            },
            {
                'area': 'health',
                'title': 'Universal Health Coverage: Implementation Challenges and Solutions',
                'date': '2024-09-10',
                'description': 'Comprehensive analysis of universal health coverage implementation challenges in Bangladesh, examining barriers to access and developing evidence-based solutions for achieving healthcare equity.',
                'content': '''
                    <h2>Research Overview</h2>
                    <p>This study examines the challenges and opportunities in implementing universal health coverage in Bangladesh, with focus on financing mechanisms, service delivery, and equity considerations.</p>
                    
                    <h3>Key Challenges</h3>
                    <ul>
                        <li>Financing constraints and resource allocation</li>
                        <li>Healthcare workforce shortages</li>
                        <li>Infrastructure limitations in rural areas</li>
                        <li>Quality assurance and service standardization</li>
                    </ul>
                ''',
                'author': 'Dr. Patricia Williams',
                'image_layout': 'gallery',
                'tags': ['Universal Health Coverage', 'Health Policy', 'Healthcare Access', 'Public Health', 'Health Equity'],
                'external_links': [
                    {'title': 'Policy Analysis Report', 'url': 'https://example.com/research/uhc-implementation'},
                ],
            },
            {
                'area': 'health',
                'title': 'Adolescent Mental Health: Risk Factors and Protective Mechanisms',
                'date': '2024-09-05',
                'description': 'Research investigating risk factors and protective mechanisms in adolescent mental health, examining how family, school, and community factors influence mental well-being in young people.',
                'content': '''
                    <h2>Study Focus</h2>
                    <p>This research explores the complex factors influencing adolescent mental health, identifying both risk factors and protective mechanisms that can inform intervention strategies.</p>
                    
                    <h3>Key Findings</h3>
                    <ul>
                        <li>Family support is a critical protective factor</li>
                        <li>School environment significantly impacts mental health</li>
                        <li>Peer relationships play important role</li>
                        <li>Early intervention can prevent long-term issues</li>
                    </ul>
                ''',
                'author': 'Dr. Emily Rodriguez',
                'image_layout': 'distributed',
                'youtube_video_id': 'jNQXAC9IVRw',
                'tags': ['Adolescent Health', 'Mental Health', 'Youth', 'Risk Factors', 'Protective Factors'],
                'external_links': [
                    {'title': 'Research Report', 'url': 'https://example.com/research/adolescent-mental-health'},
                ],
            },
            {
                'area': 'health',
                'title': 'Infectious Disease Prevention and Control Strategies',
                'date': '2024-08-30',
                'description': 'Comprehensive study on infectious disease prevention and control strategies, examining vaccination programs, public health interventions, and community-based approaches to disease management.',
                'content': '''
                    <h2>Research Objectives</h2>
                    <p>This study evaluates the effectiveness of various infectious disease prevention and control strategies, with focus on vaccination programs, public health campaigns, and community engagement.</p>
                    
                    <h3>Key Strategies Evaluated</h3>
                    <ul>
                        <li>Vaccination coverage and effectiveness</li>
                        <li>Public health education campaigns</li>
                        <li>Community-based prevention programs</li>
                        <li>Healthcare system preparedness</li>
                    </ul>
                ''',
                'author': 'Dr. Mohammad Hasan',
                'image_layout': 'single',
                'tags': ['Infectious Diseases', 'Prevention', 'Public Health', 'Vaccination', 'Disease Control'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/infectious-disease-prevention'},
                ],
            },
            {
                'area': 'health',
                'title': 'Healthcare Quality Assessment and Improvement Framework',
                'date': '2024-08-25',
                'description': 'Development and validation of a comprehensive framework for assessing and improving healthcare quality, with focus on patient safety, clinical outcomes, and service delivery standards.',
                'content': '''
                    <h2>Framework Development</h2>
                    <p>This research develops a comprehensive framework for assessing healthcare quality, incorporating multiple dimensions including patient safety, clinical effectiveness, and patient experience.</p>
                    
                    <h3>Framework Components</h3>
                    <ul>
                        <li>Patient safety indicators</li>
                        <li>Clinical outcome measures</li>
                        <li>Service delivery standards</li>
                        <li>Patient satisfaction metrics</li>
                    </ul>
                ''',
                'author': 'Dr. Farzana Rahman',
                'image_layout': 'gallery',
                'tags': ['Healthcare Quality', 'Patient Safety', 'Quality Improvement', 'Healthcare Services', 'Assessment'],
                'external_links': [
                    {'title': 'Framework Document', 'url': 'https://example.com/research/healthcare-quality-framework'},
                ],
            },
            {
                'area': 'health',
                'title': 'Non-Communicable Disease Prevention: Lifestyle Interventions',
                'date': '2024-08-15',
                'description': 'Research examining the effectiveness of lifestyle interventions in preventing non-communicable diseases, including diabetes, cardiovascular diseases, and hypertension.',
                'content': '''
                    <h2>Intervention Study</h2>
                    <p>This research evaluates the effectiveness of lifestyle interventions, including diet modification, physical activity programs, and behavioral change strategies in preventing non-communicable diseases.</p>
                    
                    <h3>Intervention Components</h3>
                    <ul>
                        <li>Dietary modification programs</li>
                        <li>Physical activity interventions</li>
                        <li>Behavioral counseling</li>
                        <li>Community support groups</li>
                    </ul>
                ''',
                'author': 'Dr. Lisa Anderson',
                'image_layout': 'distributed',
                'tags': ['Non-Communicable Diseases', 'Prevention', 'Lifestyle', 'Diabetes', 'Cardiovascular Health'],
                'external_links': [
                    {'title': 'Research Report', 'url': 'https://example.com/research/ncd-prevention'},
                ],
            },
            {
                'area': 'health',
                'title': 'Reproductive Health Services: Access and Utilization Patterns',
                'date': '2024-08-05',
                'description': 'Comprehensive analysis of reproductive health services access and utilization patterns, examining barriers to care and factors influencing service utilization among different population groups.',
                'content': '''
                    <h2>Research Scope</h2>
                    <p>This study examines access to and utilization of reproductive health services, identifying barriers and factors that influence service use across different demographic groups.</p>
                    
                    <h3>Key Barriers Identified</h3>
                    <ul>
                        <li>Geographic accessibility challenges</li>
                        <li>Cultural and social barriers</li>
                        <li>Cost and affordability issues</li>
                        <li>Quality and availability of services</li>
                    </ul>
                ''',
                'author': 'Dr. Nasreen Akter',
                'image_layout': 'single',
                'tags': ['Reproductive Health', 'Access', 'Women Health', 'Public Health', 'Healthcare Services'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/reproductive-health-access'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Information Systems: Digital Transformation in Healthcare',
                'date': '2024-07-30',
                'description': 'Study examining the implementation and impact of health information systems and digital transformation initiatives in healthcare delivery, focusing on electronic health records and data management.',
                'content': '''
                    <h2>Digital Transformation</h2>
                    <p>This research examines how health information systems and digital technologies are transforming healthcare delivery, improving efficiency, and enhancing patient care.</p>
                    
                    <h3>Key Technologies</h3>
                    <ul>
                        <li>Electronic health records systems</li>
                        <li>Telemedicine platforms</li>
                        <li>Health data analytics</li>
                        <li>Mobile health applications</li>
                    </ul>
                ''',
                'author': 'Dr. Tariq Islam',
                'image_layout': 'gallery',
                'youtube_video_id': 'kJQP7kiw5Fk',
                'tags': ['Health Information Systems', 'Digital Health', 'Technology', 'Healthcare IT', 'EHR'],
                'external_links': [
                    {'title': 'Research Report', 'url': 'https://example.com/research/health-information-systems'},
                ],
            },
            {
                'area': 'health',
                'title': 'Substance Abuse Prevention and Treatment Programs',
                'date': '2024-07-25',
                'description': 'Evaluation of substance abuse prevention and treatment programs, examining program effectiveness, treatment outcomes, and factors influencing recovery success rates.',
                'content': '''
                    <h2>Program Evaluation</h2>
                    <p>This research evaluates various substance abuse prevention and treatment programs, assessing their effectiveness and identifying best practices for program implementation.</p>
                    
                    <h3>Program Types Evaluated</h3>
                    <ul>
                        <li>School-based prevention programs</li>
                        <li>Community-based treatment centers</li>
                        <li>Rehabilitation and recovery programs</li>
                        <li>Support group interventions</li>
                    </ul>
                ''',
                'author': 'Dr. Robert Taylor',
                'image_layout': 'distributed',
                'tags': ['Substance Abuse', 'Prevention', 'Treatment', 'Mental Health', 'Public Health'],
                'external_links': [
                    {'title': 'Evaluation Report', 'url': 'https://example.com/research/substance-abuse-programs'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Workforce Development and Capacity Building',
                'date': '2024-07-20',
                'description': 'Research on health workforce development strategies and capacity building initiatives, examining training programs, skill development, and retention strategies for healthcare professionals.',
                'content': '''
                    <h2>Workforce Development</h2>
                    <p>This study examines strategies for developing and strengthening the health workforce, focusing on training, skill development, and retention of healthcare professionals.</p>
                    
                    <h3>Key Areas</h3>
                    <ul>
                        <li>Professional training and education</li>
                        <li>Skill development programs</li>
                        <li>Retention strategies</li>
                        <li>Continuing education initiatives</li>
                    </ul>
                ''',
                'author': 'Dr. Hasan Mahmud',
                'image_layout': 'single',
                'tags': ['Health Workforce', 'Capacity Building', 'Training', 'Healthcare Professionals', 'Development'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/health-workforce-development'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Economics and Healthcare Financing Models',
                'date': '2024-07-10',
                'description': 'Analysis of health economics and healthcare financing models, examining cost-effectiveness of interventions, resource allocation strategies, and sustainable financing mechanisms.',
                'content': '''
                    <h2>Economic Analysis</h2>
                    <p>This research analyzes healthcare financing models and economic aspects of health service delivery, examining cost-effectiveness and resource allocation strategies.</p>
                    
                    <h3>Analysis Areas</h3>
                    <ul>
                        <li>Cost-effectiveness of interventions</li>
                        <li>Healthcare financing mechanisms</li>
                        <li>Resource allocation strategies</li>
                        <li>Economic impact of health programs</li>
                    </ul>
                ''',
                'author': 'Dr. Mahmud Hasan',
                'image_layout': 'gallery',
                'tags': ['Health Economics', 'Healthcare Financing', 'Cost-Effectiveness', 'Resource Allocation', 'Economics'],
                'external_links': [
                    {'title': 'Economic Analysis Report', 'url': 'https://example.com/research/health-economics'},
                ],
            },
            {
                'area': 'health',
                'title': 'Community Health Worker Programs: Effectiveness and Impact',
                'date': '2024-07-05',
                'description': 'Evaluation of community health worker programs, examining their effectiveness in improving health outcomes, service delivery, and community engagement in healthcare.',
                'content': '''
                    <h2>Program Evaluation</h2>
                    <p>This research evaluates the effectiveness of community health worker programs in improving health outcomes and expanding access to healthcare services in underserved communities.</p>
                    
                    <h3>Evaluation Metrics</h3>
                    <ul>
                        <li>Health outcome improvements</li>
                        <li>Service utilization rates</li>
                        <li>Community engagement levels</li>
                        <li>Cost-effectiveness of programs</li>
                    </ul>
                ''',
                'author': 'Dr. Rina Chowdhury',
                'image_layout': 'distributed',
                'tags': ['Community Health Workers', 'Primary Healthcare', 'Community Health', 'Public Health', 'Service Delivery'],
                'external_links': [
                    {'title': 'Evaluation Report', 'url': 'https://example.com/research/community-health-workers'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Promotion and Disease Prevention Campaigns',
                'date': '2024-06-30',
                'description': 'Analysis of health promotion and disease prevention campaigns, examining campaign effectiveness, message delivery strategies, and behavior change outcomes.',
                'content': '''
                    <h2>Campaign Analysis</h2>
                    <p>This research analyzes health promotion and disease prevention campaigns, evaluating their effectiveness in changing health behaviors and improving health outcomes.</p>
                    
                    <h3>Campaign Components</h3>
                    <ul>
                        <li>Message development and delivery</li>
                        <li>Media and communication strategies</li>
                        <li>Community engagement approaches</li>
                        <li>Behavior change outcomes</li>
                    </ul>
                ''',
                'author': 'Dr. Nusrat Jahan',
                'image_layout': 'single',
                'youtube_video_id': 'L_jWHffIx5E',
                'tags': ['Health Promotion', 'Disease Prevention', 'Public Health Campaigns', 'Behavior Change', 'Communication'],
                'external_links': [
                    {'title': 'Campaign Analysis Report', 'url': 'https://example.com/research/health-promotion-campaigns'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Disparities: Socioeconomic and Geographic Factors',
                'date': '2024-06-25',
                'description': 'Comprehensive analysis of health disparities based on socioeconomic and geographic factors, examining how income, education, and location influence health outcomes and access to care.',
                'content': '''
                    <h2>Disparity Analysis</h2>
                    <p>This research examines health disparities across different socioeconomic and geographic groups, identifying factors that contribute to unequal health outcomes and access to care.</p>
                    
                    <h3>Key Factors Examined</h3>
                    <ul>
                        <li>Socioeconomic status and health outcomes</li>
                        <li>Geographic disparities in healthcare access</li>
                        <li>Education and health literacy impacts</li>
                        <li>Intersectionality of multiple factors</li>
                    </ul>
                ''',
                'author': 'Dr. Tahmina Khatun',
                'image_layout': 'gallery',
                'tags': ['Health Disparities', 'Socioeconomic', 'Health Equity', 'Public Health', 'Social Determinants'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/health-disparities'},
                ],
            },
            {
                'area': 'health',
                'title': 'Emergency Healthcare Services: Response Time and Outcomes',
                'date': '2024-06-20',
                'description': 'Study examining emergency healthcare services, analyzing response times, service quality, and patient outcomes in emergency situations across different settings.',
                'content': '''
                    <h2>Emergency Services Analysis</h2>
                    <p>This research examines emergency healthcare services, analyzing response times, service quality, and factors influencing patient outcomes in emergency situations.</p>
                    
                    <h3>Key Metrics</h3>
                    <ul>
                        <li>Response time analysis</li>
                        <li>Service quality indicators</li>
                        <li>Patient outcome measures</li>
                        <li>System efficiency evaluation</li>
                    </ul>
                ''',
                'author': 'Dr. Rafiqul Islam',
                'image_layout': 'distributed',
                'tags': ['Emergency Healthcare', 'Response Time', 'Emergency Services', 'Healthcare Quality', 'Patient Outcomes'],
                'external_links': [
                    {'title': 'Research Report', 'url': 'https://example.com/research/emergency-healthcare'},
                ],
            },
            {
                'area': 'health',
                'title': 'Chronic Disease Management: Integrated Care Models',
                'date': '2024-06-15',
                'description': 'Research on integrated care models for chronic disease management, examining coordinated care approaches, patient self-management, and healthcare system integration.',
                'content': '''
                    <h2>Integrated Care Models</h2>
                    <p>This research examines integrated care models for managing chronic diseases, focusing on coordinated care approaches and patient-centered management strategies.</p>
                    
                    <h3>Model Components</h3>
                    <ul>
                        <li>Care coordination mechanisms</li>
                        <li>Patient self-management support</li>
                        <li>Healthcare system integration</li>
                        <li>Outcome measurement and evaluation</li>
                    </ul>
                ''',
                'author': 'Dr. Sharmin Sultana',
                'image_layout': 'single',
                'tags': ['Chronic Disease', 'Care Management', 'Integrated Care', 'Healthcare Models', 'Patient Care'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/chronic-disease-management'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Literacy and Patient Empowerment',
                'date': '2024-06-10',
                'description': 'Study on health literacy and patient empowerment, examining how health knowledge and understanding influence health behaviors, treatment adherence, and health outcomes.',
                'content': '''
                    <h2>Health Literacy Research</h2>
                    <p>This research examines the role of health literacy in patient empowerment, exploring how health knowledge influences behaviors, treatment adherence, and health outcomes.</p>
                    
                    <h3>Key Areas</h3>
                    <ul>
                        <li>Health literacy assessment</li>
                        <li>Patient education strategies</li>
                        <li>Empowerment interventions</li>
                        <li>Outcome improvements</li>
                    </ul>
                ''',
                'author': 'Dr. Meherun Nesa',
                'image_layout': 'gallery',
                'tags': ['Health Literacy', 'Patient Empowerment', 'Health Education', 'Patient Care', 'Public Health'],
                'external_links': [
                    {'title': 'Research Report', 'url': 'https://example.com/research/health-literacy'},
                ],
            },
            {
                'area': 'health',
                'title': 'Occupational Health and Safety: Workplace Interventions',
                'date': '2024-06-05',
                'description': 'Research on occupational health and safety interventions, examining workplace safety programs, hazard prevention strategies, and worker health protection measures.',
                'content': '''
                    <h2>Workplace Health Research</h2>
                    <p>This research examines occupational health and safety interventions, evaluating workplace safety programs and their effectiveness in protecting worker health.</p>
                    
                    <h3>Intervention Types</h3>
                    <ul>
                        <li>Workplace safety programs</li>
                        <li>Hazard identification and prevention</li>
                        <li>Worker training and education</li>
                        <li>Health monitoring programs</li>
                    </ul>
                ''',
                'author': 'Dr. Abdullah Al Mamun',
                'image_layout': 'distributed',
                'tags': ['Occupational Health', 'Workplace Safety', 'Worker Health', 'Public Health', 'Safety Programs'],
                'external_links': [
                    {'title': 'Research Publication', 'url': 'https://example.com/research/occupational-health'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Data Analytics and Evidence-Based Decision Making',
                'date': '2024-05-30',
                'description': 'Research on health data analytics and its role in evidence-based decision making, examining data collection methods, analysis techniques, and application in healthcare policy and practice.',
                'content': '''
                    <h2>Data Analytics in Health</h2>
                    <p>This research explores how health data analytics can support evidence-based decision making in healthcare policy and practice, examining data collection, analysis, and application methods.</p>
                    
                    <h3>Analytics Applications</h3>
                    <ul>
                        <li>Health surveillance and monitoring</li>
                        <li>Predictive analytics for disease prevention</li>
                        <li>Resource allocation optimization</li>
                        <li>Policy decision support systems</li>
                    </ul>
                ''',
                'author': 'Dr. Rezaul Karim',
                'image_layout': 'single',
                'tags': ['Health Data', 'Analytics', 'Evidence-Based', 'Decision Making', 'Health Informatics'],
                'external_links': [
                    {'title': 'Research Report', 'url': 'https://example.com/research/health-data-analytics'},
                ],
            },
            {
                'area': 'health',
                'title': 'Social Health and Community Well-being Programs',
                'date': '2024-05-20',
                'description': 'Evaluation of social health and community well-being programs, examining how community-based interventions improve social connections, mental health, and overall community health outcomes.',
                'content': '''
                    <h2>Community Well-being</h2>
                    <p>This research evaluates programs aimed at improving social health and community well-being, examining how community-based interventions enhance social connections and health outcomes.</p>
                    
                    <h3>Program Types</h3>
                    <ul>
                        <li>Community engagement programs</li>
                        <li>Social support networks</li>
                        <li>Wellness initiatives</li>
                        <li>Community health promotion</li>
                    </ul>
                ''',
                'author': 'Dr. Emily Rodriguez',
                'image_layout': 'gallery',
                'tags': ['Social Health', 'Community Well-being', 'Community Health', 'Social Support', 'Public Health'],
                'external_links': [
                    {'title': 'Evaluation Report', 'url': 'https://example.com/research/social-health-community'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Policy Implementation: Barriers and Facilitators',
                'date': '2024-05-15',
                'description': 'Analysis of health policy implementation processes, examining barriers and facilitators to successful policy execution, and identifying strategies for effective policy implementation.',
                'content': '''
                    <h2>Policy Implementation</h2>
                    <p>This research analyzes health policy implementation processes, identifying barriers and facilitators that influence the success of health policy execution.</p>
                    
                    <h3>Key Factors</h3>
                    <ul>
                        <li>Organizational capacity and resources</li>
                        <li>Stakeholder engagement and support</li>
                        <li>Implementation strategies and approaches</li>
                        <li>Monitoring and evaluation mechanisms</li>
                    </ul>
                ''',
                'author': 'Dr. Patricia Williams',
                'image_layout': 'distributed',
                'tags': ['Health Policy', 'Policy Implementation', 'Public Health', 'Policy Analysis', 'Healthcare Policy'],
                'external_links': [
                    {'title': 'Policy Analysis Report', 'url': 'https://example.com/research/health-policy-implementation'},
                ],
            },
            {
                'area': 'health',
                'title': 'Health Research Ethics and Community Engagement',
                'date': '2024-05-10',
                'description': 'Study on health research ethics and community engagement practices, examining ethical considerations in health research and best practices for meaningful community participation.',
                'content': '''
                    <h2>Research Ethics</h2>
                    <p>This research examines ethical considerations in health research and explores best practices for engaging communities in research processes while maintaining ethical standards.</p>
                    
                    <h3>Ethical Considerations</h3>
                    <ul>
                        <li>Informed consent processes</li>
                        <li>Community participation and engagement</li>
                        <li>Data privacy and confidentiality</li>
                        <li>Benefit sharing and reciprocity</li>
                    </ul>
                ''',
                'author': 'Dr. Sarah Johnson',
                'image_layout': 'single',
                'tags': ['Research Ethics', 'Community Engagement', 'Health Research', 'Ethics', 'Community Participation'],
                'external_links': [
                    {'title': 'Ethics Guidelines', 'url': 'https://example.com/research/health-research-ethics'},
                ],
            },
        ]

        created_count = 0
        updated_count = 0

        for research_item_data in research_data:
            tags = research_item_data.pop('tags', [])
            external_links = research_item_data.pop('external_links', [])
            date_str = research_item_data.pop('date')
            
            # Check if research area already exists
            research, created = ResearchArea.objects.get_or_create(
                title=research_item_data['title'],
                defaults={
                    **research_item_data,
                    'date': datetime.strptime(date_str, '%Y-%m-%d').date(),
                }
            )
            
            if created:
                # Add tags
                for tag_name in tags:
                    ResearchTag.objects.create(research=research, name=tag_name)
                
                # Add external links
                for link_data in external_links:
                    ResearchExternalLink.objects.create(research=research, **link_data)
                
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {research.title}'))
            else:
                # Update existing research
                for key, value in research_item_data.items():
                    if key != 'date':
                        setattr(research, key, value)
                research.date = datetime.strptime(date_str, '%Y-%m-%d').date()
                research.save()
                
                # Update tags
                research.tags.all().delete()
                for tag_name in tags:
                    ResearchTag.objects.create(research=research, name=tag_name)
                
                # Update external links
                research.external_links.all().delete()
                for link_data in external_links:
                    ResearchExternalLink.objects.create(research=research, **link_data)
                
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Updated: {research.title}'))

        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully populated Research Areas!'))
        self.stdout.write(self.style.SUCCESS(f'Created: {created_count} research items'))
        self.stdout.write(self.style.SUCCESS(f'Updated: {updated_count} research items'))
        self.stdout.write(self.style.SUCCESS('You can now view research areas in Django admin and the frontend.'))

