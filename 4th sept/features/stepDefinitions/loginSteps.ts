import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../pages/LoginPage';
import {CustomWorld} from '../../support/world'
import {Registration} from '../../pages/form'

let login : LoginPage;
Given('the user is on the login page',async function (this:CustomWorld) {
  login = new LoginPage(this.page);
  await login.openWebsite();
});

When('the user enters valid username and password', async function (this:CustomWorld) {
  await login.Login('standard_user','secret_sauce');
});

When('clicks the login button', async function (this:CustomWorld) {
  await login.Click();
});

Then('the user should be redirected to the dashboard page', async function (this:CustomWorld) {
  await login.Validation();
});

When('the user enters invalid username or password', async function (this:CustomWorld) {
  await login.invalidLogin('user','sauce');
});

Then('an error message should be displayed indicating invalid credentials', async function () {
  await login.ErrorMessage();
});

Given('User opens the application',async function (this:CustomWorld) {
    login = new LoginPage(this.page);
  await login.openWebsite();
  

});

When('User enters {string} and {string}',async function (this:CustomWorld,username:string, password:string) {
  await login.Login(username,password);
   await login.Click();

});

Then('User should view the error message',async function (this:CustomWorld) {
 await login.ErrorMessage();
});
  
// --------------------------------------


let registration: Registration;

Given('User launches the student registration application', async function () {
    registration = new Registration(this.page);
    await registration.launchApplication();

});

When('User enters first name as {string}', async function (name) {
   await registration.enterFirstName(name);

});

When('User enters email as {string}', async function (email) {
    await registration.enterEmail(email);

});

When('User selects gender as {string}', async function (gender) {
    await registration.selectGender(gender);

});

When('User enters mobile number as {string}', async function (mobile) {
    await registration.enterMobileNumber(mobile);

});

When('User enters date of birth', async function () {
    await registration.enterDateOfBirth();

});

When('User enters subject as {string}', async function (subject) {
    await registration.enterSubject(subject);

});

When('User selects hobby as {string}', async function (hobby) {
    await registration.selectHobby(hobby);

});

When('User verifies picture upload control is enabled', async function () {
    await registration.verifyPictureUploadEnabled();

});

When('User enters address as {string}', async function (address) {
    await registration.enterAddress(address);

});

When('User selects state as {string}', async function (state) {
    await registration.selectState(state);

});

When('User selects city as {string}', async function (city) {
    await registration.selectCity(city);

});

Then('Submit button should be enabled', async function () {

    await registration.verifySubmitButton();

});