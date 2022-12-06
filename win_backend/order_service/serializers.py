from rest_framework import serializers
from order_service.models import OrderService, Order
from datetime import timedelta
from django.utils import timezone
# Serializers define the API representation.


class OrderServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderService
        fields = ('id', 'name', 'fee')


class OrderListSerializer(serializers.ModelSerializer):
    services = OrderServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'datetime', 'total_fee', 'services',)


class OrderCreateSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        '''
        Returns an error on creation/updating an order within 3 hrs of a pre-existing order.
        '''
        # check if the order is within 3 hrs of a pre-existing order
        if Order.objects.filter(datetime__range=(timezone.now() - timedelta(hours=3), timezone.now() + timedelta(hours=3))).exists():
            raise serializers.ValidationError({
                'error': 'Order cannot be created within 3 hrs of a pre-existing order'
            })
        return super().validate(attrs)

    class Meta:
        model = Order
        fields = ('id', 'services', 'total_fee',)
