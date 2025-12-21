from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from .models import *
# Create your views here.
@api_view(['POST'])
def admin_login_api(request):
    username=request.data.get('username')
    password=request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None and user.is_staff:
        return Response({"message": "Login successful", "username": username}, status=200)
    return Response({"message": "Invalid credentials"}, status=401)

@api_view(['POST'])
def add_category_api(request):
    category_name=request.data.get('category_name')
    
    Category.objects.create(category_name=category_name)
    return Response({"message": "Category added successfully"}, status=201)

from .serializers import CategorySerializer

@api_view(['GET'])
def list_categories(request):    
    categories=Category.objects.all()
    serializer=CategorySerializer(categories, many=True)
    return Response(serializer.data, status=200)
    
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import FoodSerializer

@parser_classes([MultiPartParser, FormParser])
@api_view(['POST'])
def add_food_item_api(request):
    serializer = FoodSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Food item added successfully"}, status=201)
    return Response(serializer.errors, status=400)
    
