export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  timeout: Number(process.env.TEST_TIMEOUT ?? 60_000),
  logLevel: process.env.LOG_LEVEL ?? 'info',
};
