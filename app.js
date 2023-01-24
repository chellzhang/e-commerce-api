const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const productsRouter = require('./routers/products')


module.exports = app


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use('/api/products', products)

app.use('/products', productsRouter)


const db = require('./db')
app.post('/test', (req, res, next)=>{
    const {id, name} = req.body
    db.query('INSERT INTO test VALUES ($1, $2) RETURNING *', [id, name], (error, results)=>{
        if(error){
            throw error
        } 
        res.status(201).send(`Product added with ID: ${results.rows[0].id}`)
    })
})