from django.core.mail import EmailMultiAlternatives, BadHeaderError
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

class EmailView(APIView):

    def post(self,request):
        data = request.data

        
        contacter = data.get('name')
        contacter_email = data.get('email')
        message = data.get('message')

        if not contacter or not contacter_email:
            return Response({'error':'name or email can not be blank!'},status=status.HTTP_400_BAD_REQUEST)
        
        # render the html and the text for the email...

        context = {
            "name" : contacter,
            "email" : contacter_email,
            "message" : message
        }

        text_content = render_to_string(
            "api/email_template.txt",
            context=context
        )

        html_content = render_to_string(
            "api/email_template.html",
            context=context
        )

        msg = EmailMultiAlternatives("Inquiry",text_content,settings.EMAIL_HOST_USER,[settings.EMAIL_SEND_TO])
        msg.attach_alternative(html_content,"text/html")

        # send the email..
        try:
            msg.send(fail_silently=False)
        except BadHeaderError:
            return Response({"error":"Invalid Header found"},status=status.HTTP_400_BAD_REQUEST)
        return Response({"success":"email has been sent"},status=status.HTTP_200_OK)