import { Page } from '@playwright/test';

export interface PlaywrightMcpContext {
  purpose: 'locator-inspection' | 'failure-reproduction' | 'browser-evidence';
  pageUrl: string;
}
export function mcpContext(page: Page, purpose: PlaywrightMcpContext['purpose']): PlaywrightMcpContext {
  return { purpose, pageUrl: page.url() };
}
