const Product = require('../models/products.model');

const getAll = async (req, res, next) => {

    try {
        const products = await Product.find().populate('creator', 'username email');
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req, res, next) => {
    req.body.creator = req.user._id
    try {
        const product = await Product.create(req.body)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const getByID = async (req, res, next) => {
    const { productId } = req.params
    try {
        const product = await Product.findById(productId)
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const getByPrice = async (req, res, next) => {
    const { min, max } = req.params
    try {
        const products = await Product.find({
            price: {
                $gte: min,
                $lte: max
            }
        })
        res.json(products)
    } catch (error) {
        next(error)
    }
}

const getActives = async (req, res, next) => {
    try {
        const products = await Product.find({
            available: true,
            stock: {
                $gte: 10
            }
        });
        res.json(products)
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAll, createProduct, getByID, getByPrice, getActives
}