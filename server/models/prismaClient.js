require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
// const { PrismaPg } = require('@prisma/adapter-pg');
const {withAccelerate} = require('@prisma/extension-accelerate');

// const connectionStr = `${process.env.DIRECT_URL}`;

// const adapter = new PrismaPg({connectionStr});
const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL
}).$extends(withAccelerate());

module.exports = prisma;