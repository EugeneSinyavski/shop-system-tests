import fs from 'fs';
import path from 'path';

export default async function globalSetup(config) {
  const isCI = !!process.env.CI;

  const uiBaseUrl = process.env.BASE_URL || 'http://localhost:5173';
  const apiBaseUrl = process.env.API_URL || 'http://localhost:3000';

  const envInfo = `
Project=Playwright Shop System Demo
TestTypes=UI + API
UI_BaseURL=${uiBaseUrl}
API_BaseURL=${apiBaseUrl}
RunMode=${isCI ? 'CI/CD Pipeline' : 'Local Run'}
Execution_Workers=${config.workers} 
OS=${process.platform}
NodeVersion=${process.version}
  `;

  const allureResultsDir = path.join(process.cwd(), 'allure-results');

  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
  }

  fs.writeFileSync(path.join(allureResultsDir, 'environment.properties'), envInfo.trim());
}
