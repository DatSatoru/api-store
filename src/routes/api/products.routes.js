const { getAll, createProduct, getByID, getByPrice, getActives } = require('../../controllers/products.controller');
const { checkToken } = require('../../middlewares/users.middleware');

const router = require('express').Router();

router.get('/', getAll);
router.get('/actives', getActives)
router.get('/price/:min/:max', getByPrice)
router.get('/:productId', getByID)

router.post('/', checkToken, createProduct)

module.exports = router;