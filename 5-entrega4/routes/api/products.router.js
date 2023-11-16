const { Router } = require('express')
const ProductController = require('../../controllers/products.controller')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

const isAuth = require('../../middelwares/userAuth')
const RoutePolices = require('../../middelwares/routes.polices')

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/products"

//ruta 1, acepta un query parm "limit", que limita la cantidad de productos, si no esta este limite, se traen todos los productos.
//tmb adimite un query param "page", para poder hacer paginacion, si no esta trae la primera pagina.
router.get('/', ProductController.getAll)

//Nota: la ruta6, debe ir antes q la ruta2, ya que sino (:pid) es un comodin, y va a buscar el producto con id="mockingproducts" (nunca entraria a esta si va despues)
//ruta 6, ruta get para obtener 100 productos random
router.get('/mockingproducts', ProductController.getMockersProducts)

//ruta 2, trae le producto cuyo id se le pase como Url Param.
router.get('/:pid', ProductController.getOne)

//ruta 3, ruta post para crear un nuevo producto
router.post('/', RoutePolices.onlyAdminOrPremium, ProductController.create)

//ruta 4 ruta put modificar ciertas propiedades de un producto
router.patch('/:pid', RoutePolices.onlyAdminOrPremium, ProductController.updatePropierties)

//ruta 5, ruta post para eliminar producto
router.delete('/:pid',RoutePolices.onlyAdminOrPremium, ProductController.deleteProduct)


module.exports = router
