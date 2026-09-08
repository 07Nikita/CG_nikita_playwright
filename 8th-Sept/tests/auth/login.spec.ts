import { test, expect } from '../fixtures/testFixtures';
import { getLoginData } from '../../utils/jsonReader';
import { logger } from '../../utils/logger/logger';

for (const data of getLoginData().filter((row) => row.execute && row.expectedLoginResult === 'Error')) {
  test(`${data.testCaseId} - invalid login`, async ({ loginPage }) => {
    logger.info('Starting negative login test', { testCaseId: data.testCaseId, username: data.username });
    await loginPage.goto();
    await loginPage.login(data.username, data.password);
    await expect(loginPage.error).toContainText(data.expectedError ?? '');
    await loginPage.expectVisible();
  });
}
