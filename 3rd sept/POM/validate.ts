import { Page, expect } from "@playwright/test";
 
export class Validate {
 
    constructor(private page: Page) {}
 
    async validateTransfer(amount: string) {
 
        // Go to Accounts Summary
        await this.page
            .getByRole("button", { name: "Accounts Summary" })
            .click();
 
        // Get transfer statement amount
        const transferAmount = await this.page
            .getByRole("cell", { name: `-$${amount}.00` })
            .innerText();
 
        // Validate
        expect(transferAmount).toBe(`-$${amount}.00`);
 
        console.log("Transfer Amount Validated:", transferAmount);
 
        
    }
}
 