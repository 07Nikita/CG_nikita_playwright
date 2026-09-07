# SauceDemo Playwright TypeScript BDD Automation Test Plan

## Application Overview

Comprehensive functional and automation test plan for SauceDemo at https://www.saucedemo.com/, using Playwright with TypeScript, Cucumber/BDD, Page Object Model, Allure reporting, and GitHub Actions. Coverage is based on the live application: documented login users, six-product inventory, four sort options, product details, cart, checkout information, checkout overview with fixed payment/shipping display and calculated totals, order completion, sidebar navigation, reset app state, and logout. The critical regression journey is login, select product, add to cart, cart, checkout, customer information, order verification, completion confirmation, and logout.

## Test Scenarios

### 1. Smoke and Critical End-to-End

**Seed:** `tests/seed.spec.ts`

#### 1.1. Critical purchase journey from login through logout

**File:** `features/regression/critical-purchase.feature`

**Steps:**
  1. Open https://www.saucedemo.com/ and log in with standard_user and secret_sauce.
    - expect: The inventory page opens and the Swag Labs application shell is displayed.
  2. Select Sauce Labs Backpack from the inventory and verify its product details.
    - expect: The product details page shows the correct name, description, image, and $29.99 price.
  3. Add the product to the cart and open the cart.
    - expect: The cart badge shows 1 and the cart contains exactly Sauce Labs Backpack with quantity 1 and $29.99.
  4. Select Checkout and submit Ada, Lovelace, and 10001 as customer information.
    - expect: The checkout overview opens and displays the selected item, payment information, shipping information, item total, tax, and total.
  5. Verify the overview totals and select Finish.
    - expect: The order completes and the confirmation page displays Checkout: Complete! and Thank you for your order!.
  6. Open the sidebar and select Logout.
    - expect: The user returns to the login page and protected inventory content is no longer displayed.

#### 1.2. Application launch and standard login smoke

**File:** `features/smoke/login.feature`

**Steps:**
  1. Open the SauceDemo URL.
    - expect: The login page displays Username, Password, Login, and the documented accepted usernames/password information.
  2. Submit standard_user and secret_sauce.
    - expect: Login succeeds and the inventory page displays Products and six product cards.

#### 1.3. Checkout completion smoke

**File:** `features/smoke/checkout.feature`

**Steps:**
  1. Authenticate, add Sauce Labs Bike Light to the cart, and proceed through checkout with valid customer data.
    - expect: The checkout overview contains the selected item and calculated totals.
  2. Select Finish.
    - expect: The completion page displays the order confirmation message and Back Home control.

#### 1.4. Logout smoke

**File:** `features/smoke/logout.feature`

**Steps:**
  1. Log in, open the sidebar, and select Logout.
    - expect: The application returns to the login page.

### 2. Functional Coverage by Module

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login functional, negative, and validation coverage

**File:** `features/functional/login.feature`

**Steps:**
  1. Submit standard_user with secret_sauce.
    - expect: The user is authenticated and routed to inventory.
  2. Submit invalid_user with wrong_password.
    - expect: Login is rejected with a visible authentication error and the user remains on the login page.
  3. Submit locked_out_user with secret_sauce.
    - expect: Login is rejected with a visible locked-out-user error and inventory is not opened.
  4. Submit empty username and password, then submit each missing field combination.
    - expect: The form prevents successful login and displays the appropriate required-field validation.
  5. Verify password input masking and keyboard navigation across username, password, and Login.
    - expect: Password characters are masked and keyboard interaction reaches the intended controls.

#### 2.2. Inventory and product sorting coverage

**File:** `features/functional/inventory.feature`

**Steps:**
  1. Log in as standard_user and inspect the inventory page.
    - expect: Exactly six documented products are shown with names, descriptions, prices, images, and Add to cart controls.
  2. Select Name (A to Z), Name (Z to A), Price (low to high), and Price (high to low).
    - expect: Products are reordered correctly for each of the four available sort options and the selected option is retained.
  3. Add one product, observe its control and cart badge, then remove it.
    - expect: Add to cart changes to Remove, the cart badge increments to 1, and removal restores the Add to cart state and clears the badge.
  4. Exercise each supported user fixture: problem_user, performance_glitch_user, error_user, and visual_user.
    - expect: The application remains testable and any known fixture-specific behavior is recorded as a defect or accepted product behavior; no unsupported feature is assumed.

#### 2.3. Product details coverage

**File:** `features/functional/product-details.feature`

**Steps:**
  1. Open each product by clicking its name and image link from inventory.
    - expect: The details page matches the selected product name, description, image, and price.
  2. Open a product after adding it to the cart.
    - expect: The cart badge and selected product state persist on the details page.
  3. Select Back to products.
    - expect: The inventory page opens and retains expected application/cart state.

#### 2.4. Shopping cart and cart management coverage

**File:** `features/functional/cart.feature`

**Steps:**
  1. Open an empty cart.
    - expect: The cart page loads with no item rows and provides Continue Shopping and Checkout controls as implemented.
  2. Add one and then multiple distinct products from inventory.
    - expect: The cart badge count, item rows, quantities, names, descriptions, and prices match the selected products.
  3. Remove an item from inventory and from the cart.
    - expect: The item is removed, its cart count is updated, and the remaining items are unchanged.
  4. Select Continue Shopping, then return to the cart.
    - expect: Navigation returns to inventory and then back to cart without losing cart contents.
  5. Reset app state from the sidebar after adding products.
    - expect: Cart contents and item button state are reset to the clean application state.

#### 2.5. Checkout information and validation coverage

**File:** `features/functional/checkout-information.feature`

**Steps:**
  1. Start checkout with a non-empty cart and submit Ada, Lovelace, and 10001.
    - expect: Checkout overview opens with the customer information accepted.
  2. Submit the form with no values, then with first name, last name, or postal code omitted one at a time.
    - expect: The form remains on checkout information and displays the relevant required-field error.
  3. Submit boundary-oriented values including single-character names, long names, alphanumeric postal code, whitespace-only values, and special characters.
    - expect: Input handling and validation are consistent with the application contract; unexpected acceptance, truncation, or navigation is logged.
  4. Select Cancel from checkout information.
    - expect: The user returns to the cart without completing the order.

#### 2.6. Checkout overview and totals coverage

**File:** `features/functional/checkout-overview.feature`

**Steps:**
  1. Proceed from valid checkout information to the overview with one item and with multiple items.
    - expect: Overview lists the correct products, quantities, and prices.
  2. Verify payment, shipping, item total, tax, and total.
    - expect: Displayed totals equal the sum of item prices plus displayed tax, and the fixed payment/shipping text is present.
  3. Select Cancel from overview.
    - expect: The user exits the checkout flow without receiving an order completion confirmation.
  4. Use the overview's product link.
    - expect: The selected product detail opens without corrupting the checkout/cart state.

#### 2.7. Order completion coverage

**File:** `features/functional/order-completion.feature`

**Steps:**
  1. Finish a valid order from the overview.
    - expect: The completion page displays Checkout: Complete!, Pony Express image, Thank you for your order!, dispatch text, Back Home, and Generate PDF order.
  2. Select Back Home.
    - expect: The user returns to inventory and the post-order cart/application state matches the actual application behavior.
  3. Select Generate PDF order.
    - expect: The browser handles the generated order PDF according to the application behavior; download or rendering failure is reported.

#### 2.8. Sidebar navigation and logout coverage

**File:** `features/functional/navigation.feature`

**Steps:**
  1. Open the sidebar on inventory, product details, cart, checkout, and completion pages.
    - expect: The menu can be opened and closed without obscuring or corrupting the current page.
  2. Select All Items.
    - expect: The user is routed to inventory.
  3. Select About.
    - expect: The user is routed to the linked Sauce Labs website.
  4. Select Reset App State after creating cart state.
    - expect: The application state is reset as implemented.
  5. Select Logout.
    - expect: The user returns to login and cannot continue using authenticated pages without logging in again.

### 3. Negative and Boundary Validation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Authentication negative matrix

**File:** `features/negative/authentication.feature`

**Steps:**
  1. Try blank username/password, valid username with blank password, blank username with valid password, invalid username/password, and locked_out_user.
    - expect: Each unsupported credential combination is rejected with a clear visible error and no authenticated inventory access.

#### 3.2. Checkout validation matrix

**File:** `features/negative/checkout-validation.feature`

**Steps:**
  1. Attempt checkout with an empty cart if the application permits reaching checkout, and submit blank, whitespace-only, missing, minimum-length, maximum-length, and special-character customer fields.
    - expect: The application prevents invalid progression where required, displays appropriate validation, and does not create an order from invalid data.
  2. Reload or navigate backward during each checkout step.
    - expect: The application does not falsely display order completion and retains or rejects state consistently with its implementation.

#### 3.3. State and navigation resilience

**File:** `features/negative/state-resilience.feature`

**Steps:**
  1. Access authenticated URLs without logging in, use browser Back/Forward across checkout pages, and refresh pages with cart state.
    - expect: Unauthorized or stale navigation does not expose an invalid completed order; behavior is recorded against the application's actual session model.
  2. Rapidly click Add to cart, Remove, Checkout, Continue, and Finish controls where practical.
    - expect: No duplicate cart rows, duplicate order completion, or inconsistent counts are created.

### 4. Automation Architecture and CI Evidence

**Seed:** `tests/seed.spec.ts`

#### 4.1. BDD feature and step-definition organization

**File:** `features/architecture/bdd-structure.feature`

**Steps:**
  1. Review the repository layout for feature files, step definitions, page objects, fixtures, data, and hooks.
    - expect: Features are organized by business module, step definitions remain thin, and page objects own locators/actions/assertion-ready state.
  2. Run a tagged smoke scenario and publish Allure results.
    - expect: The scenario is selectable by tag and the report contains feature/scenario status, steps, duration, environment, and failure evidence.

#### 4.2. Playwright failure diagnostics

**File:** `features/architecture/diagnostics.feature`

**Steps:**
  1. Force or observe a failed UI test in CI.
    - expect: The framework captures trace on retry/failure, screenshot on failure, video on retry/failure as configured, console/network diagnostics where supported, and attaches them to Allure.
  2. Run Chromium, Firefox, and WebKit projects.
    - expect: Browser-specific results are separated and failures identify browser, OS, commit, and environment.

#### 4.3. GitHub Actions test execution

**File:** `features/architecture/ci.feature`

**Steps:**
  1. Trigger pull-request smoke execution and main-branch regression execution.
    - expect: GitHub Actions installs pinned dependencies, runs the selected Cucumber/Playwright tags, uploads Allure/raw artifacts, and fails the check on test failures.
  2. Review a scheduled full-browser run.
    - expect: The scheduled run covers supported browser projects and retains artifacts for the configured retention period.
