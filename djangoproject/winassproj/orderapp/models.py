from django.db import models
from django.utils import timezone
from django.http import JsonResponse

# Create your models here.
class services(models.Model):
    id =models.IntegerField(primary_key=True)
    name =models.CharField(max_length=40)

    def __str__(self) :
        return  "%s %s"%(self.name,self.id)

 



class Order(models.Model):
    id = models.IntegerField(primary_key=True)
    datetime = models.DateTimeField(default=timezone.now)
    totalfee=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    serv= models.ManyToManyField(services,blank=False)

    def __str__(self) :
        return "%s %s %s "%(self.id,self.datetime,self.totalfee)
    
