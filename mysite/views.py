from django.shortcuts import render,render_to_response,redirect
from django.http import HttpResponseRedirect, HttpResponse
from django.core import serializers
import datetime
import json

def home(request):
    return render_to_response("index.html")

def collection(request,name):
    if name == 'resume':
      return render_to_response("sharonresume.html")
    else:
      return render_to_response("datavisualv2.html")

def datavisualv2(request):
    return render_to_response("datavisualv2.html")
    
def dvviewing(request):
    return render_to_response("viewing.html")

def dvothers(request):
    return render_to_response("viewing_others.html")

def dvall(request):
    return render_to_response("viewing_all.html")

def dvhotword(request):
    return render_to_response("hotword.html")

def datavisual(request):
    return render_to_response("home.html")

def resume(request):
    return render_to_response("sharonresume.html")
