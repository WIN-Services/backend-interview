const OrdersModel =  require('./../../models/orderModels')
const orderMethods = require('./../../controllers/orderControllers')



describe('order controller', () => {
    
    it('SUCCESS:  create order', async ()=> {
        let mockedObject = {
            "id": "002",
            "datetime": "2023-05-26T15:41:11.111Z",
            "totalfee": 100,
            "services": [
                "646fa26ff97a79c826e881d5"
            ]
        }
        jest.spyOn(OrdersModel, 'find').mockResolvedValueOnce([]);
        jest.spyOn(OrdersModel, 'create')
        .mockImplementationOnce(() => Promise.resolve('done'))
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.createOrder({body: mockedObject, params: {} }, response)
        expect(result.message).toEqual("Record Inserted Successfully")
    })

    it('SUCCESS:  create order: creating order before 3 hours from last Order made', async ()=> {
        let mockedObject = {
            "id": "002",
            "datetime": "2023-05-26T15:41:11.111Z",
            "totalfee": 100,
            "services": [
                "646fa26ff97a79c826e881d5"
            ]
        }
        jest.spyOn(OrdersModel, 'find').mockResolvedValueOnce([mockedObject]);
        jest.spyOn(OrdersModel, 'create')
        .mockImplementationOnce(() => Promise.resolve('done'))
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.createOrder({body: mockedObject, params: {} }, response)
        expect(result.message).toEqual("Cannot make An Order! Please wait for atleast 3 hours from last Order made")
    })

    it('ERROR:  create order', async ()=> {
        jest.spyOn(OrdersModel, 'find').mockRejectedValueOnce('error');
        jest.spyOn(OrdersModel, 'create')
        .mockImplementationOnce(() => Promise.reject('error'))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        try {
            await orderMethods.createOrder({body: mockedObject, params: {}, }, response )
        } catch(err) {
            expect(err.message).toEqual("An Error Occured")
        }
    })

    it('SUCCESS:  find order: has orders', async ()=> {
        const mockedObject =
            [
                {
                    "id": "225",
                    "datetime": "2022-11-01T11:11:11.111Z",
                    "totalfee": 100,
                    "services": [
                        {id: 1, name: "test"}
                    ]
                }
            ]
        mockPopulateQuery = jest.fn().mockReturnValueOnce(mockedObject);
        mockFindQuery = jest.fn().mockReturnValueOnce({ populate: mockPopulateQuery });
        OrdersModel.find = mockFindQuery;
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.findOrder({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("Records Found")
    })


    it('SUCCESS:  find order: does not has orders', async ()=> {
        const mockedObject = []
        mockPopulateQuery = jest.fn().mockReturnValueOnce(mockedObject);
        mockFindQuery = jest.fn().mockReturnValueOnce({ populate: mockPopulateQuery });
        OrdersModel.find = mockFindQuery;
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.findOrder({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("No Records Found")
    })

    it('ERROR:  find order', async ()=> {
        jest.restoreAllMocks()
        jest.spyOn(OrdersModel, 'find').mockResolvedValueOnce({});
        jest.spyOn(OrdersModel, 'populate').mockRejectedValueOnce('error');
        const mockedObject = {"totalfee": "500"}
        try {
            const response = {status: (code)=>{return {json: (body)=>{return body}}}}
            await orderMethods.findOrder({params: {id: '123'} }, response)
        } catch(err) {
            expect(err.message).toEqual("An Error Occured")
        }
    })

    it('SUCCESS:  find All order: has orders', async ()=> {
        const mockedObject =
            [
                {
                    "id": "225",
                    "datetime": "2022-11-01T11:11:11.111Z",
                    "totalfee": 100,
                    "services": [
                        {id: 1, name: "test"}
                    ]
                }
            ]
        mockPopulateQuery = jest.fn().mockReturnValueOnce(mockedObject);
        mockFindQuery = jest.fn().mockReturnValueOnce({ populate: mockPopulateQuery });
        OrdersModel.find = mockFindQuery;
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.findAllOrders({}, response)
        expect(result.message).toEqual("Records Found")
    })


    it('SUCCESS:  find All order: has no orders', async ()=> {
        const mockedObject =
            []
        mockPopulateQuery = jest.fn().mockReturnValueOnce(mockedObject);
        mockFindQuery = jest.fn().mockReturnValueOnce({ populate: mockPopulateQuery });
        OrdersModel.find = mockFindQuery;
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.findAllOrders({}, response)
        expect(result.message).toEqual("No Records Found")
    })

    it('ERROR:  find All order', async ()=> {
        jest.restoreAllMocks()
        jest.spyOn(OrdersModel, 'find').mockResolvedValueOnce({});
        jest.spyOn(OrdersModel, 'populate').mockRejectedValueOnce('error');
        const mockedObject = {"totalfee": "500"}
        try {
            const response = {status: (code)=>{return {json: (body)=>{return body}}}}
            await orderMethods.findAllOrders({params: {id: '123'} }, response)
        } catch(err) {
            expect(err.message).toEqual("An Error Occured")
        }
    })
    it('SUCCESS:  update order: no order found', async ()=> {
        jest.spyOn(OrdersModel, 'find')
        .mockImplementationOnce(() => Promise.resolve([]))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.updateOrder({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("No record to Update")
    })

    it('SUCCESS:  update order: less  than 3 hrs', async ()=> {
        const mockedObject =
            [
                {
                    "id": "225",
                    "datetime": Date.now()-10800001,
                    "totalfee": 100,
                    "services": [
                        {id: 1, name: "test"}
                    ]
                }
            ]
        jest.spyOn(OrdersModel, 'find')
        .mockImplementationOnce(() => Promise.resolve(mockedObject))
        jest.spyOn(OrdersModel, 'updateOne')
        .mockImplementationOnce(() => Promise.resolve([]))
        // const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.updateOrder({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("Record Updated Successfully")
        // expect(result).toEqual(mockedObject)
    })

    it('SUCCESS CASE 2:  update order difference less than 3 hrs', async ()=> {
        const mockedObject =
            [
                {
                    "id": "225",
                    "datetime": Date.now()-100,
                    "totalfee": 100,
                    "services": [
                        {id: 1, name: "test"}
                    ]
                }
            ]
        jest.spyOn(OrdersModel, 'find')
        .mockImplementationOnce(() => Promise.resolve(mockedObject))
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.updateOrder({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("Record created during last 3 hrs, Need to Wait  for 3 hours to Update the record")
    })

    it('ERROR:  update order', async ()=> {
        jest.spyOn(OrdersModel, 'updateOne')
        .mockImplementationOnce(() => Promise.reject('error'))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        try {
            await orderMethods.updateOrder({body: mockedObject, params: {id: '123'} }, response )
        } catch(err) {
            expect(err.message).toEqual("An Error Occured")
        }
    })

    it('SUCCESS:  delete order', async ()=> {
        jest.spyOn(OrdersModel, 'deleteOne')
        .mockImplementationOnce(() => Promise.resolve('done'))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await orderMethods.deleteOrder({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("Record deleted Successfully")
    })

    it('ERROR:  delete order', async ()=> {
        jest.spyOn(OrdersModel, 'deleteOne')
        .mockImplementationOnce(() => Promise.reject('error'))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        try {
            await orderMethods.deleteOrder({body: mockedObject, params: {id: '123'} }, response )
        } catch(err) {
            expect(err.message).toEqual("An Error Occured")
        }
    })
})
