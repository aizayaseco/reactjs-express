function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFieldsProduct(req, res, next) {
    //console.log(req.body);
    const { name, price, stock } = req.body

    if (name && price && stock) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

function checkFieldsToken(req, res, next) {
    //console.log(req.body);
    const { email, password } = req.body

    if (email && password) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    checkFieldsProduct,
    checkFieldsToken
}