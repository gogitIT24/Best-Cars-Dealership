from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os

class Command(BaseCommand):
    help = 'Create a superuser if none exist'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username=os.getenv('DJANGO_SUPERUSER_USERNAME', 'derril'),
                password=os.getenv('DJANGO_SUPERUSER_PASSWORD', 'ruffnexx'),
                email=os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
            )
            self.stdout.write(self.style.SUCCESS('Superuser created.'))
        else:
            self.stdout.write(self.style.SUCCESS('Superuser already exists.'))
