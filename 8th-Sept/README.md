# SauceDemo Playwright Framework

Playwright + TypeScript automation for the SauceDemo end-to-end purchase flow.

## Prerequisites

- Node.js 20 or newer
- npm
- Playwright browsers installed with `npx playwright install`
- Optional Allure CLI for local Allure report generation

## Install

```bash
npm install
npx playwright install
```

## Test Data

Test data is stored in `test-data/saucedemo-test-data.json`. `LoginData` contains positive and negative login rows; `PurchaseData` contains credentials, product selection, customer details, and expected prices/totals.

## Run Tests

```bash
npm test
npm run test:chromium
npm run test:purchase
npm run typecheck
```

Use `BASE_URL` to override the default SauceDemo URL. Reports and runtime artifacts are generated under `reports/` and are excluded from this snapshot.

## Architecture

- `pages/`: SauceDemo page objects.
- `tests/`: business-readable specs and fixtures.
- `utils/`: data access, calculations, logging, assertions, synchronization, reporting, and artifacts.
- `test-data/`: external JSON data.
