const listHelper = require('../utils/list_helper')

describe('Total likes', () => {
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

    test('si la lista esta vacia devuelve cero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('cuando la lista tiene solo un blog, es igual a ese', () => {
        
        const resultadoEsperado = [{
            'title': 'Eloquent JavaScript',
            'author': 'Marijn Haverbeke',
            'url': 'https://eloquentjs-es.thedojo.mx/',
            'likes': 10,
            'id': '65e22bff41601064bf94fddf'
        }]

        const result = listHelper.totalLikes(resultadoEsperado)
        expect(result).toBe(10)
    })

    test('de una lista más grande se calcula correctamente', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(23)
    })

})