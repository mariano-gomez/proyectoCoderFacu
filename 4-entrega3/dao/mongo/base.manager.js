class BaseManager {
  
  constructor(model) {
    this.model = model
    // this.a = function () {
    //   console.log("baseManager de DAO mongo")
    // }
    // this.a()
  }
  
  async add(entity) {
    return await this.model.create(entity)
  }

  async getAll(filter = {}) {
    return this.model.find(filter)
  }

  async getById(id) {
    return await this.model.findById(id)
  }

  async updateById(id, entityUpdated) {
    return await this.model.findOneAndUpdate({ _id: id }, entityUpdated, {
      new: true,
    })
  }

  async deleteById(id) {
    return await this.model.deleteOne({ _id: id })
  }
}

module.exports = BaseManager
