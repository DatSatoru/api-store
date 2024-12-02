const User = require('../models/users.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Example controller
const createUser = async (req, res, next) => {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const user = await User.create(req.body);
        res.json(user)

    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        //Existe el mail?
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(401).json({ message: 'Error email y/o contraseña' })
        }

        //Coinciden las passwords?

        const equal = await bcrypt.compare(req.body.password, user.password);

        if (!equal) {
            return res.status(401).json({ message: 'Error email y/o contraseña' })
        }

        res.json({
            message: "Login Correcto",
            token: jwt.sign({ user_id: user._id }, 'clavesecreta')
        })
    } catch (error) {
        next(error);
    }
}

const addProduct = async (req, res, next) => {
    const { productId } = req.params
    req.user.cart.push(productId)
    await req.user.save();
    res.json(req.user)
}

module.exports = {
    createUser, login, addProduct
}