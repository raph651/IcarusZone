# ------------------
# from django.http import HttpResponse, Http404
# from django.shortcuts import render, redirect
# from .forms import UploadForm
# from .models import File
# ------------------

from django.http import HttpResponse, JsonResponse
from itsdangerous import Serializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import File, Customer
from .serializers import FileSerializer, CustomerSerializer, UserSerializer
from django.conf import settings


def home(request):
    return HttpResponse("Hello there")


## JSON response REST framework
# -----------------
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def files(request, format=None):
    if request.method == "GET":
        data = request.user.file_set.all()
        # data = request.user.file_set.all()
        serializer = FileSerializer(data, many=True)
        return Response({"files": serializer.data})
    elif request.method == "POST":
        serializer = FileSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            settings.AWS_S3_OBJECT_PARAMETERS = {
                "CacheControl": "max-age=86400",
                "ContentDisposition": 'attachment; filename="'
                + request.FILES["file"].name
                + '"',
            }
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH", "DELETE"])
#@permission_classes([IsAuthenticated])
def file(request, file_id, format=None):
    try:
        data = request.user.file_set.get(pk=file_id)
        # data = request.user.file_set.get(pk=file_id)
    except File.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = FileSerializer(data)
        return Response({"file": serializer.data}, status=status.HTTP_200_OK)
    elif request.method == "PATCH":
        serializer = FileSerializer(data, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def customers(request):
    if request.method == "GET":
        data = Customer.objects.all()
        serializer = CustomerSerializer(data, many=True)
        return Response({"customers": serializer.data})
    elif request.method == "POST":
        serializer = CustomerSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"customer": serializer.data}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH", "DELETE", "POST"])
@permission_classes([IsAuthenticated])
def customer(request, customer_id, format=None):
    try:
        data = Customer.objects.get(pk=customer_id)
        # data = request.user.file_set.get(pk=file_id)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = CustomerSerializer(data)
        return Response({"customer": serializer.data}, status=status.HTTP_200_OK)
    elif request.method == "PATCH":
        serializer = CustomerSerializer(data, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"customer": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "POST":
        serializer = CustomerSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"customer": serializer.data}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        tokens = {"refresh": str(refresh), "access": str(refresh.access_token)}
        return Response(tokens, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -----------------


## render HTTPResponse
# ----------------
# def files(request):
#    data = File.objects.all()
#    return render(request, 'files/files.html', {'files': data, 'form':UploadForm})
# def file(request, file_id):
#    f = File.objects.get(pk=file_id)
#    if f is not None:
#        return render(request, 'files/file.html', {'file':f})
#    else:
#        raise Http404("file doesn't exist")

# def idx(request):
#    return render(request,'files/index.html',\
#        {'files':[{'id':None,'mess':'Wanna look at the files? Click to begin'}]})

# def edit(request,file_id):
#    name=request.POST.get('name')
#    file_type=request.POST.get('type')
#    f =File.objects.get(pk=file_id)
#    print(name, file_type, f)
#
#    if f:
#        if f.name and name!='':
#            f.name=name
#        if f.file_type and file_type!='':
#            f.file_type=file_type
#        f.save()
#        return redirect(files)
#    else:
#        return redirect(files)
#
# def delete(request,file_id):
#    f = File.objects.get(pk=file_id)
#    if f:
#        f.delete()
#    return redirect(files)
#
# def upload(request):
#    form = UploadForm(request.POST, request.FILES)
#    if form.is_valid():
#        form.save()
#    return redirect(files)
# -----------------
