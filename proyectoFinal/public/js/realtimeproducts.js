const socket = io() //lo cargo en un elementro script en el html

const formsContainer = document.getElementById('forms-container')
const productsContainer = document.getElementById('products-container')

const formAddContainer = document.getElementById('formAdd-container')
const formAdd = document.getElementById('formAddProduct')
formAddContainer.appendChild(formAdd)

const formUpdateContainer = document.getElementById('formUpdate-container')
const formUpdate = document.getElementById('formUpdateProduct')
formUpdateContainer.appendChild(formUpdate)

const formDeleteContainer = document.getElementById('formDelete-container')
const formDel = document.getElementById('formDeleteProduct')
formDeleteContainer.appendChild(formDel)

const mainContainner = document.getElementById('main-container')

const buttonFormAdd = document.getElementById('button-formAdd')
const buttonFormUpd = document.getElementById('button-formUpdate')
const buttonFormDel = document.getElementById('button-formDel')

//socket escuchar evento de producto agregado
socket.on('productAdded', (data) => {
  const product = data.product

  const div = document.createElement('div')
  div.classList.add('product-card')
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

  productsContainer.appendChild(div)
})

//socket escuchar evento de producto eliminado
socket.on('productDeleted', (data) => {
  const productId = data.productId
  const productToDelete = document.getElementById(`productID-${productId}`)
  productToDelete.remove()
})

//funcion para controlar el envio del form de agregar producto
buttonFormAdd.addEventListener('click', async (event) => {
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
  const pid = formDel.elements['inputId'].value

  await fetch(`http://localhost:8080/api/products/${pid}`, {
    method: 'DELETE',
  })

  formDel.elements['inputId'].value = null
})

//funcion para controlar el envio del form de UPDATE de producto
buttonFormUpd.addEventListener('click', async (event) => {
  const id = formUpdate.elements['id'].value
  const productUpdated = {}

  if (formUpdate.elements['title'].value) {
    productUpdated.title = formUpdate.elements['title'].value
  }

  if (formUpdate.elements['description'].value) {
    productUpdated.description = formUpdate.elements['description'].value
  }

  if (formUpdate.elements['price'].value) {
    productUpdated.price = +formUpdate.elements['price'].value
  }

  if (formUpdate.elements['code'].value) {
    productUpdated.code = formUpdate.elements['code'].value
  }

  if (formUpdate.elements['stock'].value) {
    productUpdated.stock = +formUpdate.elements['stock'].value
  }

  if (
    formUpdate.elements['thumbnails1'].value ||
    formUpdate.elements['thumbnails2'].value ||
    formUpdate.elements['thumbnails3'].value
  ) {
    thumbnails = []
    thumbnails.push(
      formUpdate.elements['thumbnails1'].value,
      formUpdate.elements['thumbnails2'].value,
      formUpdate.elements['thumbnails3'].value
    )
    productUpdated.thumbnails = thumbnails
  }

  //console.log(formUpdate.elements['status'].value)
  if (formUpdate.elements['status'].value === 'on') {
    productUpdated.status = true
  } else {
    productUpdated.status = false
  }

  //let category
  if (formUpdate.elements['category'].value) {
    productUpdated.category = formUpdate.elements['category'].value
    // category = formUpdate.elements['category'].value
  }

  console.log(productUpdated)
  const response = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productUpdated),
  })
  console.log(response)
  formUpdate.elements['title'].value = ''
  formUpdate.elements['description'].value = ''
  formUpdate.elements['price'].value = ''
  formUpdate.elements['code'].value = ''
  formUpdate.elements['stock'].value = ''
  //formUpdate.elements['status'].value = 'on'
  formUpdate.elements['category'].value = ''
  console.log(response.status)
  if (response.status == 200) {
    window.location.reload(); //recargo la pagina para ver la modificacion.
  }else{
    console.log('no redireccione!')
  }
})
