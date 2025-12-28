from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Food)
admin.site.register(Order)
admin.site.register(Wishlist)
admin.site.register(PaymentDetail)
admin.site.register(FoodTracking)
admin.site.register(OrderAddress)
