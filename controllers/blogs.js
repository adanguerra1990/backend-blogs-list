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
    try {
        const  blog = await Blog.findById(request.params.id)

        blog ? response.json(blog) : response.status(404).end()
    } catch(exception) {
        next(exception)
    }
    
        
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

blogRouter.put('/:id', async(request, response, next) => {
    const {title, author, url, likes} = request.body
    try{
        const updateBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            {title, author, url, likes},
            {new: true, runValidators: true, context: 'query'}
        )
        response.json(updateBlog)
    } catch (exception) {
        next(exception)
    }
        
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }catch(exception) {
        next(exception)
    }
})

module.exports = blogRouter