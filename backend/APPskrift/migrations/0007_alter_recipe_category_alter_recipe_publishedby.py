# Generated by Django 4.0.2 on 2022-02-10 14:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('APPskrift', '0006_alter_recipe_category_alter_recipe_publishedby'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='APPskrift.category'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='publishedBy',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='APPskrift.user'),
        ),
    ]
