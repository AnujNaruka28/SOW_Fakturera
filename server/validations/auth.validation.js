const {z} = require('zod');
const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

const loginValidation = loginSchema;

module.exports = {loginValidation};