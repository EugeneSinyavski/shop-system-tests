# Shop System Automation Framework 🎭

[![CI/CD Pipeline](https://github.com/EugeneSinyavski/shop-system-tests/actions/workflows/ci.yml/badge.svg)](https://github.com/EugeneSinyavski/shop-system-tests/actions)
[![Test Report](https://img.shields.io/badge/Allure-Live_Report-blueviolet)](https://EugeneSinyavski.github.io/shop-system-tests/)
[![Playwright](https://img.shields.io/badge/Playwright-Test-green)](https://playwright.dev/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-blue)](https://www.docker.com/)

**Robust E2E testing framework for a full-stack E-commerce platform.**

This project demonstrates a complete automation lifecycle: from Dockerized environment setup and database seeding to test execution and automated reporting via GitHub Pages.

🔗 **[View Live Test Report & History](https://EugeneSinyavski.github.io/shop-system-tests/)**

---

## 🛠 Tech Stack

* **Framework:** [Playwright](https://playwright.dev/) (JavaScript/TypeScript)
* **CI/CD:** GitHub Actions
* **Containerization:** Docker & Docker Compose
* **Reporting:** Allure Report (hosted on GitHub Pages)
* **Package Manager:** pnpm
* **Database:** PostgreSQL (with automated seeding strategies)

---

## ℹ️ About the Project

This repository contains a **clone/fork** of a full-stack e-commerce application (React + NestJS), used here strictly as a **System Under Test (SUT)**.

**My Contribution & Key Features:**
While the application code serves as the base, my work focuses on the **Quality Assurance infrastructure**:

* **Infrastructure as Code:** Configured `docker-compose.yml` for isolated testing environments.
* **CI/CD Pipeline:** Built a GitHub Actions workflow that automatically builds, seeds, tests, and deploys reports.
* **Database Seeding:** Implemented reliability strategies (waiting for DB readiness, populating test data via seeding scripts).
* **Reporting:** Configured Allure with history trends to track test stability over time.

---

## 🧪 Test Coverage

The framework covers critical business flows using both API and UI layers:

### ✅ UI Tests (E2E)
* **Authentication:** User/Admin registration and login flows.
* **Admin Panel:** Access control and dashboard visibility checks.
* **Shopping Flow:** Product search, Add to Cart, Cart management.
* **Checkout:** End-to-end order placement simulation.

### ✅ API Tests
* Direct backend endpoints testing (REST API).
* Response validation (Status codes, JSON Schema).
* **Data Preparation:** Custom scripts to generate test data before UI tests run.

