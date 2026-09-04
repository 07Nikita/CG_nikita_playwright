import { Page   } from "@playwright/test";


export class logout {

    constructor(private page : Page) {}

    logoutButton = "button[class='btn-unique']";

    // page actions 

    async logout (){


        await this.page.click(this.logoutButton);
    
    }

}