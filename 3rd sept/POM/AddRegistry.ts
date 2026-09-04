import { Page } from "@playwright/test";
 
export class AddRegistry {
 
    constructor(private page: Page) {}
 
    async Add(name: string,accountNumber: string,bankName: string) {
        await this.page.getByRole("button", { name: "Funds Transfer" }).click();
        await this.page.getByRole("button", { name: "Add New" }).click();
        await this.page.getByRole("textbox", { name: "e.g. John Doe" }).fill(name)
        await this.page.getByRole("textbox", { name: "e.g. 1234567890" }).fill(accountNumber);
        // await this.page.locator("#bene-bank").selectOption({label: bankName});
        await this.page.getByRole("button", { name: "Save Beneficiary" }).click();

    }
 
}