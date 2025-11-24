from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_researcharea_image_layout_researchimage"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="promotionalcontent",
            name="video",
        ),
        migrations.AddField(
            model_name="promotionalcontent",
            name="youtube_url",
            field=models.URLField(
                blank=True,
                null=True,
                help_text="YouTube video URL for video slides",
            ),
        ),
    ]

