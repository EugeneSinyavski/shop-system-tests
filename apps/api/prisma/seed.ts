import { PrismaClient, Category, Role, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const seededData = {
    users: [] as any[],
    products: [] as any[],
    generatedAt: new Date().toISOString(),
};

async function seedAdmin() {
    console.log('🛡️ Seeding admin user...');
    const password = 'admin123';
    const email = 'admin@test.com';
    const username = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            firstname: 'Admin',
            lastname: 'User',
            phoneNumber: '123456789',
            email,
            username,
            password: hashedPassword,
            role: Role.ADMIN,
            bucket: { create: {} },
        },
    });

    seededData.users.push({ id: admin.id, role: Role.ADMIN, email, username, password });
    console.log('🛡️ Admin user seeded.');
}

async function seedRegularUsers() {
    console.log('👤 Seeding regular test users...');
    const password = 'user123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersToSeed = [
        { email: 'user1@test.com', username: 'user1', firstname: 'John', lastname: 'Doe' },
        { email: 'user2@test.com', username: 'user2', firstname: 'Jane', lastname: 'Smith' },
    ];

    for (const u of usersToSeed) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                ...u,
                phoneNumber: faker.phone.number(),
                password: hashedPassword,
                role: Role.USER,
                bucket: { create: {} },
            },
        });
        seededData.users.push({ id: user.id, role: Role.USER, email: u.email, username: u.username, password });
    }
    console.log('👤 Regular users seeded.');
}

async function seedProducts() {
    console.log('📦 Seeding products...');

    await prisma.productInOrder.deleteMany();
    await prisma.productsInBuckets.deleteMany();
    await prisma.productLocation.deleteMany();
    await prisma.product.deleteMany();

    const productsToCreate = 50;
    const categoriesList = [Category.ELECTRONICS, Category.BOOKS, Category.CLOTHING];

    for (let i = 0; i < productsToCreate; i++) {
        const productData = {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: new Prisma.Decimal(faker.commerce.price({ min: 10, max: 2000 })),
            category: categoriesList[Math.floor(Math.random() * categoriesList.length)],
            urlImage: faker.image.url(),
        };

        const createdProduct = await prisma.product.create({
            data: productData,
        });

        seededData.products.push(createdProduct);
    }

    console.log(`📦 Seeded ${productsToCreate} products.`);
}

async function saveSeededData() {
    const accessFolderName = 'dev-access';
    const rootPath = '/app';
    const targetDir = path.join(rootPath, accessFolderName);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    const jsonPath = path.join(targetDir, 'seeded-data.json');
    const mdPath = path.join(targetDir, 'credentials.md');

    fs.writeFileSync(jsonPath, JSON.stringify(seededData, null, 2));

    let mdContent = `# 🔐 Dev Access Credentials\n\n`;
    mdContent += `Generated: ${new Date().toLocaleString()}\n\n`;

    mdContent += `## 👥 Accounts\n`;
    mdContent += `| Role | Email | Password | URL |\n`;
    mdContent += `| :--- | :--- | :--- | :--- |\n`;
    seededData.users.forEach(u => {
        mdContent += `| **${u.role}** | \`${u.email}\` | \`${u.password}\` | [Login](http://localhost:5173/login) |\n`;
    });

    mdContent += `\n\n--- \n### 📦 Raw Data\nFull product list: [seeded-data.json](./seeded-data.json)`;

    fs.writeFileSync(mdPath, mdContent);
    console.log(`✅ Access info saved to /app/${accessFolderName}`);
}

async function main() {
    await seedAdmin();
    await seedRegularUsers();
    await seedProducts();
    await saveSeededData();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
