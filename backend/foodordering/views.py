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
    
@api_view(['GET'])
def list_foods(request):    
    foods=Food.objects.all()
    serializer=FoodSerializer(foods, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def food_search(request):    
    query=request.GET.get('q','')
    foods=Food.objects.filter(item_name__icontains=query)
    serializer=FoodSerializer(foods, many=True)
    return Response(serializer.data, status=200)

import random
@api_view(['GET'])
def random_foods_api(request):    
    foods = list(Food.objects.all())  
    random.shuffle(foods)
    limited_foods=foods[0:9]
    serializer=FoodSerializer(limited_foods, many=True)
    return Response(serializer.data, status=200)

from django.contrib.auth.hashers import make_password
@api_view(['POST'])
def register_user(request):
    first_name=request.data.get('firstname')
    last_name=request.data.get('lastname')    
    email=request.data.get('email')
    password=request.data.get('password')
    mobile=request.data.get('mobilenumber')
    if(User.objects.filter(email=email).exists() or User.objects.filter(mobile=mobile).exists()):
        return Response({"message": "User already exists"}, status=400)
    User.objects.create(first_name=first_name, last_name=last_name, email=email, password= make_password(password) , mobile=mobile)
    return Response({"message": "User registered successfully"}, status=201)

from django.contrib.auth.hashers import check_password
from django.db.models import Q
@api_view(['POST'])
def login_user(request):
    identifier=request.data.get('emailcont')
    password=request.data.get('password')

    try:
        user = User.objects.get(Q(email=identifier) | Q(mobile=identifier))
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)

    if check_password(password, user.password):
        return Response({"message": "Login successful", "userId":user.id, "userName":f"{user.first_name} {user.last_name}"}, status=200)
    return Response({"message": "Invalid credentials"}, status=401)


from django.shortcuts import get_object_or_404
@api_view(['GET'])
def food_detail(request,id  ):    
    # food=  Food.objects.get(id=request.GET.get('id'));  
    food= get_object_or_404(Food, id=id)
    
    serializer=FoodSerializer(food)
    return Response(serializer.data, status=200)
 
@api_view(['POST'])
def add_to_cart(request):
    user_id=request.data.get('userId')
    food_id=request.data.get('foodId')

    try:
        user = User.objects.get(id=user_id)
        food = Food.objects.get(id=food_id)

        order,created=Order.objects.get_or_create(
            user=user,
            food=food,
            is_order_placed=False,
            # quantity=1
            defaults={'quantity':1}
        )

        if not created:
            order.quantity += 1
            order.save()

        return Response({"message": "Added to cart succesfully"}, status=200)
    except:
        return Response({"message": "Something went wrong"}, status=404)

from .serializers import CartOrderSerializer
@api_view(['GET'])
def get_cart_items(request,user_id):
    orders = Order.objects.filter(user_id=user_id, is_order_placed=False).select_related('food')
    serializer=CartOrderSerializer(orders, many=True)
    return Response(serializer.data, status=200)


@api_view(['PUT'])
def update_cart_quantity(request):
    order_id=request.data.get('orderId')
    quantity=request.data.get('quantity')

    try:
        order = Order.objects.get(id=order_id, is_order_placed=False)
        order.quantity = quantity
        order.save()
        return Response({"message": "Quantity updated succesfully"}, status=200)
    except:
        return Response({"message": "Something went wrong"}, status=404)
    
@api_view(['DELETE'])
def delete_cart_item(request,order_id):
    try:
        order = Order.objects.get(id=order_id, is_order_placed=False)
        order.delete()
        return Response({"message": "Item deleted successfully"}, status=200)
    except:
        return Response({"message": "Something went wrong"}, status=404)

def make_unique_order_number():
    while True:
        order_number = str(random.randint(100000000, 999999999))
        if not Order.objects.filter(order_number=order_number).exists():
            return order_number

@api_view(['POST'])
def place_order(request):
    user_id=request.data.get('userId')
    address=request.data.get('address')
    payment_mode=request.data.get('paymentMode')
    card_number=request.data.get('cardNumber')
    expiry_date=request.data.get('expiryDate')
    cvv=request.data.get('cvv')
    try:
        order = Order.objects.filter(user_id=user_id, is_order_placed=False)
        order_number = make_unique_order_number()
        order.update(order_number=order_number, is_order_placed=True)

        OrderAddress.objects.create(
            user_id=user_id,
            order_number=order_number,
            address=address,
        )
        PaymentDetail.objects.create(
            user_id=user_id,
            order_number=order_number,
            payment_mode=payment_mode,
            card_number= card_number if payment_mode == 'online' else None,
            expiry_date=expiry_date if payment_mode == 'online' else None,
            cvv=cvv if payment_mode == 'online' else None,
        )
        return Response({"message": f"Order placed successfully! Order No: {order_number}"}, status=201)
    except:
        return Response({"message": "Something went wrong"}, status=404)