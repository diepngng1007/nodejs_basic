import { Router } from 'express'
import { SearchProductByName, deleteProduct, getAllProduct, getDetailProduct, getProductByCategory, postProduct, updateProduct } from '../controllers/products'
import { checkIsAdmin } from '../middlewares/checkIsAdmin'

const routerProduct = Router()
routerProduct.get('/search', SearchProductByName)
routerProduct.get('/', getAllProduct)
routerProduct.get('/:id', getDetailProduct)
routerProduct.get('/category/:id_category', getProductByCategory)
routerProduct.delete('/:id_product', deleteProduct)
// routerProduct.delete('/:id_user', deteleAllProduct)
routerProduct.post('/', postProduct, checkIsAdmin)
routerProduct.put('/:id_product', updateProduct, checkIsAdmin)
// routerProduct.get('/:id', getProductWithSize)
export default routerProduct;