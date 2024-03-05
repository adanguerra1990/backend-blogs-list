const listHelper = require('../utils/list_helper')

describe('Most Blogs', () => {
    const blogs = [
        {
            'title': 'Primer titulo',
            'author': 'Ajguerra',
            'url': 'https://github.com/',
            'likes': 2,
            'id': '65e1f931f2b9797b7d8b6810'
        },
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

    test('Devuelve el Autor con mas blogs ', () => {
        const resultadoEsperado = {
            'author': 'walter isaacson',
            'blogs': 2
        }

        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(resultadoEsperado)
    })    
})
