from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
import asyncio


async def send_welcome_email(username, user_email):
    subject, from_email, to = 'Welcome to Voyager!', None, user_email
    text_content = 'Welcome to Voyager'
    html_content = render_to_string(
        './email_template.html', {'username': username, 'app_url': 'http://localhost:5173'})
    email = EmailMultiAlternatives(subject, text_content, from_email, [to])
    email.attach_alternative(html_content, 'text/html')
    await asyncio.to_thread(email.send())
