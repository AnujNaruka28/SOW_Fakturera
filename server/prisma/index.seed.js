const prisma = require('../models/prismaClient');
const seedProducts = require('./seeders/product.seed');
const seedTranslation = require('./seeders/translation.seed');
const seedUsers = require('./seeders/user.seed');

const main = async () => {
    console.log('\n Seeding Data In DB...\n');

    await seedUsers(prisma);
    await seedTranslation(prisma);
    await seedProducts(prisma);

    console.log('\nData Seeded in DB...\n');
}

main()
    .then(() => prisma.$disconnect())
    .then(() => console.log('\nPrisma DisConnected...\n'))
    .catch((err) => {
        console.error('\nError In Seeding Data In DB: ', err);
        prisma.$disconnect().finally(() => process.exit(1));
});