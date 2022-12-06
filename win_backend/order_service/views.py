from django.utils import timezone
from order_service.models import OrderService, Order
from order_service.pagination import DefaultPagination
from order_service import serializers
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status



class OrderServiceViewSet(viewsets.ModelViewSet):
    queryset = OrderService.objects.all().order_by('id')
    serializer_class = serializers.OrderServiceSerializer
    pagination_class = DefaultPagination


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related('services').all().order_by('id')
    pagination_class = DefaultPagination

    def get_serializer(self, *args, **kwargs):
        if self.action == 'list':
            return serializers.OrderListSerializer(*args, **kwargs)
        elif self.action in ['create', 'update', 'partial_update', 'retrieve', 'destroy']:
            return serializers.OrderCreateSerializer(*args, **kwargs)

        return super().get_serializer(*args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        '''
        If a order is created 3 hrs ago it cannot be deleted
        '''
        order = self.get_object()
        difference_in_hrs = (
            timezone.now() - order.datetime).total_seconds() / 3600
        if difference_in_hrs < 3:
            return Response({'error': 'Order cannot be deleted'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        '''
        return an error on creation/updating an order within 3 hrs of a pre-existing order.
        `total_fee` is the sum of all services fees
        '''
        # create the order by using the serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        # calculate the total fee
        total_fee = sum([service.fee for service in order.services.all()])
        order.total_fee = total_fee
        order.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)




