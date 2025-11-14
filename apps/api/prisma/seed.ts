import { PrismaClient, Category, Role, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const categories: Category[] = [
    Category.ELECTRONICS,
    Category.BOOKS,
    Category.CLOTHING,
];

async function seedAdmin() {
    console.log('👤 Seeding admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await prisma.user.upsert({
        where: { email: 'admin@test.com' },
        update: {},
        create: {
            firstname: 'Admin',
            lastname: 'User',
            phoneNumber: '123456789',
            email: 'admin@test.com',
            username: 'admin',
            password: hashedPassword,
            role: Role.ADMIN,
            bucket: {
                create: {},
            },
        },
    });
    console.log('👤 Admin user seeded.');
}

async function seedProducts() {
    console.log('🌱 Seeding products...');

    await prisma.productInOrder.deleteMany();
    await prisma.productsInBuckets.deleteMany();
    await prisma.productLocation.deleteMany();
    await prisma.product.deleteMany();
    console.log('🧹 Cleaned old products.');

    const productsToCreate = 50;
    const createdProducts: Prisma.ProductCreateInput[] = [];

    for (let i = 0; i < productsToCreate; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const product = {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({ min: 10, max: 2000 }),
            category: randomCategory,
            urlImage: faker.image.url(),
        };
        createdProducts.push(product);
    }

    await prisma.product.createMany({
        data: createdProducts,
    });

    console.log(`🌱 Seeded ${productsToCreate} products.`);
}


async function main() {
    await seedAdmin();
    await seedProducts();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
