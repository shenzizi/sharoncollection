from django.shortcuts import render,render_to_response,redirect
from django.http import HttpResponseRedirect, HttpResponse
from django.core import serializers
import datetime
import json

def home(request):
    return render_to_response("index.html")

def collection(request,name):
    if name == "resume":
        return render_to_response("resume/sharonresume.html")
    elif name == "project1":
        return render_to_response("project1/datavisualv2.html")
    elif name == "projectviewing":
        return render_to_response("project1/viewing.html")
    elif name == "projectviewing_all":
        return render_to_response("project1/viewing_all.html")
    elif name == "projectviewing_others":
        return render_to_response("project1/viewing_others.html")
    elif name == "projecthotword":
        return render_to_response("project1/hotword.html")
    elif name == "staticmenu":
        return render_to_response("index_no_animation.html")
    elif name == "project2":
        return render_to_response("project2/home.html")
