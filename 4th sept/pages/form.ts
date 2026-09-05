import { Page, expect ,Locator} from '@playwright/test';

export class Registration {
    submitButton:Locator

    constructor(private page: Page) {
        this.submitButton = page.locator("input[value='Login']");
    }

    // Locators
    private firstName = '#name';
    private email = '#email';
    private maleRadio = '#gender';
    private femaleRadio = '(//input[@type="radio"])[2]';
    private otherRadio = "(//input[@type='radio'])[3]";
    private mobile = '#mobile';
    private dob = '#dob';
    private subject = '#subjects';
    private sports = '#hobbies';
    private reading = "(//input[@type='checkbox'])[2]";
    private music = "(//input[@type='checkbox'])[3]";
    private pictureUpload = '//input[@id="picture"]';
    private address = "//textarea[@id='picture']";
    private state = '#state';
    private city = '#city';
    

    // Actions

    async launchApplication() {
        await this.page.goto(
            'https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php'
        );
    }

    async enterFirstName(firstName: string) {
        await this.page.locator(this.firstName).fill(firstName);
    }

    async enterEmail(email: string) {
        await this.page.locator(this.email).fill(email);
    }

    async selectGender(gender: string) {

        if (gender.toLowerCase() === 'male') {
            await this.page.locator(this.maleRadio).check();
        }

        else if (gender.toLowerCase() === 'female') {
            await this.page.locator(this.femaleRadio).check();
        }

        else {
            await this.page.locator(this.otherRadio).check();
        }
    }

    async enterMobileNumber(number: string) {
        await this.page.locator(this.mobile).fill(number);
    }

    async enterDateOfBirth() {
        await this.page.locator(this.dob).fill('2000-10-10');
    }

    async enterSubject(subject: string) {
        await this.page.locator(this.subject).fill(subject);
    }

    async selectHobby(hobby: string) {

        if (hobby.toLowerCase() === 'sports') {
            await this.page.locator(this.sports).check();
        }

        else if (hobby.toLowerCase() === 'reading') {
            await this.page.locator(this.reading).check();
        }

        else {
            await this.page.locator(this.music).check();
        }
    }

    async verifyPictureUploadEnabled() {
        await expect(
            this.page.locator(this.pictureUpload)
        ).toBeEnabled();
    }

    async enterAddress(address: string) {
        await this.page.locator(this.address).fill(address);
    }

    async selectState(state: string) {
        await this.page.locator(this.state)
            .selectOption({ label: 'NCR' });
    }

    async selectCity(city: string) {
        await this.page.locator(this.city)
            .selectOption({ label: 'Agra' });
    }


async verifySubmitButton() {

    await expect(
        this.submitButton
    ).toBeEnabled()

}

}