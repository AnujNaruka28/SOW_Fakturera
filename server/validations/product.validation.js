const {z} = require('zod');

const productSchema = z.object({
  id: z.number(),
  articleNumber: z.number().optional(),
  productOrService: z.string().max(255).optional(),
  inPrice: z.number().optional(),
  price: z.number().optional(),
  unit: z.string().optional(),
  inStock: z.number().optional(),
  description: z.string().optional()
})

const updatedProductSchema = productSchema.omit({id: true}).partial();

const createProductValidation = productSchema;
const updateProductValidation = updatedProductSchema;

module.exports = {
  createProductValidation,
  updateProductValidation
}