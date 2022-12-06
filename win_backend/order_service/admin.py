from django.contrib import admin
from order_service.models import OrderService, Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'related_services', 'datetime', 'total_fee']
    list_editable = ['datetime']

    def related_services(self, obj):
        related_services = [str(service) for service in obj.services.all()]
        return ', '.join(related_services)


@admin.register(OrderService)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'fee']
