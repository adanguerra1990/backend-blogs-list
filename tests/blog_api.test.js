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

test('Devuelve todos blogs almacenados', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.inicialBlogs.length)
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

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogInDB()
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

test('Se puede eliminar un Blog con id valido estado 204', async () => {
    const blogAtStart = await helper.blogInDB()
    const blogToDelete = blogAtStart[0]
    console.log('blogToDelete', blogToDelete)

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogAtEnd = await helper.blogInDB()

    expect(blogAtEnd).toHaveLength(
        helper.inicialBlogs.length - 1
    )
})

test('Actualizar un blog Correctamente', async () => {
    const blogAtStart = await helper.blogInDB()
    const blogToUpdate = blogAtStart[0]
    const updateBlog = {
        'title': 'einstein',
        'author': 'walter isaacson',
        'url': 'https://www.amazon.com/-/es/Walter-Isaacson/dp/8499080138',
        'likes': 20,
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogInDB()
    const updateBlogInDB = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    expect(updateBlogInDB).toEqual(expect.objectContaining({
        'title': updateBlog.title,
        'author': updateBlog.author,
        'url': updateBlog.url,
        'likes': updateBlog.likes
    }))
})


afterAll(() => {
    mongoose.connection.close()
})