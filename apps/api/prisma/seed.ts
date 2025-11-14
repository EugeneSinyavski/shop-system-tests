import { faker } from '@faker-js/faker';
// @ts-ignore
import { Prisma, PrismaClient } from "@prisma/client";
// @ts-ignore
import { Category } from "dto";


const prisma = new PrismaClient();

const categories: Category[] = [
    Category.ELECTRONICS,
    Category.BOOKS,
    Category.CLOTHING,
];

async function main() {
    console.log('🌱 Starting seeding...');

    await prisma.productInOrder.deleteMany();
    await prisma.productsInBuckets.deleteMany();
    await prisma.productLocation.deleteMany();
    await prisma.product.deleteMany();

    console.log('🧹 Cleaned old products.');

    const productsToCreate = 50;
    const createdProducts: Prisma.ProductCreateInput[] = [];

    for (let i = 0; i < productsToCreate; i++) {
        const randomCategory =
            categories[Math.floor(Math.random() * categories.length)];

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

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
