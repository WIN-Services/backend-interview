from django.db import models
from django.utils import timezone
from typing import *

class OrderService(models.Model):
    name = models.CharField(max_length=255)
    fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return self.name

# Create your models here.
class Order(models.Model):
    services = models.ManyToManyField(OrderService, blank=False)
    datetime = models.DateTimeField(default=timezone.now)
    total_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)