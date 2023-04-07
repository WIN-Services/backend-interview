import pytest
from app import app, db, Order, Service

@pytest.fixture(scope="module")
def test_client():
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/orders_test'
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_create_order(test_client):
    service1 = Service(id=1, name='Service 1', fee=10.0)
    service2 = Service(id=2, name='Service 2', fee=20.0)
    db.session.add(service1)
    db.session.add(service2)
    db.session.commit()
    data = {
        'id': '001',
        'services': [{'id': 1}, {'id': 2}]
    }
    response = test_client.post('/orders', json=data)
    assert response.status_code == 201
    assert b'"message":"Order created successfully."' in response.data

def test_create_order_within_3_hours(test_client):
    service1 = Service(id=1, name='Service 1', fee=10.0)
    service2 = Service(id=2, name='Service 2', fee=20.0)
    db.session.add(service1)
    db.session.add(service2)
    db.session.commit()
    data = {
        'id': '002',
        'services': [{'id': 1}, {'id': 2}]
    }
    response1 = test_client.post('/orders', json=data)
    assert response1.status_code == 201
    assert b'"message":"Order created successfully."' in response1.data
    data = {
        'id': '003',
        'services': [{'id': 1}, {'id': 2}]
    }
    response2 = test_client.post('/orders', json=data)
    assert response2.status_code == 400
    assert b'"error":"There is an order within the last 3 hours."' in response2.data

def test_update_order(test_client):
    service1 = Service(id=1, name='Service 1', fee=10.0)
    service2 = Service(id=2, name='Service 2', fee=20.0)
    db.session.add(service1)
    db.session.add(service2)
    order = Order(id='004', totalfee=30.0, services=[service1, service2])
    db.session.add(order)
    db.session.commit()
    data = {
        'services': [{'id': 1}]
    }
    response = test_client.put('/orders/004', json=data)
    assert response.status_code == 200
    assert b'"message":"Order updated successfully."' in response.data
    order = Order.query.get('004')
    assert order.totalfee == 10.0
    assert len(order.services) == 1
    assert order.services[0].id == 1
