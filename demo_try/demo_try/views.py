#------------------
#from django.http import HttpResponse, Http404
#from django.shortcuts import render, redirect
#from .forms import UploadForm
#from .models import File
#------------------

from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import File
from .serializers import FileSerializer

def home(request):
    return HttpResponse("Hello there")

## JSON response
#-----------------
def files(request):
    data = File.objects.all()
    serializer = FileSerializer(data,many=True)
    return JsonResponse({'files':serializer.data})

@api_view(['GET','PUT','DELETE'])
def file(request, file_id,format=None):
    try:
        data=File.objects.get(pk=file_id)
    except File.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = FileSerializer(data)
        return Response({'files':serializer.data}, status=status.HTTP_200_OK)
    elif request.method =='PUT':
        serializer = FileSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
    
#-----------------


## render HTTPResponse
#----------------
#def files(request):
#    data = File.objects.all()
#    return render(request, 'files/files.html', {'files': data, 'form':UploadForm})
#def file(request, file_id):
#    f = File.objects.get(pk=file_id)
#    if f is not None:
#        return render(request, 'files/file.html', {'file':f})
#    else:
#        raise Http404("file doesn't exist")

#def idx(request):
#    return render(request,'files/index.html',\
#        {'files':[{'id':None,'mess':'Wanna look at the files? Click to begin'}]})

def edit(request,file_id):
    name=request.POST.get('name')
    file_type=request.POST.get('type')
    f =File.objects.get(pk=file_id)
    print(name, file_type, f)

    if f:
        if f.name and name!='':
            f.name=name
        if f.file_type and file_type!='':
            f.file_type=file_type
        f.save()
        return redirect(files)
    else:
        return redirect(files)

def delete(request,file_id):
    f = File.objects.get(pk=file_id)
    if f:
        f.delete()
    return redirect(files)

def upload(request):
    form = UploadForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()
    return redirect(files)
#-----------------
