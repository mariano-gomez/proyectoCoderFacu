
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

class BaseManager {
  constructor(entity) {
    //console.log('la entidad es', entity)
    this.entity = entity
    this[entity] = []
    //this.id = uuid
    this.path = path.join(__dirname, '..', '..', 'data', `${entity}.json`) // se debe poner de forma correcta y completa al momento de inicializar la clase.

    this.getSavedEntities = function () {
      if (fs.existsSync(this.path)) {
        const allEntitiesFile = fs.readFileSync(this.path)
        this[this.entity] = JSON.parse(allEntitiesFile)
      }
    }
    this.getSavedEntities()

    // this.a = function () {
    //   console.log("baseManager de DAO fileSystem")
    // }
    // this.a()

    this.save = async function () {
      fs.writeFileSync(this.path, JSON.stringify(this[this.entity]))
    }
  }

  async add(entityObj) {
    entityObj._id = uuid()
    entityObj.id = entityObj._id
    const fecha = new Date()

    entityObj.createdAt = fecha.toISOString()
    entityObj.updatedAt = fecha.toISOString()
    entityObj.__v = 1
    this[this.entity].push(entityObj)

    //si lo creo lo guarod en el archivo
    if (!fs.existsSync(this.path)) {
      await this.save()
    } else {
      const allEntitiesFile = fs.readFileSync(this.path)
      const allEntitiesAsArray = JSON.parse(allEntitiesFile)
      allEntitiesAsArray.push(entityObj)
      fs.writeFileSync(this.path, JSON.stringify(allEntitiesAsArray))
    }

    return entityObj
  }

  async getAll() {
    return this[this.entity]
  }

  async getById(id) {
    for (let entity of this[this.entity]) {
      if (entity.id === id) {
        return entity
      }
    }
    throw new Error(`${this.entity} id not found`)
  }
  //hago mi propia verson de findOne para fileSystemm asi puedo reutilizar mas el codigo ya escrito
  async findOne(propierty) {
    const key = Object.keys(propierty)[0]
    const value = Object.values(propierty)[0]

    for (let entity of this[this.entity]) {
      if (entity[key] === value) {
        return entity
      }
    }
    return null
    //throw new Error(`${this.entity} id not found`)
  }


  async updateById(id, fieldsToUpdate) {
    for (let entity of this[this.entity]) {
      if (entity.id === id) {
        entity.__v += 1
        const entityUpdated = {...entity, ...fieldsToUpdate}
        this[this.entity][this[this.entity].indexOf(entity)] = entityUpdated
        await this.save()
        return entityUpdated
      }
    }
    throw new Error(`${this.entity} id not found`)
  }

  async deleteById(id) {
    for (let entity of this[this.entity]) {
      if (entity.id === id) {
        this[this.entity].splice([this[this.entity].indexOf(entity)], 1)
        await this.save()
        return true
      }
    }
    throw new Error(`${this.entity} id not found`)
  }
}

module.exports = BaseManager

// class ProductosManager extends BaseManager {
//   constructor(entity) {
//     super(entity)
//   }
// }

// const PM = new ProductosManager('mochilas')
// //console.log(PM)

// // PM.add({
// //   tamaño: 'grande',
// //   precio: 452,
// //   fecha: Date.now(),
// // })

// console.log(PM.getById('076c2a8a-9170-4b7b-90b0-e0a4de5d4f7f'))

// PM.updateById("076c2a8a-9170-4b7b-90b0-e0a4de5d4f7f",{
//   "precio": 321,
// })

// console.log(PM.getById('076c2a8a-9170-4b7b-90b0-e0a4de5d4f7f'))
