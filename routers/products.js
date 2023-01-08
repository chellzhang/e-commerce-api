const express = require('express')
const productsRouter = express.Router()
const db = require('../db')

module.exports = productsRouter


productsRouter.get('/', (req, res, next) => {
    db.query('SELECT * FROM product', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
      })
})


productsRouter.get('/:id', (req, res, next) => {
    const catalogId = req.params.id
    db.query('SELECT * FROM product WHERE catalog_id=$1', [catalogId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
      })
})