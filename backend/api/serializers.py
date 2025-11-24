from rest_framework import serializers
from django.conf import settings
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


class SurveyTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyTag
        fields = ['name']


class SurveyObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyObjective
        fields = ['objective']


class SurveyExternalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyExternalLink
        fields = ['title', 'url']


class SurveySerializer(serializers.ModelSerializer):
    tags = SurveyTagSerializer(many=True, read_only=True)
    objectives = SurveyObjectiveSerializer(many=True, read_only=True)
    external_links = SurveyExternalLinkSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    objective_list = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    external_links_data = serializers.ListField(
        child=serializers.DictField(), write_only=True, required=False
    )

    class Meta:
        model = Survey
        fields = [
            'id', 'title', 'date', 'description', 'status', 'category',
            'participants', 'content', 'image', 'author', 'methodology',
            'findings', 'tags', 'objectives', 'external_links',
            'tag_names', 'objective_list', 'external_links_data',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        objective_list = validated_data.pop('objective_list', [])
        external_links_data = validated_data.pop('external_links_data', [])
        
        survey = Survey.objects.create(**validated_data)
        
        for tag_name in tag_names:
            SurveyTag.objects.create(survey=survey, name=tag_name)
        
        for objective in objective_list:
            SurveyObjective.objects.create(survey=survey, objective=objective)
        
        for link_data in external_links_data:
            SurveyExternalLink.objects.create(survey=survey, **link_data)
        
        return survey

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', None)
        objective_list = validated_data.pop('objective_list', None)
        external_links_data = validated_data.pop('external_links_data', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if tag_names is not None:
            instance.tags.all().delete()
            for tag_name in tag_names:
                SurveyTag.objects.create(survey=instance, name=tag_name)
        
        if objective_list is not None:
            instance.objectives.all().delete()
            for objective in objective_list:
                SurveyObjective.objects.create(survey=instance, objective=objective)
        
        if external_links_data is not None:
            instance.external_links.all().delete()
            for link_data in external_links_data:
                SurveyExternalLink.objects.create(survey=instance, **link_data)
        
        return instance


class ResearchImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ResearchImage
        fields = ['id', 'image', 'caption', 'order']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"{settings.MEDIA_URL}{obj.image.url}"
        return None


class ResearchTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchTag
        fields = ['name']


class ResearchExternalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchExternalLink
        fields = ['title', 'url']


class ResearchAreaSerializer(serializers.ModelSerializer):
    tags = ResearchTagSerializer(many=True, read_only=True)
    external_links = ResearchExternalLinkSerializer(many=True, read_only=True)
    images = ResearchImageSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    external_links_data = serializers.ListField(
        child=serializers.DictField(), write_only=True, required=False
    )
    image = serializers.SerializerMethodField()

    class Meta:
        model = ResearchArea
        fields = [
            'id', 'area', 'title', 'date', 'description', 'content',
            'image', 'image_layout', 'images', 'author', 'youtube_video_id', 
            'tags', 'external_links', 'tag_names', 'external_links_data', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"{settings.MEDIA_URL}{obj.image.url}"
        return None

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        external_links_data = validated_data.pop('external_links_data', [])
        
        research = ResearchArea.objects.create(**validated_data)
        
        for tag_name in tag_names:
            ResearchTag.objects.create(research=research, name=tag_name)
        
        for link_data in external_links_data:
            ResearchExternalLink.objects.create(research=research, **link_data)
        
        return research

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', None)
        external_links_data = validated_data.pop('external_links_data', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if tag_names is not None:
            instance.tags.all().delete()
            for tag_name in tag_names:
                ResearchTag.objects.create(research=instance, name=tag_name)
        
        if external_links_data is not None:
            instance.external_links.all().delete()
            for link_data in external_links_data:
                ResearchExternalLink.objects.create(research=instance, **link_data)
        
        return instance


class MediaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaTag
        fields = ['name']


class MediaExternalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaExternalLink
        fields = ['title', 'url']


class MediaCoverageSerializer(serializers.ModelSerializer):
    tags = MediaTagSerializer(many=True, read_only=True)
    external_links = MediaExternalLinkSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    external_links_data = serializers.ListField(
        child=serializers.DictField(), write_only=True, required=False
    )

    class Meta:
        model = MediaCoverage
        fields = [
            'id', 'title', 'date', 'type', 'description', 'content',
            'youtube_video_id', 'author', 'publication', 'image',
            'tags', 'external_links', 'tag_names', 'external_links_data',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        external_links_data = validated_data.pop('external_links_data', [])
        
        media = MediaCoverage.objects.create(**validated_data)
        
        for tag_name in tag_names:
            MediaTag.objects.create(media=media, name=tag_name)
        
        for link_data in external_links_data:
            MediaExternalLink.objects.create(media=media, **link_data)
        
        return media

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', None)
        external_links_data = validated_data.pop('external_links_data', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if tag_names is not None:
            instance.tags.all().delete()
            for tag_name in tag_names:
                MediaTag.objects.create(media=instance, name=tag_name)
        
        if external_links_data is not None:
            instance.external_links.all().delete()
            for link_data in external_links_data:
                MediaExternalLink.objects.create(media=instance, **link_data)
        
        return instance


class PublicationTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicationTag
        fields = ['name']


class PublicationSerializer(serializers.ModelSerializer):
    tags = PublicationTagSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )
    file_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = [
            'id', 'title', 'description', 'authors', 'date', 'category',
            'type', 'sector', 'file', 'file_url', 'external_url', 'download_url',
            'pages', 'language', 'publisher', 'tags', 'tag_names', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return f"{settings.MEDIA_URL}{obj.file.url}"
        return None
    
    def get_download_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return f"{settings.MEDIA_URL}{obj.file.url}"
        elif obj.external_url:
            return obj.external_url
        return None

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        publication = Publication.objects.create(**validated_data)
        
        for tag_name in tag_names:
            PublicationTag.objects.create(publication=publication, name=tag_name)
        
        return publication

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if tag_names is not None:
            instance.tags.all().delete()
            for tag_name in tag_names:
                PublicationTag.objects.create(publication=instance, name=tag_name)
        
        return instance


class WebinarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webinar
        fields = [
            'id', 'title', 'description', 'date', 'duration',
            'presenter_name', 'presenter_title', 'presenter_bio',
            'topics', 'registration_link', 'recording_link', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PromotionalContentSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = PromotionalContent
        fields = [
            'id', 'title', 'description', 'content', 'link',
            'link_text', 'background_color', 'text_color', 'image',
            'youtube_url', 'order', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"{settings.MEDIA_URL}{obj.image.url}"
        return None


class RelevantLinkTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelevantLinkTag
        fields = ['name']


class RelevantLinkSerializer(serializers.ModelSerializer):
    tags = RelevantLinkTagSerializer(many=True, read_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(), write_only=True, required=False
    )

    class Meta:
        model = RelevantLink
        fields = [
            'id', 'title', 'description', 'url', 'category',
            'tags', 'tag_names', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        tag_names = validated_data.pop('tag_names', [])
        link = RelevantLink.objects.create(**validated_data)
        
        for tag_name in tag_names:
            RelevantLinkTag.objects.create(link=link, name=tag_name)
        
        return link

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if tag_names is not None:
            instance.tags.all().delete()
            for tag_name in tag_names:
                RelevantLinkTag.objects.create(link=instance, name=tag_name)
        
        return instance


class ResourcePanelSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ResourcePanel
        fields = [
            'id', 'name', 'title', 'bio', 'email', 'phone',
            'image', 'expertise', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"{settings.MEDIA_URL}{obj.image.url}"
        return None


# About Page Serializers
class AboutPageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutPageSection
        fields = [
            'id', 'title', 'section_type', 'items', 'order',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AboutPageContentSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = AboutPageContent
        fields = [
            'id', 'title', 'content_type', 'content', 'image',
            'image_position', 'order', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"{settings.MEDIA_URL}{obj.image.url}"
        return None


class OrganizationalMemberSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    reports_to_name = serializers.CharField(source='reports_to.name', read_only=True)
    reports_to_designation = serializers.CharField(source='reports_to.designation', read_only=True)
    subordinates_count = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationalMember
        fields = [
            'id', 'name', 'designation', 'bio', 'email', 'phone',
            'image', 'reports_to', 'reports_to_name', 'reports_to_designation',
            'level', 'order', 'is_active', 'subordinates_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"{settings.MEDIA_URL}{obj.image.url}"
        return None

    def get_subordinates_count(self, obj):
        return obj.get_subordinates().count()


class OrganizationalStructureSerializer(serializers.Serializer):
    """Serializer for hierarchical organizational structure"""
    members = OrganizationalMemberSerializer(many=True)
    
    def to_representation(self, instance):
        # Build hierarchical structure
        members = OrganizationalMember.objects.filter(is_active=True).order_by('level', 'order', 'name')
        return {
            'members': OrganizationalMemberSerializer(members, many=True, context=self.context).data
        }


class LegalDocumentSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = LegalDocument
        fields = [
            'id', 'title', 'description', 'document_type', 'year',
            'file', 'file_url', 'external_url', 'download_url',
            'issued_by', 'issue_date', 'expiry_date',
            'is_active', 'order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_file_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return f"{settings.MEDIA_URL}{obj.file.url}"
        return None
    
    def get_download_url(self, obj):
        if obj.file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.file.url)
            return f"{settings.MEDIA_URL}{obj.file.url}"
        elif obj.external_url:
            return obj.external_url
        return None


class ContactPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPage
        fields = [
            'id', 'hero_title', 'hero_description',
            'contact_section_title', 'email', 'phone', 'address',
            'facebook_url', 'linkedin_url', 'youtube_url', 'twitter_url',
            'form_title', 'form_submit_button_text',
            'additional_contact_methods',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = [
            'id', 'about_title', 'about_description',
            'facebook_url', 'linkedin_url', 'youtube_url', 'twitter_url',
            'email', 'phone', 'address',
            'research_areas_links', 'publications_links',
            'copyright_text', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

