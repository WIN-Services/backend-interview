from app import db, Service, Order, order_service

# create the database tables
db.create_all()

# add some sample services
services = [Service(name='Service A', fee=10.0), Service(name='Service B', fee=20.0)]
db.session.add_all(services)
db.session.commit()

# add some sample orders
orders = [
    Order(id='001', totalfee=30.0, services=[services[0], services[1]]),
    Order(id='002', totalfee=10.0, services=[services[0]]),
    Order(id='003', totalfee=20.0, services=[services[1]])
]
db.session.add_all(orders)
db.session.commit()
