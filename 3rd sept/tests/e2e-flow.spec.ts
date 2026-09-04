import { test } from "@playwright/test";
import { AddRegistry } from "../POM/AddRegistry";
import { TransferMoney } from "../POM/transferMoney";
import { loginPage } from "../POM/login";
import { Validate } from "../POM/validate";
import data from "../Data/data.json";
import { logout } from "../POM/logout";
 
test("Banking Flow", async ({ page }) => {
 
    const login = new loginPage(page);
    const addRegistry = new AddRegistry(page);
    const transferMoney = new TransferMoney(page);
    const validate = new Validate(page);
    const logoutbtn= new logout(page)
 
    // Login
    await page.goto(
        "https://www.playwrightpad.in/sandbox/banking"
    );
 
    await login.login(data.user, data.pass);
 
    // Add Beneficiary
    await addRegistry.Add(
        data.name,
        data.accountNumber,
        data.bankName
    );
 
    // Transfer Money
    await transferMoney.Transfer(data.money);
 
    // Validate transfer + print net worth
    await validate.validateTransfer(data.money);

    await logoutbtn.logout()
});
