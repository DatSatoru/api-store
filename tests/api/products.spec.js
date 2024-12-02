const request = require('supertest')
const mongoose = require('mongoose')
const app = require("../../src/app")
const Product = require('../../src/models/products.model')

describe('Api de products', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/store')
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET/api/products', () => {

        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
            //codigo que se ejecuta antes de todos los tests
        });

        it('debería retornar status 200', () => {
            expect(response.status).toBe(200)
        });

        it('deberia responder con un json', () => {
            expect(response.headers['content-type']).toContain('application/json')
        });

        it('deberia devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        })
    });

    describe('POST/api/products', () => {
        let response;
        const body = { name: 'lapiz verde', description: 'pinta verde', price: 3, department: 'test', stock: 100 };
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'test' })
        });

        it('deberia reponder correctamente la url', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('deberia insertar el nuevo producto', () => {
            expect(response.body._id).toBeDefined();
        });

        it('deberia ver los datos del body en la BD', () => {
            expect(response.body.name).toBe(body.name);
            expect(response.body.description).toBe(body.description);
            expect(response.body.price).toBe(body.price);
            expect(response.body.department).toBe(body.department);
            expect(response.body.stock).toBe(body.stock);
            expect(response.body.available).toBe(body.available);
        })
    });
})