from django.shortcuts import render,render_to_response,redirect
from django.http import HttpResponseRedirect, HttpResponse
from django.core import serializers
import datetime
import json

def home(request):
    return render_to_response("index.html")

def collection(request,name):
    if name == "resume":
        return render_to_response("sharonresume.html")
    elif name == "project":
        return render_to_response("datavisualv2.html")
    elif name == "projectviewing":
        return render_to_response("viewing.html")
    elif name == "projectviewing_all":
        return render_to_response("viewing_all.html")
    elif name == "projectviewing_others":
        return render_to_response("viewing_others.html")
    elif name == "projecthotword":
        return render_to_response("hotword.html")

