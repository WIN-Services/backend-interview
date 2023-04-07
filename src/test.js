const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('./controller/orderController')

describe('getOrderById', ()=>{
    test('get order by Id', async()=>{
        let data = await getOrderById({
            params: {
                id: 1
            }
        })
        expect(data).toHaveProperty('datetime')
        expect(data).toHaveProperty('totalfee')
        expect(data).toHaveProperty('services')
    })
})

describe('getAllOrder', ()=>{
    test('check all Orders', async()=>{
        let data = await getAllOrders()
        for(let item of data){
            expect(item).toHaveProperty('datetime')
            expect(item).toHaveProperty('totalfee')
            expect(item).toHaveProperty('services')
        }
    })
})

describe('create New Order', ()=>{
    test('create order', async()=>{
        let output = await createOrder({
            body: {
                totalfee: 500,
                datetime: '2023-04-06T02:08:33.452Z',
                services: [{
                    id: 45
                }]
            }
        })
        expect(output).toHaveProperty('datetime')
        expect(output).toHaveProperty('totalfee')
        expect(output).toHaveProperty('services')
    })

})

describe('update Order', ()=>{
    test('update order detail', async()=>{
        let output = await updateOrder({
            params: {
                id: 1
            },
            body: {
                totalfee: 150
            }
        })
        expect(output).toBe('Order details Updated Successfully')
    })

})

describe('delete Order', ()=>{
    test('delete order', async()=>{
        let output = await deleteOrder({
            params: {
                id: 1
            }
        })
        expect(output).toBe('Order is deleted Successfully')
    })

})