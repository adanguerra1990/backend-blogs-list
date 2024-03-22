const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// const Blog = require('../models/blog')

test('Devuelve todos los blog en formato Json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('hay 4 blogs almacenados', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(4)
})


afterAll(() => {
    mongoose.connection.close()
})