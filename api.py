
from flask import Flask, jsonify

app = Flask(__name__)


 #DATABASE creating a database of Orders

orders = [{"orderid": '0',
           "orderNumber" : '111',
           "totalFee" : '1000',
           "services" : {"OrderCode" : '100111'}},

          {"orderid" : '1',
           "orderNumber" : '222',
           "totalFee" : '1000',
           "services" : {"OrderCode" : '200222'}},

          {"orderid" : '2',
           "orderNumber" : '333',
           "totalFee" : '1000',
           "services" : {"OrderCode" : '300333'}},

          {"orderid" : '3',
           "orderNumber" : '444',
           "totalFee" : '1000',
           "services" : {"OrderCode" : '400444'}},

          {"orderid" : '4',
           "orderNumber" : '555',
           "totalFee" : '1000',
           "services" : {"OrderCode" : '500555'}}
         ]

@app.route('/')
def hello_WIN():
    return 'Hello WIN, Welcome to the API'



 #GET Method-- gets all the order details
@app.route("/orders", methods=['GET'])
def get():
    return jsonify({'orders' : orders})



 #GET Method-- get the specific order detais (with IdNo or index No)
@app.route("/orders/<int:orderid>", methods=['GET'])
def get_order(orderid):
    return jsonify({'order': orders[orderid]})



 #POST Method-- Adds a new order detail into the orders
@app.route("/orders", methods=['POST'])
def create():
    order = {"orderid" : '5',
           "orderNumber" : '666',
           "totalFee" : '1000',
           "services" : {"OrderCode" : '600666'}}
    orders.append(order)
    return jsonify({'Created': order})



 #PUT Method-- Updates the order enrty
@app.route("/orders/<int:orderid>", methods=['PUT'])
def order_update(orderid):
    orders[orderid]['orderNumber'] = "ABC"
    return jsonify({'order' : orders[orderid]})



 #DELETE Method-- Deletes the specific order in orders Database
@app.route("/orders/<int:orderid>", methods=['DELETE'])
def delete(orderid):
    orders.remove(orders[orderid])
    return jsonify({'result': True})




if __name__ == "__main__":
    app.run(debug=True)