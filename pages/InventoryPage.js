export class InventoryPage {
  constructor(page) {
    this.page = page;

    // these have data-test — safe
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    // semantic — tied to what user sees, not styling
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });

    // these have no better option on this app — CSS is acceptable
    // but we document WHY
    this.productItems = page.locator('.inventory_item'); // no data-test available
    this.productNames = page.locator('.inventory_item_name'); // no data-test available
    this.productPrices = page.locator('.inventory_item_price'); // no data-test available
    this.cartLink = page.locator('.shopping_cart_link'); // no data-test available
  }
  async goto() {
    await this.page.goto('/inventory.html');
  }
  async addItemByName(name) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.locator('button').click();
  }
  async removeItemByName(name) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.locator('button').click();
  }
  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }
  async getAllPrices() {
    const raw = await this.productPrices.allTextContents();
    return raw.map(p => parseFloat(p.replace('$', '')));
  }
  async getAllNames() {
    return this.productNames.allTextContents();
  }
  async getCartCount() {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    return parseInt(await this.cartBadge.textContent());
  }
  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
