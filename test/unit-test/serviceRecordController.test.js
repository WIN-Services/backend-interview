const {createServiceRecord, findServiceRecord, findAllServiceRecord,updateServiceRecord, deleteServiceRecord} =  require('../../controllers/serviceRecordControllers');
const model =  require('../../models/serviceModels')


describe('service controller', () => {
    
    it('SUCCESS:  create Service', async ()=> {
        jest.spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve('done'))
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await createServiceRecord({body: {}, params: {}, }, response)
        expect(result.message).toEqual("Record Inserted Successfully")
    })

    it('SUCCESS:  create Service', async ()=> {
        jest.spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve('done'))
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await createServiceRecord({body: {}, params: {}, }, response)
        expect(result.message).toEqual("Record Inserted Successfully")
    })

    it('ERROR:  create order', async ()=> {
        jest.spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.reject('error'))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        try {
            await createServiceRecord({body: mockedObject, params: {}, }, response )
        } catch(err) {
            expect(err.message).toEqual('An Error Occured')
        }
    })

    it('SUCCESS:  find service: has record', async ()=> {
        let mockedObject = [
            {
                "id": 123,
                "name": "Inspection"
              }
        ]
        jest.spyOn(model, 'find')
        .mockImplementationOnce(() => Promise.resolve(mockedObject))
        // const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await findServiceRecord({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("Records Found")
    })

    it('SUCCESS:  find service: does not has record', async ()=> {
        let mockedObject = [
        ]
        jest.spyOn(model, 'find')
        .mockImplementationOnce(() => Promise.resolve(mockedObject))
        // const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await findServiceRecord({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("No Records Found")
    })

    it('ERROR:  find service', async ()=> {
        jest.spyOn(model, 'find')
        .mockImplementationOnce(() => Promise.reject('error'))
        try {
            const response = {status: (code)=>{return {json: (body)=>{return body}}}}
            await findServiceRecord({params: {id: '123'} }, response)
        } catch(err) {
            expect(err.message).toEqual('An Error Occured')
        }
    })


    it('SUCCESS:  find All service: has record', async ()=> {
        let mockedObject = [
            {
                "id": 123,
                "name": "Inspection"
              }
        ]
        jest.spyOn(model, 'find')
        .mockImplementationOnce(() => Promise.resolve(mockedObject))
        // const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await findAllServiceRecord({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("Records Found")
    })

    it('SUCCESS:  find All service: does not has record', async ()=> {
        let mockedObject = [
        ]
        jest.spyOn(model, 'find')
        .mockImplementationOnce(() => Promise.resolve(mockedObject))
        // const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await findAllServiceRecord({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("No Records Found")
    })

    it('ERROR:  find All service', async ()=> {
        jest.spyOn(model, 'find')
        .mockImplementationOnce(() => Promise.reject('error'))
        try {
            const response = {status: (code)=>{return {json: (body)=>{return body}}}}
            await findAllServiceRecord({params: {id: '123'} }, response)
        } catch(err) {
            expect(err.message).toEqual('An Error Occured')
        }
    })


    it('SUCCESS:  update order', async ()=> {
        jest.spyOn(model, 'updateOne')
        .mockImplementationOnce(() => Promise.resolve({}))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await updateServiceRecord({body: mockedObject, params: {id: '123'} }, response)
        expect(result.message).toEqual("Record Updated Successfully");
    })

    it('ERROR:  update order', async ()=> {
        jest.spyOn(model, 'updateOne')
        .mockImplementationOnce(() => Promise.reject('error'))
        const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        try {
            await updateServiceRecord({body: mockedObject, params: {id: '123'} }, response )
        } catch(err) {
            expect(err.message).toEqual('An Error Occured')
        }
    })

    it('SUCCESS:  delete order', async ()=> {
        jest.spyOn(model, 'deleteOne')
        .mockImplementationOnce(() => Promise.resolve('done'))
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        let result = await deleteServiceRecord({body: {}, params: {id: '123'} }, response)
        expect(result.message).toEqual("Record deleted Successfully")
    })

    it('ERROR:  delete order', async ()=> {
        jest.spyOn(model, 'deleteOne')
        .mockImplementationOnce(() => Promise.reject('error'))
        // const mockedObject = {"totalfee": "500"}
        const response = {status: (code)=>{return {json: (body)=>{return body}}}}
        try {
            await deleteServiceRecord({body: {}, params: {id: '123'} }, response )
        } catch(err) {
            expect(err.message).toEqual('An Error Occured')
        }
    })
})
