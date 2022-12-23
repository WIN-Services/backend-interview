from django.contrib import admin
from django.urls import path, include
from .import views
from .import*

urlpatterns = [
    path('', views.index ,name = 'index'),
    path('allorder', views.allorder ,name = 'allorder'),
    path('add_order', views.add_order ,name = 'add_order'),
    path('remove_order', views.remove_order ,name = 'remove_order'),
    path('filter_order', views.filter_order ,name = 'filter_order'),

     
    
    
    
    


]




