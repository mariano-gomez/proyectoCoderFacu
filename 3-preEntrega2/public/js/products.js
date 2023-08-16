

const cid = '64d522223398fe0ee7b278f8' //--> este valor se puede cambiar para probar que funciona en otros carritos.



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
