import fs from 'node:fs';
import path from 'node:path';
import { LoginData, PurchaseData } from './testData';

const dataPath = path.resolve('test-data', 'saucedemo-test-data.json');
interface JsonTestData { LoginData: LoginData[]; PurchaseData: PurchaseData[]; }
function readData(): JsonTestData {
  if (!fs.existsSync(dataPath)) throw new Error(`Missing JSON test data: ${dataPath}`);
  return JSON.parse(fs.readFileSync(dataPath, 'utf8')) as JsonTestData;
}
export function getLoginData(): LoginData[] { return readData().LoginData; }
export function getPurchaseData(): PurchaseData[] { return readData().PurchaseData; }
export function executablePurchaseData(): PurchaseData[] { return getPurchaseData().filter((row) => row.execute); }
