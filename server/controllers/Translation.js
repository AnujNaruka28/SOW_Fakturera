const prisma = require('../models/prismaClient');

const getTranslation = async (_req,res) => {
    try {
        const translations = await prisma.translation.findMany();
        return res.status(200).json({
            success: true,
            message: 'Translations Fetched Sccessfully.',
            data: translations
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

module.exports = {getTranslation};