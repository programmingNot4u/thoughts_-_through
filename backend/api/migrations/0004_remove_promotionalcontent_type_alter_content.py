from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_alter_promotionalcontent_remove_video_add_youtube_url"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="promotionalcontent",
            name="type",
        ),
        migrations.AlterField(
            model_name="promotionalcontent",
            name="content",
            field=models.TextField(blank=True, null=True),
        ),
    ]

