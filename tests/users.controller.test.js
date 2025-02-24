const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const usersRoutes = require('../src/routes/users.routes');
const authRoutes = require('../src/routes/auth.routes');
const sequelize = require('../src/database/connection');
const User = require('../src/models/user.model');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Users API', () => {
    let userId;

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: '123456',
                phone: '+1234567890',
                userType: 'manufacturer',
                country: 'USA',
                city: 'New York',
                preferredLanguage: 'en'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        
        userId = res.body.user.id;
    });

    it('should not created a user with an existing email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: '123456',
                phone: '+1234567890',
                userType: 'manufacturer',
                country: 'USA',
                city: 'New York',
                preferredLanguage: 'en'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Email is already taken');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: '123456'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    it('should not login a user with invalid credentials', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
    

    it('should get all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(1);
    });

    it('should get a user by ID', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
    });

    it('should update a user by ID', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .send({
                email: 'updated@example.com',
                password: '654321',
                phone: '+0987654321',
                userType: 'customer',
                country: 'Canada',
                city: 'Toronto',
                preferredLanguage: 'fr',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user).toHaveProperty('email', 'updated@example.com');
        expect(res.body.user).toHaveProperty('phone', '+0987654321');
        expect(res.body.user).toHaveProperty('userType', 'customer');
        expect(res.body.user).toHaveProperty('country', 'Canada');
        expect(res.body.user).toHaveProperty('city', 'Toronto');
        expect(res.body.user).toHaveProperty('preferredLanguage', 'fr');

        const isPasswordValid = await bcrypt.compare('654321', res.body.user.password);
        expect(isPasswordValid).toBe(true);
    });

    it('should delete a user by ID', async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User deleted');
    });
});
