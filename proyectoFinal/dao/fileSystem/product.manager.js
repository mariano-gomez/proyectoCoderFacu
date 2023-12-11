
const BaseManager = require('./base.manager')

class ProductManager extends BaseManager {
  constructor(entity) {
    super(entity)
  }

  getAllPaginated({ limit = 3, page = 1, sort = null, query = null }) {
    try {
      const docs = []
      const all = this.getAll()
      let allSorted
      let resp

      if (sort == 'desc' || sort == 'descending' || sort == '-1') {
        allSorted = all.sort((a, b) => b.price - a.price)
      } else {
        allSorted = all.sort((a, b) => a.price - b.price)
      }
      const skip = (page - 1) * limit

      for (let i = skip; i < skip + limit; i++) {
        if (allSorted[i]) {
          docs.push(allSorted[i])
        }
      }

      ////ahora tengo q devolver especificamente lo q me piden.

      if (docs.length) {
        const totalPages = Math.ceil(all.length / limit)
        let hasPrevPage
        let hasNextPage
        let prevPage
        let nextPage
        let prevLink = null
        let nextLink = null

        if (page === 1) {
          hasPrevPage = false
          prevPage = null
        } else {
          hasPrevPage = true
          prevPage = +page - 1
          prevLink = `http://localhost:8080/?limit=${limit}&page=${prevPage}`
          if (sort) {
            prevLink += `&sort=${sort}`
          }
        }

        if (totalPages > page) {
          hasNextPage = true
          nextPage = +page + 1
          nextLink = `http://localhost:8080/?limit=${limit}&page=${nextPage}`
          if (sort) {
            resp.nextLink += `&sort=${sort}`
          }
        } else {
          hasNextPage = false
          nextPage = null
        }

        resp = {
          status: 'success',
          payload: docs,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink,
        }
      } else {
        resp = {
          status: 'error',
          payload: null,
          totalPages: null,
          prevPage: null,
          nextPage: null,
          page: null,
          hasPrevPage: null,
          hasNextPage: null,
          prevLink: null,
          nextLink: null,
        }
      }

      return resp
    } catch (e) {
      console.log(
        'Error en el metodo getAllPaginated del ProductManager de fileSystem'
      )
      console.log(e)
    }
  }
}

const productManager = new ProductManager('products')
//console.log(productManager.getAllPaginated({ limit: 2, page: 3 }))

module.exports = productManager

// PM.add({
//   title: '(fs) Escudo 70',
//   description: '(fs) escudo de madera de 70cm de diametro',
//   price: 12,
//   stock: 15,
//   code: Date.now(),
//   category: 'armas',
//   status: true,
//   thumbnails: ['path-img1', 'path-img2', 'path-img3'],
// })

// PM.add({
//   title: '(fs) mazo largo',
//   description: '(fs) mazo de agarre de 2 manos',
//   price: 46,
//   stock: 501,
//   code: Date.now(),
//   category: 'armas',
//   status: true,
//   thumbnails: ['path-img1', 'path-img2', 'path-img3'],
// })

// PM.add({
//   title: '(fs) arco de corto alcance',
//   description: '(fs)arco de carga rapida, 50 m de alcance',
//   price: 31,
//   stock: 201,
//   code: Date.now(),
//   category: 'armas',
//   status: true,
//   thumbnails: ['path-img1', 'path-img2', 'path-img3'],
// })

// PM.add({
//   title: '(fs) piedra de la luna',
//   description: '(fs) brujula vikinga para navegar en dias nublados',
//   price: 11,
//   stock: 17,
//   code: Date.now(),
//   category: 'navegacion',
//   status: true,
//   thumbnails: ['path-img1', 'path-img2', 'path-img3'],
// })

// PM.add({
//   title: '(fs) hacha larga',
//   description: '(fs) hacha de agarre de 2 manos',
//   price: 17,
//   stock: 560,
//   code: Date.now(),
//   category: 'armas',
//   status: true,
//   thumbnails: ['path-img1', 'path-img2', 'path-img3'],
// })

// PM.add({
//   title: '(fs)Canoa de exploracion',
//   description: '(fs)canoa para 5 personas',
//   price: 250,
//   stock: 50,
//   code: Date.now(),
//   category: 'navegacion',
//   status: true,
//   thumbnails: ['path-img1', 'path-img2', 'path-img3'],
// })

// PM.add({
//   title: '(fs)Cuerno de 1700cc',
//   description: '(fs)cuerno vikingo para brindar gritando Skool!!',
//   price: 10,
//   stock: 150,
//   code: Date.now(),
//   category: 'bazar',
//   status: true,
//   thumbnails: ['path-img1', 'path-img2', 'path-img3'],
// })
