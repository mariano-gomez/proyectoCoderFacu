const writeBodyProductDeleted = (user, product) => {
  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Eliminación de producto</title>
  </head>
  <body>
    <h1>Eliminación de producto</h1>
    <p>Hola ${user.firstname + ' ' + user.lastname}</p>
    <p>Te informamos que el producto con los siguientes detalles ha sido eliminado:</p>
    <ul>
      <li><strong>Título:</strong> ${product.title}</li>
      <li><strong>Descripción:</strong> ${product.description}</li>
      <li><strong>Código:</strong> ${product.code}</li>
    </ul>

    <p>Lo saludamos cordialmente</p>

  </body>
  </html>`
}

module.exports = writeBodyProductDeleted
