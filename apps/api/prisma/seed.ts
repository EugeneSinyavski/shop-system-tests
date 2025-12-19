import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { adminUser, regularUsers, staticProducts } from './data';

const prisma = new PrismaClient();
const seededData = { users: [] as any[], products: [] as any[], generatedAt: new Date().toISOString() };

async function seedUsers() {
    console.log('🛡️ Seeding users...');
    const commonPassword = 'user123';
    const hashedCommon = await bcrypt.hash(commonPassword, 10);
    const hashedAdmin = await bcrypt.hash(adminUser.password, 10);

    const admin = await prisma.user.upsert({
        where: { email: adminUser.email },
        update: {},
        create: { ...adminUser, password: hashedAdmin, phoneNumber: '123456789', bucket: { create: {} } },
    });
    seededData.users.push({ ...adminUser, id: admin.id });

    for (const u of regularUsers) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: { ...u, password: hashedCommon, phoneNumber: faker.phone.number(), bucket: { create: {} } },
        });
        seededData.users.push({ ...u, password: commonPassword, id: user.id });
    }
    console.log('👤 Users seeded.');
}

async function seedProducts() {
    console.log('📦 Seeding static products with real images...');

    await prisma.productInOrder.deleteMany();
    await prisma.productsInBuckets.deleteMany();
    await prisma.productLocation.deleteMany();
    await prisma.product.deleteMany();

    for (const p of staticProducts) {
        const finalImageUrl = p.urlImage || faker.image.urlLoremFlickr({ category: 'products' });

        const product = await prisma.product.create({
            data: {
                name: p.name,
                description: p.description,
                price: new Prisma.Decimal(p.price),
                category: p.category,
                urlImage: finalImageUrl,
            },
        });
        seededData.products.push(product);
    }
    console.log(`📦 Seeded ${staticProducts.length} items.`);
}

async function saveSeededData() {
    const accessFolderName = 'access-data';
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
    await seedUsers();
    await seedProducts();
    await saveSeededData();
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
