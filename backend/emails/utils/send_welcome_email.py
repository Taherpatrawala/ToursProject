from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_welcome_email(username, user_email):
    try:
        subject, from_email, to = 'Welcome to Voyager!', None, user_email
        text_content = 'Welcome to Voyager'
        email = EmailMultiAlternatives(subject, text_content, from_email, [to])

        html_content = render_to_string(
            './email_template.html', {'username': username, 'app_url': 'http://localhost:5173'})
        email.attach_alternative(html_content, 'text/html')

        email.send()
    except Exception as e:
        print(e)
