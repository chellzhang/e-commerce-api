const express = require('express')
const productsRouter = express.Router()
const db = require('../db')

module.exports = productsRouter


// Add new product

productsRouter.post('/', (req, res, next) => {
    const { catalog_id, name, description, sku, category_id, price } = req.body
    db.query("INSERT INTO product VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [catalog_id, name, description, sku, category_id, price], (error, results) => {
        if (error) throw error
        res.status(201).send(`Product added with catalog_id: ${results.rows[0].catalog_id}`)
    })
})

// get all products

productsRouter.get('/', (req, res, next) => {
    db.query('SELECT * FROM product', (error, results) => {
        if (error) res.status().send(error)
        res.status(200).json(results.rows)
    })
})

// get products by category_id

productsRouter.get('/:id', (req, res, next) => {
    const categoryId = req.params.id
    db.query('SELECT * FROM product WHERE category_id=$1', [categoryId], (error, results) => {
        if (error) throw error
        if (results.rows.length === 0) {
            res.status(404).send()
        } else {
            res.status(200).json(results.rows)
        }
    })
})

//  get product by catalog_id

productsRouter.get('/allcate/:id', (req, res, next) => {
    const catalogId = req.params.id
    db.query('SELECT * FROM product WHERE catalog_id=$1', [catalogId], (error, results) => {
        if (error) throw error
        if (results.length === undefined) {
            res.status(404).send("Product not found")
        } else {
            res.status(200).json(results.rows)
        }
    })
})

// update product by catalog_id

productsRouter.put('/allcate/:id', (req, res, next) => {
    const catalog_id = req.params.id
    const data = req.body

    const checkQuery = `SELECT * FROM product WHERE catalog_id = ${catalog_id}`;
    db.query(checkQuery, (error, results) => {
        if (error) throw error
        if (results.rows.length === 0) {
            res.status(404).send("Product not found")
        } else {
            const keys = Object.keys(data)
            if (keys.length > 0) {
                let fields = ''
                keys.forEach((key, index) => {
                    if (typeof data[key] === 'string'){
                        fields += `${key} = '${data[key]}'`
                    } else {
                        fields += `${key} = ${data[key]}`
                    }
                    if (index < keys.length - 1) {
                        fields += ','
                    }
                })

                const updateQuery = `UPDATE product SET ${fields} where catalog_id = ${catalog_id} RETURNING *`
                db.query(updateQuery, (error, results) => {
                    if (error) throw error
                    res.status(200).json(results.rows)
                })
            } else {
                res.status(400).send("Bad request, no fields to update")
            }
        }
    })
})

//  delete by id
productsRouter.delete('/allcate/:id', (req, res, next) => {
    const catalog_id = req.params.id
    const checkQuery = `SELECT * FROM product WHERE catalog_id = ${catalog_id}`
    db.query(checkQuery, (error, results) => {
        if (error) throw error
        if (results.rows.length === 0) {
            res.status(404).send("Product not found")
        } else {
            const delQuery = `DELETE FROM product WHERE catalog_id = ${catalog_id}`
            db.query(delQuery, (error, results) => {
                if(error) throw error
                res.status(204).send()
            })
        }
    })
})
