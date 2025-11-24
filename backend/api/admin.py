from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from django.contrib.admin import AdminSite
from .models import (
    Survey, SurveyTag, SurveyObjective, SurveyExternalLink,
    ResearchArea, ResearchImage, ResearchTag, ResearchExternalLink,
    MediaCoverage, MediaTag, MediaExternalLink,
    Publication, PublicationTag,
    Webinar,
    PromotionalContent,
    RelevantLink, RelevantLinkTag,
    ResourcePanel,
    AboutPageSection, AboutPageContent, OrganizationalMember,
    LegalDocument,
    ContactPage,
    Footer,
)


# Customize Admin Site
admin.site.site_header = "Thoughts & Thorough Admin"
admin.site.site_title = "T&T Admin"
admin.site.index_title = "Welcome to Thoughts & Thorough Administration"


# ==================== SURVEYS SECTION ====================
class SurveyTagInline(admin.TabularInline):
    model = SurveyTag
    extra = 1
    classes = ('collapse',)


class SurveyObjectiveInline(admin.TabularInline):
    model = SurveyObjective
    extra = 1
    classes = ('collapse',)


class SurveyExternalLinkInline(admin.TabularInline):
    model = SurveyExternalLink
    extra = 1
    classes = ('collapse',)


@admin.register(Survey)
class SurveyAdmin(admin.ModelAdmin):
    list_display = ['title', 'status_badge', 'category', 'date', 'participants_count', 'created_at']
    list_filter = ['status', 'category', 'date', 'created_at']
    search_fields = ['title', 'description', 'author']
    list_per_page = 25
    date_hierarchy = 'date'
    readonly_fields = ['created_at', 'updated_at']
    inlines = [SurveyTagInline, SurveyObjectiveInline, SurveyExternalLinkInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'date', 'status', 'category', 'author')
        }),
        ('Content', {
            'fields': ('description', 'content', 'methodology', 'findings')
        }),
        ('Statistics', {
            'fields': ('participants',)
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Survey"
        verbose_name_plural = "📊 Surveys"
    
    def status_badge(self, obj):
        colors = {
            'Active': 'green',
            'Completed': 'blue',
            'Upcoming': 'orange',
        }
        color = colors.get(obj.status, 'gray')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            color, obj.status
        )
    status_badge.short_description = 'Status'
    
    def participants_count(self, obj):
        if obj.participants:
            return format_html('<strong>{:,}</strong>', obj.participants)
        return '-'
    participants_count.short_description = 'Participants'


# ==================== RESEARCH SECTION ====================
class ResearchImageInline(admin.TabularInline):
    model = ResearchImage
    extra = 1
    fields = ['image', 'caption', 'order']
    classes = ('collapse',)


class ResearchTagInline(admin.TabularInline):
    model = ResearchTag
    extra = 1
    classes = ('collapse',)


class ResearchExternalLinkInline(admin.TabularInline):
    model = ResearchExternalLink
    extra = 1
    classes = ('collapse',)


@admin.register(ResearchArea)
class ResearchAreaAdmin(admin.ModelAdmin):
    list_display = ['title', 'area_badge', 'date', 'author', 'image_layout', 'has_video', 'created_at']
    list_filter = ['area', 'date', 'image_layout', 'created_at']
    search_fields = ['title', 'description', 'author']
    list_per_page = 25
    date_hierarchy = 'date'
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    inlines = [ResearchImageInline, ResearchTagInline, ResearchExternalLinkInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('area', 'title', 'date', 'author', 'description', 'content')
        }),
        ('Media', {
            'fields': ('image', 'image_preview', 'image_layout', 'youtube_video_id')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Research Item"
        verbose_name_plural = "🔬 Research"
    
    def area_badge(self, obj):
        colors = {
            'health': '#10B981',
            'climate': '#3B82F6',
            'social': '#F59E0B',
        }
        color = colors.get(obj.area, '#6B7280')
        labels = {
            'health': 'Health',
            'climate': 'Climate',
            'social': 'Social',
        }
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            color, labels.get(obj.area, obj.area)
        )
    area_badge.short_description = 'Area'
    
    def has_video(self, obj):
        if obj.youtube_video_id:
            return format_html('<span style="color: #10B981;">✅ Yes</span>')
        return format_html('<span style="color: #6B7280;">❌ No</span>')
    has_video.short_description = 'Video'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Preview'


# ==================== MEDIA COVERAGE SECTION ====================
class MediaTagInline(admin.TabularInline):
    model = MediaTag
    extra = 1
    classes = ('collapse',)


class MediaExternalLinkInline(admin.TabularInline):
    model = MediaExternalLink
    extra = 1
    classes = ('collapse',)


@admin.register(MediaCoverage)
class MediaCoverageAdmin(admin.ModelAdmin):
    list_display = ['title', 'type_badge', 'date', 'author', 'publication', 'has_video', 'created_at']
    list_filter = ['type', 'date', 'created_at']
    search_fields = ['title', 'description', 'author', 'publication']
    list_per_page = 25
    date_hierarchy = 'date'
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    inlines = [MediaTagInline, MediaExternalLinkInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'date', 'type', 'author', 'publication', 'description', 'content')
        }),
        ('Media', {
            'fields': ('image', 'image_preview', 'youtube_video_id')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Media Coverage Item"
        verbose_name_plural = "📰 Media Coverage"
    
    def type_badge(self, obj):
        colors = {
            'Article': '#3B82F6',
            'Video': '#EF4444',
            'News': '#10B981',
            'Interview': '#8B5CF6',
            'Event': '#F59E0B',
        }
        color = colors.get(obj.type, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            color, obj.type
        )
    type_badge.short_description = 'Type'
    
    def has_video(self, obj):
        if obj.youtube_video_id:
            return format_html('✅ Yes')
        return format_html('❌ No')
    has_video.short_description = 'Video'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Preview'


# ==================== PUBLICATIONS SECTION ====================
@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = ['title', 'category_badge', 'sector_badge', 'type', 'date', 'created_at']
    list_filter = ['category', 'type', 'sector', 'date', 'created_at']
    search_fields = ['title', 'description', 'authors']
    list_per_page = 25
    date_hierarchy = 'date'
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'authors', 'date', 'publisher', 'language')
        }),
        ('Classification', {
            'fields': ('category', 'type', 'sector')
        }),
        ('Files & Links', {
            'fields': ('file', 'external_url', 'pages')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Publication"
        verbose_name_plural = "📚 Publications"
    
    def category_badge(self, obj):
        return format_html(
            '<span style="background-color: #6366F1; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            obj.category
        )
    category_badge.short_description = 'Category'
    
    def sector_badge(self, obj):
        colors = {
            'Health': '#10B981',
            'Social': '#3B82F6',
            'Environment': '#059669',
            'Research': '#8B5CF6',
            'Policy': '#F59E0B',
        }
        color = colors.get(obj.sector, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            color, obj.sector
        )
    sector_badge.short_description = 'Sector'


# ==================== WEBINARS SECTION ====================
@admin.register(Webinar)
class WebinarAdmin(admin.ModelAdmin):
    list_display = ['title', 'status_badge', 'date', 'presenter_name', 'created_at']
    list_filter = ['status', 'date', 'created_at']
    search_fields = ['title', 'description', 'presenter_name', 'topics']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'status', 'date', 'duration')
        }),
        ('Presenter', {
            'fields': ('presenter_name', 'presenter_title', 'presenter_bio')
        }),
        ('Content', {
            'fields': ('topics',)
        }),
        ('Links', {
            'fields': ('registration_link', 'recording_link')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Webinar"
        verbose_name_plural = "🎥 Webinars"
    
    def status_badge(self, obj):
        colors = {
            'Upcoming': '#F59E0B',
            'Ongoing': '#3B82F6',
            'Completed': '#10B981',
        }
        color = colors.get(obj.status, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            color, obj.status
        )
    status_badge.short_description = 'Status'


# ==================== PROMOTIONAL CONTENT SECTION ====================
@admin.register(PromotionalContent)
class PromotionalContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'is_active_badge', 'order', 'has_image', 'has_video', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description', 'content']
    list_editable = ['order', 'is_active']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'description', 'content', 'is_active')
        }),
        ('Media', {
            'fields': ('image', 'image_preview', 'youtube_url')
        }),
        ('Styling', {
            'fields': ('background_color', 'text_color')
        }),
        ('Links', {
            'fields': ('link', 'link_text')
        }),
        ('Display', {
            'fields': ('order',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Promotional Content"
        verbose_name_plural = "🎨 Promotional Content"
    
    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background-color: #10B981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Active</span>')
        return format_html('<span style="background-color: #6B7280; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Inactive</span>')
    is_active_badge.short_description = 'Status'
    
    def has_image(self, obj):
        if obj.image:
            return format_html('✅')
        return format_html('❌')
    has_image.short_description = 'Image'
    
    def has_video(self, obj):
        if obj.youtube_url:
            return format_html('✅')
        return format_html('❌')
    has_video.short_description = 'Video'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Preview'


# ==================== RELEVANT LINKS SECTION ====================
@admin.register(RelevantLink)
class RelevantLinkAdmin(admin.ModelAdmin):
    list_display = ['title', 'category_badge', 'url_link', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'description', 'url']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'url', 'category')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Relevant Link"
        verbose_name_plural = "🔗 Relevant Links"
    
    def category_badge(self, obj):
        colors = {
            'National': '#3B82F6',
            'International': '#8B5CF6',
            'Government': '#10B981',
            'Research': '#F59E0B',
            'NGO': '#EF4444',
            'Academic': '#6366F1',
        }
        color = colors.get(obj.category, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            color, obj.category
        )
    category_badge.short_description = 'Category'
    
    def url_link(self, obj):
        return format_html('<a href="{}" target="_blank">{}</a>', obj.url, obj.url[:50] + '...' if len(obj.url) > 50 else obj.url)
    url_link.short_description = 'URL'


# ==================== RESOURCE PANEL SECTION ====================
@admin.register(ResourcePanel)
class ResourcePanelAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'has_image', 'expertise_count', 'created_at']
    search_fields = ['name', 'title', 'bio', 'email', 'expertise']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'title', 'bio')
        }),
        ('Contact', {
            'fields': ('email', 'phone')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
        ('Expertise', {
            'fields': ('expertise',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Resource Panel Member"
        verbose_name_plural = "👥 Resource Panel"
    
    def has_image(self, obj):
        if obj.image:
            return format_html('✅')
        return format_html('❌')
    has_image.short_description = 'Image'
    
    def expertise_count(self, obj):
        count = len(obj.expertise) if obj.expertise else 0
        return format_html('<strong>{}</strong>', count)
    expertise_count.short_description = 'Expertise Areas'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 200px; border-radius: 50%%;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Preview'


# ==================== ABOUT PAGE SECTION ====================
@admin.register(AboutPageSection)
class AboutPageSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'section_type_badge', 'items_count', 'order', 'is_active', 'is_active_badge']
    list_filter = ['section_type', 'is_active']
    search_fields = ['title']
    list_editable = ['order', 'is_active']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'section_type', 'items', 'is_active')
        }),
        ('Display', {
            'fields': ('order',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "ℹ️ About - Sections"
    
    def section_type_badge(self, obj):
        colors = {
            'vision': '#8B5CF6',
            'mission': '#3B82F6',
            'goals': '#10B981',
            'objectives': '#F59E0B',
            'values': '#EF4444',
            'custom': '#6B7280',
        }
        color = colors.get(obj.section_type, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            color, obj.get_section_type_display()
        )
    section_type_badge.short_description = 'Type'
    
    def items_count(self, obj):
        count = len(obj.items) if obj.items else 0
        return format_html('<strong>{}</strong> items', count)
    items_count.short_description = 'Items'
    
    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background-color: #10B981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Active</span>')
        return format_html('<span style="background-color: #6B7280; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Inactive</span>')
    is_active_badge.short_description = 'Status'


@admin.register(AboutPageContent)
class AboutPageContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'content_type_badge', 'image_position', 'order', 'is_active', 'is_active_badge', 'has_image']
    list_filter = ['content_type', 'is_active', 'image_position']
    search_fields = ['title', 'content']
    list_editable = ['order', 'is_active']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'content_type', 'content', 'is_active')
        }),
        ('Media', {
            'fields': ('image', 'image_preview', 'image_position')
        }),
        ('Display', {
            'fields': ('order',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "About Content"
        verbose_name_plural = "ℹ️ About - Content"
    
    def content_type_badge(self, obj):
        colors = {
            'chairman_intro': '#8B5CF6',
            'organization_intro': '#3B82F6',
            'history': '#10B981',
            'achievements': '#F59E0B',
            'custom': '#6B7280',
        }
        color = colors.get(obj.content_type, '#6B7280')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            color, obj.get_content_type_display()
        )
    content_type_badge.short_description = 'Type'
    
    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background-color: #10B981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Active</span>')
        return format_html('<span style="background-color: #6B7280; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Inactive</span>')
    is_active_badge.short_description = 'Status'
    
    def has_image(self, obj):
        if obj.image:
            return format_html('✅')
        return format_html('❌')
    has_image.short_description = 'Image'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 200px; max-width: 200px;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Preview'


@admin.register(OrganizationalMember)
class OrganizationalMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'designation', 'reports_to_link', 'level', 'order', 'is_active', 'is_active_badge', 'subordinates_count']
    list_filter = ['level', 'is_active', 'created_at']
    search_fields = ['name', 'designation', 'bio', 'email']
    list_editable = ['order', 'is_active']
    list_per_page = 25
    readonly_fields = ['created_at', 'updated_at', 'image_preview', 'subordinates_list']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'designation', 'bio', 'is_active')
        }),
        ('Contact', {
            'fields': ('email', 'phone')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
        ('Hierarchy', {
            'fields': ('reports_to', 'level', 'order', 'subordinates_list'),
            'description': 'Set who this member reports to and their hierarchy level. Level 0 is the top level.'
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    class Meta:
        verbose_name = "Organizational Member"
        verbose_name_plural = "ℹ️ About - Organizational Structure"
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related('reports_to')
    
    def reports_to_link(self, obj):
        if obj.reports_to:
            url = reverse('admin:api_organizationalmember_change', args=[obj.reports_to.pk])
            return format_html('<a href="{}">{}</a>', url, obj.reports_to.name)
        return format_html('<span style="color: #10B981; font-weight: bold;">Top Level</span>')
    reports_to_link.short_description = 'Reports To'
    
    def subordinates_count(self, obj):
        count = obj.get_subordinates().count()
        if count > 0:
            return format_html('<span style="background-color: #3B82F6; color: white; padding: 3px 8px; border-radius: 12px; font-size: 11px;">{}</span>', count)
        return '-'
    subordinates_count.short_description = 'Subordinates'
    
    def subordinates_list(self, obj):
        subordinates = obj.get_subordinates()
        if subordinates.exists():
            items = [f'<li><a href="{reverse("admin:api_organizationalmember_change", args=[s.pk])}">{s.name} - {s.designation}</a></li>' for s in subordinates]
            return format_html('<ul>{}</ul>', mark_safe(''.join(items)))
        return "No subordinates"
    subordinates_list.short_description = 'Direct Subordinates'
    
    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background-color: #10B981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Active</span>')
        return format_html('<span style="background-color: #6B7280; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Inactive</span>')
    is_active_badge.short_description = 'Status'
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 150px; max-width: 150px; border-radius: 50%%;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Preview'


@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'is_active', 'is_active_badge', 'updated_at']
    list_filter = ['is_active', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('About Section', {
            'fields': ('about_title', 'about_description')
        }),
        ('Social Media Links', {
            'fields': ('facebook_url', 'linkedin_url', 'youtube_url', 'twitter_url'),
            'classes': ('collapse',)
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'address')
        }),
        ('Footer Links', {
            'fields': ('research_areas_links', 'publications_links'),
            'description': 'JSON format: [{"title": "Link Title", "url": "/path"}]'
        }),
        ('Copyright', {
            'fields': ('copyright_text',)
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background-color: #10B981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Active</span>')
        return format_html('<span style="background-color: #6B7280; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Inactive</span>')
    is_active_badge.short_description = 'Status'
    
    def has_add_permission(self, request):
        # Allow adding if no active footer exists
        return Footer.objects.filter(is_active=True).count() == 0
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deleting if it's the only active footer
        if obj and obj.is_active:
            return Footer.objects.filter(is_active=True).count() > 1
        return True


@admin.register(ContactPage)
class ContactPageAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'is_active', 'is_active_badge', 'has_contact_info', 'updated_at']
    list_filter = ['is_active', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Hero Section', {
            'fields': ('hero_title', 'hero_description')
        }),
        ('Contact Information Section', {
            'fields': ('contact_section_title', 'email', 'phone', 'address')
        }),
        ('Social Media Links', {
            'fields': ('facebook_url', 'linkedin_url', 'youtube_url', 'twitter_url'),
            'classes': ('collapse',)
        }),
        ('Contact Form', {
            'fields': ('form_title', 'form_submit_button_text')
        }),
        ('Additional Contact Methods', {
            'fields': ('additional_contact_methods',),
            'description': 'JSON format: [{"type": "WhatsApp", "label": "WhatsApp", "value": "+1234567890", "url": "https://wa.me/1234567890"}]'
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html('<span style="background-color: #10B981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Active</span>')
        return format_html('<span style="background-color: #6B7280; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Inactive</span>')
    is_active_badge.short_description = 'Status'
    
    def has_contact_info(self, obj):
        info_count = sum([
            1 if obj.email else 0,
            1 if obj.phone else 0,
            1 if obj.address else 0,
        ])
        if info_count > 0:
            return format_html('<span style="background-color: #3B82F6; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{} items</span>', info_count)
        return format_html('<span style="color: #6B7280;">No info</span>')
    has_contact_info.short_description = 'Contact Info'
    
    def has_add_permission(self, request):
        # Allow adding if no active contact page exists
        return ContactPage.objects.filter(is_active=True).count() == 0
    
    def has_delete_permission(self, request, obj=None):
        # Prevent deleting if it's the only active contact page
        if obj and obj.is_active:
            return ContactPage.objects.filter(is_active=True).count() > 1
        return True


@admin.register(LegalDocument)
class LegalDocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'document_type', 'year', 'issued_by', 'visibility_status', 'is_active', 'has_file', 'order', 'created_at']
    list_filter = ['document_type', 'year', 'is_active', 'created_at']
    search_fields = ['title', 'description', 'issued_by']
    list_editable = ['order', 'is_active']
    list_per_page = 25
    date_hierarchy = 'issue_date'
    readonly_fields = ['created_at', 'updated_at', 'file_preview', 'visibility_info']
    actions = ['make_public', 'make_hidden']
    
    # Ensure add permission is enabled
    def has_add_permission(self, request):
        return True
    
    def has_change_permission(self, request, obj=None):
        return True
    
    def has_delete_permission(self, request, obj=None):
        return True
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'document_type', 'year')
        }),
        ('Visibility Settings', {
            'fields': ('is_active', 'visibility_info'),
            'description': 'Control whether this document is visible to the public. Uncheck "Is active" to hide it from the frontend.',
            'classes': ('wide',)
        }),
        ('Document Details', {
            'fields': ('issued_by', 'issue_date', 'expiry_date')
        }),
        ('File/URL', {
            'fields': ('file', 'file_preview', 'external_url'),
            'description': 'Upload a file or provide an external URL. If both are provided, file takes precedence.'
        }),
        ('Display', {
            'fields': ('order',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def visibility_status(self, obj):
        """Show visibility status in list view"""
        if obj.is_active:
            return format_html(
                '<span style="background-color: #10B981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold;">'
                '👁️ Public</span>'
            )
        return format_html(
            '<span style="background-color: #6B7280; color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: bold;">'
            '🙈 Hidden</span>'
        )
    visibility_status.short_description = 'Visibility'
    visibility_status.admin_order_field = 'is_active'
    
    def is_active_badge(self, obj):
        """Status badge for compatibility"""
        if obj.is_active:
            return format_html('<span style="background-color: #10B981; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Public</span>')
        return format_html('<span style="background-color: #6B7280; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">Hidden</span>')
    is_active_badge.short_description = 'Status'
    
    def visibility_info(self, obj):
        """Show helpful information about visibility"""
        if obj:
            if obj.is_active:
                return format_html(
                    '<div style="background-color: #D1FAE5; border-left: 4px solid #10B981; padding: 12px; border-radius: 4px; margin: 10px 0;">'
                    '<strong style="color: #065F46;">✓ This document is PUBLIC</strong><br>'
                    '<span style="color: #047857; font-size: 12px;">It will be visible on the frontend website.</span>'
                    '</div>'
                )
            else:
                return format_html(
                    '<div style="background-color: #F3F4F6; border-left: 4px solid #6B7280; padding: 12px; border-radius: 4px; margin: 10px 0;">'
                    '<strong style="color: #374151;">✗ This document is HIDDEN</strong><br>'
                    '<span style="color: #6B7280; font-size: 12px;">It will NOT be visible on the frontend website.</span>'
                    '</div>'
                )
        return format_html(
            '<div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 12px; border-radius: 4px; margin: 10px 0;">'
            '<strong style="color: #92400E;">ℹ️ Set visibility below</strong><br>'
            '<span style="color: #B45309; font-size: 12px;">Check "Is active" to make it public, or uncheck to hide it.</span>'
            '</div>'
        )
    visibility_info.short_description = 'Visibility Information'
    
    def has_file(self, obj):
        if obj.file:
            return format_html('✅ File')
        elif obj.external_url:
            return format_html('🔗 URL')
        return format_html('❌ None')
    has_file.short_description = 'File/URL'
    
    def file_preview(self, obj):
        if obj.file:
            return format_html('<a href="{}" target="_blank">View File</a>', obj.file.url)
        return "No file uploaded"
    file_preview.short_description = 'File Preview'
    
    # Admin actions for bulk operations
    def make_public(self, request, queryset):
        """Make selected documents public"""
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} document(s) marked as public.')
    make_public.short_description = 'Make selected documents PUBLIC'
    
    def make_hidden(self, request, queryset):
        """Hide selected documents"""
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} document(s) marked as hidden.')
    make_hidden.short_description = 'Make selected documents HIDDEN'
