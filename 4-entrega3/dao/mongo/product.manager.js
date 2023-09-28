const mongoose = require('mongoose')
const BaseManager = require('./base.manager')
const productModel = require('./models/product.model')
//const db = require("../config/connection.mongo");

class ProductManager extends BaseManager {
  constructor() {
    super(productModel)
  }

  //este metodo getAll() no lo estoy usando para nada.. pero lo dejo (notese que esta refactorizado respecto al baseManager).
  async getAll({ limit = undefined, page = 1 }) {
    try {
      if (!limit) {
        return await this.model.find({})
      } else {
        return await this.model
          .find({})
          .limit(limit)
          .skip((page - 1) * limit)
      }
    } catch (e) {
      console.log('Error en el metodo getAll() del ProductManager')
    }
  }

  async getAllPaginated({ limit = 3, page = 1, sort = null, query = null }) {
    try {
      const queryFind = query ? JSON.parse(query) : {}
      let resp
      let data

      if (!sort) {
        data = await this.model.paginate(queryFind, {
          limit,
          page,
          lean: true,
        })
      } else {
        data = await this.model.paginate(queryFind, {
          page,
          limit,
          sort: { price: sort },
          lean: true,
        }) //.sort({price:sort}) ---> esto asi no funciona por eso lo agrego como un parametro del objeto "options" (segundo parametro del metodo paginate)
      }

      if (data) {
        
        const { docs, totalDocs, pagingCounter, limit, paginCounter, ...rest } =
          data
        resp = {
          status: 'success',
          payload: docs,
          ...rest,
        }
        if (data.prevPage) {
          resp.prevLink = `http://localhost:8080/?limit=${limit}&page=${data.prevPage}`
          if (sort) {
            resp.prevLink += `&sort=${sort}`
          }
          if (query) {
            resp.prevLink += `&query=${JSON.stringify(queryFind)}` // esto en la respuesta devuelve un string con las comilllas dobles escapadas, pero cuando ese stirng es leido en JS o node, anda bien.. pero si copiamos y pegamos el string con las comillas escapadas tira error logicamente.
          }
        }
        if (data.nextPage) {
          resp.nextLink = `http://localhost:8080/?limit=${limit}&page=${data.nextPage}`
          if (sort) {
            resp.nextLink += `&sort=${sort}`
          }
          if (query) {
            resp.nextLink += `&query=${JSON.stringify(queryFind)}` //idem aclaracion anterior.
          }
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
      console.log('Error en el metodo getAllPaginated del ProductManager')
      console.log(e)
    }
  }
}

module.exports = new ProductManager() //singleton --> siempre exporto una misma instancia de clase.

// setTimeout(async () => {
//   const PM = new ProductManager()
//   const products = await PM.getAllPaginated({
//     limit: 2,
//     page: 3,
//     sort: 'asc',
//      query: '{ "price": { "$gte": 10 } }', // no anda cuando devuelvo el query
//   })
//   console.log(products)
// }, 3000)
