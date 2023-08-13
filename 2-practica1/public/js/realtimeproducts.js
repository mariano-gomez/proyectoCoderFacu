const socket = io() //lo cargo en un elementro script en el html

const formAddContainer = document.getElementById('formAdd-container')
const formAdd = document.getElementById('formAddProduct')
formAddContainer.appendChild(formAdd)

const formDeleteContainer = document.getElementById('formDelete-container')
const formDel = document.getElementById('formDeleteProduct')
formDeleteContainer.appendChild(formDel)

const productContainner = document.getElementById('products')

const buttonFormAdd = document.getElementById('button-formAdd')
const buttonFormDel = document.getElementById('button-formDel')

//socket escuchar evento de producto agregado
socket.on('productAdded', (data) => {
  console.log('-------------------1------------------')
  console.log(data)
  console.log('-------------------1------------------')

  const product = data.product
  console.log(product)
  const div = document.createElement('div')
  div.id = `productID-${product.id}`
  div.innerHTML = `
    <div class='uk-card uk-card-default'>
      <div class='uk-card-media-top'>
        <img alt='foto producto' />
      </div>
      <div class='uk-card-body'>
        <h3 class='uk-card-title'>${product.title}</h3>
        <h5>USD $${product.price}</h5>
        <span class='uk-badge'>${product.category}</span>
        <p>${product.description}</p>
        <button class='uk-button uk-button-secondary uk-button-small'>Agregar al
          carrito</button>
      </div>
    </div>
    `
  productContainner.appendChild(div)
  console.log(div)
})

//socket escuchar evento de producto eliminado
socket.on('productDeleted', (data) => {
  console.log(
    'entre con productDeleted directo de  la ruta (DELETE)api/project/pid'
  )
  if (data.wasProductDeleted) {
    const productId = data.productDeletedId
    const productToDelete = document.getElementById(`productID-${productId}`)
    console.log(productToDelete)
    productToDelete.remove()
  }
})

//funcion para controlar el envio del form de agregar producto
buttonFormAdd.addEventListener('click', async (event) => {
  console.log('click')
  const title = formAdd.elements['title'].value
  const description = formAdd.elements['description'].value
  const price = +formAdd.elements['price'].value
  let code
  if (formAdd.elements['code'].value !== '') {
    code = formAdd.elements['code'].value
  }

  const stock = +formAdd.elements['stock'].value
  const thumbnails = []
  thumbnails.push(
    formAdd.elements['thumbnails1'].value,
    formAdd.elements['thumbnails2'].value,
    formAdd.elements['thumbnails3'].value
  )

  let status
  if (formAdd.elements['status'].value === 'on') {
    status = true
  } else {
    status = false
  }
  const category = formAdd.elements['category'].value

  const newProduct = {
    title,
    description,
    price,
    code,
    stock,
    status,
    category,
    thumbnails,
  }

  const response = await fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  })

  console.log(response)
  formAdd.elements['title'].value = ''
  formAdd.elements['description'].value = ''
  formAdd.elements['price'].value = 0
  formAdd.elements['code'].value = ''
  formAdd.elements['stock'].value = 0
  formAdd.elements['status'].value = true
  formAdd.elements['category'].value = ''
})

//funcion para controlar el envio del form de eliminar producto
buttonFormDel.addEventListener('click', async (event) => {
  const pid = +formDel.elements['id'].value

  const response = await fetch(`http://localhost:8080/api/products/${pid}`, {
    method: 'DELETE',
  })

  console.log(response)
  formDel.elements['id'].value = null
})
