import { execSync, exec } from 'child_process';

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
            exec('sudo systemctl start docker');
        }

        let attempts = 0;
        while (!isDockerRunning() && attempts < 12) {
            attempts++;
            console.log(`${colors.cyan}Waiting for Docker... (Attempt ${attempts}/12)${colors.reset}`);
            await sleep(5000);
        }

        return isDockerRunning();
    } catch (error) {
        return false;
    }
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

async function start() {
    console.log(`${colors.bright}🛠️  Starting Shop System for AQA Work\n${colors.reset}`);

    if (!isDockerRunning()) {
        const started = await startDocker();
        if (!started) {
            console.error(`${colors.red}❌ Docker is not running. Please start it manually.${colors.reset}`);
            process.exit(1);
        }
    }

    run('docker-compose up -d', 'Resuming application services');

    console.log(`${colors.bright}${colors.green}✅ System is up and running!${colors.reset}`);
    console.log(`${colors.cyan}--- Useful Info for AQA ---${colors.reset}`);
    console.log(`Frontend URL: ${colors.bright}http://localhost:5173/${colors.reset}`);
    console.log(`Access Info:  ${colors.bright}Check ./access-data/credentials.md${colors.reset}`);
    console.log(`${colors.cyan}---------------------------${colors.reset}`);
    console.log(`\x1b[2mUse "docker-compose logs -f api" to see live server logs.\x1b[0m`);
}

start();
