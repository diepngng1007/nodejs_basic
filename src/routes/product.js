import { Router } from 'express'
import { deleteProduct, getAllProduct, getDetailProduct, postProduct, updateProduct } from '../controllers/products'
import { checkIsAdmin } from '../middlewares/checkIsAdmin'
import { checkRequestBodyProduct } from '../middlewares/checkRequestBodyProduct'
import { authenticate } from '../middlewares/authenticate'
import { authorization } from '../middlewares/authoraization'

const routerProduct = Router()
routerProduct.get('/', getAllProduct)
routerProduct.get('/:id', getDetailProduct)
routerProduct.delete('/:id', authenticate, authorization, deleteProduct)
routerProduct.post('/addProduct', authenticate, authorization, postProduct)
routerProduct.put('/:id', authenticate, authorization, updateProduct, checkRequestBodyProduct)

export default routerProduct;