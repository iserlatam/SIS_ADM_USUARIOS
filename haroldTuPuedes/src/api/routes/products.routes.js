import { Router } from "express";
import * as productsCtrl from '../controllers/products.controller.js'

const router = Router()

router.get('/', productsCtrl.getProducts)

router.get('/product/id/:id', productsCtrl.getProductById)

router.get('/product/nombre/:nombre', productsCtrl.getProductByName)

router.post('/', productsCtrl.postProduct)

export default router
