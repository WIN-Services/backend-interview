from order_service import views
from django.urls import path


urlpatterns = [
    # /orders/
    path('', views.OrderViewSet.as_view(
        {'get': 'list', 'post': 'create'}), name='orders'),
    path('<int:pk>/', views.OrderViewSet.as_view({'get': 'retrieve', 'put': 'update',  'delete': 'destroy'
                                                  }), name='order'),
    # /orders/services/
    path('services/', views.OrderServiceViewSet.as_view(
        {'get': 'list', 'post': 'create'}), name='services'),
    path('services/<int:pk>/', views.OrderServiceViewSet.as_view(
        {'get': 'retrieve', 'put': 'update',  'delete': 'destroy'}), name='service'),
]
