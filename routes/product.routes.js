require('dotenv').config()
const express = require('express')
const https = require('https')
const router = express.Router()
const product = require('../models/product.model')
const m = require('../controllers/middlewares')
const authenticate = require('../controllers/authenticate')


router.post('/auth/token', m.checkFieldsToken, async (req, res) => {
    var postData = JSON.stringify({
        email: req.body.email, 
        password: req.body.password, 
        returnSecureToken: true
    });

    const options = { 
        hostname: 'identitytoolkit.googleapis.com', 
        path: `/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, 
        method: 'POST', 
      }; 

      const request = https.request(options, (response) => {
        let data = ''  
        response.on('data', (chunk) => { 
            data += chunk; 
        }); 
       
       response.on('end', () => { 
          res.status(200).json({
            token: JSON.parse(data).idToken
            });
        }); 
      }); 

    request.on('error', (error) => { 
        console.error(error); 
    }); 
    request.write(postData);
    request.end(); 
})


router.use(authenticate.authenticate);


/* All products */
router.get('/', async (req, res) => {
    await product.getProducts()
    .then(products => res.json(products))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A product by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await product.getProduct(id)
    .then(product => res.json(product))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new product */
router.post('/', m.checkFieldsProduct, async (req, res) => {
    await product.insertProduct(req.body)
    .then(product => res.status(201).json({
        message: `The product #${product.id} has been created`,
        content: product
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a product */
router.put('/:id', m.mustBeInteger, m.checkFieldsProduct, async (req, res) => {
    const id = req.params.id

    await product.updateProduct(id, req.body)
    .then(product => res.json({
        message: `The product #${id} has been updated`,
        content: product
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a product */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await product.deleteProduct(id)
    .then(product => res.json({
        message: `The product #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router