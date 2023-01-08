const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const productsRouter = require('./routers/products')


module.exports = app


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use('/api/products', products)

app.use('/products', productsRouter)
