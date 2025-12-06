const prisma = require('../models/prismaClient');

const getProducts = async (_req,res) => {
    try {
        const products = await prisma.product.findMany();
        return res.status(200).json({
            success: true,
            message: 'Products Fetched Sccessfully.',
            data: products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

const updateProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const productId = parseInt(id);
        const product = await prisma.product.findUnique({where: {id: productId}});
        if(!product) return res.status(404).json({success: false,error: "Product Not Found."});
        const updatedProduct = await prisma.product.update({
            where: {id: productId},
            data: req.body
        });
        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully.",
            data: updatedProduct
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while updating product.",
            error: err.message
        });
    }
};

module.exports = {
    getProducts,
    updateProduct
}