from django.conf.urls import include, url
from django.contrib import admin
from views import home, collection #, datavisualv2, dvviewing, dvothers,dvall, dvhotword, datavisual, resume

urlpatterns = [
    url(r'^sharoncollection/$',home,name='home'),
    url(r'^sharoncollection/(?P<name>\w+)',collection,name='collection'),
    '''url(r'^datavisualv2',datavisualv2,name='datavisualv2'),
    url(r'^dvviewing',dvviewing,name='dvviewing'),
    url(r'^dvothers',dvothers,name='dvothers'),
    url(r'^dvall',dvall,name='dvall'),
    url(r'^dvhotword',dvhotword,name='dvhotword'),
    url(r'^datavisual',datavisual,name='datavisual'),
    url(r'^resume',resume,name='resume'),'''   
    #url(r'^admin/', include(admin.site.urls)),
]
