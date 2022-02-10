from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, RecipeSerializer, CategorySerializer
from .models import User, Recipe, Category

from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import HttpResponse, JsonResponse

# Create your views here.

class UserView(APIView):
	def get(self, request):
		queryset = User.objects.all()
		serializer = UserSerializer(queryset, many=True)
		return JsonResponse(serializer.data, safe=False)

class RecipeView(APIView):
	def get(self, request):
		queryset = Recipe.objects.all()
		serializer = RecipeSerializer(queryset, many=True)
		return JsonResponse(serializer.data, safe=False)
	
	def post(self, request):
		data = JSONParser().parse(request)
		serializer = RecipeSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse({"status":"ok"}, status=201)
		return JsonResponse({"status":"Failed"}, status=400)

class CategoryView(APIView): 
	def get(self, request):
		queryset = Category.objects.all()
		serializer = CategorySerializer(queryset, many=True)
		print("---- Data: ", serializer.data)
		return JsonResponse(serializer.data, safe=False)

	def post(self, request):
		data = JSONParser().parse(request)
		serializer = CategorySerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return JsonResponse({"status":"ok"}, status=201)
		return JsonResponse({"status":"Failed"}, status=400)