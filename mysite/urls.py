from django.conf.urls import include, url
from django.contrib import admin
from views import sharoncollection

urlpatterns = [
    url(r'^sharoncollection/$',sharoncollection,name='sharoncollection'),
    #url(r'^sharoncollection/(?P<name>\w+)',collection,name='collection')
    #url(r'^admin/', include(admin.site.urls)),
]
