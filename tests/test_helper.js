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

const blogInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const checkBlogIds = async (blogs) => {
    await blogs.map(blog => {
        expect(blog).toHaveProperty('id')
        expect(blog.id).toBeDefined()
    })
}

const blogWithMissingFields = async (api, blogData) => {
    await api
        .post('/api/blogs')
        .send(blogData)
        .expect(400)
}

module.exports = {
    blogInDB,
    inicialBlogs,
    checkBlogIds,
    blogWithMissingFields
}