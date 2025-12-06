const express = require('express');
const { validate } = require('../middlewares/validate');
const { loginValidation } = require('../validations/auth.validation');
const login = require('../controllers/Auth');
const authRouter = express.Router();

authRouter.post('/login', validate(loginValidation), login);

module.exports = authRouter;