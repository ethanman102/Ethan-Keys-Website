
from django.middleware import csrf
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError,NotFound
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken,TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.permissions import AllowAny,IsAuthenticated

def get_csrf_token(request):
    '''
    Function: get_csrf_token(request)
    Args: request: a request object to extract the csrf token from or generate for the new user
    Returns: a valid csrf token or the set csrf token already.
    '''
    csrftoken = csrf.get_token(request)
    return csrftoken

class LoginView(TokenObtainPairView):
    def post(self,request,*args,**kwargs):

        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            raise ValidationError('Please provide both an Email and Password')
        
        user = authenticate(username=email,password=password)
        if user is None:
            raise NotFound('User does not exist to login')        
        
        response = super().post(request, *args, **kwargs)
        access_token = response.data['access']
        refresh_token = response.data['refresh']

        response.data.pop('refresh',None)
        response.data.pop('access',None)
        
        # set the access and refresh cookies
        response.set_cookie(
            key='access',
            value=access_token,
            httponly=True,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=True,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        response.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=True,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )


        response.data['success'] = 'Logged in user'

        response.data['success'] = 'Logged in user'
        return response
    
class LogoutView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def post(self, request):

        response = Response()
        refresh = request.COOKIES.get('refresh',None)
        # blacklist the token for extra security to ensure a logged out token can not be used under its expiry.
        if refresh:
            try:
                token = RefreshToken(refresh)
                token.blacklist()
            except InvalidToken:
                pass
        # delete jwt http only cookies.
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        response.data = {"Success" : "logged out user"}
        return response
    
class HttpCookieRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs):
        # ensure refresh token validity.
        refresh = request.COOKIES.get('refresh', None)
        if refresh is None:
            raise ValidationError('No token provided')
        try:
            serializer = self.get_serializer(data={'refresh':refresh})
            if not serializer.is_valid():
                raise ValidationError('Refresh token is not valid')
        except TokenError:
                raise ValidationError('Refresh token is not valid')
        
        # remove the access token from the response itself and store it in the http only cookie rewriting the previous.
        access = serializer.validated_data.pop('access')
        response = Response()
        response.set_cookie(
            key='access',
            value=access,
            httponly=True,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=True,
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        
        # ensure a CSRF token is set and that it is NOT HTTPONLY so that JS on frontend can access.
        response.data = {'Success': 'New access token obtained'}
        return response
    
class ProvideAuthenticationStateView(APIView):
    permission_classes = []
    def get(self,request):
        response = Response()
        csrftoken = get_csrf_token(request)
        response.set_cookie('csrftoken',
                            csrftoken,
                            secure=False,
                            samesite='Lax',
                            httponly=False)
        if request.user.is_authenticated:
            data = {"Success":"User is Authenticated"}

            return Response(data)
        data = {"Failure":"User is Not Authenticated"}
        return Response(data,status=status.HTTP_403_FORBIDDEN)