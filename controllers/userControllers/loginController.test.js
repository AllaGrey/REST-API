/* eslint-disable no-undef */

const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, PORT } = process.env;


describe('test login function', () => {
    beforeAll(async () => {
        await mongoose.connect(DB_HOST).then(() => {
            app.listen(PORT, () => console.log('Database connection for testing successful'));
        }).catch(async () => {
            await mongoose.connection.close();
        })
    });
    afterAll(async () => {
        await mongoose.connection.close();
    })

    test('login user POST request /api/users/login', async () => {
        const response = await request(app).post('/api/users/login').send({
            email: "sssdfddaaweqqs.ante@com.ua",
            password: "123456789"
        });
        expect(response.status).toBe(200);
        expect(typeof response.body === 'object').toBe(true);
        expect(typeof response.body.token === 'string').toBe(true);
        expect(typeof response.body.user === 'object').toBe(true);
        expect(typeof response.body.user.email === 'string').toBe(true);
        expect(typeof response.body.user.subscription === 'string').toBe(true);

    })
})

