const express = require('express');
const { auth } = require('../middlewares/auth');
const { getProducts, updateProduct } = require('../controllers/Product');
const { validate } = require('../middlewares/validate');
const { updateProductValidation } = require('../validations/product.validation');
const productRouter = express.Router();

productRouter.get('/',auth,getProducts);
productRouter.patch('/update-product/:id',auth,validate(updateProductValidation),updateProduct);

module.exports = productRouter;