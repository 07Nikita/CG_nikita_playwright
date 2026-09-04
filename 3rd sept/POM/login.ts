import { Page   } from "@playwright/test";


export class loginPage {

    constructor(private page : Page) {}

    username = "input[placeholder='Enter username']";

    password = "input[placeholder='Enter password']";

    loginButton = '#login-btn';

    // page actions 

    async login (user : string , pass : string){

        await this.page.fill(this.username,user);

        await this.page.fill(this.password,pass);

        await this.page.click(this.loginButton);
    
    }

}