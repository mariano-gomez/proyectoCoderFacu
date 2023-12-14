

const url = window.location.href
const cartId = url.split('/')[url.split('/').length - 1]
const btnBuy = document.getElementById('btn-buy')
const productList = document.getElementById('products-list')
const totalPay = document.getElementById('totalPay')

//realizar la compra.
btnBuy.addEventListener('click', async (event) => {
  await fetch(`http://localhost:8080/api/carts/${cartId}/purchase`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  productList.innerHTML = ''
  totalPay.innerHTML = 'Total to pay: $0'
  Swal.fire(`La compra se realizo con exito!`)
})
