const products = require("../seeds/products.json");

const seedProducts = async (prisma) => {
    console.log('\nSeeding Products In DB...\n');
    
    await prisma.product.createMany({
        data: products,
        skipDuplicates: true
    })

    console.log('\nProducts Seeded In DB...\n');
}

module.exports = seedProducts;