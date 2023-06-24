import express from "express";
import cors from 'cors'
import morgan from 'morgan'

import productsRoutes from './api/routes/products.routes.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/server/store/products', productsRoutes)

app.get('/', (req,res) => {
    res.send('<h1>Melo Caramelo<h1/>')
})

export default app