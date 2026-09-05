Feature: Login Feature

Scenario: Successful login with valid credentials
  Given the user is on the login page
  When the user enters valid username and password
  And clicks the login button
  Then the user should be redirected to the dashboard page

Scenario: Unsuccessful login with invalid credentials
  Given the user is on the login page
  When the user enters invalid username or password
  And clicks the login button
  Then an error message should be displayed indicating invalid credentials

@smoke
Scenario Outline: Verify login with multiple users
 Given User opens the application
 When User enters "<username>" and "<password>"
 Then User should view the error message

Examples:

    | username                  | password|
    | standard_user             | secret  |
    | problem_user              | secret  |
    | performance_glitch_user   | secret  |
    | error_user                | secret  |
    | visual_user               | secret  |

@smoke
Scenario Outline: Verify login with multiple users successfully
 Given User opens the application
 When User enters "<username>" and "<password>"
 Then the user should be redirected to the dashboard page

Examples:

    | username                  | password      |
    | standard_user             | secret_sauce  |
    | problem_user              | secret_sauce  |
    | performance_glitch_user   | secret_sauce  |
    | error_user                | secret_sauce  |
    | visual_user               | secret_sauce  |