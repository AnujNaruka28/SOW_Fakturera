const { hashPassword } = require("../../utils/hash");

const seedUsers = async (prisma) => {

    console.log('\nSeeding Users In DB...\n');
    const sampleUser = {
        email: 'test@example.com',
        password: 'qwerty1234#$',
        company: 'Starfjord AS'
    };

    const hashedPassword = await hashPassword(sampleUser.password);
    sampleUser.password = hashedPassword;
    const seededUser = await prisma.user.upsert({
        where: {email: sampleUser.email},
        create: sampleUser,
        update: sampleUser
    });
    
    console.log('\nUsers Seeded...\n', seededUser);
};

module.exports = seedUsers;
