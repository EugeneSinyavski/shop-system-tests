import { execSync, exec } from 'child_process';
import fs from 'fs';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
};

const isDockerRunning = () => {
    try {
        execSync('docker info', { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
};

const startDocker = async () => {
    const platform = process.platform;
    console.log(`${colors.yellow}Attempting to start Docker...${colors.reset}`);

    try {
        if (platform === 'win32') {
            exec('start "" "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe"');
        } else if (platform === 'darwin') {
            exec('open -a Docker');
        } else if (platform === 'linux') {
            console.log(`${colors.yellow}Note: On Linux this might require sudo privileges.${colors.reset}`);
            exec('sudo systemctl start docker');
        }

        let attempts = 0;
        while (!isDockerRunning() && attempts < 12) {
            attempts++;
            console.log(`${colors.cyan}Waiting for Docker to initialize... (Attempt ${attempts}/12)${colors.reset}`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        if (isDockerRunning()) {
            console.log(`${colors.green}✓ Docker is now running!${colors.reset}\n`);
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
};

const run = (command, description) => {
    console.log(`${colors.bright}${colors.cyan}>> ${description}${colors.reset}`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`${colors.green}Success!${colors.reset}\n`);
    } catch (error) {
        console.error(`${colors.red}Error executing command: ${command}${colors.reset}`);
        process.exit(1);
    }
};

async function setup() {
    console.log(`${colors.bright}🚀 Starting Shop System Cross-Platform Setup\n${colors.reset}`);

    if (!isDockerRunning()) {
        const started = await startDocker();
        if (!started) {
            console.error(`${colors.red}${colors.bright}❌ Failed to start Docker automatically.${colors.reset}`);
            console.error(`${colors.yellow}Please start Docker Desktop manually and try again.${colors.reset}`);
            console.error(`Download: ${colors.cyan}https://www.docker.com/products/docker-desktop/${colors.reset}\n`);
            process.exit(1);
        }
    } else {
        console.log(`${colors.green}✓ Docker is already running${colors.reset}\n`);
    }

    run('pnpm install', 'Installing dependencies');
    run('pnpm gen:envs', 'Generating environment files');
    run('docker-compose up --build -d', 'Starting containers');

    console.log(`${colors.cyan}>> Waiting for API to be ready (15s)...${colors.reset}`);
    await sleep(15000);
    run('docker-compose exec api pnpm --filter api seed', 'Seeding the database');

    console.log(`${colors.cyan}>> Extracting access info to project root...${colors.reset}`);
    try {
        const containerName = execSync('docker ps --filter "name=api" --format "{{.Names}}"').toString().trim().split('\n')[0];

        if (containerName) {
            if (fs.existsSync('./access-data')) {
                fs.rmSync('./access-data', { recursive: true, force: true });
            }
            execSync(`docker cp ${containerName}:/app/access-data ./access-data`, { stdio: 'inherit' });
            console.log(`${colors.green}✓ Folder /access-data is ready in project root!${colors.reset}\n`);
        }
    } catch (err) {
        console.log(`${colors.yellow}Manual check: files should be in /app/access-data inside the container.${colors.reset}`);
    }

    console.log(`${colors.bright}${colors.green}✨ Setup complete! Welcome, intern!${colors.reset}`);
}

setup();
