from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/orders'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

order_service = db.Table('order_service',
    db.Column('order_id', db.String(3), db.ForeignKey('order.id'), primary_key=True),
    db.Column('service_id', db.Integer, db.ForeignKey('service.id'), primary_key=True)
)

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

class Order(db.Model):
    id = db.Column(db.String(3), primary_key=True)
    datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    totalfee = db.Column(db.Float, nullable=False)
    services = db.relationship('Service', secondary='order_service', backref=db.backref('orders', lazy=True))
    


@app.route('/orders', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    result = []
    for order in orders:
        services = [{'id': service.id, 'name': service.name} for service in order.services]
        result.append({'id': order.id, 'datetime': order.datetime, 'totalfee': order.totalfee, 'services': services})
    return jsonify(result)

@app.route('/orders/<string:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    services = [{'id': service.id, 'name': service.name} for service in order.services]
    result = {'id': order.id, 'datetime': order.datetime, 'totalfee': order.totalfee, 'services': services}
    return jsonify(result)

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    services = [Service.query.get(service['id']) for service in data['services']]
    totalfee = sum(service.fee for service in services)
    datetime_now = datetime.utcnow()
    # check if there is an order within the last 3 hours
    order_within_3_hours = Order.query.filter(Order.datetime >= datetime_now - timedelta(hours=3)).first()
    if order_within_3_hours:
        return jsonify({'error': 'There is an order within the last 3 hours.'}), 400
    order = Order(id=data['id'], totalfee=totalfee, services=services)
    db.session.add(order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully.'}), 201

@app.route('/orders/<string:order_id>', methods=['PUT'])
def update_order(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    services = [Service.query.get(service['id']) for service in data['services']]
    totalfee = sum(service.fee for service in services)
    datetime_now = datetime.utcnow()
    # check if there is an order within the last 3 hours except for the current order
    order_within_3_hours = Order.query.filter(Order.datetime >= datetime_now - timedelta(hours=3)).filter(Order.id != order_id).first()
    if order_within_3_hours:
        return jsonify({'error': 'There is an order within the last 3 hours.'}), 400
    order.totalfee = totalfee
    order.services = services
    db.session.commit()
    return jsonify({'message': 'Order updated successfully'})

@app.route('/orders/<string:order_id>', methods=['DELETE'])
def delete_order(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully.'})

if __name__ == '__main__':
    app.run(debug=True)
