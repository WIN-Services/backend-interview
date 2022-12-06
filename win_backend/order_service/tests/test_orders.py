import pytest
import json
from order_service.models import OrderService, Order
from rest_framework import status


@pytest.mark.django_db
class TestOrders:
    def test_order_service_list_returns_200(self, client):
        response = client.get('/orders/')
        assert response.status_code == status.HTTP_200_OK

    def test_order_create_returns_201(self, client):
        # get or create a service
        service1, _ = OrderService.objects.get_or_create(name='test1', fee=10)
        service2, _ = OrderService.objects.get_or_create(name='test2', fee=10)
        response = client.post('/orders/', data=json.dumps({
            'services': [service1.id, service2.id]
        }), content_type='application/json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['id'] == 1

    def test_order_create_within_3_hrs_of_pre_existing_order_returns_400(self, client):
        service1, _ = OrderService.objects.get_or_create(name='test1', fee=10)
        service2, _ = OrderService.objects.get_or_create(name='test2', fee=10)
        response = client.post('/orders/', data=json.dumps({
            'services': [service1.id, service2.id]
        }), content_type='application/json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['id'] == 1
        response = client.post('/orders/', data=json.dumps({
            'services': [service1.id, service2.id]
        }), content_type='application/json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data.get('error') != None

    def test_order_update_within_3_hrs_of_pre_existing_order_returns_400(self, client):
        service1, _ = OrderService.objects.get_or_create(name='test1', fee=10)
        service2, _ = OrderService.objects.get_or_create(name='test2', fee=10)
        # create an order
        response = client.post('/orders/', data=json.dumps({
            'services': [service1.id, service2.id]
        }), content_type='application/json')
        order_id = response.data['id']
        assert response.status_code == status.HTTP_201_CREATED
        # update the order
        response = client.put(f'/orders/{order_id}/', data=json.dumps({
            'services': [service1.id, service2.id]
        }), content_type='application/json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_order_create_without_services_returns_400(self, client):
        response = client.post('/orders/', data=json.dumps({
            'services': []
        }), content_type='application/json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_delete_order_created_3_hrs_ago_returns_403(self, client):
        # get or create a service
        service1, _ = OrderService.objects.get_or_create(name='test1', fee=10)
        service2, _ = OrderService.objects.get_or_create(name='test2', fee=10)
        response = client.post('/orders/', data=json.dumps({
            'services': [service1.id, service2.id]
        }), content_type='application/json')
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['id'] == 1
        response = client.delete('/orders/1/')
        assert response.status_code == status.HTTP_403_FORBIDDEN
