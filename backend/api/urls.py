from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SurveyViewSet, ResearchAreaViewSet, MediaCoverageViewSet,
    PublicationViewSet, WebinarViewSet, PromotionalContentViewSet,
    RelevantLinkViewSet, ResourcePanelViewSet,
    AboutPageSectionViewSet, AboutPageContentViewSet, OrganizationalMemberViewSet,
    LegalDocumentViewSet,
    ContactPageViewSet,
    FooterViewSet
)

router = DefaultRouter()
router.register(r'surveys', SurveyViewSet, basename='survey')
router.register(r'research', ResearchAreaViewSet, basename='research')
router.register(r'media', MediaCoverageViewSet, basename='media')
router.register(r'publications', PublicationViewSet, basename='publication')
router.register(r'webinars', WebinarViewSet, basename='webinar')
router.register(r'promotional', PromotionalContentViewSet, basename='promotional')
router.register(r'relevant-links', RelevantLinkViewSet, basename='relevant-link')
router.register(r'resource-panel', ResourcePanelViewSet, basename='resource-panel')
router.register(r'about/sections', AboutPageSectionViewSet, basename='about-section')
router.register(r'about/content', AboutPageContentViewSet, basename='about-content')
router.register(r'about/organizational', OrganizationalMemberViewSet, basename='organizational-member')
router.register(r'legal-documents', LegalDocumentViewSet, basename='legal-document')
router.register(r'contact', ContactPageViewSet, basename='contact')
router.register(r'footer', FooterViewSet, basename='footer')

urlpatterns = [
    path('', include(router.urls)),
]

