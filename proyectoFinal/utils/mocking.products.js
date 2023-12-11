const { faker } = require('@faker-js/faker')
const { v4: uuid } = require('uuid')

//n  =  cantidad de productos a generar
const productsMocker = (n) => {
  const products = []

  for (let i = 0; i < n; i++) {
    const id = uuid().replace(/-/g, '').slice(0, 24)
    const _id = id
    const title = faker.commerce.product()
    const description = faker.commerce.productDescription()
    const price = +faker.commerce.price()
    const stock = Math.round(Math.random() * 250)
    const code = uuid() // 'c50e1f5c-86e8-4aa9-888e-168e0a182519'
    const category = faker.commerce.department()
    const status = faker.datatype.boolean({ probability: 0.95 }) //es la probabilidad a q salga true
    const thumbnails = [faker.image.url(), faker.image.url(), faker.image.url()]
    const __v = faker.number.int({ min: 0, max: 3 })
    const createdAt = faker.date.past({ years: 3 })
    let updatedAt
    if (faker.datatype.boolean({ probability: 0.15 })) {
      //ojo aca.. faker tiene dos metodos el "between"(devuelve un valor) y el "betweens"(devuelve un array)
      updatedAt = faker.date.between({
        from: createdAt,
        to: new Date().toISOString(),
      })
    } else {
      updatedAt = createdAt
    }
    const product = {
      _id,
      id,
      title,
      description,
      price,
      stock,
      code,
      category,
      status,
      thumbnails,
      __v,
      createdAt,
      updatedAt,
    }

    products.push(product)
  }
  return products
}

module.exports = productsMocker

