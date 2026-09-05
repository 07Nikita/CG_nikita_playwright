Feature: Student Registration Form

  Scenario Outline: Register a new student successfully
    Given User launches the student registration application
    When User enters first name as "<FirstName>"
    And User enters email as "<Email>"
    And User selects gender as "<Gender>"
    And User enters mobile number as "<Mobile>"
    And User enters date of birth
    And User enters subject as "<Subject>"
    And User selects hobby as "<Hobby>"
    And User verifies picture upload control is enabled
    And User enters address as "<Address>"
    And User selects state as "<State>"
    And User selects city as "<City>"
    Then Submit button should be enabled

    Examples:
      | FirstName | Email              | Gender | Mobile     | Subject | Hobby   | Address   | State | City  |
      | Nikita    | nikita@gmail.com   | Female | 9876543210 | Maths   | Reading | Bangalore | NCR   | Delhi |
      | Meena     | meena@gmail.com    | Female | 9876543211 | English | Sports  | Chennai   | NCR   | Delhi |
      | John      | john@gmail.com     | Male   | 9876543212 | Physics | Music   | Mumbai    | NCR   | Delhi |