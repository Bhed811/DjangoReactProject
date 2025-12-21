#django models ko json m convert krna is cld serialization done using serializers
from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['id','category_name','creation_date']

