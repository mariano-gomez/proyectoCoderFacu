const { Router } = require('express')
const RoutePolices = require('../../middelwares/routes.polices')
const CartController = require('../../controllers/carts.controller')

const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/carts"

router.post('/', CartController.create) //crea un carrito nuevo (pero tengo que asociarlo a un userId)

router.get('/:cid', CartController.getProducts)
router.put('/:cid', CartController.updateProducts) //esta ruta me hace un update de todos los productos (los cambio a todos, segun lo q recibo, incluido las qty)
router.delete('/:cid', CartController.clear)


//esta ruta agrega el producto al carrito
//esta ruta solo los user O premium la pueden usar, y los premium no pueden agregar sus propiios productos.
router.post(
  '/:cid/product/:pid',
  RoutePolices.onlyUserOrPremium,
  CartController.addProduct
)
router.put('/:cid/product/:pid', CartController.setProductQty)
router.delete('/:cid/product/:pid', CartController.deleteProduct)

router.get('/:cid/purchase', CartController.makePurchase)

module.exports = router
