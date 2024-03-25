const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.inicialBlogs)
})

test('Devuelve todos los blog en formato Json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('hay 3 blogs almacenados', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
})

test('Verifica que cada blog tenga una propiedad id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    helper.checkBlogIds(response.body)
})

test('crea una nueva publicación de blog y verifica que el número total de blogs se incrementa en uno', async () => {
    const blogsInicial = await helper.blogInDB()
    const contadorBlogsInicial = blogsInicial.length

    const newBlog = {
        title: 'Nuevo Blog',
        author: 'Autor de Prueba',
        url: 'https://www.nuevoblog.com',
        likes: 10
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(newBlog.title)
    expect(response.body.author).toBe(newBlog.author)
    expect(response.body.url).toBe(newBlog.url)
    expect(response.body.likes).toBe(newBlog.likes)

    const blogsAfterPost = await Blog.find({})
    expect(blogsAfterPost.length).toBe(contadorBlogsInicial + 1)
})

test('crea una nueva publicación de blog con likes por defecto a 0 si no se proporciona', async () => {
    const newBlog = {
        title: 'Nuevo Blog',
        author: 'Autor de Prueba',
        url: 'https://www.nuevoblog.com',
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
})

test('responde con 400 Bad Request si falta la propiedad title o url', async () => {
    const blogSinTitulo = {
        author: 'Autor de Prueba',
        url: 'https://www.nuevoblog.com'
    }

    await helper.blogWithMissingFields(api, blogSinTitulo)

    const blogSinUrl = {
        title: 'Nuevo blog',
        author: 'Autor de Prueba'
    }

    await helper.blogWithMissingFields(api, blogSinUrl)
   
    const blogAtEnd = await helper.blogInDB()
    expect(blogAtEnd).toHaveLength(helper.inicialBlogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})