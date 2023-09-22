function parseCookies() {
  // le saque el parseCokkies tal cual al profe
  return document.cookie
    .split(';')
    .reduce((obj, cookie) => {
      const keyValue = cookie.split('=')
      return {
        ...obj,
        [keyValue[0].trim()]: keyValue[1]
      }
    }, {})
}

const cookies = parseCookies()


const cid = cookies.cartId //--> este valor corresponde al Id del carrito que le voy apegar con add-products


Array.from(document.getElementsByClassName('card')).forEach((p) => {
  const productId = p.id.split('-')[1]
  const addButton = document.getElementById(`add-button-${productId}`)

  addButton.addEventListener('click', (e) => {
    const pid = e.target.id.split('-')[2]
    const uri = `http://localhost:8080/api/carts/${cid}/product/${pid}`

    fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data.status))//-->lo dejo para mostrar lo q devuelve la ruta.
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
})
