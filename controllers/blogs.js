const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blog = await Blog.find({})
        response.json(blog)
    } catch (exception) {
        next(exception)
    }

})

blogRouter.get('/:id', async (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            blog ? response.json(blog) : response.status(404).end()
        })
        .catch((error) => next(error))
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    try {
        const saveBlog = await blog.save()
        response.status(201).json(saveBlog)
    } catch (exception) {        
        if (exception.name === 'ValidationError') {            
            response.status(400).json({ error: exception.message })
        } else {
            next(exception)
        }
    }
})

module.exports = blogRouter