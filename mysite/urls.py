from django.conf.urls import include, url
from django.contrib import admin
from views import sharoncollection, datavisualv2, dvviewing, dvothers,dvall, dvhotword, datavisual

urlpatterns = [
    url(r'^sharoncollection/$',sharoncollection,name='sharoncollection'),
    url(r'^datavisualv2',datavisualv2,name='datavisualv2'),
    url(r'^dvviewing',dvviewing,name='dvviewing'),
    url(r'^dvothers',dvothers,name='dvothers'),
    url(r'^dvall',dvall,name='dvall'),
    url(r'^dvhotword',dvhotword,name='dvhotword'),
    url(r'^datavisual',datavisual,name='datavisual'),
    #url(r'^sharoncollection/(?P<name>\w+)',collection,name='collection')
    #url(r'^admin/', include(admin.site.urls)),
]
