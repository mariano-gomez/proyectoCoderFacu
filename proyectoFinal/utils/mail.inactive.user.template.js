const writeBodyInactiveUser = (name)=>{
  return (
    `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Eliminación por inactividad</title>
    </head>
    <body>
      <h1>Eliminación por inactividad</h1>
      <p>Hola ${name},</p>
      <p>Lamentamos informarte que tu cuenta ha sido eliminada debido a la inactividad prolongada.</p>
      <p>Lo saludo atentamente</p>
    </body>
    </html>`
  )
}

module.exports = writeBodyInactiveUser