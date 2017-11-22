from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from geonode.urls import *

urlpatterns = patterns('',
   url(r'^/?$',
       TemplateView.as_view(template_name='site_index.html'),
       name='home'),
   url(r'^in_or_out/$',  include('crete_gis.in_or_out.urls')),
 ) + urlpatterns
