# from django.contrib import admin
from django.urls import path, include
from api import urls as api_urls
# import redirect view
from django.views.generic import RedirectView
urlpatterns = [
    # path('admin/', admin.site.urls),
    
    path('api/', include(api_urls)),
   
    # redirect domain/docs to domain/api/docs
    path('docs/', RedirectView.as_view(url='/api/docs/')),

]
