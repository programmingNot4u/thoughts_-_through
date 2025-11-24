from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import (
    Survey, ResearchArea, MediaCoverage, Publication,
    Webinar, PromotionalContent, RelevantLink, ResourcePanel,
    AboutPageSection, AboutPageContent, OrganizationalMember,
    LegalDocument,
    ContactPage,
    Footer
)
from .serializers import (
    SurveySerializer, ResearchAreaSerializer, MediaCoverageSerializer,
    PublicationSerializer, WebinarSerializer, PromotionalContentSerializer,
    RelevantLinkSerializer, ResourcePanelSerializer,
    AboutPageSectionSerializer, AboutPageContentSerializer,
    OrganizationalMemberSerializer, OrganizationalStructureSerializer,
    LegalDocumentSerializer,
    ContactPageSerializer,
    FooterSerializer
)
from .pagination import CustomPageNumberPagination


class SurveyViewSet(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['date', 'title', 'status', 'category']
    ordering = ['-date']

    def get_queryset(self):
        queryset = Survey.objects.all()
        status = self.request.query_params.get('status', None)
        category = self.request.query_params.get('category', None)
        
        if status:
            queryset = queryset.filter(status=status)
        if category:
            queryset = queryset.filter(category=category)
        
        return queryset

    @action(detail=False, methods=['get'])
    def active(self, request):
        surveys = self.get_queryset().filter(status='Active')
        serializer = self.get_serializer(surveys, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def completed(self, request):
        surveys = self.get_queryset().filter(status='Completed')
        serializer = self.get_serializer(surveys, many=True)
        return Response(serializer.data)


class ResearchAreaViewSet(viewsets.ModelViewSet):
    queryset = ResearchArea.objects.all()
    serializer_class = ResearchAreaSerializer
    pagination_class = CustomPageNumberPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['date', 'title', 'area']
    ordering = ['-date']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        queryset = ResearchArea.objects.all()
        area = self.request.query_params.get('area', None)
        
        if area:
            queryset = queryset.filter(area=area)
        
        return queryset

    @action(detail=False, methods=['get'])
    def health(self, request):
        research = self.get_queryset().filter(area='health')
        serializer = self.get_serializer(research, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def climate(self, request):
        research = self.get_queryset().filter(area='climate')
        serializer = self.get_serializer(research, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def social(self, request):
        research = self.get_queryset().filter(area='social')
        serializer = self.get_serializer(research, many=True)
        return Response(serializer.data)


class MediaCoverageViewSet(viewsets.ModelViewSet):
    queryset = MediaCoverage.objects.all()
    serializer_class = MediaCoverageSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['date', 'title', 'type']
    ordering = ['-date']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        queryset = MediaCoverage.objects.all()
        media_type = self.request.query_params.get('type', None)
        
        if media_type:
            queryset = queryset.filter(type=media_type)
        
        return queryset


class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'authors']
    ordering_fields = ['date', 'title', 'category', 'type', 'sector']
    ordering = ['-date']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        queryset = Publication.objects.all()
        category = self.request.query_params.get('category', None)
        pub_type = self.request.query_params.get('type', None)
        sector = self.request.query_params.get('sector', None)
        
        if category:
            queryset = queryset.filter(category=category)
        if pub_type:
            queryset = queryset.filter(type=pub_type)
        if sector:
            queryset = queryset.filter(sector=sector)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def choices(self, request):
        """Get available choices for categories, types, and sectors"""
        from .models import Publication
        return Response({
            'categories': [choice[0] for choice in Publication.CATEGORY_CHOICES],
            'types': [choice[0] for choice in Publication.TYPE_CHOICES],
            'sectors': [choice[0] for choice in Publication.SECTOR_CHOICES],
        })
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get publication statistics"""
        from .models import Publication, LegalDocument
        from django.db.models import Count
        
        # Count total publications
        publications_count = Publication.objects.count()
        
        # Count unique sectors used in publications
        unique_sectors = Publication.objects.values('sector').distinct().count()
        
        # Count legal documents
        legal_documents_count = LegalDocument.objects.filter(is_active=True).count()
        
        return Response({
            'publications_count': publications_count,
            'legal_documents_count': legal_documents_count,
            'research_sectors_count': unique_sectors,
        })


class WebinarViewSet(viewsets.ModelViewSet):
    queryset = Webinar.objects.all()
    serializer_class = WebinarSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'presenter_name', 'topics']
    ordering_fields = ['date', 'title', 'status']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = Webinar.objects.all()
        status = self.request.query_params.get('status', None)
        
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset


class PromotionalContentViewSet(viewsets.ModelViewSet):
    queryset = PromotionalContent.objects.filter(is_active=True)
    serializer_class = PromotionalContentSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'created_at']
    ordering = ['order', '-created_at']
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class RelevantLinkViewSet(viewsets.ModelViewSet):
    queryset = RelevantLink.objects.all()
    serializer_class = RelevantLinkSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['category', 'title']
    ordering = ['category', 'title']

    def get_queryset(self):
        queryset = RelevantLink.objects.all()
        category = self.request.query_params.get('category', None)
        
        if category:
            queryset = queryset.filter(category=category)
        
        return queryset


class ResourcePanelViewSet(viewsets.ModelViewSet):
    queryset = ResourcePanel.objects.all()
    serializer_class = ResourcePanelSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'title', 'bio', 'expertise']
    ordering_fields = ['name', 'title']
    ordering = ['name']
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# About Page ViewSets
class AboutPageSectionViewSet(viewsets.ModelViewSet):
    queryset = AboutPageSection.objects.filter(is_active=True)
    serializer_class = AboutPageSectionSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'title']
    ordering = ['order', 'title']


class AboutPageContentViewSet(viewsets.ModelViewSet):
    queryset = AboutPageContent.objects.filter(is_active=True)
    serializer_class = AboutPageContentSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['order', 'title']
    ordering = ['order', 'title']
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


class OrganizationalMemberViewSet(viewsets.ModelViewSet):
    queryset = OrganizationalMember.objects.filter(is_active=True)
    serializer_class = OrganizationalMemberSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ['name', 'designation', 'bio']
    ordering_fields = ['level', 'order', 'name']
    ordering = ['level', 'order', 'name']
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=False, methods=['get'])
    def structure(self, request):
        """Get hierarchical organizational structure"""
        members = OrganizationalMember.objects.filter(is_active=True).order_by('level', 'order', 'name')
        serializer = OrganizationalMemberSerializer(members, many=True, context={'request': request})
        return Response({'members': serializer.data})


class LegalDocumentViewSet(viewsets.ModelViewSet):
    queryset = LegalDocument.objects.filter(is_active=True)
    serializer_class = LegalDocumentSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'issued_by']
    ordering_fields = ['year', 'title', 'document_type', 'order']
    ordering = ['-year', 'order', 'title']
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def get_queryset(self):
        queryset = LegalDocument.objects.filter(is_active=True)
        document_type = self.request.query_params.get('type', None)
        year = self.request.query_params.get('year', None)
        
        if document_type:
            queryset = queryset.filter(document_type=document_type)
        if year:
            queryset = queryset.filter(year=year)
        
        return queryset


class ContactPageViewSet(viewsets.ModelViewSet):
    queryset = ContactPage.objects.all()
    serializer_class = ContactPageSerializer
    http_method_names = ['get']  # Read-only for now
    
    def get_queryset(self):
        """Return active contact page by default, or all if none active"""
        queryset = ContactPage.objects.all()
        active_contact = queryset.filter(is_active=True).first()
        if active_contact:
            return queryset.filter(is_active=True)
        return queryset
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get the active contact page configuration"""
        contact = ContactPage.objects.filter(is_active=True).first()
        if not contact:
            # If no active contact, try to get any contact
            contact = ContactPage.objects.first()
        if contact:
            serializer = self.get_serializer(contact, context={'request': request})
            return Response(serializer.data)
        # Return default contact page structure instead of 404
        default_contact = {
            'id': 0,
            'hero_title': 'Get In Touch',
            'hero_description': "We'd love to hear from you. Reach out to us for research collaborations, consultancy services, or general inquiries.",
            'contact_section_title': 'Contact Information',
            'email': None,
            'phone': None,
            'address': None,
            'facebook_url': None,
            'linkedin_url': None,
            'youtube_url': None,
            'twitter_url': None,
            'form_title': 'Send Us a Message',
            'form_submit_button_text': 'Send Message',
            'additional_contact_methods': [],
            'is_active': False,
            'created_at': None,
            'updated_at': None,
        }
        return Response(default_contact)


class FooterViewSet(viewsets.ModelViewSet):
    queryset = Footer.objects.all()
    serializer_class = FooterSerializer
    http_method_names = ['get']  # Read-only for now
    
    def get_queryset(self):
        """Return active footer by default, or all if none active"""
        queryset = Footer.objects.all()
        active_footer = queryset.filter(is_active=True).first()
        if active_footer:
            return queryset.filter(is_active=True)
        return queryset
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get the active footer configuration"""
        footer = Footer.objects.filter(is_active=True).first()
        if not footer:
            # If no active footer, try to get any footer
            footer = Footer.objects.first()
        if footer:
            serializer = self.get_serializer(footer, context={'request': request})
            return Response(serializer.data)
        # Return default footer structure instead of 404
        default_footer = {
            'id': 0,
            'about_title': 'About Thoughts & Thorough',
            'about_description': 'Evidence-based research and consultancy services for a sustainable future. We conduct rigorous surveys, comprehensive studies, and provide strategic consultancy grounded in data and environmental awareness.',
            'facebook_url': None,
            'linkedin_url': None,
            'youtube_url': None,
            'twitter_url': None,
            'email': None,
            'phone': None,
            'address': None,
            'research_areas_links': [],
            'publications_links': [],
            'copyright_text': 'Thoughts & Thorough. All rights reserved.',
            'is_active': False,
            'created_at': None,
            'updated_at': None,
        }
        return Response(default_footer)

