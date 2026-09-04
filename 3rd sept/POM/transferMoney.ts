import { Page } from "@playwright/test";
 
export class TransferMoney {
 
    constructor(private page: Page) {}

    async Transfer(money:string) {
    await this.page.getByRole('spinbutton', { name: '0.00' }).fill(money);
    await this.page.getByRole('button', { name: 'Execute Transfer' }).click();
    }


}