from django.shortcuts import render
from .models import Order, services
from datetime import datetime
from django.db.models import Q
from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
    return render(request,'index.html')


def allorder(request):

    odrs = Order.objects.all()
    context = {
        'Odrs': odrs
    }
    print(context)
    return render(request, 'allorder.html', context)

def add_order(request):
    if request.method=='POST':
        print('POST')
    else:
        print('GET')
        return render(request,'add_order.html')
    return render(request,'add_order.html') 



def remove_order(request,Order_id=0):

    if Order_id:
        try:
            Order_to_be_removed = Order.objects.get(id=Order_id)
            Order_to_be_removed.delete()
            return HttpResponse("Order Removed Successfully")
        except:
            return HttpResponse("Please Enter A Valid Order ID")
    odrs = Order.objects.all()
    context = {
        'odrs': odrs
    }
    
    return render(request, 'remove_order.html',context)


       


def filter_order(request):
    if request.method == 'POST':
        datetime = request.POST['datetime']
        totalfee = request.POST['totalfee']
        odrs = Order.objects.all()
        if datetime:
            odrs = odrs.filter(dept__name__icontains = datetime)
        if totalfee:
            odrs = odrs.filter(dept__name__icontains = totalfee)

        
        context = {
            'odrs': odrs
        } 
        return render(request, 'allorder.html', context)

    elif request.method == 'GET':
        return render(request, 'filter_order.html')
    else:
        return HttpResponse('An Exception Occurred')   

    
    


    return render(request,'filter_order.html')



           
    



