let products = require('../data/products.json')
const filename = './data/products.json'
const helper = require('../controllers/helper.js')

function getProducts() {
    return new Promise((resolve, reject) => {
        if (products.length === 0) {
            reject({
                message: 'no products available',
                status: 202
            })
        }

        resolve(products)
    })
}

function getProduct(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(product => resolve(product))
        .catch(err => reject(err))
    })
}

function insertProduct(newProduct) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(products) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newProduct = { ...id, ...date, ...newProduct }
        products.push(newProduct)
        helper.writeJSONFile(filename, products)
        resolve(newProduct)
    })
}

function updateProduct(id, newProduct) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(product => {
            const index = products.findIndex(p => p.id == product.id)
            id = { id: product.id }
            const date = {
                createdAt: product.createdAt,
                updatedAt: helper.newDate()
            } 
            products[index] = { ...id, ...date, ...newProduct }
            helper.writeJSONFile(filename, products)
            resolve(products[index])
        })
        .catch(err => reject(err))
    })
}

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(() => {
            helper.writeJSONFile(filename,[])
            products = products.filter(p => p.id !== parseInt(id))
            helper.writeJSONFile(filename, products)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertProduct,
    getProducts,
    getProduct, 
    updateProduct,
    deleteProduct
}