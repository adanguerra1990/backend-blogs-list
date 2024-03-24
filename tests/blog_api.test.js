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

test('Verifica que cada blog tenga una propiedad id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    response.body.forEach(blog => {
        expect(blog).toHaveProperty('id')
        expect(blog.id).toBeDefined()
    })
})



afterAll(() => {
    mongoose.connection.close()
})