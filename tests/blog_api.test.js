const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const inicialBlogs = [
    {
        'title': 'albert einstein',
        'author': 'walter isaacson',
        'url': 'https://www.amazon.com/-/es/Walter-Isaacson/dp/8499080138',
        'likes': 6,
        'id': '65e224b02d01c08665cd4b5f'
    },
    {
        'title': 'Steve Jobs',
        'author': 'walter isaacson',
        'url': 'https://es.wikipedia.org/wiki/Steve_Jobs_(libro)',
        'likes': 5,
        'id': '65e224eb2d01c08665cd4b61'
    },
    {
        'title': 'Eloquent JavaScript',
        'author': 'Marijn Haverbeke',
        'url': 'https://eloquentjs-es.thedojo.mx/',
        'likes': 10,
        'id': '65e22bff41601064bf94fddf'
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(inicialBlogs)
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
    response.body.forEach(blog => {
        expect(blog).toHaveProperty('id')
        expect(blog.id).toBeDefined()
    })
})

test('crea una nueva publicación de blog y verifica que el número total de blogs se incrementa en uno', async () => {
    const blogsInicial = await Blog.find({})
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

test('responde con 400 Bad Request si falta la propiedad title o url', async() => {
    const blogSinTitulo =  {
        author: 'Autor de Prueba',
        url: 'https://www.nuevoblog.com'
    }

    const blogSinUrl = {
        title: 'Nuevo blog',
        author: 'Autor de Prueba'
    }

    await api
        .post('/api/blogs')
        .send(blogSinTitulo)
        .expect(400)
        
    await api
        .post('/api/blogs')
        .send(blogSinUrl)
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})