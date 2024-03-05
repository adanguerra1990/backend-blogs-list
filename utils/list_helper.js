const _ = require('lodash')

const dummy = () =>{
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, post) => total + post.likes, 0)
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((mejorBlog, actualBlog) => {
        return (actualBlog.likes > mejorBlog.likes) ? actualBlog : mejorBlog
    })

    const {title, author, likes} = favorite
    return {title, author, likes}
}

const mostBlogs = (blogs) => {
    //Agrupar los Blogs por autor
    const groupedBlogs = _.groupBy(blogs, 'author')

    // Encontrar el autor con la mayor cantidad de blog
    const mostBlogsAuthor = _.reduce(groupedBlogs, (result, blogs, author) => {
        const blogCount = blogs.length
        return blogCount > result.count ? { author, count: blogCount } : result
    }, {author: '', count: 0})

    return {author :mostBlogsAuthor.author, blogs: mostBlogsAuthor.count}
}

const mostLikes = (blogs) => {
    const groupBlogs = _.groupBy(blogs, 'author')
    
    const likesByAuthor = _.mapValues(groupBlogs, blogs => _.sumBy(blogs, 'likes'))
    
    const mostLikesAuthor = _.reduce(likesByAuthor, (result, likes, author) =>{
        return likes > result.likes ? {author, likes} : result
    }, {author: '', likes: 0})

    return mostLikesAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs, 
    mostLikes
}