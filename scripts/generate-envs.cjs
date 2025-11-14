const fs = require('fs');
const path = require('path');

const rootEnvContent = `
POSTGRES_USER=shop_user
POSTGRES_PASSWORD=shop_pass
POSTGRES_DB=shop_db
`;

const apiEnvContent = `
PORT=3000
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
DATABASE_URL="postgresql://shop_user:shop_pass@postgres_db:5432/shop_db?schema=public"
`;

const webEnvContent = '';

const rootDir = path.join(__dirname, '..');
const envPaths = [
    {
        path: path.join(rootDir, '.env'),
        content: rootEnvContent,
        name: '.env (Root)',
    },
    {
        path: path.join(rootDir, 'apps', 'api', '.env'),
        content: apiEnvContent,
        name: 'apps/api/.env',
    },
    {
        path: path.join(rootDir, 'apps', 'web', '.env'),
        content: webEnvContent,
        name: 'apps/web/.env',
    },
];

function writeEnvFile(filePath, content, name) {
    try {
        fs.writeFileSync(filePath, content.trim());
        console.log(`✅ Successfully created/updated: ${name}`);
    } catch (err) {
        console.error(`❌ Error writing ${name}:`, err);
    }
}

function main() {
    console.log('Generating .env files...');

    envPaths.forEach(env => {
        writeEnvFile(env.path, env.content, env.name);
    });

    console.log('...Generation complete!');
}

main();
