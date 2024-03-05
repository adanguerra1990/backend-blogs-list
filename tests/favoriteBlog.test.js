const listHelper = require('../utils/list_helper')

describe('Favorite Blog', () => {
    const blogs = [
        {
            'title': 'Primer titulo',
            'author': 'Ajguerra',
            'url': 'https://github.com/',
            'likes': 5,
            'id': '65e1f931f2b9797b7d8b6810'
        },
        {
            'title': 'albert einstein',
            'author': 'walter isaacson',
            'url': 'https://www.amazon.com/-/es/Walter-Isaacson/dp/8499080138',
            'likes': 6,
            'id': '65e224b02d01c08665cd4b5f'
        },
    ]
    

    test('Devuelve el blog con mas likes', () => {
        const resultadoEsperado = {
            'title': 'albert einstein',
            'author': 'walter isaacson',        
            'likes': 6,
        }

        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(resultadoEsperado)
    })

})
