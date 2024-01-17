import {Router} from 'express'
import { deleteProduct, getAllProduct, getDetailProduct, postProduct, updateProduct } from '../controllers/products'
import { checkIsAdmin } from '../middlewares/checkIsAdmin'
import { checkRequestBodyProduct } from '../middlewares/checkRequestBodyProduct'

const routerProduct = Router()
routerProduct.get('/', getAllProduct)
routerProduct.get('/:id', getDetailProduct)
routerProduct.delete('/:id', deleteProduct)
routerProduct.post('/', postProduct, checkIsAdmin, checkRequestBodyProduct)
routerProduct.put('/:id', updateProduct, checkIsAdmin, checkRequestBodyProduct)
// router.get('/products', getAllProduct)
export default routerProduct