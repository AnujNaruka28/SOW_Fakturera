const translations = require('../seeds/translations.json');

const seedTranslation  = async (prisma) => {
    console.log('\nSeeding Translation In DB...\n');

    const formattedTranslations = Object.entries(translations).flatMap(
        ([lang,entries]) => 
            Object.entries(entries).map(([key,value]) => (
                {
                    lang: lang,
                    key,
                    value
                }
            ))
    );

    console.log('\nFormatted Translations Preview: ', formattedTranslations.slice(0,10));

    await prisma.translation.createMany({
        data: formattedTranslations,
        skipDuplicates: true
    })

    console.log('\nTranslation Seeded...\n')
};

module.exports = seedTranslation;