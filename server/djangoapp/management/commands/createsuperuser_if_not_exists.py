from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Create a superuser and a regular user if none exist'

    def handle(self, *args, **kwargs):
        # Hardcoded credentials
        superuser_username = 'derril'
        superuser_password = 'ruffnexx'
        superuser_email = 'admin@example.com'
        regular_username = 'root'
        regular_password = 'ruffnexx'
        regular_email = 'user@example.com'

        # Create superuser if it doesn't exist
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username=superuser_username,
                password=superuser_password,
                email=superuser_email
            )
            self.stdout.write(self.style.SUCCESS('Superuser created.'))
        else:
            self.stdout.write(self.style.SUCCESS('Superuser already exists.'))

        # Create regular user if it doesn't exist
        if not User.objects.filter(username=regular_username).exists():
            User.objects.create_user(
                username=regular_username,
                password=regular_password,
                email=regular_email
            )
            self.stdout.write(self.style.SUCCESS('User created.'))
        else:
            self.stdout.write(self.style.SUCCESS('User already exists.'))
