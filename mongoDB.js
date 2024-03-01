const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Ingrese la contraseña')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ajguerra160790:${password}@cluster0.adbi7m0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blogs = mongoose.model('Blogs', blogSchema)

if (process.argv.length >= 6) {
    const blogs = new Blogs({
        title: process.argv[3],
        author: process.argv[4],
        url: process.argv[5],
        likes: process.argv[6]
    })
    blogs.save()
        .then(result => {
            console.log('Blogs info guardado', result)
            mongoose.connection.close()
        })
        .catch((error) => {
            console.log('Error al guardar', error)
            mongoose.connection.close()
        })
} else {
    Blogs.find({}).then(result => {
        result.forEach(blogs => {
            console.log(blogs)
        })
        mongoose.connection.close()
    })
}