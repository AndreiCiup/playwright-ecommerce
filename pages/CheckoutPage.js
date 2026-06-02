export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmHeader = page.locator('.complete-header');
    this.totalLabel = page.locator('.summary_total_label');
    this.errorMessage = page.locator('[data-test="error"]');
  }
  async fillInfo(firstName, lastName, zip) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zip);
  }
  async continue() {
    await this.continueButton.click();
  }
  async finish() {
    await this.finishButton.click();
  }
  async getConfirmationText() {
    return this.confirmHeader.textContent();
  }
  async getTotal() {
    return this.totalLabel.textContent();
  }
}
