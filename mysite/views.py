from django.shortcuts import render,render_to_response,redirect
from django.http import HttpResponseRedirect, HttpResponse
from django.core import serializers
import datetime
import json

def sharoncollection(request):
    return render_to_response("index.html")
