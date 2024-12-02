const jwt = require('jsonwebtoken');
const User = require('../models/users.model');


const checkToken = async (req, res, next) => {
    //Esta el token en la cabecera?
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'Debes incluir la cabecera authorizations' })
    }

    const token = req.headers['authorization']
    //Es un token valido??
    let data;
    try {
        data = jwt.verify(token, 'clavesecreta')
    } catch (error) {
        return res.status(403).json({ message: 'El token no es valido' });
    }

    //Existe el usuario en la BD?
    const user = await User.findById(data.user_id)
    if (!user) {
        return res.status(403).json({ message: 'El usuario no exite' })
    }

    //Colocamos el user dentro del req

    req.user = user;

    next();

}


module.exports = {
    checkToken
}