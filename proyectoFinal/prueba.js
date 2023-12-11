console.log('ejecutando las pruebas 21/nov')

const userManager = require('./dao/mongo/user.manager')

const userId = '64f6332b6d04bb39390190c6'
const documents = [
  { name: 'id', reference: 'el link del id' },
  { name: 'address', reference: 'el link del addres' },
  { name: 'account', reference: 'el link del account' },
]
const documents1 = [{ name: 'id', reference: 'el link del id' }]
const documents2 = []

function checkDocuments(documents) {
  const requiredDocuments = ['id', 'address', 'account'] //se iran eliminando elementos a medida que los vaya encontrando en documents.
  for (i in documents) {
    const docName = documents[i].name
    if (requiredDocuments.includes(docName)) {
      const index = requiredDocuments.indexOf(docName)
      if (index !== -1) {
        requiredDocuments.splice(index, 1) // elimino el elemento en requiredDocument.
      }
    }
  }

  if (requiredDocuments.length === 0) {
    //si requiredDocuments posee algun elemento, ese elemento es el que falta.
    //console.log('documentacion completa.')
    return true
  } else {
    //console.log('faltan los siguientes documentos: \n', requiredDocuments)
    return false
  }
}

console.log(checkDocuments(documents))
console.log(checkDocuments(documents1))
console.log(checkDocuments(documents2))
