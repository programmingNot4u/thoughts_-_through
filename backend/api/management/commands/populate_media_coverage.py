from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from api.models import MediaCoverage, MediaTag, MediaExternalLink


class Command(BaseCommand):
    help = 'Populate Media Coverage with sample data'

    def handle(self, *args, **options):
        self.stdout.write('Populating Media Coverage...')
        
        media_data = [
            {
                'title': 'Thoughts & Thorough Research Center Launches New Climate Change Study',
                'date': '2024-08-15',
                'type': 'News',
                'description': 'Thoughts & Thorough Research Center announces the launch of a comprehensive climate change adaptation study focusing on rural communities in Bangladesh. The research aims to identify effective strategies for communities to adapt to changing climate conditions.',
                'content': 'The study, led by Dr. Michael Chen, will examine how rural communities in Bangladesh are adapting to climate change impacts. The research team will work closely with local communities to understand their adaptation strategies and develop evidence-based recommendations for policymakers.',
                'author': 'Sarah Ahmed',
                'publication': 'The Daily Star',
                'tags': ['Climate Change', 'Research', 'Bangladesh', 'Rural Communities', 'Adaptation'],
                'external_links': [
                    {'title': 'Read Full Article', 'url': 'https://example.com/article/climate-study-2024'},
                ],
            },
            {
                'title': 'Interview with Dr. Sarah Johnson on Mental Health Services',
                'date': '2024-08-10',
                'type': 'Interview',
                'description': 'Dr. Sarah Johnson discusses the accessibility of mental health services in Bangladesh and the challenges faced by rural communities in accessing quality mental healthcare.',
                'content': 'In this exclusive interview, Dr. Sarah Johnson shares insights from her recent research on mental health services accessibility. She highlights the need for innovative solutions to bridge the gap between urban and rural healthcare services.',
                'author': 'Rashid Hasan',
                'publication': 'Bangladesh Health Journal',
                'youtube_video_id': 'dQw4w9WgXcQ',  # Placeholder video ID
                'tags': ['Mental Health', 'Interview', 'Healthcare', 'Accessibility', 'Public Health'],
                'external_links': [
                    {'title': 'Watch on YouTube', 'url': 'https://youtube.com/watch?v=dQw4w9WgXcQ'},
                    {'title': 'Read Transcript', 'url': 'https://example.com/interview/transcript'},
                ],
            },
            {
                'title': 'New Research Report on Water Quality Published',
                'date': '2024-08-05',
                'type': 'Article',
                'description': 'Thoughts & Thorough Research Center publishes comprehensive analysis of water quality issues and their impact on public health in Bangladesh.',
                'content': 'The report, authored by Dr. Ahmed Rahman, provides detailed analysis of water contamination sources, health implications, and recommendations for water safety interventions. The study examined water quality in both urban and rural settings across multiple regions.',
                'author': 'Fatima Khan',
                'publication': 'Environmental Research Today',
                'tags': ['Water Quality', 'Public Health', 'Research', 'Environmental Health', 'Bangladesh'],
                'external_links': [
                    {'title': 'Download Report', 'url': 'https://example.com/reports/water-quality-2024'},
                ],
            },
            {
                'title': 'Annual Research Conference 2024',
                'date': '2024-07-28',
                'type': 'Event',
                'description': 'Thoughts & Thorough Research Center hosts its annual research conference, bringing together researchers, policymakers, and stakeholders to discuss key findings and future research directions.',
                'content': 'The conference featured presentations on health, environment, and social research. Keynote speakers included Dr. Emily Rodriguez on social inequality and Dr. Michael Chen on climate adaptation strategies. Over 200 participants attended the event.',
                'author': 'Conference Team',
                'publication': 'Thoughts & Thorough',
                'tags': ['Conference', 'Research', 'Event', 'Networking', 'Policy'],
                'external_links': [
                    {'title': 'Event Photos', 'url': 'https://example.com/events/conference-2024/photos'},
                    {'title': 'Conference Program', 'url': 'https://example.com/events/conference-2024/program'},
                ],
            },
            {
                'title': 'Video: Climate Adaptation Strategies for Farmers',
                'date': '2024-07-20',
                'type': 'Video',
                'description': 'Educational video series on climate adaptation strategies for smallholder farmers, featuring research findings from Thoughts & Thorough.',
                'content': 'This video series provides practical guidance for farmers on adapting to climate change. Based on research conducted by Dr. Farid Uddin, the videos cover sustainable farming practices, water management, and crop diversification strategies.',
                'author': 'Research Team',
                'publication': 'Thoughts & Thorough YouTube Channel',
                'youtube_video_id': 'jNQXAC9IVRw',  # Placeholder video ID
                'tags': ['Video', 'Climate Adaptation', 'Agriculture', 'Farmers', 'Education'],
                'external_links': [
                    {'title': 'Watch Series', 'url': 'https://youtube.com/playlist?list=example'},
                ],
            },
            {
                'title': 'Gender Inequality in Education: New Policy Recommendations',
                'date': '2024-07-15',
                'type': 'Article',
                'description': 'Dr. Ayesha Begum publishes policy brief addressing gender disparities in education access and outcomes in Bangladesh.',
                'content': 'The policy brief provides evidence-based recommendations for promoting gender equality in educational systems. The research examined enrollment rates, learning outcomes, and barriers to education access for girls across different regions.',
                'author': 'Ayesha Begum',
                'publication': 'Education Policy Review',
                'tags': ['Gender Equality', 'Education', 'Policy', 'Research', 'Bangladesh'],
                'external_links': [
                    {'title': 'Read Policy Brief', 'url': 'https://example.com/policy/gender-education'},
                ],
            },
            {
                'title': 'News: Air Pollution Study Reveals Health Risks',
                'date': '2024-07-10',
                'type': 'News',
                'description': 'New research from Thoughts & Thorough reveals significant health risks associated with air pollution in major urban centers.',
                'content': 'The study, conducted by Dr. Kamal Hossain, examined the relationship between air pollution levels and respiratory health outcomes. Findings indicate a strong correlation between pollution exposure and respiratory illnesses, particularly among vulnerable populations.',
                'author': 'Mohammad Ali',
                'publication': 'Dhaka Tribune',
                'tags': ['Air Pollution', 'Health', 'Urban', 'Research', 'Public Health'],
                'external_links': [
                    {'title': 'Read News Article', 'url': 'https://example.com/news/air-pollution-study'},
                ],
            },
            {
                'title': 'Interview: Digital Health Solutions in Rural Areas',
                'date': '2024-07-05',
                'type': 'Interview',
                'description': 'Dr. Tariq Islam discusses the implementation and effectiveness of digital health solutions in rural healthcare settings.',
                'content': 'In this interview, Dr. Tariq Islam shares findings from his case study on telemedicine and mobile health applications. He discusses how technology can improve healthcare accessibility in remote areas and the challenges of implementation.',
                'author': 'Nusrat Jahan',
                'publication': 'Tech Health Bangladesh',
                'youtube_video_id': '9bZkp7q19f0',  # Placeholder video ID
                'tags': ['Digital Health', 'Telemedicine', 'Rural Healthcare', 'Technology', 'Interview'],
                'external_links': [
                    {'title': 'Watch Interview', 'url': 'https://youtube.com/watch?v=9bZkp7q19f0'},
                ],
            },
            {
                'title': 'Research Publication: Child Nutrition and Development',
                'date': '2024-06-28',
                'type': 'Article',
                'description': 'Longitudinal study on child nutrition and development outcomes published in leading public health journal.',
                'content': 'Dr. Rina Das presents findings from a five-year longitudinal study tracking child nutrition and development. The research examines factors influencing child growth, cognitive development, and provides intervention strategies for improving outcomes.',
                'author': 'Rina Das',
                'publication': 'Journal of Public Health Research',
                'tags': ['Child Nutrition', 'Development', 'Research', 'Public Health', 'Longitudinal Study'],
                'external_links': [
                    {'title': 'Read Article', 'url': 'https://example.com/articles/child-nutrition'},
                ],
            },
            {
                'title': 'Community Resilience Workshop 2024',
                'date': '2024-06-20',
                'type': 'Event',
                'description': 'Thoughts & Thorough hosts workshop on building community resilience to climate shocks and social stresses.',
                'content': 'The workshop brought together community leaders, researchers, and policymakers to discuss strategies for building resilient communities. Dr. Meherun Nesa presented research findings on social cohesion and community networks.',
                'author': 'Workshop Team',
                'publication': 'Thoughts & Thorough',
                'tags': ['Workshop', 'Community Resilience', 'Event', 'Social Cohesion', 'Climate'],
                'external_links': [
                    {'title': 'Workshop Materials', 'url': 'https://example.com/workshops/resilience-2024'},
                ],
            },
            {
                'title': 'Video: Sustainable Agriculture Practices',
                'date': '2024-06-15',
                'type': 'Video',
                'description': 'Educational video on sustainable agriculture practices for smallholder farmers, based on research findings.',
                'content': 'This video provides practical guidance on implementing sustainable farming techniques. It covers climate-resilient crops, water conservation methods, and organic farming practices that can improve both environmental sustainability and economic viability.',
                'author': 'Research Team',
                'publication': 'Thoughts & Thorough YouTube Channel',
                'youtube_video_id': 'kJQP7kiw5Fk',  # Placeholder video ID
                'tags': ['Video', 'Sustainable Agriculture', 'Farming', 'Education', 'Climate'],
                'external_links': [
                    {'title': 'Watch Video', 'url': 'https://youtube.com/watch?v=kJQP7kiw5Fk'},
                ],
            },
            {
                'title': 'News: Elderly Care Services Research Findings',
                'date': '2024-06-10',
                'type': 'News',
                'description': 'New research highlights gaps in elderly care services and social support systems in Bangladesh.',
                'content': 'Dr. Salma Begum presents research findings on elderly care systems and social support mechanisms. The study identifies significant gaps in services for the aging population and provides recommendations for improving care arrangements.',
                'author': 'Tahmina Khatun',
                'publication': 'Social Services Today',
                'tags': ['Elderly Care', 'Social Services', 'Research', 'Aging', 'Public Health'],
                'external_links': [
                    {'title': 'Read News', 'url': 'https://example.com/news/elderly-care-research'},
                ],
            },
            {
                'title': 'Interview with Dr. Anwar Hossain on Biodiversity Conservation',
                'date': '2024-06-05',
                'type': 'Interview',
                'description': 'Dr. Anwar Hossain discusses biodiversity conservation efforts and the importance of protected areas.',
                'content': 'In this interview, Dr. Anwar Hossain shares insights from his comprehensive assessment of biodiversity conservation efforts. He discusses conservation strategies, species protection measures, and recommendations for enhancing biodiversity outcomes.',
                'author': 'Roksana Parvin',
                'publication': 'Environmental Watch',
                'tags': ['Biodiversity', 'Conservation', 'Interview', 'Environment', 'Wildlife'],
                'external_links': [
                    {'title': 'Read Interview', 'url': 'https://example.com/interviews/biodiversity-conservation'},
                ],
            },
            {
                'title': 'Research Article: Maternal and Child Health Services',
                'date': '2024-05-28',
                'type': 'Article',
                'description': 'Comprehensive assessment of maternal and child health services published in health services research journal.',
                'content': 'Dr. Farzana Rahman presents findings from a comprehensive assessment of maternal and child health services. The research examines access barriers, service quality, and health outcomes, providing evidence-based recommendations for improving healthcare delivery.',
                'author': 'Farzana Rahman',
                'publication': 'Health Services Research Journal',
                'tags': ['Maternal Health', 'Child Health', 'Research', 'Healthcare', 'Public Health'],
                'external_links': [
                    {'title': 'Read Article', 'url': 'https://example.com/articles/maternal-child-health'},
                ],
            },
            {
                'title': 'Renewable Energy Policy Forum 2024',
                'date': '2024-05-20',
                'type': 'Event',
                'description': 'Thoughts & Thorough co-hosts policy forum on renewable energy transition strategies for Bangladesh.',
                'content': 'The forum brought together energy experts, policymakers, and researchers to discuss strategies for transitioning to renewable energy sources. Dr. Khaled Ahmed presented policy recommendations based on his research on renewable energy infrastructure.',
                'author': 'Forum Organizers',
                'publication': 'Energy Policy Forum',
                'tags': ['Renewable Energy', 'Policy', 'Event', 'Sustainability', 'Climate'],
                'external_links': [
                    {'title': 'Forum Report', 'url': 'https://example.com/events/energy-forum-2024'},
                ],
            },
            {
                'title': 'Video: Water Quality and Public Health',
                'date': '2024-05-15',
                'type': 'Video',
                'description': 'Educational video explaining the relationship between water quality and public health outcomes.',
                'content': 'This video explains how water quality affects public health and what can be done to improve water safety. Based on research by Dr. Ahmed Rahman, it covers contamination sources, health impacts, and treatment methods.',
                'author': 'Research Team',
                'publication': 'Thoughts & Thorough YouTube Channel',
                'youtube_video_id': 'L_jWHffIx5E',  # Placeholder video ID
                'tags': ['Video', 'Water Quality', 'Public Health', 'Education', 'Health Safety'],
                'external_links': [
                    {'title': 'Watch Video', 'url': 'https://youtube.com/watch?v=L_jWHffIx5E'},
                ],
            },
        ]

        created_count = 0
        updated_count = 0

        for media_item_data in media_data:
            tags = media_item_data.pop('tags', [])
            external_links = media_item_data.pop('external_links', [])
            date_str = media_item_data.pop('date')
            
            # Check if media coverage already exists
            media, created = MediaCoverage.objects.get_or_create(
                title=media_item_data['title'],
                defaults={
                    **media_item_data,
                    'date': datetime.strptime(date_str, '%Y-%m-%d').date(),
                }
            )
            
            if created:
                # Add tags
                for tag_name in tags:
                    MediaTag.objects.create(media=media, name=tag_name)
                
                # Add external links
                for link_data in external_links:
                    MediaExternalLink.objects.create(media=media, **link_data)
                
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'Created: {media.title}'))
            else:
                # Update existing media
                for key, value in media_item_data.items():
                    if key != 'date':
                        setattr(media, key, value)
                media.date = datetime.strptime(date_str, '%Y-%m-%d').date()
                media.save()
                
                # Update tags
                media.tags.all().delete()
                for tag_name in tags:
                    MediaTag.objects.create(media=media, name=tag_name)
                
                # Update external links
                media.external_links.all().delete()
                for link_data in external_links:
                    MediaExternalLink.objects.create(media=media, **link_data)
                
                updated_count += 1
                self.stdout.write(self.style.WARNING(f'Updated: {media.title}'))

        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully populated Media Coverage!'))
        self.stdout.write(self.style.SUCCESS(f'Created: {created_count} media items'))
        self.stdout.write(self.style.SUCCESS(f'Updated: {updated_count} media items'))
        self.stdout.write(self.style.SUCCESS('You can now view media coverage in Django admin and the frontend.'))

