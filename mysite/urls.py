from django.conf.urls import include, url
from django.contrib import admin
from views import home, collection #, pages #, datavisualv2, dvviewing, dvothers,dvall, dvhotword, datavisual, resume

urlpatterns = [
    url(r'^sharoncollection/$',home,name='home'),
    url(r'^sharoncollection/(?P<name>\w+)$',collection,name='collection'),
    #url(r'^sharoncollection/(?P<name>\w+)/(?P<pages>\w+)',pages,name='pages'),
    #url(r'^admin/', include(admin.site.urls)),
]
