from django.db import models
from django.core.validators import URLValidator


class Survey(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('Upcoming', 'Upcoming'),
    ]

    title = models.CharField(max_length=255)
    date = models.DateField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    category = models.CharField(max_length=100)
    participants = models.IntegerField(default=0, null=True, blank=True)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='surveys/', blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    methodology = models.TextField(blank=True, null=True)
    findings = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Survey'
        verbose_name_plural = '📊 Surveys'

    def __str__(self):
        return self.title


class SurveyTag(models.Model):
    survey = models.ForeignKey(Survey, related_name='tags', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class SurveyObjective(models.Model):
    survey = models.ForeignKey(Survey, related_name='objectives', on_delete=models.CASCADE)
    objective = models.TextField()

    def __str__(self):
        return f"{self.survey.title} - {self.objective[:50]}"


class SurveyExternalLink(models.Model):
    survey = models.ForeignKey(Survey, related_name='external_links', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title


class ResearchArea(models.Model):
    AREA_CHOICES = [
        ('health', 'Health, Mental Health & Social Health'),
        ('climate', 'Climate Change Impacts on Health & Livelihood'),
        ('social', 'Social, familial and individual impact of economic stress and inequality'),
    ]

    IMAGE_LAYOUT_CHOICES = [
        ('gallery', 'Gallery View'),
        ('distributed', 'Distributed in Content'),
        ('single', 'Single Featured Image'),
    ]

    area = models.CharField(max_length=50, choices=AREA_CHOICES)
    title = models.CharField(max_length=255)
    date = models.DateField()
    description = models.TextField()
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='research/', blank=True, null=True)  # Main/featured image
    image_layout = models.CharField(max_length=20, choices=IMAGE_LAYOUT_CHOICES, default='single')
    author = models.CharField(max_length=255, blank=True, null=True)
    youtube_video_id = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Research Item'
        verbose_name_plural = '🔬 Research'

    def __str__(self):
        return self.title


class ResearchImage(models.Model):
    research = models.ForeignKey(ResearchArea, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='research/images/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.research.title} - Image {self.order}"


class ResearchTag(models.Model):
    research = models.ForeignKey(ResearchArea, related_name='tags', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class ResearchExternalLink(models.Model):
    research = models.ForeignKey(ResearchArea, related_name='external_links', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title


class MediaCoverage(models.Model):
    TYPE_CHOICES = [
        ('Article', 'Article'),
        ('Video', 'Video'),
        ('News', 'News'),
        ('Interview', 'Interview'),
        ('Event', 'Event'),
    ]

    title = models.CharField(max_length=255)
    date = models.DateField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    content = models.TextField(blank=True, null=True)
    youtube_video_id = models.CharField(max_length=50, blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    publication = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='media/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Media Coverage Item'
        verbose_name_plural = '📰 Media Coverage'

    def __str__(self):
        return self.title


class MediaTag(models.Model):
    media = models.ForeignKey(MediaCoverage, related_name='tags', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class MediaExternalLink(models.Model):
    media = models.ForeignKey(MediaCoverage, related_name='external_links', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    url = models.URLField()

    def __str__(self):
        return self.title


class Publication(models.Model):
    CATEGORY_CHOICES = [
        ('Research Report', 'Research Report'),
        ('Policy Brief', 'Policy Brief'),
        ('Journal Article', 'Journal Article'),
        ('Working Paper', 'Working Paper'),
        ('Case Study', 'Case Study'),
        ('Methodology', 'Methodology'),
        ('Annual Report', 'Annual Report'),
    ]

    TYPE_CHOICES = [
        ('PDF', 'PDF'),
        ('DOCX', 'DOCX'),
        ('XLSX', 'XLSX'),
        ('PPTX', 'PPTX'),
        ('Link', 'Link'),
    ]

    SECTOR_CHOICES = [
        ('Health', 'Health'),
        ('Social', 'Social'),
        ('Environment', 'Environment'),
        ('Research', 'Research'),
        ('Policy', 'Policy'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    authors = models.JSONField(default=list)  # List of author names
    date = models.DateField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    sector = models.CharField(max_length=50, choices=SECTOR_CHOICES)
    file = models.FileField(upload_to='publications/', blank=True, null=True)
    external_url = models.URLField(blank=True, null=True)
    pages = models.IntegerField(blank=True, null=True)
    language = models.CharField(max_length=50, default='English')
    publisher = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Publication'
        verbose_name_plural = '📚 Publications'

    def __str__(self):
        return self.title


class PublicationTag(models.Model):
    publication = models.ForeignKey(Publication, related_name='tags', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Webinar(models.Model):
    STATUS_CHOICES = [
        ('Upcoming', 'Upcoming'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.CharField(max_length=255)  # Can be "Date, Time" format
    duration = models.CharField(max_length=50, blank=True, null=True)
    presenter_name = models.CharField(max_length=255)
    presenter_title = models.CharField(max_length=255, blank=True, null=True)
    presenter_bio = models.TextField(blank=True, null=True)
    topics = models.JSONField(default=list)  # List of topics
    registration_link = models.URLField(blank=True, null=True)
    recording_link = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Webinar'
        verbose_name_plural = '🎥 Webinars'

    def __str__(self):
        return self.title


class PromotionalContent(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)  # Optional text or URL content
    link = models.URLField(blank=True, null=True)
    link_text = models.CharField(max_length=100, blank=True, null=True)
    background_color = models.CharField(max_length=7, blank=True, null=True)  # Hex color
    text_color = models.CharField(max_length=7, blank=True, null=True)  # Hex color
    image = models.ImageField(upload_to='promotional/', blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True, help_text="YouTube video URL for video slides")
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Promotional Content'
        verbose_name_plural = '🎨 Promotional Content'

    def __str__(self):
        return self.title or "Promotional item"


class RelevantLink(models.Model):
    CATEGORY_CHOICES = [
        ('National', 'National'),
        ('International', 'International'),
        ('Government', 'Government'),
        ('Research', 'Research'),
        ('NGO', 'NGO'),
        ('Academic', 'Academic'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['category', 'title']
        verbose_name = 'Relevant Link'
        verbose_name_plural = '🔗 Relevant Links'

    def __str__(self):
        return self.title


class RelevantLinkTag(models.Model):
    link = models.ForeignKey(RelevantLink, related_name='tags', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class ResourcePanel(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    bio = models.TextField()
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='resource_panel/', blank=True, null=True)
    expertise = models.JSONField(default=list)  # List of expertise areas
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Resource Panel Member'
        verbose_name_plural = '👥 Resource Panel'

    def __str__(self):
        return self.name


# About Page Models
class AboutPageSection(models.Model):
    """Customizable sections for About page (Vision, Mission, Goals, Objectives, etc.)"""
    SECTION_TYPE_CHOICES = [
        ('vision', 'Vision'),
        ('mission', 'Mission'),
        ('goals', 'Goals'),
        ('objectives', 'Objectives'),
        ('values', 'Values'),
        ('custom', 'Custom Section'),
    ]
    
    title = models.CharField(max_length=255)
    section_type = models.CharField(max_length=50, choices=SECTION_TYPE_CHOICES, default='custom')
    items = models.JSONField(default=list, help_text="List of items/bullet points for this section")
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'About Section'
        verbose_name_plural = 'ℹ️ About - Sections'

    def __str__(self):
        return self.title


class AboutPageContent(models.Model):
    """Customizable content blocks for About page"""
    CONTENT_TYPE_CHOICES = [
        ('chairman_intro', 'Chairman Introduction'),
        ('organization_intro', 'Organization Introduction'),
        ('history', 'History'),
        ('achievements', 'Achievements'),
        ('custom', 'Custom Content'),
    ]
    
    title = models.CharField(max_length=255, blank=True, null=True)
    content_type = models.CharField(max_length=50, choices=CONTENT_TYPE_CHOICES, default='custom')
    content = models.TextField(help_text="Main content text (supports HTML)")
    image = models.ImageField(upload_to='about/', blank=True, null=True)
    image_position = models.CharField(
        max_length=20,
        choices=[('left', 'Left'), ('right', 'Right'), ('top', 'Top'), ('bottom', 'Bottom')],
        default='left',
        help_text="Image position relative to content"
    )
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'About Content'
        verbose_name_plural = 'ℹ️ About - Content'

    def __str__(self):
        return self.title or f"{self.content_type} Content"


class OrganizationalMember(models.Model):
    """Members of the organization with hierarchical relationships"""
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    bio = models.TextField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='organizational/', blank=True, null=True)
    reports_to = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='subordinates',
        help_text="The person this member reports to (for hierarchy)"
    )
    level = models.IntegerField(
        default=0,
        help_text="Hierarchy level (0 = top level, 1 = second level, etc.)"
    )
    order = models.IntegerField(
        default=0,
        help_text="Display order within the same level"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['level', 'order', 'name']
        verbose_name = 'Organizational Member'
        verbose_name_plural = 'ℹ️ About - Organizational Structure'

    def __str__(self):
        return f"{self.name} - {self.designation}"

    def get_subordinates(self):
        """Get all direct subordinates"""
        return self.subordinates.filter(is_active=True).order_by('order', 'name')

    def get_all_subordinates(self):
        """Get all subordinates recursively"""
        subordinates = list(self.get_subordinates())
        for subordinate in subordinates:
            subordinates.extend(subordinate.get_all_subordinates())
        return subordinates


class LegalDocument(models.Model):
    """Legal documents and certifications"""
    TYPE_CHOICES = [
        ('Certificate', 'Certificate'),
        ('Audit Report', 'Audit Report'),
        ('Approval', 'Approval'),
        ('License', 'License'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    document_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    year = models.CharField(max_length=4, help_text="Year of the document (e.g., '2023')")
    file = models.FileField(upload_to='legal_documents/', blank=True, null=True)
    external_url = models.URLField(blank=True, null=True, help_text="External URL if document is hosted elsewhere")
    issued_by = models.CharField(max_length=255, blank=True, null=True, help_text="Organization that issued the document")
    issue_date = models.DateField(blank=True, null=True)
    expiry_date = models.DateField(blank=True, null=True, help_text="Expiry date if applicable")
    is_active = models.BooleanField(
        default=True,
        help_text="Check to make this document PUBLIC (visible on frontend). Uncheck to HIDE it from the public."
    )
    order = models.IntegerField(default=0, help_text="Display order")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', 'order', 'title']
        verbose_name = 'Legal Document'
        verbose_name_plural = '📄 Legal Documents & Certifications'

    def __str__(self):
        return f"{self.title} ({self.year})"


class ContactPage(models.Model):
    """Customizable contact page content"""
    # Hero Section
    hero_title = models.CharField(
        max_length=255,
        default="Get In Touch"
    )
    hero_description = models.TextField(
        default="We'd love to hear from you. Reach out to us for research collaborations, consultancy services, or general inquiries."
    )
    
    # Contact Information Section
    contact_section_title = models.CharField(
        max_length=255,
        default="Contact Information"
    )
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    # Social Media Links
    facebook_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    
    # Form Section
    form_title = models.CharField(
        max_length=255,
        default="Send Us a Message"
    )
    form_submit_button_text = models.CharField(
        max_length=100,
        default="Send Message"
    )
    
    # Additional contact methods (stored as JSON)
    additional_contact_methods = models.JSONField(
        default=list,
        blank=True,
        help_text="List of additional contact methods: [{'type': 'WhatsApp', 'label': 'WhatsApp', 'value': '+1234567890', 'url': 'https://wa.me/1234567890'}]"
    )
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Contact Page'
        verbose_name_plural = '📧 Contact Page'
        ordering = ['-updated_at']

    def __str__(self):
        return "Contact Page Configuration"
    
    def save(self, *args, **kwargs):
        # Ensure only one active contact page configuration
        if self.is_active:
            ContactPage.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)


class Footer(models.Model):
    """Customizable footer content"""
    about_title = models.CharField(max_length=255, default="About Thoughts & Thorough")
    about_description = models.TextField(
        default="Evidence-based research and consultancy services for a sustainable future. We conduct rigorous surveys, comprehensive studies, and provide strategic consultancy grounded in data and environmental awareness."
    )
    
    # Social Media Links
    facebook_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    
    # Contact Information
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    # Footer Links (stored as JSON)
    research_areas_links = models.JSONField(
        default=list,
        help_text="List of research area links: [{'title': 'Link Title', 'url': '/path'}]"
    )
    publications_links = models.JSONField(
        default=list,
        help_text="List of publication links: [{'title': 'Link Title', 'url': '/path'}]"
    )
    
    # Copyright text
    copyright_text = models.CharField(
        max_length=255,
        default="Thoughts & Thorough. All rights reserved."
    )
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Footer'
        verbose_name_plural = '🦶 Footer'
        ordering = ['-updated_at']

    def __str__(self):
        return "Footer Configuration"
    
    def save(self, *args, **kwargs):
        # Ensure only one active footer configuration
        if self.is_active:
            Footer.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)