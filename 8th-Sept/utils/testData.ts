export type ScenarioType = 'Positive' | 'Negative';
export interface LoginData {
  testCaseId: string; execute: boolean; scenarioType: ScenarioType; username: string; password: string;
  expectedLoginResult: 'Success' | 'Error'; expectedError?: string;
}
export interface PurchaseData extends LoginData {
  productName: string; expectedUnitPrice: number; expectedSubtotal: number; expectedTax: number; expectedTotal: number;
  firstName: string; lastName: string; postalCode: string; expectedCheckoutResult: 'Success' | 'Error'; expectedCheckoutError?: string;
}
