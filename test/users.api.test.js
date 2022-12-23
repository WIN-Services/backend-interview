/**
 * Third party library
 */
const { expect } = require("chai");
let request = require('supertest');
require('dotenv').config()

/**
 * Internal helper functions
 */
const { app } = require('../app')

/** Test starts from here */
describe("USERS API Unit Tests:\n", MainTest);

async function MainTest() {
    describe("POST /createTestUsers", createTestUsers);
    describe("POST /removeUserTest", removeUserTest)
}

function createTestUsers() {
    const body = {
        name: 'Ravi Pabari',
        email: 'pabariravi12@gmail.com',
        contact: '9197979797',
        verificationStatus: true
    }

    it('should add new user to db with valid status & data', async () => {
        const response = await request(app)
            .post('/createTestUsers')
            .send(body)
            .set('Accept', 'application/json')
        expect(response.status, "").to.equal(200)
        expect(response.body.message, "check - User created message").to.equal('User created.')
        expect(response.body.data.email, "check - email").to.equal('pabariravi12@gmail.com')
        expect(response.body.data.name, "check - name").to.equal('Ravi Pabari')

        await request(app)
            .post('/removeTestUser')
            .send({ userId: response.body.data._id })
            .set('Accept', 'application/json')
    })
}

function removeUserTest() {
    const body = {
        name: 'Test User 2',
        email: 'pabariravi12@gmail.com',
        contact: '9197979797',
        verificationStatus: true
    }
    it('should remove newly created user from db', async () => {
        const addUser = await request(app)
            .post('/createTestUsers')
            .send(body)
            .set('Accept', 'application/json')
        const removeResponse = await request(app)
            .post('/removeTestUser')
            .send({ userId: addUser.body.data._id })
            .set('Accept', 'application/json')
        expect(removeResponse.status).to.equal(200)
        expect(removeResponse.body.message).to.equal(`User ${addUser.body.data._id} removed.`)
        expect(removeResponse.body.data.deletedCount).to.equal(1)
    })
}
