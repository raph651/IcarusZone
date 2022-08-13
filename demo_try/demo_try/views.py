from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from .models import File
from .forms import UploadForm

def home(request):
    return HttpResponse("Hello there")

#data = [
#    {'id':0,'name': 'image1.jpeg', 'type': 'jpeg'},
#    {'id':1,'name': 'notes.txt', 'type': 'txt'},
#    {'id':2,'name': 'image2.jpeg', 'type': 'jpeg'}
#]   

def files(request):
    data = File.objects.all()
    return render(request, 'files/files.html', {'files': data, 'form':UploadForm})

def file(request, file_id):
    f = File.objects.get(pk=file_id)
    if f is not None:
        return render(request, 'files/file.html', {'file':f})
    else:
        raise Http404("file doesn't exist")

def idx(request):
    return render(request,'files/index.html',\
        {'files':[{'id':None,'mess':'Wanna look at the files? Click to begin'}]})

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
