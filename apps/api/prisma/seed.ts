import { PrismaClient, Prisma, Category } from '@prisma/client';
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
    console.log('📦 Seeding static products...');
    await prisma.productInOrder.deleteMany();
    await prisma.productsInBuckets.deleteMany();
    await prisma.productLocation.deleteMany();
    await prisma.product.deleteMany();

    for (const p of staticProducts) {
        let imageUrl = '';
        if (p.category === Category.ELECTRONICS) imageUrl = faker.image.urlLoremFlickr({ category: 'technics' });
        else if (p.category === Category.BOOKS) imageUrl = faker.image.urlLoremFlickr({ category: 'books' });
        else imageUrl = faker.image.urlLoremFlickr({ category: 'fashion' });

        const product = await prisma.product.create({
            data: { ...p, price: new Prisma.Decimal(p.price), urlImage: imageUrl },
        });
        seededData.products.push(product);
    }
    console.log(`📦 Seeded ${staticProducts.length} products.`);
}

async function saveSeededData() {
    const targetDir = path.join('/app', 'access-data');
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(path.join(targetDir, 'seeded-data.json'), JSON.stringify(seededData, null, 2));

    let md = `# 🔐 Dev Access Credentials\n\nGenerated: ${new Date().toLocaleString()}\n\n## 👥 Accounts\n| Role | Email | Password |\n| :--- | :--- | :--- |\n`;
    seededData.users.forEach(u => md += `| **${u.role}** | \`${u.email}\` | \`${u.password}\` |\n`);
    md += `\n\n--- \n### 📦 Raw Data\nFull product list: [seeded-data.json](./seeded-data.json)`;

    fs.writeFileSync(path.join(targetDir, 'credentials.md'), md);
    console.log(`✅ Access info saved to /app/access-data`);
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
